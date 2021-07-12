package org.sid.repo;

import java.util.List;
import java.util.Optional;

import org.sid.entities.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface FolderRepository extends JpaRepository<Folder, Long> {
	
	List<Folder> findByUserId(Long userId);
	Optional<Folder> findById(Long id);

}
