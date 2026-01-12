package com.POS_system_backend.controller;

import com.POS_system_backend.configuration.JwtProvider;
import com.POS_system_backend.dto.LoginRequest;
import com.POS_system_backend.dto.SignupRequest;
import com.POS_system_backend.entity.User;
import com.POS_system_backend.entity.enums.UserRole;
import com.POS_system_backend.service.UserService;
import com.POS_system_backend.service.impl.CustomUserImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class AuthControllerTest {

    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private CustomUserImpl customUserImpl;

    @Mock
    private JwtProvider jwtProvider;

    @InjectMocks
    private AuthController authController;

    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(authController).build();
    }

    @Test
    void createUserHandler_ShouldReturnJwt_WhenSignupIsSuccessful() throws Exception {
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setEmail("test@example.com");
        signupRequest.setPassword("password");
        signupRequest.setFullName("Test User");
        signupRequest.setRole(UserRole.ROLE_USER);

        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password");
        user.setFullName("Test User");
        user.setRole(UserRole.ROLE_USER);

        when(userService.createUser(any(User.class))).thenReturn(user);
        when(jwtProvider.generateToken(any(Authentication.class))).thenReturn("jwt_token");

        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(signupRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.jwt").value("jwt_token"))
                .andExpect(jsonPath("$.message").value("Signup Success"))
                .andExpect(jsonPath("$.role").value("ROLE_USER"));
    }

    @Test
    void signin_ShouldReturnJwt_WhenSigninIsSuccessful() throws Exception {
        String email = "test@example.com";
        String password = "password";
        
        User user = new User();
        user.setEmail(email);
        user.setPassword("encodedPassword");
        user.setRole(UserRole.ROLE_USER);

        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                email, "encodedPassword", Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));

        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail(email);
        loginRequest.setPassword(password);

        when(customUserImpl.loadUserByUsername(email)).thenReturn(userDetails);
        when(passwordEncoder.matches(password, "encodedPassword")).thenReturn(true);
        when(jwtProvider.generateToken(any(Authentication.class))).thenReturn("jwt_token");
        when(userService.findUserByEmail(email)).thenReturn(user);

        mockMvc.perform(post("/api/auth/signin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.jwt").value("jwt_token"))
                .andExpect(jsonPath("$.message").value("Signin Success"))
                .andExpect(jsonPath("$.role").value("ROLE_USER"));
    }
}
