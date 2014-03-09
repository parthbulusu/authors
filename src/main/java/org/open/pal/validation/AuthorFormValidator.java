package org.open.pal.validation;
import org.open.pal.domain.Author;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;
@Component("contactFormValidator")
public class AuthorFormValidator implements Validator{

	
	 @SuppressWarnings("unchecked")
	 @Override
	 public boolean supports(Class clazz)
	 {
	  return Author.class.isAssignableFrom(clazz);
	 }

	 @Override
	 public void validate(Object model, Errors errors)
	 {
	  ValidationUtils.rejectIfEmptyOrWhitespace(errors, "firstname","required.name", "First Name is required.");
	  ValidationUtils.rejectIfEmptyOrWhitespace(errors, "lastname","required.name", "Last Name is required.");
	 }

}
