package com.tavant.springproject.service;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.tavant.springproject.model.Cook;
import com.tavant.springproject.model.User;
import com.tavant.springproject.repository.CookRepository;
import com.tavant.springproject.repository.ImageRepository;


@Service
public class CookService {

	@Autowired
	private CookRepository chefRepository;
	@Autowired
	private ImageRepository imageRepository;
	@Autowired
	private CookUserService cookUserService;


	public List<Cook> findAll() {
		return (List<Cook>) chefRepository.findAll();

	}

	
	public Cook findCookById(@PathVariable String userName) {

		return chefRepository.getOne(userName);

	}

	
	public void updateCook(Cook cook) {
		
		chefRepository.save(cook);
	}

	public List<Cook> updateAll(List<Cook> cooks) {
		return (List<Cook>) chefRepository.saveAll(cooks);
	}


	public Cook createCook(Cook cook) {
		//imageRepository.save(cook.getProfileImage());
		//imageRepository.saveAll(cook.getSampleRecipeImages());
	    chefRepository.save(cook);
		String messageBody = "Hey"+ cook.getCookFirstName()+" "+cook.getCookLastName()+" "+". You have been successfully registered as a Cook in Cheffin";
        try{
        SendMsg msg= new SendMsg();
        msg.pubnubSendMg(messageBody,cook.getCookContact());
        }
        catch(Exception e){
            System.out.println(e);
            
        }
        return cook;
	}


	public List<Cook> createAll(List<Cook> cooks) {
		return (List<Cook>) chefRepository.saveAll(cooks);
	}


	public void delete(String userName) {
		Cook cook = chefRepository.findById(userName).get();
		List<User> users = chefRepository.findById(userName).get().getUsers();
		Iterator<User> i = users.iterator();
		//System.out.println(i.hasNext());
		while(i.hasNext()){
			cookUserService.deRegisterCookToUser(i.next().getUserName(), userName);
		}
		imageRepository.deleteById(cook.getProfileImage().getImageId());
		imageRepository.deleteAll(cook.getSampleRecipeImages());
		chefRepository.deleteById(userName);
	}
	

	public Cook getCookByCookName(String userName){
		
		return chefRepository.findCookByUserName(userName);
	}
	
	
	
	
}
