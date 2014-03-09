package org.open.pal.repository;
import org.open.pal.domain.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;

public interface AuthorRepository extends JpaRepository<Author, Integer>,QueryDslPredicateExecutor {

}
