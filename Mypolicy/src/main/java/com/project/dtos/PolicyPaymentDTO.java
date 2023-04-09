package com.project.dtos;

public class PolicyPaymentDTO {

	private int paymentId;
	private int modeOfPaymentMonth;
	private int gracePeriod;
	private double rebate;
	private int policyId;
	
	
	
	public PolicyPaymentDTO() {
		super();
		// TODO Auto-generated constructor stub
	}


	public PolicyPaymentDTO(int paymentId, int modeOfPaymentMonth, int gracePeriod, double rebate, int policyId) {
		super();
		this.paymentId = paymentId;
		this.modeOfPaymentMonth = modeOfPaymentMonth;
		this.gracePeriod = gracePeriod;
		this.rebate = rebate;
		this.policyId = policyId;
	}


	public int getPaymentId() {
		return paymentId;
	}


	public void setPaymentId(int paymentId) {
		this.paymentId = paymentId;
	}


	public int getModeOfPaymentMonth() {
		return modeOfPaymentMonth;
	}


	public void setModeOfPaymentMonth(int modeOfPaymentMonth) {
		this.modeOfPaymentMonth = modeOfPaymentMonth;
	}


	public int getGracePeriod() {
		return gracePeriod;
	}


	public void setGracePeriod(int gracePeriod) {
		this.gracePeriod = gracePeriod;
	}


	public double getRebate() {
		return rebate;
	}


	public void setRebate(double rebate) {
		this.rebate = rebate;
	}


	public int getPolicyId() {
		return policyId;
	}


	public void setPolicyId(int policyId) {
		this.policyId = policyId;
	}


	@Override
	public String toString() {
		return "PolicyPaymentDTO [paymentId=" + paymentId + ", modeOfPaymentMonth=" + modeOfPaymentMonth
				+ ", gracePeriod=" + gracePeriod + ", rebate=" + rebate + ", policyId=" + policyId + "]";
	}
	
}
