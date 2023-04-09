package com.project.services;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.daos.LicOfficerDao;
import com.project.dtos.Credentials;
import com.project.entities.LicOfficer;

@Transactional
@Service
public class LicOfficerServiceImpl {

	@Autowired
	private LicOfficerDao licOfficerDao;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public LicOfficer loginOfficer(Credentials cred) {
		String raw = cred.getPassword();
		LicOfficer officer = licOfficerDao.findByEmailId(cred.getEmail());
		if (passwordEncoder.matches(raw, officer.getPassword())) {
			return officer;
		}
		return null;
	}
	
	public int addOfficer(LicOfficer officer) {
		String pass = officer.getPassword();
		String encPass = passwordEncoder.encode(pass);
		officer.setPassword(encPass);
		LicOfficer savedOfficer = licOfficerDao.save(officer);
		return savedOfficer.getOfficerId();
	}
}
