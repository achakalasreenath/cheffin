/*package com.tavant.springproject.service;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tavant.springproject.model.Cook;
import com.tavant.springproject.model.User;
import com.tavant.springproject.repository.CookRepository;
import com.tavant.springproject.repository.UserRepository;

@Service
public class CookRatingService {
	
	@Autowired
	private CookRepository cookRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	
    public void setCookRating(Integer cookId,Integer userId,String rating){
    	
    	Cook cook = cookRepository.getOne(userId);
        User user = userRepository.getOne(cookId);
        
        user.setUserRating(rating);
        cook.getUser().set(userId, user); 	
    }

   public String getCookAggregateRating(Integer cookId){
	   Cook cook = cookRepository.getOne(cookId);
	   List<User> userList = cook.getUser();
	   Iterator<User> i = userList.iterator();
	   Double AggregateRating = 0.0;
	   int count=0;
	   
	   while(i.hasNext()){
		   User user = i.next();
		   count++;
		   AggregateRating = (AggregateRating + Double.valueOf(user.getUserRating()));
	   }
	  
	   AggregateRating /= count;
	 
	   return  Double.toString(AggregateRating);
   }
	
	
}
*/