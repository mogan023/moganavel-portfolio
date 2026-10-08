package com.mogan.portfolio.model;
import jakarta.persistence.Column;
import jakarta.persistence.*;import java.time.*;
@Entity @Table(name="contact_messages") public class ContactMessage{ @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id; public String name,email,subject; @Column(length=5000) public String message;
    @Column(name = "is_read")
    public boolean read = false; public Instant createdAt=Instant.now(); }
