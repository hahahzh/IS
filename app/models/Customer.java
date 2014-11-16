package models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Index;

import play.data.validation.Email;
import play.data.validation.Match;
import play.data.validation.MaxSize;
import play.data.validation.MinSize;
import play.data.validation.Password;
import play.data.validation.Phone;
import play.data.validation.Required;
import play.db.jpa.Model;
import controllers.CRUD.Hidden;

@Table(name = "customer")
@Entity
public class Customer extends Model {

	// 1 IOS正版 2 Android 3 IOS越狱  4 IPad 5 OPad
	public int os;

	public String type;

	@Required
	@Phone
	@Index(name = "idx_m_number")
	public String m_number;
	
	@Email
	public String email;

	@Required
	@MaxSize(15)
	@MinSize(6)
	@Match(value = "^\\w*$", message = "Not a valid username")
	public String nickname;

	@Required
	@MaxSize(15)
	@MinSize(5)
	@Password
	public String pwd;

	public Long exp;
	
	@ManyToOne(fetch=FetchType.LAZY,cascade=javax.persistence.CascadeType.ALL)
	public LevelType lv;

	public Date birthday;
	
	@Hidden
	public Date updatetime;
	
	@Hidden
	public Date createtime;
	
	// 0 男 1 女
	public Byte gender;
	
	public String toString() {
		return nickname;
	}
}
