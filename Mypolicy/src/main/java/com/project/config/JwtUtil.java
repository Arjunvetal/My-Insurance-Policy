package com.project.config;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
	
	@Autowired
	private Environment env;
	
	public String generateToken(MyUser user) {
		System.out.println("Gen token");
		Map<String,Object> info = new HashMap<String, Object>();
		String authorities = userAuthorities(user);
		info.put("authorities", authorities);
		info.put("name", user.getUsername());
		return createToken(info);
	}
	
	public String getTokenUsername(String token) {
		Claims claims = decodeToken(token);
		String email = claims.get("name", String.class);
		return email;
	}
	
	public boolean validateToken(String token, MyUser user) {
		Claims claims = decodeToken(token);
		if(!claims.get("name").equals(user.getUsername()))
			return false;
		if(!claims.get("authorities").equals(userAuthorities(user)))
			return false;
		if(claims.getExpiration().before(new Date()))
			return false;
		return true;
	}

	private String createToken(Map<String, Object> info) {
		long curTime = System.currentTimeMillis();
		long expiration =3260000;
		String secret = "project";
		System.out.println("expiry time==>> " +(new Date(curTime + expiration)));
		return Jwts.builder()
				.setSubject(null)
				.setClaims(info)
				.setIssuedAt(new Date(curTime))
				.setExpiration(new Date(curTime + expiration))
				.signWith(SignatureAlgorithm.HS256, secret)
				.compact();
	}
	
	private Claims decodeToken(String token) {
		String secret = "project";
		return Jwts.parser()
			.setSigningKey(secret)
			.parseClaimsJws(token)
			.getBody();
	}
	
	private String userAuthorities(MyUser user) {
		return user.getAuthorities().toString();
	}
	
}
