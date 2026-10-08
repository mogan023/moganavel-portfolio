package com.mogan.portfolio.model;
import jakarta.persistence.*;import java.time.*;
@Entity @Table(name="project_likes",uniqueConstraints=@UniqueConstraint(columnNames={"project_id","visitor_id"})) public class ProjectLike{ @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id; @ManyToOne(fetch=FetchType.LAZY) public Project project; @Column(name="visitor_id",nullable=false) public String visitorId; public Instant createdAt=Instant.now(); }
