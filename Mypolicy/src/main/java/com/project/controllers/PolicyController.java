package com.project.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.project.dtos.Response;
import com.project.entities.PolicyTerm;
import com.project.entities.TypeOfPolicy;
import com.project.services.PolicyTermServiceImpl;
import com.project.services.TypeOfPolicyServiceImpl;

@CrossOrigin
@RestController
public class PolicyController {

	@Autowired
	private TypeOfPolicyServiceImpl typeOfPolicyServiceImpl;
	
	@Autowired
	private PolicyTermServiceImpl policyTermServiceImpl;

	@GetMapping("/policy/displaypolicybyid/{id}")
	public ResponseEntity<?> displayPolicyById(@PathVariable("id") int id) {
		TypeOfPolicy result = typeOfPolicyServiceImpl.findById(id);
		return Response.success(result);
	}
	
	@GetMapping("/policy/displaypolicytermbyid/{id}")
	public ResponseEntity<?> displayPolicyTermById (@PathVariable("id") int id){
		  List<PolicyTerm> result = policyTermServiceImpl.findByPolicyId(id);
		return Response.success(result);
	}

	@GetMapping("/policy/displaypolicies")
	public ResponseEntity<?> displayTypeOfPolicy() {
		List<TypeOfPolicy> result = typeOfPolicyServiceImpl.displayAll();
		return Response.success(result);
	}
}
