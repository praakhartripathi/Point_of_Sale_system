package com.POS_system_backend.controller;

import com.POS_system_backend.configuration.JwtProvider;
import com.POS_system_backend.entity.User;
import com.POS_system_backend.service.UserService;
import com.POS_system_backend.service.impl.CustomUserImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomUserImpl customUserImpl;

    @Autowired
    private JwtProvider jwtProvider;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> createUserHandler(@RequestBody User user) throws Exception {
        User createdUser = userService.createUser(user);

        Authentication authentication = new UsernamePasswordAuthenticationToken(createdUser.getEmail(), createdUser.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        Map<String, String> authResponse = new HashMap<>();
        authResponse.put("jwt", token);
        authResponse.put("message", "Signup Success");
        authResponse.put("role", String.valueOf(createdUser.getRole()));

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<Map<String, String>> signin(@RequestBody Map<String, String> loginRequest) throws Exception {
        String username = loginRequest.get("email");
        String password = loginRequest.get("password");

        Authentication authentication = authenticate(username, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);
        
        User user = userService.findUserByEmail(username);

        Map<String, String> authResponse = new HashMap<>();
        authResponse.put("jwt", token);
        authResponse.put("message", "Signin Success");
        authResponse.put("role", String.valueOf(user.getRole()));

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails = customUserImpl.loadUserByUsername(username);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username");
        }

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
