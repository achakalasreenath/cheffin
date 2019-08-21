package com.tavant.springproject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.tavant.springproject.model.User;
import com.tavant.springproject.repository.ImageRepository;
import com.tavant.springproject.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ImageRepository imageRepository;
	@Autowired
	private CookUserService cookUserService;


	public List<User> findAll() {
		return (List<User>) userRepository.findAll();

	}


	public Optional<User> findCookById(@PathVariable String userName) {

		
		return userRepository.findById(userName);

	}

	
	public void updateUser(@RequestBody User user) {
       
		userRepository.save(user);
	}


	public List<User> updateAll(@RequestBody List<User> users) {
		return (List<User>) userRepository.saveAll(users);
	}


	public User createUser(@RequestBody User user) {
	    userRepository.save(user);
		String messageBody = "Hey"+ user.getUserFirstName()+" "+user.getUserLastName()+" "+". You have been successfully registered as a user to Cheffin";
        try{
        SendMsg msg= new SendMsg();
        msg.pubnubSendMg(messageBody,user.getUserContact());
        }
        catch(Exception e){
            System.out.println(e);
            
        }
        
        return user;
	}

	public List<User> createAll(@RequestBody List<User> users) {

		return (List<User>) userRepository.saveAll(users);
	}

	public void delete(@PathVariable String userName) {
		List<String> cookUserName = cookUserService.getCookOfUser(userName);
		System.out.println(cookUserName.size());
		if(( cookUserName.size()) != 0){
		cookUserService.deRegisterCookToUser(userName, cookUserName.get(0));
		imageRepository.deleteById(userRepository.findById(userName).get().getProfileImage().getImageId());
		userRepository.deleteById(userName);
		}
		else{
			imageRepository.deleteById(userRepository.findById(userName).get().getProfileImage().getImageId());
			userRepository.deleteById(userName);
		}
	}
	
	public User getUserByUserName(@PathVariable String userName){
		System.out.println(userRepository.findUserByUserName(userName));
		return userRepository.findUserByUserName(userName);
	}

	

}
