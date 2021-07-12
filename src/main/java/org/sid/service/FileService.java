package org.sid.service;

import java.util.List;
import java.util.Optional;
import org.sid.entities.File;


public interface FileService {
	
	List<File> getAllFileByIdUser(Long idUser);
	Optional<File> getOneFile(Long id);
	File editFile(File f);
	File saveFile(File f);
	Boolean deleteFile(Long id);

}
