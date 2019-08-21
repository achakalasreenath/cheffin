package com.tavant.springproject.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Cook implements Cloneable {

	@Id
	private String userName;
	private String cookFirstName;
	private String cookLastName;
	private String password;
	private String cookEmail;
	private String cookAadhaar;
	private String cookGender;
	private int cookAge;
	private String cookCategory;
	private String cookLocation;
	private String currentAddress;
	private String permanentAddress;
	private String[] languages;
	private String[] foodType;
	private Double cookFeePerMonth;
	@Column(columnDefinition = "varchar(255) default '0'")
	private String cookRating;
	private Long totalUsers;
	
	@OneToMany
	private List<Image> sampleRecipeImages;
	@OneToOne
	private Image profileImage;
	private String cookContact;


	public Cook() {

	}

	/*
	 * @Embedded
	 * 
	 * @ElementCollection private List<FoodType> foodType;
	 */
	public Cook(String userName, String cookFirstName, String cookLastName, String password, String cookEmail,
			String cookAadhaar, String cookGender, int cookAge, String cookCategory, String cookLocation,
			String currentAddress, String permanentAddress, String[] languages, String[] foodType,
			Double cookFeePerMonth, String cookRating, Long totalUsers, List<Image> sampleRecipeImages,
			Image profileImage, List<User> user,String cookContact) {
		super();
		this.userName = userName;
		this.cookFirstName = cookFirstName;
		this.cookLastName = cookLastName;
		this.password = password;
		this.cookEmail = cookEmail;
		this.cookAadhaar = cookAadhaar;
		this.cookGender = cookGender;
		this.cookAge = cookAge;
		this.cookCategory = cookCategory;
		this.cookLocation = cookLocation;
		this.currentAddress = currentAddress;
		this.permanentAddress = permanentAddress;
		this.languages = languages;
		this.foodType = foodType;
		this.cookFeePerMonth = cookFeePerMonth;
		this.cookRating = cookRating;
		this.totalUsers = totalUsers;
		this.sampleRecipeImages = sampleRecipeImages;
		this.profileImage = profileImage;
		this.users = users;
		this.cookContact = cookContact;
		
		

	}

	@OneToMany
	private List<User> users;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}


	public String getCookFirstName() {
		return cookFirstName;
	}

	public void setCookFirstName(String cookFirstName) {
		this.cookFirstName = cookFirstName;
	}

	public String getCookLastName() {
		return cookLastName;
	}

	public void setCookLastName(String cookLastName) {
		this.cookLastName = cookLastName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCookEmail() {
		return cookEmail;
	}

	public void setCookEmail(String cookEmail) {
		this.cookEmail = cookEmail;
	}

	public String getCookAadhaar() {
		return cookAadhaar;
	}

	public void setCookAadhaar(String cookAadhaar) {
		this.cookAadhaar = cookAadhaar;
	}

	public String getCookGender() {
		return cookGender;
	}

	public void setCookGender(String cookGender) {
		this.cookGender = cookGender;
	}

	public int getCookAge() {
		return cookAge;
	}

	public void setCookAge(int cookAge) {
		this.cookAge = cookAge;
	}

	public String getCookCategory() {
		return cookCategory;
	}

	public void setCookCategory(String cookCategory) {
		this.cookCategory = cookCategory;
	}

	public String getCookLocation() {
		return cookLocation;
	}

	public void setCookLocation(String cookLocation) {
		this.cookLocation = cookLocation;
	}

	public String getCurrentAddress() {
		return currentAddress;
	}

	public void setCurrentAddress(String currentAddress) {
		this.currentAddress = currentAddress;
	}

	public String getPermanentAddress() {
		return permanentAddress;
	}

	public void setPermanentAddress(String permanentAddress) {
		this.permanentAddress = permanentAddress;
	}

	public String[] getLanguages() {
		return languages;
	}

	public void setLanguages(String[] languages) {
		this.languages = languages;
	}

	public String[] getFoodType() {
		return foodType;
	}

	public void setFoodType(String[] foodType) {
		this.foodType = foodType;
	}

	public Double getCookFeePerMonth() {
		return cookFeePerMonth;
	}

	public void setCookFeePerMonth(Double cookFeePerMonth) {
		this.cookFeePerMonth = cookFeePerMonth;
	}

	public String getCookRating() {
		return cookRating;
	}

	public void setCookRating(String cookRating) {
		this.cookRating = cookRating;
	}

	public Long getTotalUsers() {
		return totalUsers;
	}

	public void setTotalUsers(Long totalUsers) {
		this.totalUsers = totalUsers;
	}



	public List<Image> getSampleRecipeImages() {
		return sampleRecipeImages;
	}

	public void setSampleRecipeImages(List<Image> sampleRecipeImages) {
		this.sampleRecipeImages = sampleRecipeImages;
	}

	public Image getProfileImage() {
		return profileImage;
	}

	public void setProfileImage(Image profileImage) {
		this.profileImage = profileImage;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public String getCookContact() {
		return cookContact;
	}

	public void setCookContact(String userContact) {
		this.cookContact = userContact;
	}




}
