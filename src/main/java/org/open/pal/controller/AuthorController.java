package org.open.pal.controller;

import java.io.InputStreamReader;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.open.pal.domain.Author;
import org.open.pal.exception.AuthorNotFound;
import org.open.pal.service.AuthorService;
import org.open.pal.validation.AuthorFormValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import au.com.bytecode.opencsv.CSVReader;

@Controller
@RequestMapping(value = "/author")
public class AuthorController {
	private static final Logger logger = LoggerFactory
			.getLogger(AuthorController.class);

	@Autowired
	private AuthorService authorService;

	@Autowired
	private AuthorFormValidator validator;
	@Value("${DefaultLandingPageNumber}")
	private int defaultLandingPageNumber;

	@InitBinder
	public void initBinder(WebDataBinder binder) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
		dateFormat.setLenient(false);
		binder.registerCustomEditor(Date.class, new CustomDateEditor(
				dateFormat, true));
	}

	

	@RequestMapping("/list/json")
	public @ResponseBody
	List getAllAuthorsList() {

		return authorService.findAll();
	}

	@RequestMapping("/list")
	public ModelAndView getAllAuthors() {
		ModelAndView mav = new ModelAndView("author/home");
		System.out.println("defaultLandingPageNumber"
				+ defaultLandingPageNumber);
		Page<Author> authors = authorService.findAll(defaultLandingPageNumber);
		logger.debug("First page Authors" + authors.getContent().size());
		System.out.println("First page Authors" + authors.getTotalElements());
		mav.addObject("SEARCH_AUTHORS_RESULTS_PAGE", authors);
		return mav;
	}
	@RequestMapping(value = "/ajax/search/{term}/{pageNumber}", method = RequestMethod.GET)
	public ModelAndView ajaxGetAllAuthors(@PathVariable String term,@PathVariable Integer pageNumber) {
		ModelAndView mav = new ModelAndView("author/listAuthors");
		if (pageNumber == null)
			pageNumber = defaultLandingPageNumber;
		else
			pageNumber = pageNumber - 1;
		Page<Author> authorsPage = authorService.findBySearchTerm(term, pageNumber);

		mav.addObject("SEARCH_AUTHORS_RESULTS_PAGE", authorsPage);
		return mav;
	}
	@RequestMapping(value = "/ajax/list/{pageNumber}", method = RequestMethod.GET)
	public ModelAndView ajaxGetAllAuthors(@PathVariable Integer pageNumber) {
		ModelAndView mav = new ModelAndView("author/listAuthors");
		if (pageNumber == null)
			pageNumber = defaultLandingPageNumber;
		else
			pageNumber = pageNumber - 1;
		Page<Author> authorsPage = authorService.findAll(pageNumber);

		mav.addObject("SEARCH_AUTHORS_RESULTS_PAGE", authorsPage);
		return mav;
	}

	@RequestMapping(value = "/ajax/delete/{id}/{currentPage}", method = RequestMethod.GET)
	public ModelAndView ajaxDelete(@PathVariable Integer id,
			@PathVariable Integer currentPage,
			final RedirectAttributes redirectAttributes) throws AuthorNotFound {

		Author author = authorService.delete(id);
		String message = "The Author '" + author.getFirstname() + " "
				+ author.getLastname() + "' was successfully deleted.";

		redirectAttributes.addFlashAttribute("message", message);
		ModelAndView mav = ajaxGetAllAuthors(currentPage);
		return mav;
	}

	@RequestMapping(value = "/ajax/create", method = RequestMethod.GET)
	public ModelAndView newAjaxUserForm() {
		return newUserForm();
	}

	@RequestMapping(value = "/create", method = RequestMethod.GET)
	public ModelAndView newUserForm() {
		ModelAndView mav = new ModelAndView("author/new");
		Author author = new Author();
		mav.getModelMap().put("authorForm", author);
		return mav;
	}

	@RequestMapping(value = "ajax/authorListUpload", headers = "content-type=multipart/*", method = RequestMethod.POST)
	public @ResponseBody
	ModelAndView upload(MultipartHttpServletRequest request,
			HttpServletResponse response) {
		Iterator<String> itr = request.getFileNames();
		while (itr.hasNext()) {
			MultipartFile mpf = request.getFile(itr.next());
			logger.debug(mpf.getOriginalFilename() + " uploaded!");
			ArrayList<Author> authors= new ArrayList<Author>();
			try {
				InputStreamReader isr = new InputStreamReader(
						mpf.getInputStream());
				CSVReader reader = new CSVReader(isr);
				String[] nextLine;
				
				while ((nextLine = reader.readNext()) != null) {
					Author author=new Author();
					String[] names=nextLine[0].split(",");
					if(names.length==2){
						author.setFirstname(names[0].trim());
						author.setLastname(names[1].trim());
					}else{
						author.setFirstname(nextLine[0]);
					}
					author.setAffiliation(nextLine[1]);
					author.setPaperTitle(nextLine[2]);
					author.setProhibitedFrom(nextLine[3]);
					author.setEmail(nextLine[4]);
					DateFormat formatter = new SimpleDateFormat("dd-MMM-yy");
					System.out.println("nextLine "+nextLine);
					Date startDate = formatter.parse(nextLine[5]);	
					Date endDate = formatter.parse(nextLine[6]);	
					author.setStartdate(startDate);
					author.setEnddate(endDate);
					author.setCreatedate(new Date(System.currentTimeMillis()));			
					authors.add(author);
				}
			} catch (Exception e) {
				
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			authorService.createList(authors);
		}
		ModelAndView mav = ajaxGetAllAuthors(1);
		return mav;

	}

	@RequestMapping(value = "/ajax/savelist", method = RequestMethod.POST)
	public ModelAndView ajaxCreateList(
			@Validated @RequestBody ArrayList<Author> authorslist,
			final RedirectAttributes redirectAttributes) {

		authorService.createList(authorslist);
		String message = authorslist.size()
				+ " Authors from the list were successfully created.";
		redirectAttributes.addFlashAttribute("message", message);
		ModelAndView mav = ajaxGetAllAuthors(null);
		return mav;

	}

	@RequestMapping(value = "/ajax/save", method = RequestMethod.POST)
	public ModelAndView ajaxCreate(@Validated @RequestBody Author author,
			final RedirectAttributes redirectAttributes) {

		authorService.create(author);
		String message = "New Author '" + author.getFirstname() + " "
				+ author.getLastname() + "' was successfully created.";
		redirectAttributes.addFlashAttribute("message", message);
		ModelAndView mav = ajaxGetAllAuthors(null);
		return mav;

	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView create(@ModelAttribute("author/new") Author author,
			BindingResult result, final RedirectAttributes redirectAttributes) {
		validator.validate(author, result);

		if (result.hasErrors()) {
			ModelAndView mav = new ModelAndView("author/new");
			mav.getModelMap().put("authorForm", author);
			return mav;
		}
		authorService.create(author);
		String message = "New Author '" + author.getFirstname() + " "
				+ author.getLastname() + "' was successfully created.";
		redirectAttributes.addFlashAttribute("message", message);
		return newAjaxUserForm();
	}

	@RequestMapping(value = "/edit/{id}", method = RequestMethod.GET)
	public ModelAndView edit(@PathVariable Integer id) {
		ModelAndView mav = new ModelAndView("author/edit");
		Author author = authorService.findById(id);
		mav.addObject("authorForm", author);
		return mav;
	}

	@RequestMapping("/ajax/edit/{id}")
	public ModelAndView ajaxEdit(@PathVariable Integer id) {
		return edit(id);
	}

	@RequestMapping(value = "/ajax/update/{currentPage}", method = RequestMethod.POST)
	public ModelAndView ajaxUpdate(@PathVariable Integer currentPage,
			@Validated @RequestBody Author author,
			final RedirectAttributes redirectAttributes) throws AuthorNotFound {

		authorService.update(author);
		String message = "Author '" + author.getFirstname() + " "
				+ author.getLastname() + "' was successfully Updated.";
		redirectAttributes.addFlashAttribute("message", message);
		ModelAndView mav = ajaxGetAllAuthors(currentPage);
		return mav;

	}

	@RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
	public String update(@ModelAttribute Author author,
			@PathVariable Integer id,
			final RedirectAttributes redirectAttributes, BindingResult result)
			throws AuthorNotFound {
		validator.validate(author, result);
		logger.debug(" Updating Author with values " + author);
		if (result.hasErrors()) {
			logger.debug(" Erros while editing authors");
			return "authorForm";
		}
		authorService.update(author);
		String message = "Auhtor was successfully updated.";
		redirectAttributes.addFlashAttribute("message", message);
		return "redirect:/author/list";
	}

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
	public ModelAndView delete(@PathVariable Integer id,
			final RedirectAttributes redirectAttributes) throws AuthorNotFound {
		ModelAndView mav = new ModelAndView("redirect:/author/list");
		Author author = authorService.delete(id);
		String message = "The Author '" + author.getFirstname() + " "
				+ author.getLastname() + "' was successfully deleted.";

		redirectAttributes.addFlashAttribute("message", message);
		return mav;
	}

}
