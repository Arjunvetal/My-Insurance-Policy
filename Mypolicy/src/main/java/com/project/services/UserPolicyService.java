package com.project.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.daos.UserPolicyDao;
import com.project.dtos.DtoEntityConverter;
import com.project.dtos.UserPolicyDto;
import com.project.entities.UserPolicy;

@Transactional
@Service
public class UserPolicyService {

	@Autowired
	private UserPolicyDao userPolicyDao;
	
	@Autowired
	private DtoEntityConverter converter;
	
	public List<UserPolicy> findUserByRegionId(int id) {
		List<UserPolicy> policy = userPolicyDao.findByRegionId(id);
		return policy;
	}
	
	public int addNewPolicy(UserPolicyDto policydto) {
		UserPolicy policy = converter.toUserPolicyEntity(policydto);
		policy.setVerificationComment("In Progress");
		policy.setVerificationStatus("Pending");
		policy.setPolicyDate(LocalDate.now());
		policy.setMaturityDate(LocalDate.now().plusYears(policy.getPolicyTerm()));
		policy.setPaidPremiums(1);
		UserPolicy addedPolicy=userPolicyDao.save(policy);
		if (addedPolicy == null) {
			return 0;
		}
		System.out.println(addedPolicy.getUserPolicyId());
		return addedPolicy.getUserPolicyId();
	}
	
	
	public int approvePolicy(int id) {
		// UserPolicy policy = userPolicyDao.findByUserPolicyId(id);
		String comment  = "Document Verified";
		String status = "Approved";
		int up = userPolicyDao.update(id, comment, status);
		return up;
	}
	
	public int rejectPolicy(int id, String comment) {
		// UserPolicy policy = userPolicyDao.findByUserPolicyId(id);
		String status = "Rejected";
		int up = userPolicyDao.update(id, comment, status);
		return up;
	}
	
	public List<UserPolicy> findByUserId(int id) {
		  List<UserPolicy> policies = userPolicyDao.findByUserId(id);
		return policies;
	}

	public UserPolicy findByUserPolicyId(int id) {
		UserPolicy userPolicy = userPolicyDao.findByUserPolicyId(id);
		return userPolicy ;
	}

	public UserPolicy findidproofbyid(int id) {
		UserPolicy u = userPolicyDao.getById(id);
		return u;
	}


}
