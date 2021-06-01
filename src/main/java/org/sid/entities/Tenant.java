package org.sid.entities;


import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;


import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data  @NoArgsConstructor @AllArgsConstructor
public class Tenant {
	
	@Id  @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String username;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)

	private String password;
     
}
