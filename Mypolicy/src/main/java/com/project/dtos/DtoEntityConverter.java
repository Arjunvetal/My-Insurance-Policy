package com.project.dtos;

import org.springframework.stereotype.Component;

import com.project.entities.AgePremium;
import com.project.entities.PolicyPayment;
import com.project.entities.PolicyTerm;
import com.project.entities.TypeOfPolicy;
import com.project.entities.User;
import com.project.entities.UserPolicy;

@Component
public class DtoEntityConverter {

	public UserDTO toUserDto(User user) {
		UserDTO dto=new UserDTO();
		dto.setId(user.getId());
		dto.setName(user.getName());
		dto.setEmailId(user.getEmailId());
		dto.setPassword(user.getPassword());
		
		return dto;
	}
	
	public User toUserEntity(UserDTO UserDto) {
		User entity=new User();
		entity.setId(UserDto.getId());
		entity.setName(UserDto.getName());
		entity.setEmailId(UserDto.getEmailId());
		entity.setPassword(UserDto.getPassword());
		
		return entity;
	}
	
	public PolicyTerm toPolicyTermEntity(PolicyTermDTO dto) {
		if(dto == null)
			return null;
		PolicyTerm entity = new PolicyTerm();
		entity.setTermId(dto.getTermId());
		entity.setPolicyTerm(dto.getPolicyTerm());
		entity.setPayableTerm(dto.getPayableTerm());
		entity.setAgeIn(dto.getAgeIn());
		entity.setAgeMax(dto.getAgeMax());
		entity.setTypeOfPolicy(new TypeOfPolicy(dto.getPolicyId()));
		return entity;
	}
	
	public PolicyPayment toPolicyPayment(PolicyPaymentDTO dto) {
		if(dto == null)
			return null;
		PolicyPayment entity = new PolicyPayment();
		entity.setPaymentId(dto.getPaymentId());
		entity.setModeOfPaymentMonth(dto.getModeOfPaymentMonth());
		entity.setGracePeriod(dto.getGracePeriod());
		entity.setRebate(dto.getRebate());
		entity.setTypeOfPolicy(new TypeOfPolicy(dto.getPolicyId()));
		return entity;
	}
	
	public AgePremium toAgePremium(AgePremiumDTO dto) {
		if(dto == null)
			return null;
		AgePremium entity = new AgePremium();
		entity.setAge(dto.getAge());
		entity.setYearlyPremium(dto.getYearlyPremium());
		entity.setPolicyTerm(new PolicyTerm(dto.getTermId()));
		return entity;
	}
	
	
	public UserPolicy toUserPolicyEntity(UserPolicyDto dto) {
		if(dto == null)
			return null;
		UserPolicy entity = new UserPolicy();
		entity.setAge(dto.getAge());
		entity.setSumAssured(dto.getSumAssured());
		entity.setPremiumType(dto.getPremiumType());
		entity.setPolicyTerm(dto.getPolicyTerm());
		entity.setPolicyName(dto.getPolicyName());
		entity.setPolicyHolderName(dto.getPolicyHolderName());
		entity.setPolicyHolderRelation(dto.getPolicyHolderRelation());
		entity.setGender(dto.getGender());
		entity.setNominee(dto.getNominee());
		entity.setPremiumAmount(dto.getPremiumAmount());
		entity.setPaybleTerm(dto.getPaybleTerm());
		entity.setRegionId(dto.getRegionId());
		entity.setUser(new User(dto.getUserId()));
		return entity;
	}
}
