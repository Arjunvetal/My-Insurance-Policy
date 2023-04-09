package com.project.entities;

import java.time.LocalDate;
import java.util.Arrays;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class UserPolicy {
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int userPolicyId;
	private int age;
	private double sumAssured;
	// check
	private int premiumType;
	private LocalDate policyDate;
	private int policyTerm;
	private int paidPremiums;
	private String policyName;
	private String verificationStatus;
	private String verificationComment;
	@Lob
	private byte[] idProof;
	private String policyHolderName;
	private String policyHolderRelation;
	private String gender;
	private String nominee;
	private double premiumAmount;
	private LocalDate maturityDate;
	private int paybleTerm;
	private int regionId;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "userId")
	@JsonIgnore
	private User user;

	public UserPolicy() {
		super();
	}


	public UserPolicy(int userPolicyId, int age, double sumAssured, int premiumType, LocalDate policyDate,
			int policyTerm, int paidPremiums, String policyName, String verificationStatus, String verificationComment,
			byte[] idProof, String policyHolderName, String policyHolderRelation, String gender, String nominee,
			double premiumAmount, LocalDate maturityDate, int paybleTerm, int regionId, User user) {
		super();
		this.userPolicyId = userPolicyId;
		this.age = age;
		this.sumAssured = sumAssured;
		this.premiumType = premiumType;
		this.policyDate = policyDate;
		this.policyTerm = policyTerm;
		this.paidPremiums = paidPremiums;
		this.policyName = policyName;
		this.verificationStatus = verificationStatus;
		this.verificationComment = verificationComment;
		this.idProof = idProof;
		this.policyHolderName = policyHolderName;
		this.policyHolderRelation = policyHolderRelation;
		this.gender = gender;
		this.nominee = nominee;
		this.premiumAmount = premiumAmount;
		this.maturityDate = maturityDate;
		this.paybleTerm = paybleTerm;
		this.regionId = regionId;
		this.user = user;
	}




	@Override
	public String toString() {
		return "UserPolicy [userPolicyId=" + userPolicyId + ", age=" + age + ", sumAssured=" + sumAssured
				+ ", premiumType=" + premiumType + ", policyDate=" + policyDate + ", policyTerm=" + policyTerm
				+ ", paidPremiums=" + paidPremiums + ", policyName=" + policyName + ", verificationStatus="
				+ verificationStatus + ", verificationComment=" + verificationComment + ", idProof="
				+ Arrays.toString(idProof) + ", policyHolderName=" + policyHolderName + ", policyHolderRelation="
				+ policyHolderRelation + ", gender=" + gender + ", nominee=" + nominee + ", premiumAmount="
				+ premiumAmount + ", maturityDate=" + maturityDate + ", paybleTerm=" + paybleTerm + ", regionId="
				+ regionId + ", user=" + user + "]";
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public int getPolicyTerm() {
		return policyTerm;
	}

	public void setPolicyTerm(int policyTerm) {
		this.policyTerm = policyTerm;
	}

	public int getPaybleTerm() {
		return paybleTerm;
	}

	public void setPaybleTerm(int paybleTerm) {
		this.paybleTerm = paybleTerm;
	}

	public String getPolicyName() {
		return policyName;
	}

	public void setPolicyName(String policyName) {
		this.policyName = policyName;
	}

	public int getUserPolicyId() {
		return userPolicyId;
	}

	public void setUserPolicyId(int userPolicyId) {
		this.userPolicyId = userPolicyId;
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

	public LocalDate getPolicyDate() {
		return policyDate;
	}

	public void setPolicyDate(LocalDate localDate) {
		this.policyDate = localDate;
	}

	public int getPaidPremiums() {
		return paidPremiums;
	}

	public void setPaidPremiums(int paidPremiums) {
		this.paidPremiums = paidPremiums;
	}

	public String getVerificationStatus() {
		return verificationStatus;
	}

	public void setVerificationStatus(String verificationStatus) {
		this.verificationStatus = verificationStatus;
	}

	public String getVerificationComment() {
		return verificationComment;
	}

	public void setVerificationComment(String verificationComment) {
		this.verificationComment = verificationComment;
	}

	public byte[] getIdProof() {
		return idProof;
	}

	public void setIdProof(byte[] idProof) {
		this.idProof = idProof;
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

	public LocalDate getMaturityDate() {
		return maturityDate;
	}

	public void setMaturityDate(LocalDate localDate) {
		this.maturityDate = localDate;
	}

	public int getRegionId() {
		return regionId;
	}

	public void setRegionId(int regionId) {
		this.regionId = regionId;
	}

//	public int getPolicyId() {
//		return policyId;
//	}
//
//	public void setPolicyId(int policyId) {
//		this.policyId = policyId;
//	}
//
//	public int getTermId() {
//		return termId;
//	}
//
//	public void setTermId(int termId) {
//		this.termId = termId;
//	}

}
