package com.POS_system_backend.configuration;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.ExceptionHandlingConfigurer;
import org.springframework.security.config.annotation.web.configurers.SessionManagementConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.List;
import java.util.Collections;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .sessionManagement(new Customizer<SessionManagementConfigurer<HttpSecurity>>() {
                @Override
                public void customize(SessionManagementConfigurer<HttpSecurity> management) {
                    management.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                }
            })
            .csrf(new Customizer<CsrfConfigurer<HttpSecurity>>() {
                @Override
                public void customize(CsrfConfigurer<HttpSecurity> csrf) {
                    csrf.disable();
                }
            })
            .cors(new Customizer<CorsConfigurer<HttpSecurity>>() {
                @Override
                public void customize(CorsConfigurer<HttpSecurity> cors) {
                    cors.configurationSource(corsConfigurationSource());
                }
            })

            .authorizeHttpRequests(new Customizer<AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry>() {
                @Override
                public void customize(AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry auth) {
                    auth
                        .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()

                        .requestMatchers(
                            "/api/auth/**",
                            "/api/public/**",
                            "/api/trial/signup",
                            "/api/trial/signin"
                        ).permitAll()

                        .requestMatchers(
                            "/api/trial/profile",
                            "/api/trial/change-password"
                        ).authenticated()
                        .requestMatchers("/api/**").authenticated()
                        .anyRequest().permitAll();
                }
            })

        .addFilterBefore(new JwtValidator(), BasicAuthenticationFilter.class)

        .exceptionHandling(new Customizer<ExceptionHandlingConfigurer<HttpSecurity>>() {
            @Override
            public void customize(ExceptionHandlingConfigurer<HttpSecurity> e) {
                e.authenticationEntryPoint(
                    new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)
                );
            }
        });

        return http.build();
    }


   private CorsConfigurationSource corsConfigurationSource() {
    return request -> {
        CorsConfiguration cfg = new CorsConfiguration();

        cfg.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost:5173", "http://localhost:5174"));
        cfg.setAllowedMethods(List.of(
                "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"
        ));

        cfg.setAllowedHeaders(List.of("*"));
        cfg.setExposedHeaders(List.of("Authorization"));
        cfg.setAllowCredentials(true);
        cfg.setMaxAge(3600L);

        return cfg;
    };
}


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}