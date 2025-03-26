package login_registration_form.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import login_registration_form.dto.Userdto;
import login_registration_form.service.UserService;

@Controller
public class LoginController {


    @Autowired
    private UserService userService;

    @RequestMapping("/login")
    public String loginForm() {
        return "login";
    }
    
    
    @GetMapping("/registration")
    public String registrationForm(Model model) {
        Userdto user = new Userdto();
        model.addAttribute("user", user);
        return "registration";
    }
    

    
    
    
    
    
    
    
    
}
