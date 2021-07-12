package org.sid.web;

import org.sid.service.CurrentUser;
import org.sid.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;

import org.sid.entities.File;


@RestController("/files")
public class FileRest {
	
	@Autowired CurrentUser currentUser; 
	@Autowired FileService fileService;
	
	@GetMapping()
	public List<File> getAll() {
		return fileService.getAllFileByIdUser(currentUser.getCurrentUser().getId());
	}
	
	@GetMapping("/{id}")
	public Optional<File> getOne(@PathVariable Long id) {
		return fileService.getOneFile(id);
	}
	
	@PostMapping
	public File save(@RequestBody File f) {
		return fileService.saveFile(f);
	}
	
	@PutMapping
	public File edit(@RequestBody File f) {
		return fileService.editFile(f);
	}
	
	@DeleteMapping("/{id}")
	public Boolean delete(@PathVariable Long id) {
		return fileService.deleteFile(id);
	}

}
