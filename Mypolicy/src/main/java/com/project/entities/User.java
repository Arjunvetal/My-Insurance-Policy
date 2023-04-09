package com.project.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class User {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int id;
	private String emailId;
	
	
	private String password;
	private String mobile;
	private String name;
	private String gender;
	@Column(name = "role")
	private String authorities;
	@OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
	private List<UserPolicy> userPolicyList;

	public User() {
		super();
	}

	public User(int id) {
		super();
		this.id = id;
	}

	public String getAuthorities() {
		return authorities;
	}

	public void setAuthorities(String authorities) {
		this.authorities = authorities;
	}

	public User(int id, String emailId, String password, String mobile, String name, String gender,
			String authorities) {
		super();
		this.id = id;
		this.emailId = emailId;
		this.password = password;
		this.mobile = mobile;
		this.name = name;
		this.gender = gender;
		this.authorities = authorities;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", emailId=" + emailId + ", password=" + password + ", mobile=" + mobile + ", name="
				+ name + ", gender=" + gender + ", authorities=" + authorities + "]";
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public List<UserPolicy> getUserPolicyList() {
		return userPolicyList;
	}

	public void setUserPolicyList(List<UserPolicy> userPolicyList) {
		this.userPolicyList = userPolicyList;
	}

}
