package com.project.entities;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class TypeOfPolicy {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int policyId;
	private String name;
	private double minSumAssured;
	private double maxSumAssured;
	private String policyDescription;

	public TypeOfPolicy(int policyId, String name, double minSumAssured, double maxSumAssured,
			String policyDescription) {
		super();
		this.policyId = policyId;
		this.name = name;
		this.minSumAssured = minSumAssured;
		this.maxSumAssured = maxSumAssured;
		this.policyDescription = policyDescription;
	}

	public TypeOfPolicy() {
		super();
	}
	
	public TypeOfPolicy(int policyId) {
		this.policyId = policyId;
	}

	public int getPolicyId() {
		return policyId;
	}

	public void setPolicyId(int policyId) {
		this.policyId = policyId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getMinSumAssured() {
		return minSumAssured;
	}

	public void setMinSumAssured(double minSumAssured) {
		this.minSumAssured = minSumAssured;
	}

	public double getMaxSumAssured() {
		return maxSumAssured;
	}

	public void setMaxSumAssured(double maxSumAssured) {
		this.maxSumAssured = maxSumAssured;
	}

	public String getPolicyDescription() {
		return policyDescription;
	}

	public void setPolicyDescription(String policyDescription) {
		this.policyDescription = policyDescription;
	}

	@Override
	public String toString() {
		return "TypeOfPolicy [policyId=" + policyId + ", name=" + name + ", minSumAssured=" + minSumAssured
				+ ", maxSumAssured=" + maxSumAssured + ", policyDescription=" + policyDescription + "]";
	}

	
}
