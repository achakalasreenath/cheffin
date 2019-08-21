package com.tavant.springproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tavant.springproject.model.User;

public interface UserRepository extends JpaRepository<User, String>{

	public User findUserByUserName(String userName);
}
