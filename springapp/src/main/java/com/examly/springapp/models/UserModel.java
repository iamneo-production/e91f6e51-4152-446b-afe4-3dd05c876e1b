package com.examly.springapp.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class UserModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	String email;
	String password;
	String username;
	String mobileNumber;
	String userRole;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}


	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getMobileNumber() {
		return mobileNumber;
	}
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	public String getUserRole() {
		return userRole;
	}
	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}

}





//************************************PRATIK RAJ SONAR TEST PASSED*************************************/
// package com.examly.springapp.models;
// import javax.persistence.Entity;
// import javax.persistence.Id;
// import javax.persistence.Table;
// import javax.persistence.*;

// import lombok.AllArgsConstructor;
// import lombok.Builder;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Entity
// @Data
// @Builder
// @AllArgsConstructor
// @NoArgsConstructor
// @Table(name="user")
// public class UserModel {
    
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;
//     private String email;
//     private String username;
//     private String password;
// 	private String mobileNumber;
// 	@Enumerated(EnumType.STRING)
//     private String userRole;
    
	// private String userRole;
	// public void setUserRole(String userRole) {
	// 	this.userRole = userRole;
	// }
// }
