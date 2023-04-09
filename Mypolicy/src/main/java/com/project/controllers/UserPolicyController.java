package com.project.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.daos.UserPolicyDao;
import com.project.dtos.Response;
import com.project.dtos.UserPolicyDto;
import com.project.entities.UserPolicy;
import com.project.services.TypeOfPolicyServiceImpl;
import com.project.services.UserPolicyService;

@CrossOrigin
@RestController
public class UserPolicyController {

	@Autowired
	private UserPolicyService policyServices;
	
	@Autowired
	private TypeOfPolicyServiceImpl	typeOfPolicyServiceImpl;
	
	@Autowired
	private UserPolicyDao userPolicyDao;

	@GetMapping("/admin/policies/{id}")
	public ResponseEntity<?> signIn(@PathVariable("id") int id) {
		List<UserPolicy> policy = policyServices.findUserByRegionId(id);
		List<UserPolicy> ppp = new ArrayList<>();
		for (UserPolicy userPolicy : policy) {
			if (userPolicy.getVerificationStatus().equals("Pending"))
				ppp.add(userPolicy);
		}
		return Response.success(ppp);
	}

	@GetMapping("/admin/approve/{id}")
	public ResponseEntity<?> approvePolicy(@PathVariable("id") int id) {
		int policy = policyServices.approvePolicy(id);
		if (policy == 0)
			return Response.error("Operation Failed");
		return Response.success(policy);
	}

	@GetMapping("/admin/reject/{id}/{comment}")
	public ResponseEntity<?> rejectPolicy(@PathVariable("id") int id, @PathVariable("comment") String comment) {
		System.out.println(comment.toString());
		int policy = policyServices.rejectPolicy(id, comment);
		if (policy == 0)
			return Response.error("Operation Failed");
		return Response.success(policy);
	}

	@PostMapping(value = "/user/subscribe")
	public ResponseEntity<?> addPolicy(@RequestBody UserPolicyDto userPolicy) {
		int policy = policyServices.addNewPolicy(userPolicy);
		System.out.println("3");
		if (policy == 0) {
			return Response.error("Failed to add policy");
		}
		System.out.println("4");
		return Response.success(policy);
	}
	

	@PostMapping(value = "/user/addidproof/{id}")
	public ResponseEntity<?> addUserIdProof(@PathVariable("id") int userPolicyId, @RequestParam MultipartFile file) throws IOException {
//		System.out.println("5");
		UserPolicy userPolicy = policyServices.findByUserPolicyId(userPolicyId);
		userPolicy.setIdProof(file.getBytes());
		UserPolicy savedUserPolicy = userPolicyDao.save(userPolicy);
		return Response.success(savedUserPolicy);
	}
	
	@GetMapping(value = "/attachment/{id}", produces = "image/png")
	public @ResponseBody byte[] downloadAttachment(@PathVariable("id") int id) {
		// get from file --> Java File IO --> byte[] --> return
		 UserPolicy attachment = policyServices.findidproofbyid(id);
		if(attachment == null)
			return null;
		return attachment.getIdProof();
	}
	
	

	@GetMapping("/user/getpolicybyuserid/{id}")
	public ResponseEntity<?> getPolicy(@PathVariable("id") int id) {
		List<UserPolicy> policy = policyServices.findByUserId(id);
		return Response.success(policy);
	}
	
//	@DeleteMapping("/userpolicy/{id}")
//	public void deletUser(@PathVariable int id) {
//		userPolicyDao.deleteById(id);
//	    
//	}
	
	
}
