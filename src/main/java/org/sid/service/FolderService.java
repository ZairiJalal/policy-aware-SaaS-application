package org.sid.service;

import java.util.List;
import java.util.Optional;
import org.sid.entities.Folder;

public interface FolderService {
	
	List<Folder> getAllFolderByIdUser(Long idUser);
	Optional<Folder> getOneFolder(Long id);
	Folder editFolder(Folder f);
	Folder saveFolder(Folder f);
	Boolean deleteFolder(Long id);

}
