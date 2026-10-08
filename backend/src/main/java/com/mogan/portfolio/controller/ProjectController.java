package com.mogan.portfolio.controller;

import com.mogan.portfolio.model.Project;
import com.mogan.portfolio.repo.ProjectRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = {
        "http://localhost:5500",
        "http://127.0.0.1:5500"
})
public class ProjectController {

    private final ProjectRepository projectRepository;

    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }


    // ======================================================
    // PUBLIC PROJECTS
    // ======================================================

    @GetMapping
    public List<Project> getProjects() {

        return projectRepository
                .findByPublishedTrueOrderByFeaturedDescIdAsc();
    }



    // ======================================================
    // SINGLE PROJECT
    // ======================================================

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProject(
            @PathVariable Long id) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Project not found"
                ));

        if (!project.published) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Project not found"
            );
        }

        return ResponseEntity.ok(project);
    }


    // ======================================================
    // LIKE
    // ======================================================



    @PostMapping("/{id}/like")
    public ResponseEntity<Project> likeProject(
            @PathVariable Long id) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Project not found"
                ));

        project.likes++;

        projectRepository.save(project);

        return ResponseEntity.ok(project);
    }


    // ======================================================
    // VIEW
    // ======================================================

    @PostMapping("/{id}/view")
    public ResponseEntity<Project> viewProject(
            @PathVariable Long id) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Project not found"
                ));

        project.views++;

        projectRepository.save(project);

        return ResponseEntity.ok(project);
    }
}