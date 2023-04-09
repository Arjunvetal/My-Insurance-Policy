package com.project.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.daos.TypeOfPolicyDao;
import com.project.entities.TypeOfPolicy;

@Transactional
@Service
public class TypeOfPolicyServiceImpl {

	@Autowired
	TypeOfPolicyDao typeOfPolicyDao;
	
	public TypeOfPolicy addTypeOfPolicy(TypeOfPolicy typeOfPolicy ) {
			TypeOfPolicy savedTypeOfPolicy = typeOfPolicyDao.save(typeOfPolicy);
			return savedTypeOfPolicy;
	}
	
	public int editTypeOfPolicy(int policyId, TypeOfPolicy typeOfPolicy) {
		String name = typeOfPolicy.getName();
		double minSumAssured = typeOfPolicy.getMinSumAssured();
		double maxSumAssured = typeOfPolicy.getMaxSumAssured();
		String policyDescription = typeOfPolicy.getPolicyDescription();
		int result = typeOfPolicyDao.editTypeOfPolicy(policyId, name, minSumAssured, maxSumAssured, policyDescription);
		return result;
	}
	
	public  List<TypeOfPolicy> displayAll() {
		List<TypeOfPolicy> policies = typeOfPolicyDao.findAll();
		return policies;
	}
	
	public TypeOfPolicy findById(int id) {
		  TypeOfPolicy policies = typeOfPolicyDao.findByPolicyId(id);
		return policies;
	}
	
}
