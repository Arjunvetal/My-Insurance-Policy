package com.project.dtos;

import com.project.config.MyUser;
import com.project.entities.LicOfficer;
import com.project.entities.User;

public class UserToken {
	private int id;
	private String name;
	private int regionId;
	private String token;

	public void setToken(String token) {
		this.token = token;
	}

	public UserToken(MyUser user) {
		id = user.getId();
		name = user.getName();
		regionId = user.getRegionId();

	}

//	public UserToken(LicOfficer user) {
//		id = user.getOfficerId();
//		name = user.getEmailId();
//		regionId = user.getRegionId();
//
//	}

}
