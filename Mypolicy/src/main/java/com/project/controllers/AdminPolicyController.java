package com.project.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dtos.AgePremiumDTO;
import com.project.dtos.PolicyPaymentDTO;
import com.project.dtos.PolicyTermDTO;
import com.project.dtos.Response;
import com.project.entities.AgePremium;
import com.project.entities.PolicyPayment;
import com.project.entities.PolicyTerm;
import com.project.entities.TypeOfPolicy;
import com.project.services.AgePremiumServiceImpl;
import com.project.services.PolicyPaymentServiceImpl;
import com.project.services.PolicyTermServiceImpl;
import com.project.services.TypeOfPolicyServiceImpl;

@CrossOrigin
@RestController
@RequestMapping("/admin/policy")
public class AdminPolicyController {

	@Autowired
	TypeOfPolicyServiceImpl typeOfPolicyServiceImpl;
	
	@Autowired
	PolicyTermServiceImpl policyTermServiceImpl;
	
	@Autowired
	PolicyPaymentServiceImpl policyPaymentServiceImpl;
	
	@Autowired
	AgePremiumServiceImpl agePremiumServiceImpl;
	
	@PostMapping("/addtypeofpolicy")
	public ResponseEntity<?> addTypeOfPolicy(@RequestBody TypeOfPolicy typeOfPolicy) {
		TypeOfPolicy result = typeOfPolicyServiceImpl.addTypeOfPolicy(typeOfPolicy);
		return Response.success(result);
	}
	
	@PutMapping("/edittypeofpolicy/{id}")
	public ResponseEntity<?> editTypeOfPolicy(@PathVariable("id") int policyId,@RequestBody TypeOfPolicy typeOfPolicy) {
		int result = typeOfPolicyServiceImpl.editTypeOfPolicy(policyId, typeOfPolicy);
		return Response.success(result);
	}
	
	@PostMapping("/addpolicyterm/{id}")
	public ResponseEntity<?> addPolicyTerm (@PathVariable("id") int policyId, @RequestBody PolicyTermDTO policyTermDto){
		PolicyTerm savedPolicyTerm = policyTermServiceImpl.addPolicyTerm(policyId, policyTermDto);
		List<PolicyTerm> result = policyTermServiceImpl.findByPolicyId(savedPolicyTerm.getTypeOfPolicy().getPolicyId());
		return Response.success(result);
	}
	
	@GetMapping("/getpolicytermbyid/{id}")
	public ResponseEntity<?> getPolicyTermById (@PathVariable("id") int termId){
		PolicyTerm result = policyTermServiceImpl.findByTermId(termId);
		return Response.success(result);
	}
	
	@PutMapping("/editpolicyterm/{id}")
	public ResponseEntity<?> editPolicyTerm(@PathVariable("id") int termId,@RequestBody PolicyTerm policyTerm) {
		int result = policyTermServiceImpl.editPolicyTerm(termId, policyTerm);
		return Response.success(result);
	}
	
	@GetMapping("/getpolicypaymentbyid/{id}")
	public ResponseEntity<?> getPolicyPaymentById (@PathVariable("id") int paymentId){
		PolicyPayment result = policyPaymentServiceImpl.getPolicyPaymentById(paymentId);
		return Response.success(result);
	}
	
	@GetMapping("/getpolicypaymentbypolicyid/{id}")
	public ResponseEntity<?> getPolicyPaymentByPolicyId (@PathVariable("id") int policyId){
		List<PolicyPayment> result = policyPaymentServiceImpl.getByPolicyId(policyId);
		return Response.success(result);
	}
	
	@PostMapping("/addpolicypayment/{id}")
	public ResponseEntity<?> addPolicyPayment (@PathVariable("id") int policyId,@RequestBody PolicyPaymentDTO policyPaymentDto){
		Object result = policyPaymentServiceImpl.addPolicyPayment(policyId, policyPaymentDto);
		return Response.success(result);
	}
	
	@PutMapping("/editpolicypayment/{id}")
	public ResponseEntity<?> editPolicyPayment(@PathVariable("id") int paymentId,@RequestBody PolicyPayment policyPayment) {
		int result = policyPaymentServiceImpl.editPolicyPayment(paymentId, policyPayment);
		return Response.success(result);
	}
	
	@PostMapping("/addagepremium/{id}")
	public ResponseEntity<?> addAgePremium (@PathVariable("id") int policyId,@RequestBody AgePremiumDTO agePremiumDto){
		Object result = agePremiumServiceImpl.addAgePremium(policyId, agePremiumDto);
		return Response.success(result);
	}
	
	@GetMapping("/getagepremiumbyid/{id}")
	public ResponseEntity<?> getAgePremiumById (@PathVariable("id") int agePremiumId){
		AgePremium result = agePremiumServiceImpl.findByAgePremiumId(agePremiumId);
		return Response.success(result);
	}
	
	@GetMapping("/getagepremiumbypolicyid/{id}")
	public ResponseEntity<?> getAgePremiumByPolicyId (@PathVariable("id") int policyId){
		List<PolicyTerm> policyTerms = policyTermServiceImpl.findByPolicyId(policyId);
		List<Integer> termIds = new ArrayList<>();
		for (PolicyTerm policyTerm : policyTerms) 
		{ 
			termIds.add(policyTerm.getTermId());
		}
		System.out.println(termIds);
		List<AgePremium> result = agePremiumServiceImpl.findByTermId(termIds);
		return Response.success(result);
	}
	
	@PutMapping("/editagepremium/{id}")
	public ResponseEntity<?> editAgePremium(@PathVariable("id") int agePremiumId,@RequestBody AgePremium agePremium) {
		int result = agePremiumServiceImpl.editAgePremium(agePremiumId, agePremium);
		return Response.success(result);
	}
	
	
}
