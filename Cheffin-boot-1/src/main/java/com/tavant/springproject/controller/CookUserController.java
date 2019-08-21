package com.tavant.springproject.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tavant.springproject.model.Cook;
import com.tavant.springproject.model.User;
import com.tavant.springproject.service.CookUserService;
import com.tavant.springproject.service.SendMsg;

@RestController
@CrossOrigin
@RequestMapping("/api/cookUser")
public class CookUserController {

	@Autowired
	private CookUserService chefUserService;

	

	@RequestMapping(value = "/registerCookToUser/{userName}/{cookUserName}")
	public void registerCookToUser(@PathVariable(name = "userName") String userName,
			@PathVariable(name = "cookUserName") String cookUserName) {

		chefUserService.registerCookToUser(userName,cookUserName);

	}

	@RequestMapping(value = "/deRegisterCookToUser/{userName}/{cookUserName}", method = RequestMethod.GET)
	public void deRegisterCookToUser(@PathVariable(name = "userName") String userName,
			@PathVariable(name = "cookUserName") String cookUserName) {

		chefUserService.deRegisterCookToUser(userName, cookUserName);

	}

	@RequestMapping(value = "/getCookUsers/{userName}")
	public List<User> getCookUsers(@PathVariable String userName) {

		return chefUserService.getCookUsers(userName);
	}

	@RequestMapping(value = "/setCookRating/{userName}/{cookUserName}", method = RequestMethod.PUT)
	public void setCookRating(@PathVariable(name = "userName") String userName,
			@PathVariable(name = "cookUserName") String cookUserName, @RequestBody String newRating) {
		chefUserService.setCookRating(userName, cookUserName, newRating);

	}

	@RequestMapping(value = "/getCookRating/{userName}")
	public String getCookAggregateRating(@PathVariable String userName) {
		return chefUserService.getCookAggregateRating(userName);
	}

	@RequestMapping(value = "/getCookOfUser/{userName}", method = RequestMethod.GET)
	public List<String> getCookOfUser(@PathVariable String userName) {
		
         return chefUserService.getCookOfUser(userName);
	}

	@RequestMapping("/sendHiredRegistrationMessage/{userName}/{cookUserName}")
	public void sendHiredRegistrationMessage(@PathVariable("userName") String userName,
			@PathVariable("cookUserName") String cookUserName) {
      chefUserService.sendHiredRegistrationMessage(userName, cookUserName);
	}

}
