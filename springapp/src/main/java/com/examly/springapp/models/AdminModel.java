package com.examly.springapp.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class AdminModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
			int id;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	String email;
	String password;
	
	String mobileNumber;
	String userRole;
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





//************************************************* PRATIK RAJ SOANR TEST **********************************/

// package com.examly.springapp.models;
// import java.lang.annotation.Inherited;

// import javax.annotation.processing.Generated;
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
// @Table(name = "Admin")
// public class AdminModel {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;
//     @Column(unique = true)
//     private String email;
//     private String password;
//     private String mobileNumber;
//     @Enumerated(EnumType.STRING)
//     private UserRole userRole;
// }
