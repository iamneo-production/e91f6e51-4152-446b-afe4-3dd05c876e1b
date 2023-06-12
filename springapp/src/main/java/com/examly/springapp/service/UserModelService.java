package com.examly.springapp.service;

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



@Service
public class UserModelService {


	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	UserModelRepository userModelRepository;
	@Autowired
	AdminModelRepository adminModelRepository;

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

	public String validateUser(LoginModel data) {
		UserModel user = userModelRepository.findByEmail(data.getEmail());

		if (user == null) {
		// 	return new ResponseEntity<>(userModel.getUserRole()+" " +"The User Is Not Present",HttpStatus.BAD_REQUEST);
		// }


			if (user.getUserRole().equals("admin")) {
				return "admin/dashboard";
			} else {
				return "user/dashboard";
			}
		} else {
			return "/user/login?error";
		}
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
