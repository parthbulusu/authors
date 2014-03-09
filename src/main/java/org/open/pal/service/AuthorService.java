package org.open.pal.service;

import java.util.ArrayList;
import java.util.List;

import org.open.pal.domain.Author;
import org.open.pal.exception.AuthorNotFound;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort.Direction;

public interface AuthorService {
	public Author create(Author author);
	public int createList(ArrayList<Author> list);
	public Author delete(int id) throws AuthorNotFound;
    public List findAll();
    public Author update(Author author) throws AuthorNotFound;
    public Author findById(int id);
    public Page<Author> findAll(int pageNumber,int pageCount, String orderBy,Direction sortOrder );
    public Page<Author> findAll(int pageNumber,int pageCount);
    public Page<Author> findAll(int pageNumber);
    public Page<Author> findBySearchTerm(String term,int pageNumber );
}
