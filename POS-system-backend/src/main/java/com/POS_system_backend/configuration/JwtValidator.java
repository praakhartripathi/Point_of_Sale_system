package com.POS_system_backend.configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class JwtValidator extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String path = request.getRequestURI();
        String method = request.getMethod();

        // ✅ 1. Allow preflight requests
        if ("OPTIONS".equalsIgnoreCase(method)) {
            filterChain.doFilter(request, response);
            return;
        }

        // ✅ 2. Allow public endpoints without JWT
        if (
            path.startsWith("/api/trial/signup") ||
            path.startsWith("/api/trial/login") ||
            path.startsWith("/api/auth/")
        ) {
            filterChain.doFilter(request, response);
            return;
        }

        // ✅ 3. Read Authorization header
        String header = request.getHeader(JwtConstants.JWT_HEADER);

        if (header == null || !header.startsWith("Bearer ")) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing or invalid Authorization header");
            return;
        }

        String jwt = header.substring(7);

        try {
            SecretKey key = Keys.hmacShaKeyFor(
                    JwtConstants.SECRET_KEY.getBytes(StandardCharsets.UTF_8)
            );

            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody();

            String email = claims.getSubject(); // or claims.get("email")
            String authorities = String.valueOf(claims.get("authorities"));

            List<GrantedAuthority> auths =
                    AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

            Authentication authentication =
                    new UsernamePasswordAuthenticationToken(email, null, auths);

            // ✅ 4. THIS LINE IS CRITICAL
            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (Exception e) {
            throw new BadCredentialsException("Invalid or expired JWT token");
        }

        // ✅ 5. Continue filter chain (NON-NEGOTIABLE)
        filterChain.doFilter(request, response);
    }
}
