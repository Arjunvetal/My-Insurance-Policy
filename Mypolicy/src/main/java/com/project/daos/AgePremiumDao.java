package com.project.daos;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.project.entities.AgePremium;

public interface AgePremiumDao extends JpaRepository<AgePremium,Integer>{
	AgePremium getByAgePremiumId(int agePremiumId);

	AgePremium findByPolicyTermTermIdAndAge(int id, int age);
	
	List<AgePremium> findByPolicyTermTermId(int termId);
	
	@Modifying
	@Query("UPDATE AgePremium ap SET ap.age = ?2, ap.yearlyPremium = ?3 WHERE ap.agePremiumId = ?1")
	int editAgePremium(int agePremiumId, int age, double yearlyPremium);
}
