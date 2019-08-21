package com.tavant.springproject.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tavant.springproject.model.Cook;
import com.tavant.springproject.model.FoodType;
import com.tavant.springproject.repository.CookRepository;
import com.tavant.springproject.service.SearchService;

@RestController
@CrossOrigin
@RequestMapping("/api/search")
public class SearchController {

	@Autowired
	private SearchService searchService;

	
	
	@RequestMapping(value = "/searchByLocation/{cookLocation}", method = RequestMethod.GET)
	public List<Cook> searchByLocation(@PathVariable String cookLocation) {

		return searchService.searchByLocation(cookLocation);

	}

	@RequestMapping(value = "/searchByGender/{cookGender}", method = RequestMethod.GET)
	public List<Cook> searchByGender(@PathVariable String cookGender) {

		return searchService.searchByGender(cookGender);

	}
	
	@RequestMapping(value = "/searchByPrice/{price}", method = RequestMethod.GET)
	public List<Cook> searchByPrice(@PathVariable Double price) {
      return searchService.searchByPrice(price);
		
	
		

	}

	@RequestMapping(value = "/searchByFoodType/{foodType}", method = RequestMethod.GET)
	public List<Cook> searchByFoodType(@PathVariable String foodType) {
		return searchService.searchByFoodType(foodType);

	}
	@RequestMapping(value = "/searchByPriceAndLocation/{price}/{cookLocation}", method = RequestMethod.GET)
	public List<Cook> searchByPriceAndLocation(@PathVariable("cookLocation") String cookLocation, @PathVariable("price") Double price) {
		return searchService.searchByPriceAndLocation(cookLocation, price);

	}
	

}
