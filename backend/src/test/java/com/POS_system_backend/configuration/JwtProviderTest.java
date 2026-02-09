package com.POS_system_backend.configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class JwtProviderTest {

    private JwtProvider jwtProvider;
    private SecretKey key;

    @BeforeEach
    void setUp() {
        jwtProvider = new JwtProvider();
        key = Keys.hmacShaKeyFor(JwtConstants.SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }

    @Test
    void generateToken_ShouldReturnValidToken() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        Authentication auth = new UsernamePasswordAuthenticationToken("test@example.com", "password", authorities);

        String token = jwtProvider.generateToken(auth);

        assertNotNull(token);

        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        assertEquals("test@example.com", claims.get("email"));
        assertEquals("ROLE_USER", claims.get("authorities"));
    }

    @Test
    void getEmailFromToken_ShouldReturnCorrectEmail() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        Authentication auth = new UsernamePasswordAuthenticationToken("test@example.com", "password", authorities);
        String token = jwtProvider.generateToken(auth);

        // Add "Bearer " prefix as expected by getEmailFromToken
        String bearerToken = "Bearer " + token;

        String email = jwtProvider.getEmailFromToken(bearerToken);

        assertEquals("test@example.com", email);
    }
}
