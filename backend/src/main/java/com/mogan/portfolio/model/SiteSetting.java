package com.mogan.portfolio.model;
import jakarta.persistence.*;
@Entity @Table(name="site_settings") public class SiteSetting{ @Id public String settingKey; @Column(length=6000) public String settingValue; }
