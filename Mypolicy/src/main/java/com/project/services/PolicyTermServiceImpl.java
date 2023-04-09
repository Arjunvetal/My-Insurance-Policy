package com.project.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.daos.PolicyTermDao;
import com.project.dtos.DtoEntityConverter;
import com.project.dtos.PolicyTermDTO;
import com.project.entities.PolicyTerm;

@Transactional
@Service
public class PolicyTermServiceImpl {

	@Autowired
	PolicyTermDao policyTermDao;
	
	@Autowired
	DtoEntityConverter converter;
	
	public PolicyTerm findByTermId(int termId) {
		return policyTermDao.findByTermId(termId);
	}
	
	public PolicyTerm addPolicyTerm (int policyId, PolicyTermDTO policyTermDto) {
		policyTermDto.setPolicyId(policyId);
		PolicyTerm policyTerm = converter.toPolicyTermEntity(policyTermDto);
		PolicyTerm savedPolicyTerm = policyTermDao.save(policyTerm);
		return savedPolicyTerm;
	}
	
	public int editPolicyTerm(int termId, PolicyTerm policyTermobj) {
		int policyTerm = policyTermobj.getPolicyTerm();
		int payableTerm = policyTermobj.getPayableTerm();
		int ageIn = policyTermobj.getAgeIn();
		int ageMax = policyTermobj.getAgeMax();
		int result = policyTermDao.editPolicyTerm(termId, policyTerm, payableTerm, ageIn, ageMax);
		return result;
	}

	public List<PolicyTerm> findByPolicyId(int id) {
		// TODO Auto-generated method stub
		List<PolicyTerm> term = policyTermDao.findByTypeOfPolicyPolicyId(id);
		return term;
	}
	
}
