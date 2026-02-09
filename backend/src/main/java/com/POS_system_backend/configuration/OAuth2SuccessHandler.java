package com.POS_system_backend.configuration;

import com.POS_system_backend.entity.User;
import com.POS_system_backend.entity.enums.UserRole;
import com.POS_system_backend.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @Value("${app.frontend.url:http://localhost:5173}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        Optional<User> userOptional = userRepository.findByEmail(email);
        User user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
            // Update provider if not set
            if (user.getProvider() == null) {
                user.setProvider("GOOGLE");
                userRepository.save(user);
            }
        } else {
            user = new User();
            user.setEmail(email);
            user.setFullName(name);
            user.setRole(UserRole.ROLE_USER); // Default role for new OAuth users
            user.setPassword(""); // OAuth users don't have a password
            user.setProvider("GOOGLE");
            user = userRepository.save(user);
        }

        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(user.getRole().toString()));
        Authentication newAuth = new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(email, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(newAuth);

        String token = jwtProvider.generateToken(newAuth);

        String targetUrl = UriComponentsBuilder
                .fromUriString(frontendUrl)
                .path("/oauth-success")
                .queryParam("token", token)
                .queryParam("role", user.getRole())
                .queryParam("name", user.getFullName())
                .queryParam("email", user.getEmail())
                .build()
                .toUriString();

        response.sendRedirect(targetUrl);
    }
}
