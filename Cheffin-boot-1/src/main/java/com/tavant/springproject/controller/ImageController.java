package com.tavant.springproject.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tavant.springproject.model.Cook;
import com.tavant.springproject.model.Image;
import com.tavant.springproject.model.User;
import com.tavant.springproject.repository.CookRepository;
import com.tavant.springproject.repository.ImageRepository;
import com.tavant.springproject.repository.UserRepository;
import com.tavant.springproject.service.ImageService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/")
public class ImageController {

	@Autowired
	private ImageService imageService;

	
	
	

	@PostMapping(value = "cook/upload/{userName}")
	public void uploadCookImage(@PathVariable("userName") String userName,
			@RequestParam("profileImage") MultipartFile file) throws IOException {
          imageService.uploadCookImage(userName, file);

	}

	@PostMapping(value = "cook/uploadRecipe/{userName}")
	public void uploadCookRecipeImage(@PathVariable("userName") String userName,
			@RequestParam("sampleRecipeImages") MultipartFile file) throws IOException {

		imageService.uploadCookRecipeImage(userName, file);

	}



	@RequestMapping(value = "cook/updateProfileImage/{userName}",method = RequestMethod.PUT)
	public void updateCookImage(@PathVariable("userName") String userName,
			@RequestParam("profileImage") MultipartFile file) throws IOException {

	imageService.updateCookImage(userName, file);
		
		
		

	}

	@GetMapping(value = "cook/getCookImage/{userName}")
	public ResponseEntity<byte[]> getCookImage(@PathVariable("userName") String userName) throws IOException {

	   return imageService.getCookImage(userName);

	}

	@GetMapping(value = "cook/getCookRecipeImage/{userName}/{imageId}")
	public ResponseEntity<byte[]> getRecipeImage(@PathVariable("userName") String userName,
			@PathVariable("imageId") String imageId) throws IOException {

	          return imageService.getRecipeImage(userName, imageId);

	}

	@PutMapping(value = "cook/updateRecipeImage/{userName}/{imageId}")
	public void updateRecipeImage(@PathVariable("userName") String userName,
			@PathVariable("imageId") String imageId, @RequestParam("sampleRecipeImages") MultipartFile file) throws IOException {

		 imageService.updateRecipeImage(userName, imageId, file);

	}
	
	@RequestMapping(value = "cook/deleteRecipeImage/{userName}/{imageId}",method = RequestMethod.DELETE)
	public void deleteRecipeImage(@PathVariable("userName") String userName,
			@PathVariable("imageId") Long imageId) throws IOException {

		imageService.deleteRecipeImage(userName, imageId);
		

	}
	
	/* ------------------------User-----Images----------------------------------------------------------------------------------
	 ---------------------------------------------------------------------------------------------------------------------------
	 -----------------------------------------------------------------------------------------------------------------------------*/
	
	
	
	
	@PostMapping(value = "user/upload/{userName}")
	public void uploadUserImage(@PathVariable("userName") String userName,
			@RequestParam("profileImage") MultipartFile file) throws IOException {

	            imageService.uploadUserImage(userName, file);
	}

	@PutMapping(value = "user/updateUserProfileImage/{userName}")
	public void updateUserImage(@PathVariable("userName") String userName,
			@RequestParam("profileImage") MultipartFile file) throws IOException {

	 imageService.updateUserImage(userName, file);
		
		
		

	}
	@GetMapping(value = "user/getUserImage/{userName}")
	public ResponseEntity<byte[]> getUserImage(@PathVariable("userName") String userName) throws IOException {

		return imageService.getUserImage(userName);
	}
	
	
	@RequestMapping(value = "user/deleteUserImage/{userName}/{imageId}",method = RequestMethod.DELETE)
	public void deleteUserImage(@PathVariable("userName") String userName,
			@PathVariable("imageId") Long imageId) throws IOException {

	imageService.deleteUserImage(userName, imageId);

	}
	
	
	
	
}
