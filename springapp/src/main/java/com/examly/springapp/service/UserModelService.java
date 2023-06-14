package com.examly.springapp.service;


import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import com.examly.springapp.models.AdminModel;
import com.examly.springapp.models.UserModel;
import com.examly.springapp.repository.AdminModelRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.models.LoginModel;
import com.examly.springapp.repository.UserModelRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.examly.springapp.security.securityconfig.JwtUtils;
import com.examly.springapp.security.securityservices.UserDetailsImpl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


@Service
public class UserModelService {


	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	UserModelRepository userModelRepository;
	@Autowired
	AdminModelRepository adminModelRepository;

	@Autowired
    JwtUtils jwtUtils;

    @Autowired
    AuthenticationManager authenticationManager;
    
    private static final String USER_NAME_NOT_FOUND = "User email not found in database";

	public boolean isUserPresent(LoginModel data) {

		UserModel userExist= userModelRepository.findUserByEmail(data.getEmail());
		if(userExist!=null && "user".equals(userExist.getUserRole()) ){
			System.out.println(data.getEmail()+userExist.getEmail()+userExist.getUserRole());
			return true;
		} else {
			return false;
		}
	}

	public boolean isAdminPresent(LoginModel data) {
		UserModel userExist= userModelRepository.findUserByEmail(data.getEmail());
		if(userExist!=null && "admin".equals(userExist.getUserRole())){
			return true;
		} else {
			return false;
		}
	}

	public boolean userAldreadyExist(String username) {
		return userModelRepository.findUserByEmail(username) != null;
	}

	public ResponseEntity<?> saveUser(UserModel userModel) {

		if(userAldreadyExist(userModel.getEmail())){
            return  new ResponseEntity<>("User Aldredy exist in db go login",HttpStatus.CONFLICT);
        }

        //  UserModel savedUser = userModelService.saveUser(userModel);
		// UserMOdel savedUser = new UserModel();
        // if (savedUser != null) {
        //     String role = savedUser.getUserRole();
        //     String message = role.equals("admin") ? "Admin added" : "User added";
        //     return ResponseEntity.ok(new MessageResponse(message));
        // } else {
        //     return new ResponseEntity<>("Failed to register user.", HttpStatus.INTERNAL_SERVER_ERROR);
        // }
		userModel.setPassword(passwordEncoder.encode(userModel.getPassword()));
		userModelRepository.save(userModel);
		return new ResponseEntity<>(userModel.getUserRole()+" " +"added",HttpStatus.ACCEPTED);

	}


	public UserModel saveAdmin(AdminModel adminModel) {

//
//			UserModel user = new UserModel();
//			user.setEmail("admin");
//			user.setPassword("admin");
//			user.setMobileNumber(userModel.getMobileNumber());
//			user.setUserRole(userModel.getUserRole());
//			// default username for admin
//			userModel.setUsername("admin");
//
//
		UserModel admin = new UserModel();
		admin.setEmail(adminModel.getEmail());
		admin.setPassword(adminModel.getPassword());
		admin.setMobileNumber(adminModel.getMobileNumber());
		admin.setUserRole(admin.getUserRole());
		admin.setUsername("admin");
		adminModelRepository.save(adminModel);
		return userModelRepository.save(admin);
	}

	// public String validateUser(LoginModel data) {
	// 	UserModel user = userModelRepository.findByEmail(data.getEmail());

	// 	if (user == null) {
	// 	// 	return new ResponseEntity<>(userModel.getUserRole()+" " +"The User Is Not Present",HttpStatus.BAD_REQUEST);
	// 	// }


	// 		if (user.getUserRole().equals("admin")) {
	// 			return "admin/dashboard";
	// 		} else {
	// 			return "user/dashboard";
	// 		}
	// 	} else {
	// 		return "/user/login?error";
	// 	}
	// }
    
	public  ResponseEntity<?> validateUser(LoginModel data) {
		UserModel userModel = userModelRepository.findByEmail(data.getEmail());
		if (userModel == null) {
				throw new UsernameNotFoundException(USER_NAME_NOT_FOUND);
			}

			Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(data.getEmail(),data.getPassword()));
			SecurityContextHolder.getContext().setAuthentication(authentication);

			String jwt = jwtUtils.generateJwt(authentication) ;
			
			HashMap<String, Object> outResponse = new HashMap<>();
			outResponse.put("token", jwt);
			outResponse.put("id", userModel.getId());
			outResponse.put("username", userModel.getUsername());
			outResponse.put("email", userModel.getEmail());
			outResponse.put("roles", userModel.getUserRole());
			outResponse.put("status", 200);

			
			return ResponseEntity.ok( outResponse );	
		}
	


	public String validateAdmin(LoginModel data) {
		AdminModel user = adminModelRepository.findByEmailAndPassword(data.getEmail(),data.getPassword());

		if (user!=null) {
			if (user.getUserRole().equals("admin")) {
				return "admin/dashboard";
			} else {
				return "user/dashboard";
			}
		} else {
			return "/user/login?error";
		}
	}
  public UserModel findUserByEmail(String email){
		return userModelRepository.findUserByEmail(email);
  }


}
