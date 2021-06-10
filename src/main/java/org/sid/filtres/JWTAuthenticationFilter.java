
  package org.sid.filtres;
  
  import java.io.IOException; import java.util.Date; import java.util.HashMap;
  import java.util.Map; import java.util.stream.Collectors;
  
  import javax.servlet.FilterChain; import javax.servlet.ServletException;
  import javax.servlet.http.HttpServletRequest; import
  javax.servlet.http.HttpServletResponse;
  
  import org.sid.entities.AppUser;
import org.sid.repo.AppUserRepository;
import org.sid.service.AccountService;
import
  org.springframework.security.authentication.AuthenticationManager; import
  org.springframework.security.authentication.
  UsernamePasswordAuthenticationToken; import
  org.springframework.security.core.Authentication; import
  org.springframework.security.core.AuthenticationException; import
  org.springframework.security.core.userdetails.User; import
  org.springframework.security.web.authentication.
  UsernamePasswordAuthenticationFilter;
  
  import com.auth0.jwt.JWT; import com.auth0.jwt.algorithms.Algorithm; import
  com.fasterxml.jackson.databind.json.JsonMapper;
  
  public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
  
  private AuthenticationManager authenticationManager;
  private AppUserRepository appUserRepository;
  
  public JWTAuthenticationFilter(AuthenticationManager authenticationManager,AppUserRepository appUserRepository) {
  
	  this.authenticationManager = authenticationManager;
	  this.appUserRepository= appUserRepository;
	  }
  
  @Override public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

	  AppUser appUser=new AppUser();
	  appUser.setUsername(request.getParameter("username")); 
	  appUser.setPassword(request.getParameter("password")); 
	  AppUser us = appUserRepository.findByUsername(request.getParameter("username"));
	  System.out.println("----------------------------------------");
	  System.out.println(us.getIdTenant());
	  System.out.println(request.getParameter("idTenant"));
	  if(us.getIdTenant().equals(request.getParameter("idTenant")))
		  return   authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(appUser.getUsername(),appUser.getPassword())); 
	  return null;
	  }
  
  @Override protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
	  System.out.println("----------------- JJT-------------------");
	  User authenticatedUser= (User)authResult.getPrincipal();
	  Algorithm algorithm=Algorithm.HMAC256("myHMACPrivateKey"); 
	  String jwtAccessToken= JWT
			  .create()
			  .withSubject(authenticatedUser.getUsername())
			  .withExpiresAt(new Date(System.currentTimeMillis()+50*60*1000)) 
			  .withIssuer(request.getRequestURL().toString())
			  .withClaim("roles",authenticatedUser
					  .getAuthorities()
					  .stream()
					  .map((a)->a
							  .getAuthority())
					  .collect(Collectors.toList()))
			  .sign(algorithm); 
	  String jwtRefreshToken= JWT 
			  .create() 
			  .withSubject(authenticatedUser.getUsername()) 
			  .withExpiresAt(new Date(System.currentTimeMillis()+10*24*3600*1000)) 
			  .withIssuer(request.getRequestURL().toString()) .sign(algorithm);
  
	  Map<String,String> accessToken=new HashMap<>();  
	  accessToken.put("Access_Token",jwtAccessToken); 
	  accessToken.put("Refresh_Token",jwtRefreshToken);  
	  response.setContentType("application/json"); 
	  new  JsonMapper().writeValue(response.getOutputStream(),accessToken);
	  } 
  }
 