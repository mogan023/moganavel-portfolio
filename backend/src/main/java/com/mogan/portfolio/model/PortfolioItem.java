package com.mogan.portfolio.model;
import jakarta.persistence.*;
@Entity @Table(name="portfolio_items") public class PortfolioItem{ @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id; @Column(nullable=false) public String type; public String title,subtitle; @Column(length=6000) public String description; @Column(length=6000) public String details; public int sortOrder=0; public boolean published=true; }
