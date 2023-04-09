package com.project.entities;

import java.sql.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;

@Entity
public class LicOfficer {
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int officerId;
	private String name;
	private String emailId;
	private String password;
	private String mobileNo;
	private String gender;
	private Date dob;
	private Date joiningDate;
	private int regionId;
	@Column(name="role")
	private String authorities;

	public LicOfficer() {
		super();
	}

	
	public LicOfficer(int officerId, String name, String emailId, String password, String mobileNo, String gender,
			Date dob, Date joiningDate, int regionId, String authorities) {
		super();
		this.officerId = officerId;
		this.name = name;
		this.emailId = emailId;
		this.password = password;
		this.mobileNo = mobileNo;
		this.gender = gender;
		this.dob = dob;
		this.joiningDate = joiningDate;
		this.regionId = regionId;
		this.authorities = authorities;
	}


	public String getAuthorities() {
		return authorities;
	}


	public void setAuthorities(String authorities) {
		this.authorities = authorities;
	}


	public int getOfficerId() {
		return officerId;
	}

	public void setOfficerId(int officerId) {
		this.officerId = officerId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public Date getJoiningDate() {
		return joiningDate;
	}

	public void setJoiningDate(Date joiningDate) {
		this.joiningDate = joiningDate;
	}

	public int getRegionId() {
		return regionId;
	}

	public void setRegionId(int regionId) {
		this.regionId = regionId;
	}


	@Override
	public String toString() {
		return "LicOfficer [officerId=" + officerId + ", name=" + name + ", emailId=" + emailId + ", password="
				+ password + ", mobileNo=" + mobileNo + ", gender=" + gender + ", dob=" + dob + ", joiningDate="
				+ joiningDate + ", regionId=" + regionId + ", authorities=" + authorities + "]";
	}


}
