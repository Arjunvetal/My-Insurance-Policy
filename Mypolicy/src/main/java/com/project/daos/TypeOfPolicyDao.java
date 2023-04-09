package com.project.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.project.entities.TypeOfPolicy;

public interface TypeOfPolicyDao extends JpaRepository<TypeOfPolicy, Integer> {

	TypeOfPolicy findByPolicyId(int PolicyId);

	@Modifying
	@Query("UPDATE TypeOfPolicy p SET p.name = ?2, p.minSumAssured = ?3, p.maxSumAssured = ?4, p.policyDescription = ?5 WHERE p.policyId = ?1")
	int editTypeOfPolicy(int policyId, String name, double minSumAssured, double maxSumAssured, String policyDescription);
}
