package com.project.daos;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.project.entities.PolicyPayment;

public interface PolicyPaymentDao extends JpaRepository<PolicyPayment, Integer>{

	PolicyPayment findByPaymentId(int paymentId);
	
	List<PolicyPayment> findByTypeOfPolicyPolicyId(int policyId);
	
	@Modifying
	@Query("UPDATE PolicyPayment pp SET pp.modeOfPaymentMonth = ?2, pp.gracePeriod = ?3, pp.rebate = ?4 WHERE pp.paymentId = ?1")
	int editPolicyPayment(int paymentId, int modeOfPaymentMonth, int gracePeriod, double rebate);
}
