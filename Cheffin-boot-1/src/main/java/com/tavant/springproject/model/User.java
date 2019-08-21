package com.tavant.springproject.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class User {

	@Id
	private String userName;
	private String userFirstName;
	private String userLastName;
	private String password;
	private String userEmail;
	@Column(columnDefinition = "varchar(255) default '0'")
	private String userRating;
	
	@OneToOne
	private Image profileImage;

	

	@OneToMany
	private List<Cook> previousCooks;

	@OneToMany
	private List<Review> reviews;
	
	private String userContact;


	public User() {

	}

	public User(String userName, String userFirstName, String userLastName, String password, String userEmail,
			String userRating, Image profileImage, List<Cook> previousCooks, List<Review> reviews,String userContact) {
		super();
		this.userName = userName;
		this.userFirstName = userFirstName;
		this.userLastName = userLastName;
		this.password = password;
		this.userEmail = userEmail;
		this.userRating = userRating;
		this.profileImage = profileImage;
		this.reviews = reviews;
		this.previousCooks = previousCooks;
		this.userContact = userContact;

	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public Image getProfileImage() {
		return profileImage;
	}

	public void setProfileImage(Image profileImage) {
		this.profileImage = profileImage;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUserRating() {
		return userRating;
	}

	public void setUserRating(String userRating) {
		this.userRating = userRating;
	}

	public String getUserFirstName() {
		return userFirstName;
	}

	public void setUserFirstName(String userFirstName) {
		this.userFirstName = userFirstName;
	}

	public String getUserLastName() {
		return userLastName;
	}

	public void setUserLastName(String userLastName) {
		this.userLastName = userLastName;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}



	public List<Review> getReviews() {
		return reviews;
	}

	public void setReviews(List<Review> reviews) {
		this.reviews = reviews;
	}

	public List<Cook> getPreviousCooks() {
		return previousCooks;
	}

	public void setPreviousCooks(List<Cook> previousCooks) {
		this.previousCooks = previousCooks;
	}
	public String getUserContact() {
		return userContact;
	}

	public void setUserContact(String userContact) {
		this.userContact = userContact;
	}


}
