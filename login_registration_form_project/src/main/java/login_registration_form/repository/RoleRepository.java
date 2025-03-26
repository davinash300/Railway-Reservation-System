package login_registration_form.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import login_registration_form.model.Role;


public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(String name);
}
