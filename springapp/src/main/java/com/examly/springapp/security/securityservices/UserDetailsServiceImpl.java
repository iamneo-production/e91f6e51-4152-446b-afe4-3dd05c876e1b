package com.examly.springapp.security.securityservices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.examly.springapp.models.UserModel;
import com.examly.springapp.repository.UserModelRepository;
import com.examly.springapp.security.securityservices.UserDetailsImpl;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserModelRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserModel user = userRepo.findUserByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User doesn't exist with email: " + email);
        }
        return UserDetailsImpl.build(user);
    }
}
