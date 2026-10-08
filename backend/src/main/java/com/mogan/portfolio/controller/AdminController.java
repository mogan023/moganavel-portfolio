package com.mogan.portfolio.controller;

import com.mogan.portfolio.model.ContactMessage;
import com.mogan.portfolio.model.PortfolioItem;
import com.mogan.portfolio.model.Project;
import com.mogan.portfolio.model.SiteSetting;
import com.mogan.portfolio.repo.ContactMessageRepository;
import com.mogan.portfolio.repo.PortfolioItemRepository;
import com.mogan.portfolio.repo.ProjectRepository;
import com.mogan.portfolio.repo.SiteSettingRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final ProjectRepository pr;
    private final PortfolioItemRepository ir;
    private final ContactMessageRepository mr;
    private final SiteSettingRepository sr;

    private final String username;
    private final String password;

    public AdminController(
            ProjectRepository p,
            PortfolioItemRepository i,
            ContactMessageRepository m,
            SiteSettingRepository s,
            @Value("${app.admin.username}") String u,
            @Value("${app.admin.password}") String pw
    ) {
        pr = p;
        ir = i;
        mr = m;
        sr = s;
        username = u;
        password = pw;
    }


    // =========================================================
    // ADMIN LOGIN
    // =========================================================

    @PostMapping("/login")
    public Map<String, Object> login(
            @RequestBody Map<String, String> body,
            HttpServletRequest request
    ) {

        if (!username.equals(body.get("username"))
                || !password.equals(body.get("password"))) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid credentials"
            );
        }

        var auth =
                UsernamePasswordAuthenticationToken.authenticated(
                        username,
                        null,
                        List.of(
                                new SimpleGrantedAuthority("ROLE_ADMIN")
                        )
                );

        SecurityContext context =
                SecurityContextHolder.createEmptyContext();

        context.setAuthentication(auth);

        SecurityContextHolder.setContext(context);

        // Prevent session fixation
        request.changeSessionId();

        request.getSession(true)
                .setAttribute(
                        "SPRING_SECURITY_CONTEXT",
                        context
                );

        return Map.of(
                "success", true,
                "message", "Login successful"
        );
    }


    // =========================================================
    // CHECK LOGIN STATUS
    // =========================================================

    @GetMapping("/me")
    public Map<String, Object> me() {

        var authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        boolean authenticated =
                authentication != null
                        && authentication.isAuthenticated()
                        && !(authentication
                        instanceof AnonymousAuthenticationToken);

        return Map.of(
                "authenticated",
                authenticated
        );
    }


    // =========================================================
    // LOGOUT
    // =========================================================

    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            HttpServletRequest request
    ) {

        request.getSession().invalidate();

        SecurityContextHolder.clearContext();

        return ResponseEntity.ok(
                Map.of("success", true)
        );
    }


    // =========================================================
    // PROJECTS
    // =========================================================

    @GetMapping("/projects")
    public List<Project> projects() {

        return pr.findAll();
    }


    @PostMapping("/projects")
    public Project create(
            @RequestBody Project x
    ) {

        x.id = null;

        return pr.save(x);
    }


    @PutMapping("/projects/{id}")
    public Project update(
            @PathVariable Long id,
            @RequestBody Project x
    ) {

        Project existing =
                pr.findById(id)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Project not found"
                                )
                        );

        existing.slug = x.slug;
        existing.title = x.title;
        existing.category = x.category;
        existing.type = x.type;
        existing.projectLevel = x.projectLevel;
        existing.imagePath = x.imagePath;
        existing.githubUrl = x.githubUrl;
        existing.liveUrl = x.liveUrl;
        existing.videoUrl = x.videoUrl;
        existing.description = x.description;
        existing.technologies = x.technologies;
        existing.featured = x.featured;
        existing.published = x.published;

        // IMPORTANT:
        // likes and views are intentionally preserved.

        return pr.save(existing);
    }


    @DeleteMapping("/projects/{id}")
    public ResponseEntity<?> delete(
            @PathVariable Long id
    ) {

        pr.deleteById(id);

        return ResponseEntity.noContent().build();
    }


    // =========================================================
    // PORTFOLIO CONTENT
    // =========================================================

    @GetMapping("/content")
    public List<PortfolioItem> content() {

        return ir.findAll();
    }


    @PostMapping("/content")
    public PortfolioItem createContent(
            @RequestBody PortfolioItem x
    ) {

        x.id = null;

        return ir.save(x);
    }


    @PutMapping("/content/{id}")
    public PortfolioItem updateContent(
            @PathVariable Long id,
            @RequestBody PortfolioItem x
    ) {

        x.id = id;

        return ir.save(x);
    }


    @DeleteMapping("/content/{id}")
    public ResponseEntity<?> deleteContent(
            @PathVariable Long id
    ) {

        ir.deleteById(id);

        return ResponseEntity.noContent().build();
    }


    // =========================================================
    // CONTACT MESSAGES
    // =========================================================

    @GetMapping("/messages")
    public List<ContactMessage> messages() {

        return mr.findAllByOrderByCreatedAtDesc();
    }


    @PutMapping("/messages/{id}/read")
    public ResponseEntity<?> read(
            @PathVariable Long id
    ) {

        var message =
                mr.findById(id)
                        .orElseThrow();

        message.read = true;

        mr.save(message);

        return ResponseEntity.ok(message);
    }


    // =========================================================
    // SITE SETTINGS
    // =========================================================

    @GetMapping("/settings")
    public Map<String, String> settings() {

        Map<String, String> result =
                new LinkedHashMap<>();

        sr.findAll().forEach(
                x -> result.put(
                        x.settingKey,
                        x.settingValue
                )
        );

        return result;
    }


    @PutMapping("/settings")
    public Map<String, String> settings(
            @RequestBody Map<String, String> body
    ) {

        body.forEach((key, value) -> {

            SiteSetting setting =
                    sr.findById(key)
                            .orElseGet(() -> {

                                SiteSetting newSetting =
                                        new SiteSetting();

                                newSetting.settingKey = key;

                                return newSetting;
                            });

            setting.settingValue = value;

            sr.save(setting);
        });

        return body;
    }
}