package com.project.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.daos.PolicyPaymentDao;
import com.project.dtos.DtoEntityConverter;
import com.project.dtos.PolicyPaymentDTO;
import com.project.entities.PolicyPayment;
import com.project.entities.PolicyTerm;

@Transactional
@Service
public class PolicyPaymentServiceImpl {
	@Autowired
	PolicyPaymentDao policyPaymentDao;
	
	@Autowired
	DtoEntityConverter converter;
	
	public int addPolicyPayment(int policyId, PolicyPaymentDTO policyPaymentDto) {
		policyPaymentDto.setPolicyId(policyId);
		PolicyPayment policyPayment = converter.toPolicyPayment(policyPaymentDto);
		policyPaymentDao.save(policyPayment);
		return policyId;
	}
	
	public List<PolicyPayment> getByPolicyId(int policyId) {
		List<PolicyPayment> PolicyPayments = policyPaymentDao.findByTypeOfPolicyPolicyId(policyId);
		return PolicyPayments;
	}
	
	public PolicyPayment getPolicyPaymentById(int paymentId) {
		PolicyPayment policyPayment = policyPaymentDao.findByPaymentId(paymentId);
		return policyPayment;
	}
	
	public int editPolicyPayment(int termId, PolicyPayment policyPayment) {
		int modeOfPaymentMonth = policyPayment.getModeOfPaymentMonth();
		int gracePeriod = policyPayment.getGracePeriod();
		double rebate = policyPayment.getRebate();
		int result = policyPaymentDao.editPolicyPayment(termId, modeOfPaymentMonth, gracePeriod, rebate);
		return result;
	}
}
