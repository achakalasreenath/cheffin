package com.tavant.springproject.model;

import javax.persistence.Embeddable;

@Embeddable
public class FoodType {

	private String foodType;

	public String getFoodType() {
		return foodType;
	}

	public void setFoodType(String foodType) {
		this.foodType = foodType;
	}
	
	
}
