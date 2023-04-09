package com.project.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class PolicyTerm {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int termId;
	private int policyTerm;
	private int payableTerm;
	private int ageIn;
	private int ageMax;
	@ManyToOne
	@JoinColumn(name="policy_id",nullable = false)
	@JsonIgnore
	private TypeOfPolicy typeOfPolicy;

	public PolicyTerm() {
		super();
	}

	public PolicyTerm(int termId) {
		this.termId = termId;
	}

	

	public PolicyTerm(int termId, int policyTerm, int payableTerm, int ageIn, int ageMax, TypeOfPolicy typeOfPolicy) {
		super();
		this.termId = termId;
		this.policyTerm = policyTerm;
		this.payableTerm = payableTerm;
		this.ageIn = ageIn;
		this.ageMax = ageMax;
		this.typeOfPolicy = typeOfPolicy;
	}

	public int getTermId() {
		return termId;
	}

	public void setTermId(int termId) {
		this.termId = termId;
	}

	public int getPolicyTerm() {
		return policyTerm;
	}

	public void setPolicyTerm(int policyTerm) {
		this.policyTerm = policyTerm;
	}

	public int getPayableTerm() {
		return payableTerm;
	}

	public void setPayableTerm(int payableTerm) {
		this.payableTerm = payableTerm;
	}

	public int getAgeIn() {
		return ageIn;
	}

	public void setAgeIn(int ageIn) {
		this.ageIn = ageIn;
	}

	public int getAgeMax() {
		return ageMax;
	}

	public void setAgeMax(int ageMax) {
		this.ageMax = ageMax;
	}

	public TypeOfPolicy getTypeOfPolicy() {
		return typeOfPolicy;
	}

	public void setTypeOfPolicy(TypeOfPolicy typeOfPolicy) {
		this.typeOfPolicy = typeOfPolicy;
	}

	@Override
	public String toString() {
		return "PolicyTerm [termId=" + termId + ", policyTerm=" + policyTerm + ", payableTerm=" + payableTerm
				+ ", ageIn=" + ageIn + ", ageMax=" + ageMax + ", typeOfPolicy=" + typeOfPolicy + "]";
	}

	

}
