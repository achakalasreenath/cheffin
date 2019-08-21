package com.tavant.springproject.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.tavant.springproject.model.Cook;
import com.tavant.springproject.model.Image;
import com.tavant.springproject.model.User;
import com.tavant.springproject.repository.CookRepository;
import com.tavant.springproject.repository.ImageRepository;
import com.tavant.springproject.repository.UserRepository;

@Service
public class ImageService {

	@Autowired
	private ImageRepository imageRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CookRepository chefRepository;
	
	


	public void uploadCookImage(String userName, MultipartFile file) throws IOException {

		Cook cook = chefRepository.findById(userName).get();

		Image image = new Image(file.getBytes());
		cook.setProfileImage(image);
		imageRepository.save(image);
		chefRepository.save(cook);

	}


	public void uploadCookRecipeImage( String userName, MultipartFile file) throws IOException {

		Cook cook = chefRepository.findById(userName).get();

		Image image = new Image(file.getBytes());
		cook.getSampleRecipeImages().add(image);
		imageRepository.save(image);
		chefRepository.save(cook);

	}



	
	public void updateCookImage(String userName, MultipartFile file) throws IOException {

		Cook cook = chefRepository.findById(userName).get();
        Long oldImageId = cook.getProfileImage().getImageId();
		Image image = new Image(file.getBytes());
		imageRepository.save(image);
		Long imageId = image.getImageId();
		cook.setProfileImage(imageRepository.findById(imageId).get());
		chefRepository.save(cook);
		imageRepository.deleteById(oldImageId);
	/*	Long imageId = cook.getProfileImage().getImageId();
		imageRepository.deleteById(imageId);*/
		
		
		

	}


	public ResponseEntity<byte[]> getCookImage(String userName) throws IOException {

		Cook cook = chefRepository.findById(userName).get();

		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + cook.getUserName() + "\"")
				.body(cook.getProfileImage().getImage());

	}


	public ResponseEntity<byte[]> getRecipeImage(String userName, String imageId) throws IOException {

		Cook cook = chefRepository.findById(userName).get();
		Image image = imageRepository.findById(Long.valueOf(imageId)).get();

		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + cook.getUserName() + "\"")
				.body(image.getImage());

	}

	
	public void updateRecipeImage(String userName, String imageId,  MultipartFile file) throws IOException {

		Cook cook = chefRepository.findById(userName).get();
		Image newImage = new Image(file.getBytes());
		cook.getSampleRecipeImages().set(Integer.valueOf(imageId), newImage);
		imageRepository.save(newImage);
		chefRepository.save(cook);
		

	}
	

	public void deleteRecipeImage(String userName, Long imageId) throws IOException {

		//Cook cook = chefRepository.findById(userName).get();
		Image image = imageRepository.findById(Long.valueOf(imageId)).get();
	    Cook cook = chefRepository.findById(userName).get();
	    
		System.out.println(image.getImageId());
		imageRepository.delete(image);
		cook.getSampleRecipeImages().remove(image);
		//imageRepository.save(newImage);
		//imageRepository.saveAll(imageRepository.findAll());
		//chefRepository.save(cook);
		

	}
	
	/* ------------------------User-----Images----------------------------------------------------------------------------------
	 ---------------------------------------------------------------------------------------------------------------------------
	 -----------------------------------------------------------------------------------------------------------------------------*/
	
	
	
	

	public void uploadUserImage(String userName, MultipartFile file) throws IOException {

		User user = userRepository.findById(userName).get();
		Image image = new Image(file.getBytes());
		user.setProfileImage(image);
		imageRepository.save(image);
		userRepository.save(user);

	}


	public void updateUserImage(String userName, MultipartFile file) throws IOException {

		User user = userRepository.findById(userName).get();
        Long oldImageId = user.getProfileImage().getImageId();
		Image image = new Image(file.getBytes());
		imageRepository.save(image);
		Long imageId = image.getImageId();
		user.setProfileImage(imageRepository.findById(imageId).get());
		userRepository.save(user);
		imageRepository.deleteById(oldImageId);
	/*	Long imageId = cook.getProfileImage().getImageId();
		imageRepository.deleteById(imageId);*/
		
		
		

	}

	public ResponseEntity<byte[]> getUserImage(String userName) throws IOException {

		User user = userRepository.findById(userName).get();

		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + user.getUserName() + "\"")
				.body(user.getProfileImage().getImage());

	}
	
	

	public void deleteUserImage( String userName, Long imageId) throws IOException {

		//Cook cook = chefRepository.findById(userName).get();
		Image image = imageRepository.findById(Long.valueOf(imageId)).get();
		//System.out.println(image.getImageId());
		imageRepository.delete(image);
		//imageRepository.save(newImage);
		//imageRepository.saveAll(imageRepository.findAll());
		//chefRepository.save(cook);
		

	}
	
	
	
	
}
