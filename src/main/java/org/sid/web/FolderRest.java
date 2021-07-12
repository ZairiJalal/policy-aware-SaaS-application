package org.sid.web;

import java.util.List;
import java.util.Optional;

import org.sid.entities.Folder;
import org.sid.service.CurrentUser;
import org.sid.service.FolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class FolderRest {
	
	@Autowired CurrentUser currentUser; 
	@Autowired FolderService folderService;
	
	@GetMapping()
	public List<Folder> getAll() {
		return folderService.getAllFolderByIdUser(currentUser.getCurrentUser().getId());
	}
	
	@GetMapping("/{id}")
	public Optional<Folder> getOne(@PathVariable Long id) {
		return folderService.getOneFolder(id);
	}
	
	@PostMapping
	public Folder save(@RequestBody Folder f) {
		return folderService.saveFolder(f);
	}
	
	@PutMapping
	public Folder edit(@RequestBody Folder f) {
		return folderService.editFolder(f);
	}
	
	@DeleteMapping("/{id}")
	public Boolean delete(@PathVariable Long id) {
		return folderService.deleteFolder(id);
	}

}
