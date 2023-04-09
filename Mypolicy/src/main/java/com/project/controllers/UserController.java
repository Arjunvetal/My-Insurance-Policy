package com.project.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.config.JwtUtil;
import com.project.config.MyUser;
import com.project.daos.UserDao;
import com.project.dtos.Credentials;
import com.project.dtos.Response;
import com.project.entities.AgePremium;
import com.project.entities.Region;
import com.project.entities.User;
import com.project.services.AgePremiumServiceImpl;
import com.project.services.EmailServiceImpl;
import com.project.services.RegionServiceImpl;
import com.project.services.UserServiceImpl;

@CrossOrigin
@RestController
public class UserController {

	@Autowired
	private UserServiceImpl userService;
	
	@Autowired
	EmailServiceImpl emailServiceImpl;
	

	@Autowired
	private RegionServiceImpl regionService;

	@Autowired
	private AgePremiumServiceImpl agePremiumService;
	
	@Autowired
	private UserDao userDao;

	@Autowired
	private AuthenticationManager authManager;

	@Autowired
	private JwtUtil jwtUtils;

	@PostMapping("/user/signin")
	public ResponseEntity<?> signIn(@RequestBody Credentials cred) {
		User user = userDao.findByEmailId(cred.getEmail());
		//System.out.println("after login :"+user);
		return Response.success(user);
	}

	@PostMapping("/authenticate/user/signin")
	public ResponseEntity<?> signInWithToken(@RequestBody Credentials cred) {
		try {
			System.out.println(cred);
			Authentication auth = new UsernamePasswordAuthenticationToken(cred.getEmail(), cred.getPassword());

			auth = authManager.authenticate(auth);
			MyUser user = (MyUser) auth.getPrincipal();
			System.out.println(user.toString());

			String token = jwtUtils.generateToken(user);
			System.out.println(token);
			System.out.println(user + "54");

			return Response.success(token);
		} catch (BadCredentialsException e) {
			return Response.error("error" +e);
		}
	}

	@PostMapping("/authenticate/user/signup")
	public ResponseEntity<?> signUp(@RequestBody User user) {
		user.setAuthorities("ROLE_USER");
		int result = userService.saveUser(user);
		//emailServiceImpl.sendSimpleEmail( "akashkadbhane@gmail.com","Welcome to my Policy family ", null);
		//emailServiceImpl.sendSimpleEmail(user.getEmailId(),"Welcome "+user.getName()+"to my Policy family, thank you for joinning. ","W E L C O M E");
		
		emailServiceImpl.sendSimpleEmail(user.getEmailId(), "Dear "+user.getName()+",\r\n"
		        + "\r\n"
		        + "I am delighted to welcome you to My Policy, the premier platform for managing your insurance policies. Thank you for signing up and choosing us as your trusted partner for managing your insurance policies.\r\n"
		        + "\r\n"
		        + "At My Policy, we believe that managing insurance policies should be easy and hassle-free. Our platform simplifies the process of organizing, tracking, and managing your insurance policies, making sure you never miss a payment or a renewal.\r\n"
		        + "\r\n"
		        + "As a new member of our community, you can access a range of features that help you stay on top of your insurance policies. Some of these features include:\r\n"
		        + "\r\n"
		        + "Centralized policy management: All your insurance policies, in one place, with easy access.\r\n"
		        + "\r\n"
		        + "Policy reminders: Set reminders for policy renewal dates, payment due dates, and more.\r\n"
		        + "\r\n"
		        + "Personalized dashboard: Track your insurance policies' status, premiums, and more.\r\n"
		        + "\r\n"
		        + "Comparison tools: Compare policies from different providers and make an informed decision.\r\n"
		        + "\r\n"
		        + "Expert guidance: Access to expert advice and recommendations on policy selection, coverage options, and more.\r\n"
		        + "\r\n"
		        + "We are committed to making your experience with My Policy as smooth and efficient as possible. If you have any questions or need assistance, please do not hesitate to reach out to us at arjunvetal.s.6065@mypolicy.com.\r\n"
		        + "\r\n"
		        + "Thank you again for choosing My Policy. We look forward to helping you manage your insurance policies with ease.\r\n"
		        + "\r\n"
		        + "Best regards,\r\n"
		        + "\r\n"
		        + "Arjun Vetal\r\n"
		        + "\r\n"
		        + "My Policy Team.", " Welcome to My Policy!");
		
		return Response.success(result);
	}

	@GetMapping("/region")
	public ResponseEntity<?> findAllRegion() {
		List<Region> result = regionService.findAllRegions();
		return Response.success(result);
	}

	@GetMapping("/yearlypremium/{id}/{age}")
	public ResponseEntity<?> findYearlyPremium(@PathVariable("id") int id, @PathVariable("age") int age) {
		int d = age % 10;
		age = age - d;
		AgePremium result = agePremiumService.findByTermIdAndAge(id, age);
		return Response.success(result);
	}
}
