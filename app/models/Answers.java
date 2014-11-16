package models;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Index;

import play.data.validation.MaxSize;
import play.data.validation.MinSize;
import play.data.validation.Required;
import play.db.jpa.Blob;
import play.db.jpa.JPABase;
import play.db.jpa.Model;

@Table(name = "answers")
@Entity
public class Answers extends Model {

	public Integer value;

	@ManyToOne(cascade = CascadeType.ALL, optional = false)
	public Customer c;
	
	@ManyToOne(cascade = CascadeType.ALL, optional = false)
	public Questions q;
	
	@ManyToOne(cascade = CascadeType.ALL, optional = false)
	public Poll p;

}