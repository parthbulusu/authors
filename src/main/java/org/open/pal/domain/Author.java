package org.open.pal.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.commons.lang.builder.ToStringBuilder;
@Entity
@Table(name="AUTHOR")

public class Author {
	 @Id
	 @GeneratedValue(strategy = GenerationType.AUTO)
	 private int id;
	 @Column private String firstname;
	 @Column private String lastname;
	 @Column private String email;
	 @Column private String affiliation;
	 @Column private Date createdate; 
	 @Column private Date startdate; 
	 @Column private Date enddate; 
	 @Column private String paperTitle;
	 @Column private String prohibitedFrom;
	 public String getProhibitedFrom() {
		return prohibitedFrom;
	}
	public void setProhibitedFrom(String prohibitedFrom) {
		this.prohibitedFrom = prohibitedFrom;
	}
	public String getPaperTitle() {
		return paperTitle;
	}
	public void setPaperTitle(String paperTitle) {
		this.paperTitle = paperTitle;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAffiliation() {
		return affiliation;
	}
	public void setAffiliation(String affiliation) {
		this.affiliation = affiliation;
	}
	public Date getCreatedate() {
		return createdate;
	}
	public void setCreatedate(Date createdate) {
		this.createdate = createdate;
	}
	
	public Date getStartdate() {
		return startdate;
	}
	public void setStartdate(Date startdate) {
		this.startdate = startdate;
	}
	public Date getEnddate() {
		return enddate;
	}
	public void setEnddate(Date enddate) {
		this.enddate = enddate;
	}
	@Override
	 public String toString()
	 {
	  return ToStringBuilder.reflectionToString(this);
	 }	 
}
