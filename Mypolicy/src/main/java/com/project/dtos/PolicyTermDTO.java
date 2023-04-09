package com.project.dtos;


public class PolicyTermDTO {
	
	private int termId;
	private int policyTerm;
	private int payableTerm;
	private int ageIn;
	private int ageMax;
	private int policyId;
	
	
	
	public PolicyTermDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PolicyTermDTO(int termId, int policyTerm, int payableTerm, int ageIn, int ageMax, int policyId) {
		super();
		this.termId = termId;
		this.policyTerm = policyTerm;
		this.payableTerm = payableTerm;
		this.ageIn = ageIn;
		this.ageMax = ageMax;
		this.policyId = policyId;
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

	public int getPolicyId() {
		return policyId;
	}

	public void setPolicyId(int policyId) {
		this.policyId = policyId;
	}

	@Override
	public String toString() {
		return "PolicyTermDTO [termId=" + termId + ", policyTerm=" + policyTerm + ", payableTerm=" + payableTerm
				+ ", ageIn=" + ageIn + ", ageMax=" + ageMax + ", policyId=" + policyId + "]";
	}

}
