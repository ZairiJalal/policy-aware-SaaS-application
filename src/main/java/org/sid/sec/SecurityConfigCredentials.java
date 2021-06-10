
  package org.sid.sec;
  
  import java.util.ArrayList;
  import java.util.Collection;

import javax.servlet.http.HttpServletRequest;

import org.sid.custom_annotation.Credentials;
import org.sid.entities.AppUser;
import org.sid.filtres.JWTAuthenticationFilter;
import org.sid.filtres.JWTAuthorizationFilter;
import org.sid.repo.AppUserRepository;
import org.sid.service.AccountService; 
  import  org.springframework.beans.factory.annotation.Autowired;
  import  org.springframework.context.annotation.Bean; 
  import  org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import  org.springframework.security.authentication.AuthenticationManager; 
  import  org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
  import  org.springframework.security.config.annotation.web.builders.HttpSecurity;
  import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity; 
  import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter; 
  import org.springframework.security.config.http.SessionCreationPolicy;
  import org.springframework.security.core.authority.SimpleGrantedAuthority;
  import  org.springframework.security.core.GrantedAuthority;
  import  org.springframework.security.core.userdetails.User; 
  import  org.springframework.security.core.userdetails.UserDetails;
  import  org.springframework.security.core.userdetails.UserDetailsService; 
  import  org.springframework.security.core.userdetails.UsernameNotFoundException;
  import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
  
  @Configuration
  @Order(1)
  @CrossOrigin("*")

  @EnableWebSecurity 
	/* @Credentials */
  
  public class SecurityConfigCredentials extends WebSecurityConfigurerAdapter {
  
  @Autowired  
  private AccountService accountService;
  @Autowired AppUserRepository appUserRepository;
  @Autowired HttpServletRequest httpServletRequest ;
  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception { 
     
	  auth.userDetailsService(new UserDetailsService() {
		  
		  @Override public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException { 
			  System.out.println("---------------");
			  System.out.println(username);
			  AppUser appUser = accountService.loadUserByUsername(username); 
			  Collection<GrantedAuthority>  authorities= new ArrayList<>();
			  appUser.getAppRoles().forEach(r->{		 
				  authorities.add(new SimpleGrantedAuthority(r.getRoleName())); });
			  if(httpServletRequest.getParameter("idTenant").equals(appUser.getIdTenant()))
			  
				  return new  User(appUser.getUsername(), appUser.getPassword(), authorities);
			  return null;
			  }   
		  }); 
  }


  @Bean
  CorsConfigurationSource corsConfigurationSource() {
      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
      return source;
  }
  
  @Override
  protected void configure(HttpSecurity http) throws Exception {

      http.cors().and();

	  http.csrf().disable();
	  http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	  http.headers().frameOptions().disable();
	  http.authorizeRequests().antMatchers("/login","/users","/h2-console","/refreshToken/**").permitAll();
		/*
		 * http.authorizeRequests().antMatchers(HttpMethod.POST,"/users").permitAll();
		 */		/*
		 * http.authorizeRequests().antMatchers(HttpMethod.GET,"/users/**").
		 * hasAnyAuthority("ADMIN");
		 */	  http.authorizeRequests().antMatchers("/documents/**").hasAnyAuthority("USER");
	  http.authorizeRequests().anyRequest().authenticated();
	  http.addFilter(new JWTAuthenticationFilter(authenticationManagerBean(), appUserRepository));
	  http.addFilterBefore(new JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
	  
  }
  
  @Bean
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception { 
	  return super.authenticationManagerBean(); 
	  } 
  }
 