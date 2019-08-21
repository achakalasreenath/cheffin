package com.tavant.springproject.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tavant.springproject.model.Cook;
import com.tavant.springproject.model.User;

public interface CookRepository extends JpaRepository<Cook, String> {
	public List<Cook> findCookByCookLocation(String cookLocation);
	public List<Cook> findCookByCookGender(String cookGender);
	public Cook findCookByUserName(String userName);
	@Query(value ="select * from cook where cook.cook_fee_per_month <= :price",nativeQuery = true)
	@Transactional
	public List<Cook> findCookByCookFeePerMonth(@Param("price") Double price);
	
	@Query(value ="select * from cook where cook.cook_id in (select cook_food_type.cook_cook_id from cook_food_type where cook_food_type.food_type =:foodType)",nativeQuery = true)
	@Transactional
	public List<Cook> findCookByFoodType(@Param("foodType") String foodType);
	
	@Query(value ="select * from cook where cook.cook_fee_per_month <= :price and cook.cook_location = :location",nativeQuery = true)
	@Transactional
	public List<Cook> findCookByLocationAndPrice(@Param("location") String cookLocation, @Param("price") Double price);
}
