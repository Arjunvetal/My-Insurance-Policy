package com.project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.config.JwtUtil;
import com.project.config.MyUser;
import com.project.daos.LicOfficerDao;
import com.project.daos.UserDao;
import com.project.dtos.Credentials;
import com.project.dtos.Response;
import com.project.entities.LicOfficer;
import com.project.entities.User;
import com.project.services.LicOfficerServiceImpl;

@CrossOrigin
@RestController
public class OfficerController {

	@Autowired
	private LicOfficerServiceImpl licOfficerServiceImpl;

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private LicOfficerDao officerDao;

	@Autowired
	private AuthenticationManager authManager;

	@Autowired
	private JwtUtil jwtUtils;
	
	@PostMapping("/admin/signin")
	public ResponseEntity<?> signIn(@RequestBody Credentials cred) {
		LicOfficer officer = officerDao.findByEmailId(cred.getEmail());
		//System.out.println("admin data ==>"+officer);
		return Response.success(officer);
	}

	@PostMapping("/authenticate/officer/signin")
	public ResponseEntity<?> signInWithToken(@RequestBody Credentials cred) {
		try {
			Authentication auth = new UsernamePasswordAuthenticationToken(cred.getEmail(), cred.getPassword());
			auth = authManager.authenticate(auth);
			MyUser user = (MyUser) auth.getPrincipal();
			String token = jwtUtils.generateToken(user);
			return Response.success(token);
		} catch (BadCredentialsException e) {
			return Response.error("Error"+e);
		}
	}

	@PostMapping("/officer/signup")
	public ResponseEntity<?> signUp(@RequestBody LicOfficer officer) {
		User u = userDao.findByEmailId(officer.getEmailId());
		if (u != null) {
			return Response.error("EmailId Alredy exist");
		}
		officer.setAuthorities("ROLE_ADMIN");
		int result = licOfficerServiceImpl.addOfficer(officer);
		if (result == 0) {
			return Response.error("Signup Failed");
		}
		return Response.success(result);
	}

}
