package com.tavant.springproject.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.springframework.beans.factory.annotation.Value;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Review {

	@Id
	@GeneratedValue
	private Long reviewId;
	private String cookUserName;
    private String userName;
    @Column(columnDefinition = "varchar(2000) default '0'")
	private String review;

	public Review() {

	}

	public Review(Long reviewId,String cookUserName, String review,String userName) {
		super();
		this.reviewId = reviewId;
		this.cookUserName = cookUserName;
		this.review = review;
		this.userName = userName;
		
		
	}

	public String getCookUserName() {
		return cookUserName;
	}

	public void setCookUserName(String cookUserName) {
		this.cookUserName = cookUserName;
	}

	public String getReview() {
		return review;
	}

	public void setReview(String review) {
		this.review = review;
	}

	public Long getReviewId() {
		return reviewId;
	}

	public void setReviewId(Long reviewId) {
		this.reviewId = reviewId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

}
