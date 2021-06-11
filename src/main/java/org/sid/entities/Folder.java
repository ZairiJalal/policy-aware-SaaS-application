package org.sid.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor
public class Folder {

	@Id @GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private Long parentId;
	private String name;
	private Long userId;
	
}
