package com.project.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entities.User;

public interface UserDao extends JpaRepository<User, Integer>{

	User findById(int id);
	User findByEmailId(String email);
	
	
}
