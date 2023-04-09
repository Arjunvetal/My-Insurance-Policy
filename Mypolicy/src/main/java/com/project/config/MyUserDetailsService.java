package com.project.config;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.daos.LicOfficerDao;
import com.project.daos.UserDao;
import com.project.entities.LicOfficer;
import com.project.entities.User;

@Transactional
@Service
public class MyUserDetailsService implements UserDetailsService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private LicOfficerDao officerDao;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		
			User user = userDao.findByEmailId(email);
			if (user == null) {
				LicOfficer officer = officerDao.findByEmailId(email);
				if (officer == null)	
					throw new UsernameNotFoundException(email+" NOT FOUND");
				return new MyUser(officer);
			}
			
			MyUser usr=new MyUser(user);
			
		return  usr;
	}

}
