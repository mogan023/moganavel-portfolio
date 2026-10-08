package com.mogan.portfolio.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session
                                .sessionCreationPolicy(
                                        SessionCreationPolicy.IF_REQUIRED
                                )
                                .sessionFixation(fixation ->
                                        fixation.changeSessionId()
                                )
                                .maximumSessions(1)
                                .maxSessionsPreventsLogin(false)
                )

                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(
                                "/api/public/**",
                                "/api/projects/**",
                                "/api/assistant"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/projects/**"
                        ).permitAll()

                        .requestMatchers(
                                "/api/admin/login"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        ).permitAll()

                        .requestMatchers(
                                "/api/admin/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                "/admin/**",
                                "/",
                                "/index.html",
                                "/css/**",
                                "/js/**",
                                "/images/**",
                                "/pages/**",
                                "/videos/**"
                        ).permitAll()

                        .anyRequest().authenticated()
                )

                .formLogin(form -> form.disable())

                .logout(logout ->
                        logout
                                .logoutUrl("/api/admin/logout")
                                .invalidateHttpSession(true)
                                .deleteCookies("JSESSIONID")
                                .logoutSuccessHandler(
                                        (request, response, authentication) ->
                                                response.setStatus(204)
                                )
                );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(List.of(
                "http://localhost:5500",
                "http://127.0.0.1:5500"
        ));

        configuration.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
        ));

        configuration.setAllowedHeaders(List.of(
                "Content-Type",
                "Authorization"
        ));

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }
}