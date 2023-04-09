package com.project.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class PolicyPayment {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int paymentId;
	private int modeOfPaymentMonth;
	private int gracePeriod;
	private double rebate;
	@ManyToOne
	@JoinColumn(name = "policyId")
	@JsonIgnore
	private TypeOfPolicy typeOfPolicy;
	
	public PolicyPayment() {
		super();
	}
	
	public PolicyPayment(int paymentId, int modeOfPaymentMonth, int gracePeriod, double rebate) {
		super();
		this.paymentId = paymentId;
		this.modeOfPaymentMonth = modeOfPaymentMonth;
		this.gracePeriod = gracePeriod;
		this.rebate = rebate;
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

	public TypeOfPolicy getTypeOfPolicy() {
		return typeOfPolicy;
	}

	public void setTypeOfPolicy(TypeOfPolicy typeOfPolicy) {
		this.typeOfPolicy = typeOfPolicy;
	}

	@Override
	public String toString() {
		return "policyPayment [paymentId=" + paymentId + ", modeOfPaymentMonth=" + modeOfPaymentMonth + ", gracePeriod="
				+ gracePeriod + ", rebate=" + rebate + ", typeOfPolicy=" + typeOfPolicy + "]";
	}
	
}
