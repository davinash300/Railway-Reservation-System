package login_registration_form.service;


import java.util.List;

import login_registration_form.dto.Userdto;
import login_registration_form.model.User;


public interface UserService {
    void saveUser(Userdto userDto);

    User findUserByEmail(String email);

    List<Userdto> findAllUsers();
}