package com.practice_jwt_3.service.jwt;

import com.practice_jwt_3.model.jwt.UserPrinciple;
import com.practice_jwt_3.model.User;
import com.practice_jwt_3.repository.IUserRepository;
import com.sun.security.auth.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    IUserRepository userRepository;

    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return UserPrinciple.build(userRepository.findByUsername(username));
    }

}
