package com.project.dtos;

public class UserPolicyDto {

	private int age;
	private double sumAssured;
	private int premiumType;
	private int policyTerm;
	private String policyName;
	private String policyHolderName;
	private String policyHolderRelation;
	private String gender;
	private String nominee;
	private double premiumAmount;
	private int paybleTerm;
	private int regionId;
	private int userId;

	public UserPolicyDto(int age, double sumAssured, int premiumType, int policyTerm, String policyName,
			String policyHolderName, String policyHolderRelation, String gender, String nominee, double premiumAmount,
			int paybleTerm, int regionId, int userId) {
		super();
		this.age = age;
		this.sumAssured = sumAssured;
		this.premiumType = premiumType;
		this.policyTerm = policyTerm;
		this.policyName = policyName;
		this.policyHolderName = policyHolderName;
		this.policyHolderRelation = policyHolderRelation;
		this.gender = gender;
		this.nominee = nominee;
		this.premiumAmount = premiumAmount;
		this.paybleTerm = paybleTerm;
		this.regionId = regionId;
		this.userId = userId;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public double getSumAssured() {
		return sumAssured;
	}

	public void setSumAssured(double sumAssured) {
		this.sumAssured = sumAssured;
	}

	public int getPremiumType() {
		return premiumType;
	}

	public void setPremiumType(int premiumType) {
		this.premiumType = premiumType;
	}

	public int getPolicyTerm() {
		return policyTerm;
	}

	public void setPolicyTerm(int policyTerm) {
		this.policyTerm = policyTerm;
	}

	public String getPolicyName() {
		return policyName;
	}

	public void setPolicyName(String policyName) {
		this.policyName = policyName;
	}

	public String getPolicyHolderName() {
		return policyHolderName;
	}

	public void setPolicyHolderName(String policyHolderName) {
		this.policyHolderName = policyHolderName;
	}

	public String getPolicyHolderRelation() {
		return policyHolderRelation;
	}

	public void setPolicyHolderRelation(String policyHolderRelation) {
		this.policyHolderRelation = policyHolderRelation;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getNominee() {
		return nominee;
	}

	public void setNominee(String nominee) {
		this.nominee = nominee;
	}

	public double getPremiumAmount() {
		return premiumAmount;
	}

	public void setPremiumAmount(double premiumAmount) {
		this.premiumAmount = premiumAmount;
	}

	public int getPaybleTerm() {
		return paybleTerm;
	}

	public void setPaybleTerm(int paybleTerm) {
		this.paybleTerm = paybleTerm;
	}

	public int getRegionId() {
		return regionId;
	}

	public void setRegionId(int regionId) {
		this.regionId = regionId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

}
