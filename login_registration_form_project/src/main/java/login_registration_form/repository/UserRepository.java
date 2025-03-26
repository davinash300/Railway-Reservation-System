package login_registration_form.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import login_registration_form.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

}
