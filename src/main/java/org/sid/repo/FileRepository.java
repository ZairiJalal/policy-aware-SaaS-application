package org.sid.repo;

import java.util.List;
import java.util.Optional;

import org.sid.entities.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
@RepositoryRestResource
public interface FileRepository extends JpaRepository<File, Long> {
	
	List<File> findByUserId(Long userId);
	Optional<File> findById(Long id);

}
