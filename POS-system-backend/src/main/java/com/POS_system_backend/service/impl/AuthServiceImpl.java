package com.POS_system_backend.service.impl;

import com.POS_system_backend.entity.User;
import com.POS_system_backend.repository.UserRepository;
import com.POS_system_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User createUser(User user) throws Exception {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new Exception("Email is already used with another account");
        }

        User createdUser = new User();
        createdUser.setEmail(user.getEmail());
        createdUser.setFullName(user.getFullName());
        createdUser.setRole(user.getRole());
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
        createdUser.setPhone(user.getPhone());
        
        return userRepository.save(createdUser);
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new Exception("User not found with email: " + email);
        }
        return user.get();
    }

    @Override
    public void updatePassword(String email, String newPassword) throws Exception {
        User user = findUserByEmail(email);
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    public void forgotPassword(String email) throws Exception {
        User user = findUserByEmail(email);
        // Logic to send email with reset link or temporary password
        // For now, we'll just print to console
        System.out.println("Reset password link sent to: " + email);
    }
}
