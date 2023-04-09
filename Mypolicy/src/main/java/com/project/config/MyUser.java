package com.project.config;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.project.entities.LicOfficer;
import com.project.entities.User;

public class MyUser implements UserDetails {
	private static final long serialVersionUID = 1L;
	
	
	private int id;
	private String email;
	private String password;
	private boolean enabled;
	private String name;
	private int regionId;
	private String token;

	private List<GrantedAuthority> authorities;
	
	public MyUser(User user) {
		id = user.getId();
		email = user.getEmailId();
		password = user.getPassword();
		name = user.getName();
		
		enabled = true;
		authorities = Arrays.asList(new SimpleGrantedAuthority(user.getAuthorities())); 
	}
	
	public MyUser(LicOfficer user) {
		id = user.getOfficerId();
		email = user.getEmailId();
		password = user.getPassword();
		name = user.getName();
		regionId = user.getRegionId();
		enabled = true;
		authorities = Arrays.asList(new SimpleGrantedAuthority(user.getAuthorities())); 
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}
	
	
	@Override
	public String toString() {
		return "MyUser [id=" + id + ", email=" + email + ", password=" + password + ", enabled=" + enabled + ", name="
				+ name + ", regionId=" + regionId + ", token=" + token + ", authorities=" + authorities + "]";
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public int getId() {
		return id;
	}

	public String getEmail() {
		return email;
	}

	public String getName() {
		return name;
	}

	public int getRegionId() {
		return regionId;
	}

	public void setToken(String token) {
		this.token = token;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}
	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return email;
	}
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return enabled;
	}
}
