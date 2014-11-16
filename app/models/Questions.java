package models;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import play.data.validation.MaxSize;
import play.data.validation.MinSize;
import play.data.validation.Required;
import play.db.jpa.Blob;
import play.db.jpa.Model;

@Table(name = "questions")
@Entity
public class Questions extends Model {
	
	@Required
	@MaxSize(200)
	@MinSize(5)
	public String title;
	
	public Blob img;
	
	public Byte type;

	@ManyToOne(cascade = CascadeType.ALL, optional = false)
	public Poll poll;

}