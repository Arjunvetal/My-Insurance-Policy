package com.project.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class AgePremium {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int agePremiumId;
	private int age;
	private double yearlyPremium;
	@ManyToOne
	@JoinColumn(name = "termId")
	private PolicyTerm policyTerm;
	
	public AgePremium() {
		super();
	}


	public AgePremium(int agePremiumId, int age, double yearlyPremium, PolicyTerm policyTerm) {
		super();
		this.agePremiumId = agePremiumId;
		this.age = age;
		this.yearlyPremium = yearlyPremium;
		this.policyTerm = policyTerm;
	}


	public int getAgePremiumId() {
		return agePremiumId;
	}


	public void setAgePremiumId(int agePremiumId) {
		this.agePremiumId = agePremiumId;
	}


	public int getAge() {
		return age;
	}


	public void setAge(int age) {
		this.age = age;
	}


	public double getYearlyPremium() {
		return yearlyPremium;
	}


	public void setYearlyPremium(double yearlyPremium) {
		this.yearlyPremium = yearlyPremium;
	}


	public PolicyTerm getPolicyTerm() {
		return policyTerm;
	}


	public void setPolicyTerm(PolicyTerm policyTerm) {
		this.policyTerm = policyTerm;
	}


	@Override
	public String toString() {
		return "AgePremium [agePremiumId=" + agePremiumId + ", age=" + age + ", yearlyPremium=" + yearlyPremium
				+ ", policyTerm=" + policyTerm + "]";
	}
	
}