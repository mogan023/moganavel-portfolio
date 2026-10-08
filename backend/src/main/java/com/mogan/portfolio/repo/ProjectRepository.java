package com.mogan.portfolio.repo;

import com.mogan.portfolio.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    Optional<Project> findBySlug(String slug);

    List<Project> findByPublishedTrueOrderByFeaturedDescIdAsc();
}