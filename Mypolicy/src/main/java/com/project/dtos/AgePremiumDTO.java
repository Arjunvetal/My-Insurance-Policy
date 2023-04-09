package com.project.dtos;

public class AgePremiumDTO {

	private int agePremiumId;
	private int age;
	private double yearlyPremium;
	private int termId;
	
	
	
	public AgePremiumDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public AgePremiumDTO(int agePremiumId, int age, double yearlyPremium, int termId) {
		super();
		this.agePremiumId = agePremiumId;
		this.age = age;
		this.yearlyPremium = yearlyPremium;
		this.termId = termId;
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

	public int getTermId() {
		return termId;
	}

	public void setTermId(int termId) {
		this.termId = termId;
	}

	@Override
	public String toString() {
		return "AgePremiumDTO [agePremiumId=" + agePremiumId + ", age=" + age + ", yearlyPremium=" + yearlyPremium
				+ ", termId=" + termId + "]";
	}
	
}
