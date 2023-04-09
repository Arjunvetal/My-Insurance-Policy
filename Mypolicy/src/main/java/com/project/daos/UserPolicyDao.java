package com.project.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.project.entities.UserPolicy;

public interface UserPolicyDao extends JpaRepository<UserPolicy	, Integer> {

	List<UserPolicy> findByRegionId(int regionId);
	
	List<UserPolicy> findByUserId(int id);
	
	UserPolicy findByUserPolicyId(int id);

	@Modifying
	@Query("UPDATE UserPolicy p set p.verificationComment=?2, p.verificationStatus=?3 WHERE p.userPolicyId = ?1")
	int update(int id, String comment, String status);
}
