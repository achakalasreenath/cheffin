package com.tavant.springproject.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tavant.springproject.model.User;
import com.tavant.springproject.service.ImageService;
import com.tavant.springproject.service.SendMsg;
import com.tavant.springproject.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/api/")
public class UserController {

	@Autowired
	private UserService userService;


	@RequestMapping("users")
	public List<User> findAll() {
		return (List<User>) userService.findAll();

	}

	@RequestMapping(value = "users/{userName}")
	public Optional<User> findCookById(@PathVariable String userName) {

		
		return userService.findCookById(userName);

	}

	@RequestMapping(value = "users/update", method = RequestMethod.PUT)
	public void updateUser(@RequestBody User user) {
       
		userService.updateUser(user);
	}

	@RequestMapping(value = "users/updateAll", method = RequestMethod.PUT)
	public List<User> updateAll(@RequestBody List<User> users) {
		return userService.updateAll(users);
	}

	@RequestMapping(value = "users/create", method = RequestMethod.POST)
	public User createUser(@RequestBody User user) {
	    return userService.createUser(user);
	}

	@RequestMapping(value = "users/createAll", method = RequestMethod.POST)
	public List<User> createAll(@RequestBody List<User> users) {

		return userService.createAll(users);
	}

	@RequestMapping(value = "users/delete/{userName}", method = RequestMethod.DELETE)
	public void delete(@PathVariable String userName) {
	      userService.delete(userName);
	}
	
	@RequestMapping(value = "users/getUserByUserName/{userName}", method = RequestMethod.GET)
	public User getUserByUserName(@PathVariable String userName){
		return userService.getUserByUserName(userName);
	}

	

}
