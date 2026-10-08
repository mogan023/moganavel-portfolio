package com.mogan.portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(unique = true, nullable = false)
    public String slug;

    public String title;
    public String category;
    public String type;

    public String projectLevel;

    public String imagePath;
    public String githubUrl;
    public String liveUrl;
    public String videoUrl;

    @Column(length = 4000)
    public String description;

    @Column(length = 2000)
    public String technologies;

    public boolean featured = true;
    public boolean published = true;

    public long likes = 0;
    public long views = 0;
}