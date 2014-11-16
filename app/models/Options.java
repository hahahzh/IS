package models;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


import play.data.validation.MaxSize;
import play.data.validation.MinSize;
import play.data.validation.Required;
import play.db.jpa.Blob;
import play.db.jpa.JPABase;
import play.db.jpa.Model;

@Table(name = "options")
@Entity
public class Options extends Model {
	
	@Required
	@MaxSize(500)
	@MinSize(1)
	public String text;
	
	public Integer value;
	
	public Blob img;
	
	public Byte type;

	@ManyToOne(cascade = CascadeType.ALL, optional = false)
	public Questions question;

}