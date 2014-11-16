package controllers;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.UUID;



import models.Customer;
import models.LevelType;
import models.Session;
import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;
import play.cache.Cache;
import play.data.validation.Required;
import play.data.validation.Validation;
import play.db.Model;
import play.db.jpa.Blob;
import play.i18n.Messages;
import play.mvc.Before;
import play.mvc.Controller;
import play.mvc.Http.Header;
import utils.Coder;
import utils.DateUtil;
import utils.JSONUtil;
import utils.SendSMS;
import controllers.CRUD.ObjectType;

/**
 * ......
 * 
 * @author hanzhao
 * 
 */
//@With(Compress.class)
public class AiU extends Controller {

	public static final String SUCCESS = "1";
	public static final String FAIL = "0";
	
	public static final int ONE = 1;
	public static final int TWO = 2;
	public static final int THREE = 3;
	public static final int FOUR = 4;
	public static final int FIVE = 5;
	
	public static final int upgrade_flag = 1;// .......
	public static final int error_parameter_required = 1;// .......
	public static final int error_username_already_used = 2;// ........
	public static final int error_username_not_exist = 3;// .......
	public static final int error_userid_not_exist = 4;// ..id....
	public static final int error_not_owner = 5;// &{%s} .........
	public static final int error_unknown = 6;// ....,......
	public static final int error_locator_not_exist = 7;// .......
	public static final int error_both_email_phonenumber_empty = 8;// ..............
	public static final int error_username_or_password_not_match = 9;// ..........
	public static final int error_session_expired = 10;// .....,......
	public static final int error_mail_resetpassword = 11;// ..........,.........
															// &{%s} .
	public static final int error_locator_bind_full = 12;// ... &{%s} ..........
	public static final int error_locator_already_bind = 13;// ... &{%s} .......
	public static final int error_unknown_waring_format = 14;// .............
	public static final int error_unknown_command = 15;// ..... &{%s}.
	public static final int error_locator_not_confirmed = 16;// ..........,...........
	public static final int error_dateformat = 17;// .......
	public static final int error_locator_max = 18;// ......
	public static final int error_download = 19;// ....
	public static final int error_send_mail_fail = 20;
	public static final int error_already_exists = 21;// ........
	/**
	 * ...............
	 */
	private static ThreadLocal<Session> sessionCache = new ThreadLocal<Session>();
	
	/**
	 * ....
	 * 
	 * @param sessionID
	 */
	@Before(unless={"startPage", "checkDigit", "register", "register2", "login", "sendResetPasswordMail", "update"},priority=1)
	public static void validateSessionID(@Required String z) {
		
		Session s = Session.find("bySessionID",z).first();
		sessionCache.set(s);
		if (s == null) {
			renderFail("error_session_expired");
		}else{
//			if(!ONE.equals(s.sessionID) && !TWO.equals(s.sessionID)){
//				if(new Date().getTime() - s.data > 3600000){
//					s.delete();
//					renderFail("error_session_expired");
//				}
//			}
		}
	}

	
	// ..
	public static void register(@Required String z) {
		// ....
		if (Validation.hasErrors()) {
			renderFail("error_parameter_required");
		}

		try {			
			byte[] b = Coder.decryptBASE64(z);
			String src = new String(b);
			String[] arr = src.split("\\|");
		
			int i = Integer.parseInt(arr[7]);
			
			Customer m = Customer.find("byM_number", arr[6]).first();
			if(m != null){
				play.Logger.info("register:error_username_already_used");
				renderFail("error_username_already_used");
			}
			
			m = new Customer();

			m.os = Integer.parseInt(arr[4]);
			m.type = arr[5];
			m.m_number = arr[6];
			m.nickname = arr[8];

			m.exp = 0L;
			m.lv = (LevelType)LevelType.findAll().get(0);
			m.updatetime = new Date();
			m.save();
			
			Session s = Session.find("byCustomer", m).first();
			if(s == null)s = new Session();
			s.customer = m;
			s.data = new Date().getTime();
			s.sessionID = UUID.randomUUID().toString();
			s.save();
			
			JSONObject results = initResultJSON();				
			results.put("uid", m.getId());
			results.put("phone", m.m_number);
			results.put("exp", m.exp);
			results.put("lv", m.lv.level_name);
			results.put("name", m.nickname);
			results.put("session", s.sessionID);
			renderSuccess(results);
			
		} catch (Exception e) {
			play.Logger.info("register:src");
			renderFail("error_unknown");
		}
		
	}

	/**
	 * ....
	 * 
	 * @param username
	 * @param password
	 * @param type
	 *            .....,......,iphone.......push..
	 * @param serialNumber
	 *            iphone.......,push..
	 */
	public static void login(@Required String phone,
			@Required String psd, @Required Integer type,
			String serialNumber, String ip, String imei, String mac) {
		// ....
		if (Validation.hasErrors()) {
			renderFail("error_parameter_required");
		}

		if (type != null && type == 1 && (serialNumber == null || serialNumber.isEmpty())) {
			renderFail("error_parameter_required");
		}
		Customer customer = null;
		if(mac != null && !mac.isEmpty()){
			customer = Customer.find("byMac", mac).first();
		}else{
			customer = Customer.find("byM_number", phone).first();
		}
		
		if(customer == null || !customer.pwd.equals(psd)){
			renderFail("error_username_or_password_not_match");
		}
//		customer.os = type;
//		customer.serialNumber = serialNumber;
//		customer.save();
		
		Session s = Session.find("byCustomer", customer).first();
		if(s == null){
			s = new Session();
			s.customer = customer;
			s.sessionID = UUID.randomUUID().toString();
			s.data = new Date().getTime();
			s.save();
		}
		customer.os = type;
		customer._save();
		
		JSONObject results = initResultJSON();
		results.put("uid", customer.getId());
		results.put("phone", customer.m_number);
		results.put("exp", customer.exp);
		results.put("lv", customer.lv.level_name);
		results.put("name", customer.nickname);
		results.put("session", s.sessionID);
		renderSuccess(results);
	}

	/**
	 * ....
	 * 
	 * @param username
	 * @param password
	 * @param sessionID
	 */
	public static void logout(@Required String z) {
		// ....
		if (Validation.hasErrors()) {
			renderFail("error_parameter_required");
		}
		Session s = sessionCache.get();
		if(s != null && s.id != 1 && s.id != 2){
			s.delete();
		}
		renderSuccess(initResultJSON());
	}

//	/**
//	 * .............
//	 * 
//	 * @param username
//	 * @param password
//	 * @param sessionID
//	 * @throws UnsupportedEncodingException
//	 */
//	@SuppressWarnings("deprecation")
//	public static void sendResetPasswordMail(@Required String userName)
//			throws UnsupportedEncodingException {
//		Document doc = initResultJSON();
//		// ....
//		if (Validation.hasErrors()) {
//			renderFail("error_parameter_required", doc,
//					error_parameter_required);
//		}
//
//		// .......
//		Member member = Member.find("byUsername", userName).first();
//		if (member == null) {
//			renderFail("error_username_not_exist", doc,
//					error_username_not_exist);
//		}
//
//		if(member.updateTime != null && (new Date().getDate() != member.updateTime.getDate())){
//			member.sendPasswordCount = 1;
//		}
//		// ..........10.
//		if(member.sendPasswordCount > 10){
//			renderFail("error_send_mail_fail",doc,error_send_mail_fail);
//		}
//
//		SendMail mail = new SendMail(
//				Play.configuration.getProperty("mail.smtp.host"),
//				Play.configuration.getProperty("mail.smtp.user"),
//				Play.configuration.getProperty("mail.smtp.pass"));
//
//		mail.setSubject(Messages.get("mail_resetpassword_title"));
//		mail.setBodyAsText(Messages.get("mail_resetpassword_content",
//				member.username, member.username, member.password,
//				DateUtil.toDate(new Date())));
//
//		// ..........
//		String nick = Messages.get("mail_show_name");
//		try {
//			nick = javax.mail.internet.MimeUtility.encodeText(nick);
//			mail.setFrom(new InternetAddress(nick + " <"
//					+ Play.configuration.getProperty("mail.smtp.from") + ">")
//					.toString());
//			mail.setTo(member.email);
//			mail.send();
//			member.sendPasswordCount++;
//			member.updateTime = new Date();
//			member.save();
//		} catch (Exception e) {
//			renderFail("error_mail_resetpassword", doc,
//					error_mail_resetpassword);
//		}
//		renderSuccess("mail_resetpassword_success", doc);
//	}
//

	public static void updateMemberInfo(Integer os, String type, String m_number, String nickname,
			String psd, String gender, @Required String z) {

		// ....
		if (Validation.hasErrors()) {
			renderFail("error_parameter_required");
		}

		Session s = sessionCache.get();
		Customer c = s.customer;
		
		if(os != null){
			c.os = os;
		}
		if(type != null && !type.isEmpty()){
			c.type = type;
		}
		if(m_number != null && !m_number.isEmpty()){
			c.m_number = m_number;
		}
		if(nickname != null && !nickname.isEmpty()){
			c.nickname = nickname;
		}
		if(psd != null && !psd.isEmpty()){
			c.pwd = psd;
		}
		if(gender != null && !gender.isEmpty()){
			c.gender = Byte.valueOf(gender);
		}

		c.save();
		renderSuccess(initResultJSON());
	}

	/**
	 */
	public static void getMemberInfo(@Required String z) {
		
		if (Validation.hasErrors()) {
			renderFail("error_parameter_required");
		}
		
		Session s = sessionCache.get();
		if(s == null){
			renderFail("error_session_expired");
		}
		
		Customer c = s.customer;
		JSONObject results = initResultJSON();
	
		results.put("exp", c.exp);
		results.put("level", c.lv.level_name);
		results.put("phonenumber", c.m_number);
		results.put("nickname", c.nickname);
		results.put("type", c.type);

			if(c.gender == null || c.gender == 0){
				results.put("portrait", "/public/images/boy.jpg");
			}else{
				results.put("portrait", "/public/images/girl.jpg");
			}
		renderSuccess(results);
	}

	public static void clearCache(@Required String z) {
		JSONObject results = initResultJSON();
		// ....
		if (Validation.hasErrors()) {
			renderFail("error_parameter_required");
		}

		Cache.clear();
		renderSuccess(results);

	}

	/**
	 * ......
	 * 
	 * @param username
	 *            ...
	 * @param password
	 *            ..
	 * @param sessionID
	 *            ..
	 * @param fileID
	 *            ..uuid
	 * @param fileName
	 *            ....
	 */
	public static void download(@Required String id, @Required String fileID, @Required String entity, @Required String z) {

		if (Validation.hasErrors()) {
			renderFail("error_parameter_required");
		}
		ObjectType type;
		try {
			type = new ObjectType(entity);
			notFoundIfNull(type);

			Model object = type.findById(id);
			notFoundIfNull(object);
			Object att = object.getClass().getField(fileID).get(object);
			if (att instanceof Model.BinaryField) {
				Model.BinaryField attachment = (Model.BinaryField) att;
				if (attachment == null || !attachment.exists()) {
					renderFail("error_download");
				}
				long p = 0;
				Header h = request.headers.get("Range");
				play.Logger.info("download header:", h);
				if(h != null){
					p = Long.parseLong(h.value().replaceAll("bytes=", "").replaceAll("-", ""));
				}
				play.Logger.info("download header:", p);
				response.contentType = attachment.type();
				if(p > 0){
					renderBinary(attachment.get(), attachment.get().skip(p));
				}else{
					renderBinary(attachment.get(), attachment.length());
				}
				
			}
		} catch (Exception e) {
			renderText("Download failed");
		}
		renderFail("error_download");
	}


	protected static JSONObject initResultJSON() {
		return JSONUtil.getNewJSON();
	}
	
	protected static JSONArray initResultJSONArray() {
		return JSONUtil.getNewJSONArray();
	}


	protected static void renderSuccess(JSONObject results) {
		JSONObject jsonDoc = new JSONObject();
		jsonDoc.put("state", SUCCESS);
		jsonDoc.put("results",results);
		renderJSON(jsonDoc.toString());
	}

	protected static void renderFail(String key, Object... objects) {
		JSONObject jsonDoc = new JSONObject();
		jsonDoc.put("state", FAIL);
		jsonDoc.put("msg", Messages.get(key));
		renderJSON(jsonDoc.toString());
	}

}
