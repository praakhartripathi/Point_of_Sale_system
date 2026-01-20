package com.POS_system_backend.controller;

import com.POS_system_backend.configuration.JwtProvider;
import com.POS_system_backend.dto.*;
import com.POS_system_backend.entity.User;
import com.POS_system_backend.entity.enums.UserRole;
import com.POS_system_backend.service.AuthService;
import com.POS_system_backend.service.impl.CustomUserImpl;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomUserImpl customUserImpl;

    @Autowired
    private JwtProvider jwtProvider;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignupRequest signupRequest) throws Exception {
        User user = new User();
        user.setFullName(signupRequest.getFullName());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(signupRequest.getPassword());
        user.setPhone(signupRequest.getPhone());
        user.setRole(signupRequest.getRole());

        User createdUser = authService.createUser(user);

        Authentication authentication = new UsernamePasswordAuthenticationToken(createdUser.getEmail(), createdUser.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse(token, "Signup Success", String.valueOf(createdUser.getRole()));

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest loginRequest) throws Exception {
        String username = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Authentication authentication = authenticate(username, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);
        
        User user = authService.findUserByEmail(username);

        AuthResponse authResponse = new AuthResponse(token, "Signin Success", String.valueOf(user.getRole()));

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestBody UpdatePasswordRequest request) throws Exception {
        authService.updatePassword(request.getEmail(), request.getNewPassword());
        return new ResponseEntity<>("Password updated successfully", HttpStatus.OK);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) throws Exception {
        authService.forgotPassword(request.getEmail());
        return new ResponseEntity<>("Password reset link sent to your email", HttpStatus.OK);
    }

    @GetMapping("/oauth2/success")
    public void oauth2Success(OAuth2AuthenticationToken oauth2Token, HttpServletResponse response) throws Exception {
        if (oauth2Token == null) {
            response.sendRedirect("http://localhost:5173/login?error=unauthorized");
            return;
        }

        Map<String, Object> attributes = oauth2Token.getPrincipal().getAttributes();
        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");

        User user;
        try {
            user = authService.findUserByEmail(email);
        } catch (Exception e) {
            // User not found, create a new one
            user = new User();
            user.setEmail(email);
            user.setFullName(name);
            user.setPassword(passwordEncoder.encode("OAUTH2_DEFAULT_PASSWORD")); // Set a dummy password
            user.setRole(UserRole.ROLE_USER); // Default role
            user = authService.createUser(user);
        }

        // Authenticate the user in our system
        UserDetails userDetails = customUserImpl.loadUserByUsername(email);
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);
        
        // Redirect to React Frontend with Token
        response.sendRedirect("http://localhost:5173/oauth/callback?token=" + token + "&role=" + user.getRole());
    }

    @GetMapping("/oauth2/failure")
    public void oauth2Failure(HttpServletResponse response) throws IOException {
        response.sendRedirect("http://localhost:5173/login?error=oauth_failed");
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
