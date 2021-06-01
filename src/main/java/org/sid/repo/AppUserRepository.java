package org.sid.repo;

import java.util.List;
import java.util.Optional;

import org.sid.entities.AppUser;
import org.sid.entities.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AppUserRepository extends JpaRepository<AppUser, Long> {
	AppUser findByUsername(String username);
	List<AppUser> findByTenant(Optional<Tenant> tenant);

}
