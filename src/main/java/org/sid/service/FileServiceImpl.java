package org.sid.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.sid.entities.File;
import org.sid.repo.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Transactional
@Service
public class FileServiceImpl implements FileService{

	@Autowired FileRepository fileRepository;
	
	@Override
	public List<File> getAllFileByIdUser(Long idUser) {
		return fileRepository.findByUserId(idUser);
	}

	@Override
	public Optional<File> getOneFile(Long id) {
		return fileRepository.findById(id);
	}

	@Override
	public File editFile(File f) {
		if(f.getId()!=null)
		  return fileRepository.save(f);
		return null;
	}

	@Override
	public File saveFile(File f) {
		return fileRepository.save(f);
	}

	@Override
	public Boolean deleteFile(Long id) {
		fileRepository.deleteById(id);
		return !fileRepository.existsById(id);
	}

}
