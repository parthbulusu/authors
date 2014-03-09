package org.open.pal.serviceimpl;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.open.pal.domain.Author;
import org.open.pal.domain.QAuthor;
import org.open.pal.exception.AuthorNotFound;
import org.open.pal.repository.AuthorRepository;
import org.open.pal.service.AuthorService;

import com.mysema.query.types.Predicate;

@Service 
public class AuthorServiceImpl implements AuthorService {
	@Resource
	private AuthorRepository authorRepository;
	private @Value("${RecordsPerPage}") int recordsPerPage;
	@Override
	@Transactional
	public Author create(Author author) {
		Author createdAuthor = author;
		createdAuthor.setCreatedate(new Date(System.currentTimeMillis()));
		return authorRepository.save(createdAuthor);
	}
	@Override
	@Transactional
	public int createList(ArrayList<Author> list) {
		
		//createdAuthor.setCreatedate(new Date(System.currentTimeMillis()));
		List<Author> returnlist=authorRepository.save(list);
		return returnlist.size();
	}
	@Override
	@Transactional
	public Author findById(int id) {
		return authorRepository.findOne(id);
		 
	}
	//@Override
	//@Transactional
	public Page<Author> findBySearchTerm(String term,int pageNumber ) {
		QAuthor qauthor=QAuthor.author;
		Predicate predicate=qauthor.firstname.contains(term).or(qauthor.lastname.contains(term)).or(qauthor.affiliation.contains(term));
		Pageable  pageable=new PageRequest(pageNumber, recordsPerPage,new Sort(new Order(Direction.DESC ,"createdate")));
		return authorRepository.findAll(predicate,pageable);
	
	}
	@Override
	@Transactional(rollbackFor=AuthorNotFound.class)
	public Author delete(int id) throws AuthorNotFound {
		Author deletedAuthor = authorRepository.findOne(id);

		if (deletedAuthor == null)
			throw new AuthorNotFound();

		authorRepository.delete(deletedAuthor);
		return deletedAuthor;
	}

	@Override
	@Transactional
	public List findAll() {
		return authorRepository.findAll();
	}
	@Transactional
	public Page<Author> findAll(int pageNumber ) {
		return findAll(pageNumber,recordsPerPage,"createdate" ,Direction.DESC );
	}		
	@Transactional
	public Page<Author> findAll(int pageNumber,int pageCount ) {
		return findAll(pageNumber,pageCount,"createdate" ,Direction.DESC );
	}	
	@Transactional
	public Page<Author> findAll(int pageNumber,int pageCount, String orderBy,Direction sortOrder ) {
		Pageable  pageable=new PageRequest(pageNumber, pageCount,new Sort(new Order(sortOrder, orderBy)));
		return authorRepository.findAll(pageable);
	}

	@Override
	@Transactional(rollbackFor=AuthorNotFound.class)
	public Author update(Author author) throws AuthorNotFound {
		Author updatedAuthor = authorRepository.findOne(author.getId());

		if (updatedAuthor == null)
			throw new AuthorNotFound();

		updatedAuthor.setFirstname(author.getFirstname());
		updatedAuthor.setLastname(author.getLastname());
		//updatedAuthor.setCreatedate(new Date(System.currentTimeMillis()));
		updatedAuthor.setAffiliation(author.getAffiliation());
		updatedAuthor.setEmail(author.getEmail());
		updatedAuthor.setEnddate(author.getEnddate());
		updatedAuthor.setStartdate(author.getEnddate());
		updatedAuthor.setPaperTitle(author.getPaperTitle());
		updatedAuthor.setProhibitedFrom(author.getProhibitedFrom());
		return authorRepository.save(updatedAuthor);
	}
}
