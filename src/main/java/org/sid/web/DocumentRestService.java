package org.sid.web;


import java.io.IOException;
import java.util.List; import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.sid.repo.AppUserRepository;
import org.sid.repo.DocumentRepository;
import org.sid.service.CurrentTenant;
import org.sid.service.CurrentUser;
import org.json.simple.parser.ParseException;
import org.sid.entities.AppUser;
import org.sid.entities.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin; 
import org.springframework.web.bind.annotation.PathVariable; 
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.RequestMapping; 
import org.springframework.web.bind.annotation.RequestMethod; 
import org.springframework.web.bind.annotation.RestController;
  
  @RestController
	/*
	 * @RequestMapping(value = "/{id_tenant}" )
	 */
  @CrossOrigin(origins = "*", allowedHeaders = "*")
  
  public class DocumentRestService {
  
	
	  @Autowired 
	  private DocumentRepository documentRepository;
	  @Autowired
      private CurrentUser currentUser ;
	 
  
	  @RequestMapping(value = "/documents", method = RequestMethod.GET )  
	  public List<Document> getUsers() throws IOException, ParseException{	
		  return documentRepository.findByAppUser(currentUser.getCurrentUser()); 
	  }
	  
	  @RequestMapping(value = "/documents/{id}", method = RequestMethod.GET)
	  public Document getUser(@PathVariable Long id)
	  { 
		  return documentRepository.findByIdAndAppUser(id,currentUser.getCurrentUser()); 
	  }
	  
	  @RequestMapping(value = "/documents", method = RequestMethod.POST) 
	  public Document saveUser(HttpServletRequest request)
	  {		
		  return documentRepository.save(new Document(null, request.getParameter("title"), currentUser.getCurrentUser())); 
	  }
	  
	  @RequestMapping(value = "/documents/{id}", method = RequestMethod.DELETE) 
	  public boolean deleteUser(@PathVariable Long id)
	  { 
		  if(documentRepository.getOne(id).getAppUser()==currentUser.getCurrentUser()) {
			  documentRepository.deleteById(id);
			  return true;
		  }		  
		  return false;
	  }
  
  
	
	  
	 
	  
	 
 }
 
