package com.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication  
public class LicserverApplication {

	public static void main(String[] args) {
		SpringApplication.run(LicserverApplication.class, args);
	}

}
