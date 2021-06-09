package org.sid.sec;


import org.sid.custom_annotation.Credentials;
import org.sid.custom_annotation.Oauth2Token;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableOAuth2Sso
@Order(2)
/* @Oauth2Token */
public class SecurityConfigOauth2Token extends WebSecurityConfigurerAdapter {

	 
	    protected void configure(HttpSecurity http) throws Exception {
		 System.out.println("---------- WebSecurityConfiguration --------");
	        http
	                .csrf()
	                    .disable()
	                .antMatcher("/**")
	                .authorizeRequests()
	                .antMatchers("/", "/index.html")
	                    .permitAll()
	                .anyRequest()
	                    .authenticated();
	    }
}