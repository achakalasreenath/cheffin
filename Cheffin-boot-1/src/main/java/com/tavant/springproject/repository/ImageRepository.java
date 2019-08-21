package com.tavant.springproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tavant.springproject.model.Image;

public interface ImageRepository extends JpaRepository<Image,Long>{

}
