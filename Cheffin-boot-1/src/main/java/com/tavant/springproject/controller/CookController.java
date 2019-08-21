package com.tavant.springproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tavant.springproject.model.Cook;
import com.tavant.springproject.service.CookService;
import com.tavant.springproject.service.ImageService;


@RestController
@CrossOrigin
@RequestMapping("/api/")
public class CookController {

	@Autowired
	private CookService chefService;
	
	@RequestMapping("cooks")
	public List<Cook> findAll() {
		return (List<Cook>) chefService.findAll();

	}

	@RequestMapping(value = "cooks/{userName}")
	public Cook findCookById(@PathVariable String userName) {

		return chefService.findCookById(userName);

	}

	@RequestMapping(value = "cooks/update", method = RequestMethod.PUT)
	public void updateCook(@RequestBody Cook cook) {
		
		chefService.updateCook(cook);
	}

	@RequestMapping(value = "cooks/updateAll", method = RequestMethod.PUT)
	public List<Cook> updateAll(@RequestBody List<Cook> cooks) {
		return (List<Cook>) chefService.updateAll(cooks);
	}

	@RequestMapping(value = "cooks/create", method = RequestMethod.POST)
	public Cook createCook(@RequestBody Cook cook) {
	   return  chefService.createCook(cook);
		
	}

	@RequestMapping(value = "cooks/createAll", method = RequestMethod.POST)
	public List<Cook> createAll(@RequestBody List<Cook> cooks) {
		return (List<Cook>) chefService.createAll(cooks);
	}

	@RequestMapping(value = "cooks/delete/{userName}", method = RequestMethod.DELETE)
	public void delete(@PathVariable String userName) {
		chefService.delete(userName);
	}
	
	@RequestMapping(value = "cooks/getCookByUserName/{userName}", method = RequestMethod.GET)
	public Cook getCookByCookName(@PathVariable String userName){
		
		return chefService.getCookByCookName(userName);
	}
	
	
	
	
}
