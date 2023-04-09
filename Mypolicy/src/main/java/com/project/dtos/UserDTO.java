package com.project.dtos;

public class UserDTO {

	private int id;
	private String name;
	private String emailId;
	private String password;
	
	public UserDTO(int id, String name, String emailId, String password) {
		super();
		this.id = id;
		this.name = name;
		this.emailId = emailId;
		this.password = password;
	}

	public UserDTO() {
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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
	
	
	
}
