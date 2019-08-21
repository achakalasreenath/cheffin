package com.tavant.springproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tavant.springproject.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
	public Review findReviewByUserNameAndCookUserName(String userName,String cookUserName);
	public List<Review> findReviewByCookUserName(String cookUserName);
}
