package com.project.controllers;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.daos.UserDao;
import com.project.dtos.Credentials;
import com.project.dtos.Response;
import com.project.entities.User;
import com.project.services.EmailServiceImpl;
import com.project.services.UserServiceImpl;

@RestController
@RequestMapping("/forgotpassword")
@CrossOrigin
public class ForgotPasswordController {

	@Autowired
	EmailServiceImpl emailServiceImpl;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private UserServiceImpl userService;
	
	Random random = new Random(100000);
	
	@PostMapping("/sendotp")
	public ResponseEntity<?> sendOTP(@RequestBody Credentials cred) {
		String email = cred.getEmail();
		
		User user = userDao.findByEmailId(email);
		System.out.println(user);
		
		if(user != null) {
			System.out.println(email);
			int otp = random.nextInt(999999);
			
			emailServiceImpl.sendSimpleEmail(email, "Your One time password is : "+otp, "OTP for Password recovery on LIC");
			System.out.println("OTP sent "+otp);
			return Response.success(otp);
		}
		else {
			System.out.println("No user is registered with this email");
			return Response.error("user not found");
		}
		
	}
	
	@PostMapping("/resetpassword")
	public ResponseEntity<?> resetPassword(@RequestBody Credentials cred) {
		int result = userService.changePassword(cred);
		return Response.success(result);
	}
}
