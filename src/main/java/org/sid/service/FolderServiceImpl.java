package org.sid.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.sid.entities.Folder;
import org.sid.repo.FolderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Transactional
@Service
public class FolderServiceImpl implements FolderService{

	@Autowired FolderRepository folderRepository;
	
	@Override
	public List<Folder> getAllFolderByIdUser(Long idUser) {
		return folderRepository.findByUserId(idUser);
	}

	@Override
	public Optional<Folder> getOneFolder(Long id) {
		return folderRepository.findById(id);
	}

	@Override
	public Folder editFolder(Folder f) {
		if(f.getId()!=null)
		  return folderRepository.save(f);
		return null;
	}

	@Override
	public Folder saveFolder(Folder f) {
		return folderRepository.save(f);
	}

	@Override
	public Boolean deleteFolder(Long id) {
		folderRepository.deleteById(id);
		return !folderRepository.existsById(id);
	}

}
