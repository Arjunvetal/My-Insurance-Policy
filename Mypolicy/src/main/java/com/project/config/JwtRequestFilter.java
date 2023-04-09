package com.project.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import org.graalvm.compiler.lir.CompositeValue.Component;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.project.daos.LicOfficerDao;
import com.project.daos.UserDao;
import com.project.entities.LicOfficer;
import com.project.entities.User;

@org.springframework.stereotype.Component
public class JwtRequestFilter extends OncePerRequestFilter {
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private UserDao userDao;
	@Autowired
	private LicOfficerDao officerDao;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String authHeader = request.getHeader("Authorization");
		boolean validHeader = authHeader != null && authHeader.startsWith("Bearer");
		MyUser principal = null;
		if (validHeader) {
			String token = authHeader.replace("Bearer", "").trim();
			System.out.println("Token: " + token);
			String email = jwtUtil.getTokenUsername(token);
			System.out.println("Email: " + email);
			User user = userDao.findByEmailId(email);

			if (user != null) {
				principal = new MyUser(user);
				System.out.println("Principal: " + principal);
				if (!jwtUtil.validateToken(token, principal))
					principal = null;
			}

			LicOfficer officer;
			if (user == null) {
				officer = officerDao.findByEmailId(email);
				if (officer != null) {
					principal = new MyUser(officer);
					System.out.println("Principal: " + principal);
					if (!jwtUtil.validateToken(token, principal))
						principal = null;
				}
			}
		}
		if (principal != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(principal, null,
					principal.getAuthorities());
			SecurityContextHolder.getContext().setAuthentication(auth);
		}
		// pre-processing
		filterChain.doFilter(request, response); // call next filter in the chain
		// post-processing
	}

}
