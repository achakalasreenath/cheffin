package com.tavant.springproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tavant.springproject.model.Cook;
import com.tavant.springproject.model.Review;
import com.tavant.springproject.model.User;
import com.tavant.springproject.repository.CookRepository;
import com.tavant.springproject.repository.ReviewRepository;
import com.tavant.springproject.repository.UserRepository;
import com.tavant.springproject.service.ReviewService;

@RestController
@CrossOrigin
@RequestMapping("/api/review")
public class ReviewController {
	

	@Autowired
	private ReviewService reviewService;

	@RequestMapping(value = "/giveReview/{cookUserName}/{userName}", method = RequestMethod.POST)
	public void giveReview(@PathVariable("cookUserName") String cookUserName, @PathVariable("userName") String userName,
			@RequestBody Review review) {
		reviewService.giveReview(cookUserName, userName, review);
		
	}
	
	@RequestMapping(value = "/updateReview/{cookUserName}/{userName}", method = RequestMethod.PUT)
	public void updateReview(@PathVariable("cookUserName") String cookUserName, @PathVariable("userName") String userName,
			@RequestBody Review review) {
		reviewService.updateReview(cookUserName, userName, review);
	}

	@RequestMapping(value = "/deleteReview/{cookUserName}/{userName}", method = RequestMethod.POST)
	public User deleteReview(@PathVariable("cookUserName") String cookUserName,
			@PathVariable("userName") String userName, @RequestBody Review review) {
		return reviewService.deleteReview(cookUserName, userName, review);
	}

	@RequestMapping(value = "/getCookReviews/{cookUserName}", method = RequestMethod.GET)
	public List<Review> getCookReviews(@PathVariable String cookUserName) {
		return reviewService.getCookReviews(cookUserName);
	}
	@GetMapping(value = "/getUserReview/{cookUserName}/{userName}")
	public Review getUserReview(@PathVariable String userName,@PathVariable String cookUserName) {
		return reviewService.getUserReview(userName, cookUserName);
	}
	
	
}
