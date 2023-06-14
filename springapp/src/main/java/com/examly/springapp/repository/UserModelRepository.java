package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.examly.springapp.models.UserModel;

import java.util.Optional;

@Repository
public interface UserModelRepository extends JpaRepository<UserModel, Integer> {

    UserModel findByEmailAndPassword(String email, String password);
    UserModel findByEmail(String email);

    UserModel findUserByEmail(String username);

}
