package com.tavant.springproject.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.tavant.springproject.model.Cook;
import com.tavant.springproject.model.User;
import com.tavant.springproject.repository.CookRepository;
import com.tavant.springproject.repository.UserRepository;

@Service
public class CookUserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CookRepository chefRepository;


	public void registerCookToUser(String userName, String cookUserName) {

		User user = userRepository.findById(userName).get();
		Cook cook = chefRepository.findById(cookUserName).get();

		cook.getUsers().add(user);
		Long usersCount = cook.getTotalUsers() + 1;
		cook.setTotalUsers(usersCount);
		userRepository.save(user);
		chefRepository.save(cook);

	}


	public void deRegisterCookToUser(String userName, String cookUserName) {

		User user = userRepository.findById(userName).get();
		Cook cook = chefRepository.findById(cookUserName).get();
		cook.getUsers().remove(user);
		// userRepository.save(user);
		chefRepository.save(cook);

	}

	
	public List<User> getCookUsers(String userName) {

		Cook cook = chefRepository.findById(userName).get();
		return cook.getUsers();
	}


	public void setCookRating(String userName, String cookUserName, String newRating) {
		String cookRating;
		Cook cook = chefRepository.getOne(userName);
		User user = userRepository.getOne(cookUserName);
		if (cook.getTotalUsers() > 0) {
			System.out.println(user.getUserRating());
			if (user.getUserRating() == "0") {
				cookRating = cook.getCookRating() + (Double.valueOf(newRating) / cook.getTotalUsers());
			} else {
				cookRating = Double.toString((Double.valueOf(cook.getCookRating()))
						- (Double.valueOf(user.getUserRating()) / cook.getTotalUsers())
						+ (Double.valueOf(newRating) / cook.getTotalUsers()));
			}

		} else {
			cookRating = newRating;
		}
		if (cook.getUsers().contains(user)) {
			user.setUserRating(newRating);
			cook.setCookRating(cookRating);
			userRepository.save(user);
			chefRepository.save(cook);
		}

	}

	public String getCookAggregateRating(String userName) {
		Optional<Cook> cookOptional = chefRepository.findById(userName);
		Cook cook = null;
		if (cookOptional.isPresent()) {
			cook = cookOptional.get();

		} else {
			System.out.println("Null");
		}

		return cook.getCookRating();
	}

	
	public List<String> getCookOfUser( String userName) {
		System.out.println(userName);
		List<Cook> cooks = chefRepository.findAll();
		User user = userRepository.findById(userName).get();
		Iterator<Cook> i = cooks.iterator();
		List<String> returnCook = new ArrayList<String>();
		while (i.hasNext()) {
			System.out.println(returnCook);
			Cook cook = i.next();
			if (cook.getUsers().contains(user)) {
				System.out.println(cook.getUsers().contains(user));
				returnCook.add(cook.getUserName());
				returnCook.add(cook.getCookRating());
				System.out.println(cook.getUserName());
			}
		}

		if (returnCook.size() == 0) {

			returnCook.add("You have not registered with anyone yet");
			returnCook.add("0");

		}
		System.out.println(returnCook);
		return returnCook;
	}


	public void sendHiredRegistrationMessage(String userName, String cookUserName) {

		User user = userRepository.findById(userName).get();
		Cook cook = chefRepository.findById(cookUserName).get();
		String messageBody = "Hey" + cook.getCookFirstName() + " " + cook.getCookLastName() + " "
				+ ". You have been successfully registered as a cook to " + user.getUserFirstName() + " "
				+ user.getUserLastName() + " ." + "You may contact the user with this number" + " "
				+ user.getUserContact();
		try {
			SendMsg msg = new SendMsg();
			msg.pubnubSendMg(messageBody, cook.getCookContact());
		} catch (Exception e) {
			System.out.println(e);

		}
	}

}
