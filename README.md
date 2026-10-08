# Upgraded Portfolio — Java Full Stack + Admin CMS

This package upgrades the original HTML/CSS/JavaScript portfolio without replacing its visual identity.

## Included
- Existing portfolio pages, assets, certificates and project media
- Java 21 + Spring Boot REST backend
- MySQL-ready persistence (H2 file database is the default for first local run)
- Secure session-based admin login
- Admin dashboard at `/admin/`
- Project CRUD, featured projects, GitHub/live links, ordering fields
- Project likes with one-like-per-browser visitor cookie and visible like counts
- Project view counters and admin analytics
- Structured content management for About, Skills, Education, Experience, Certifications and Achievements
- Contact messages stored in the database
- Floating built-in portfolio assistant (no OpenAI API, no external AI key)
- Secure backend contact handling; the original EmailJS client integration was removed
- Environment-variable configuration

## 1. Prerequisites
- Java 21+
- Maven 3.9+
- MySQL 8+ if you want MySQL immediately; otherwise H2 file mode works out of the box
- VS Code / IntelliJ IDEA / Eclipse

## 2. Run the backend first
Open a terminal in `backend/` and run:

```bash
mvn spring-boot:run
```

The API runs on `http://localhost:8080`.

For the easiest frontend test, serve the project root with a local static server (do not double-click the HTML files):

```bash
python -m http.server 5500
```

Then open `http://localhost:5500/`.

## 3. Admin login
Open `http://localhost:5500/admin/` while the backend is running.

Default local credentials:
- Username: `admin@example.com`
- Password: `ChangeMe123!`

**Change the password before deployment** using `ADMIN_PASSWORD`.

## 4. MySQL configuration
Create a database, then set these environment variables before starting Spring Boot:

```text
DB_URL=jdbc:mysql://localhost:3306/mogan_portfolio?useSSL=false&serverTimezone=UTC
DB_USERNAME=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_DIALECT=org.hibernate.dialect.MySQLDialect
ADMIN_USERNAME=your-admin-email
ADMIN_PASSWORD=your-strong-admin-password
CORS_ALLOWED_ORIGINS=https://your-domain.com
```

## 5. Email / contact
The original frontend contained EmailJS configuration. It has intentionally been removed from client-side JavaScript.

Contact messages are stored in MySQL/H2 through the backend. Optional SMTP notification can be configured with `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, and `MAIL_PASSWORD`. Never put these values into frontend JS or GitHub.

## 6. Important deployment note
Netlify is excellent for the static frontend, but the Spring Boot API and MySQL database need a backend/database host. A typical production setup is:

- Frontend: Netlify
- Backend: Render / Railway / Fly.io / VPS / another Java-capable host
- Database: managed MySQL
- Domain: point the domain to the frontend host
- Configure `CORS_ALLOWED_ORIGINS` with the exact frontend domain

Do not commit `.env` files, passwords, database credentials or SMTP credentials.

## 7. Built-in assistant
The assistant is intentionally not an OpenAI integration. It uses server-side intent/keyword matching over portfolio content stored in the database. Updating structured content in the admin portal updates the knowledge used by the assistant.

## 8. Project likes
Likes are stored server-side. A browser receives a random `visitor_id` cookie, and a visitor can toggle their like for each project. This is a lightweight portfolio-level anti-repeat mechanism, not a high-security identity system.

## 9. What to customize first
1. Change admin password.
2. Fill your email and LinkedIn in Site Settings.
3. Add/edit education, experience, certifications and achievements.
4. Update project GitHub/live links and descriptions.
5. Mark your strongest projects as Featured.
6. Test contact, assistant, likes and admin editing locally.
7. Deploy backend + database.
8. Connect the new domain only after the production build is tested.
