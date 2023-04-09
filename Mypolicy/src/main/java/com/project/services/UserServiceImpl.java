package com.project.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.daos.UserDao;
import com.project.dtos.Credentials;

import com.project.entities.User;

@Transactional
@Service
public class UserServiceImpl {

	@Autowired
	private UserDao userDao;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	
	public User findUserByEmailAndPassword(Credentials cred) {
		 User user = userDao.findByEmailId(cred.getEmail());
		String rawPassword = cred.getPassword();
		if(user != null && passwordEncoder.matches(rawPassword, user.getPassword())) {
//			UserDTO result = converter.toUserDto(user);
//			result.setPassword("********");
			return user;
		}
		return null;
	}
	
	
	public int saveUser(User user) {
		String rawPassword = user.getPassword();
		String encPassword = passwordEncoder.encode(rawPassword);
		user.setPassword(encPassword);
		userDao.save(user);
		return 1;
	
	}
	
	public int changePassword(Credentials cred) {
		User user = userDao.findByEmailId(cred.getEmail());
		String encPassword = passwordEncoder.encode(cred.getPassword());
		user.setPassword(encPassword);
		userDao.save(user);
		return 1;
	}
	
}
