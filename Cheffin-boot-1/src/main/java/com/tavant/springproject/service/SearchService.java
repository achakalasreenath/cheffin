package com.tavant.springproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.tavant.springproject.model.Cook;
import com.tavant.springproject.repository.CookRepository;

@Service
public class SearchService {

	@Autowired
	private CookRepository chefRepository;

	
	
	
	public List<Cook> searchByLocation(String cookLocation) {

		return chefRepository.findCookByCookLocation(cookLocation);

	}


	public List<Cook> searchByGender(String cookGender) {

		return chefRepository.findCookByCookGender(cookGender);

	}
	

	public List<Cook> searchByPrice(Double price) {
      return chefRepository.findCookByCookFeePerMonth(price);
		
	
		

	}


	public List<Cook> searchByFoodType(String foodType) {
		return chefRepository.findCookByFoodType(foodType);

	}

	public List<Cook> searchByPriceAndLocation(String cookLocation, Double price) {
		return chefRepository.findCookByLocationAndPrice(cookLocation, price);

	}
	

}
