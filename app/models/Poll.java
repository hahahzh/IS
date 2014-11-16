package models;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Index;

import play.data.validation.MaxSize;
import play.data.validation.MinSize;
import play.data.validation.Required;
import play.db.jpa.JPABase;
import play.db.jpa.Model;
import utils.DateUtil;
import controllers.CRUD.Hidden;

@Table(name = "polls")
@Entity
public class Poll extends Model {
	
	@Required
	@MaxSize(50)
	@MinSize(2)
	@Index(name = "idx_title")
	public String title;
	
	@MaxSize(500)
	public String description;
	
	public Date expired;

	@Hidden
	public Date createDate;

}