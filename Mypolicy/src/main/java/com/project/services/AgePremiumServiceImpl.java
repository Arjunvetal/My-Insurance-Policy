package com.project.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.daos.AgePremiumDao;
import com.project.dtos.AgePremiumDTO;
import com.project.dtos.DtoEntityConverter;
import com.project.entities.AgePremium;

@Transactional
@Service
public class AgePremiumServiceImpl {
	@Autowired
	AgePremiumDao agePremiumDao;
	
	@Autowired
	DtoEntityConverter converter;
	
	public AgePremium findByTermIdAndAge(int id, int age) {
		AgePremium premium = agePremiumDao.findByPolicyTermTermIdAndAge(id, age);
		return premium;
	}
	
	public int addAgePremium(int termId, AgePremiumDTO agePremiumDTO) {
		agePremiumDTO.setTermId(termId);
		AgePremium agePremium = converter.toAgePremium(agePremiumDTO);
		agePremiumDao.save(agePremium);
		return termId;
	}
	
	public List<AgePremium> findByTermId(List<Integer> termIds) {
		List<AgePremium> agePremiumList = new ArrayList<>();
		for (int termId : termIds) 
		{ 
			agePremiumList.addAll(agePremiumDao.findByPolicyTermTermId(termId));
		}
		return agePremiumList;
	}
	
	public AgePremium findByAgePremiumId(int agePremiumId) {
		return agePremiumDao.getByAgePremiumId(agePremiumId);
	}
	
	public int editAgePremium(int agePremiumId, AgePremium agePremium) {
		int age = agePremium.getAge();
		double yearlyPremium = agePremium.getYearlyPremium();
		int result = agePremiumDao.editAgePremium(agePremiumId, age, yearlyPremium);
		return result;
	}
}
