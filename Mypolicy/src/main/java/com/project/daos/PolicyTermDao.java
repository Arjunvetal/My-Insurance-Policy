package com.project.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.project.entities.PolicyTerm;

public interface PolicyTermDao extends JpaRepository<PolicyTerm, Integer>{

	PolicyTerm findByTermId(int termId);

	//@Query(value = "SELECT * FROM policy_term WHERE policy_id = ?1", nativeQuery = true)
	List<PolicyTerm> findByTypeOfPolicyPolicyId(int policyId);
	
	@Modifying
	@Query("UPDATE PolicyTerm p SET p.policyTerm = ?2, p.payableTerm = ?3, p.ageIn = ?4, p.ageMax = ?5 WHERE p.termId = ?1")
	int editPolicyTerm(int termId, int policyTerm, int payableTerm, int ageIn, int ageMax);
	
}
