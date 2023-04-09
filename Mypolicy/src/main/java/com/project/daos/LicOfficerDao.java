package com.project.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entities.LicOfficer;

public interface LicOfficerDao extends JpaRepository<LicOfficer, Integer> {

	LicOfficer findByEmailIdAndPassword(String emailId, String password);
	
	LicOfficer findByEmailId(String emailId);
}
