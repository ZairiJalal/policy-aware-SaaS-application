package org.sid;


import java.util.ArrayList;

import org.sid.entities.AppRole;
import org.sid.entities.AppUser;
import org.sid.service.AccountService;
import org.sid.service.CurrentTenant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;


@SpringBootApplication
@CrossOrigin("*")

public class SaasMulAppApplication {
	
	
	public static void main(String[] args) {
		SpringApplication.run(SaasMulAppApplication.class, args);
	}
	
	 @Bean PasswordEncoder passwordEncoder(){ return new BCryptPasswordEncoder();
	  }
	 
	@Bean
	CommandLineRunner start(AccountService accountService){
	return args -> {
		accountService.addNewRole(new AppRole(null,"share"));
		accountService.addNewUser(new AppUser(null,"user2","user2user2","tenant2_Id",new ArrayList<>()));
		accountService.addRoleToUser("user2","share");
	
	};
	}
}
