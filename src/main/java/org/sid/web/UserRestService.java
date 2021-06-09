package org.sid.web;

import java.util.ArrayList;
import java.util.List; import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.sid.repo.AppUserRepository;
import org.sid.service.AccountService;
import org.sid.entities.AppUser;
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.web.bind.annotation.CrossOrigin; 
import org.springframework.web.bind.annotation.PathVariable; 
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.RequestMapping; 
import org.springframework.web.bind.annotation.RequestMethod; 
import org.springframework.web.bind.annotation.RestController;
  
  @RestController
  @CrossOrigin(origins = "*", allowedHeaders = "*")
  
  public class UserRestService {
  
	  @Autowired 
	  private AppUserRepository userRepository;
	  @Autowired
	  AccountService accountService;
  
		
		  @RequestMapping(value = "/users", method = RequestMethod.GET )
		  public List<AppUser> getUsers(){ 
			  return userRepository.findAll();
			  }
		 
  
  
	
	/*
	 * @RequestMapping(value = "/users/{id}", method = RequestMethod.GET) public
	 * Optional<AppUser> getUser(@PathVariable Long id_tenant,@PathVariable Long
	 * id){ return userRepository.findByIdAndTenantId(id, id_tenant); }
	 */
	  
	  @RequestMapping(value = "/users", method = RequestMethod.POST) 
	  public AppUser saveUser(@RequestBody AppUser appUser )
	  {	  		
		  appUser = accountService.addNewUser(appUser); 		  			  
		  accountService.addRoleToUser(appUser.getUsername(), "USER");		 
		  return appUser;
	  }
	   
	/*
	 * @RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE) public
	 * boolean deleteUser(@PathVariable Long id){ userRepository.deleteById(id);
	 * return true; }
	 * 
	 * @RequestMapping(value = "/users/{id}", method = RequestMethod.PUT) public
	 * AppUser editeUser(@PathVariable Long id , @RequestBody AppUser c){
	 * c.setId(id); return userRepository.save(c); }
	 */
 }
 
