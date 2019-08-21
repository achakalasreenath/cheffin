package com.tavant.springproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.tavant.springproject.model.Cook;
import com.tavant.springproject.model.Review;
import com.tavant.springproject.model.User;
import com.tavant.springproject.repository.CookRepository;
import com.tavant.springproject.repository.ReviewRepository;
import com.tavant.springproject.repository.UserRepository;

@Service
public class ReviewService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CookRepository chefRepository;

	@Autowired
	private ReviewRepository reviewRepository;

	
	public void giveReview(String cookUserName, String userName, Review review) {
		Cook cook = chefRepository.findById(cookUserName).get();
		User user = userRepository.findById(userName).get();
		if (cook.getUsers().contains(user)) {
			user.getReviews().add(review);
			reviewRepository.save(review);
			 userRepository.save(user);
		}

		else if (user.getPreviousCooks().contains(cook)) {
			user.getReviews().add(review);
			reviewRepository.save(review);
			 userRepository.save(user);
		}
			
		
	}
	
	
	public void updateReview(String cookUserName, String userName,
			@RequestBody Review review) {
		Cook cook = chefRepository.findById(cookUserName).get();
		User user = userRepository.findById(userName).get();
		
        Review tempReview = reviewRepository.findReviewByUserNameAndCookUserName(userName,cookUserName);
        user.getReviews().remove(tempReview);
        user.getReviews().add(review);
        reviewRepository.save(review);
        reviewRepository.delete(tempReview);
		
	    userRepository.save(user);
		
	}


	public User deleteReview( String cookUserName, String userName, Review review) {
		Cook cook = chefRepository.findById(cookUserName).get();
		User user = userRepository.findById(userName).get();

		if (cook.getUsers().contains(user)) {
			user.getReviews().remove(review);
			// reviewRepository.save(review);
			return userRepository.save(user);
		}

		else if (user.getPreviousCooks().contains(cook)) {
			user.getReviews().remove(review);
			return userRepository.save(user);
		}
		return user;
	}

	
	public List<Review> getCookReviews(String cookUserName) {
		return reviewRepository.findReviewByCookUserName(cookUserName);
	}
	
	public Review getUserReview(String userName, String cookUserName) {
		return reviewRepository.findReviewByUserNameAndCookUserName(userName,cookUserName);
	}
	
	
}
