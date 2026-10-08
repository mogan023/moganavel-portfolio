package com.mogan.portfolio.controller;

import com.mogan.portfolio.model.PortfolioItem;
import com.mogan.portfolio.model.Project;
import com.mogan.portfolio.repo.PortfolioItemRepository;
import com.mogan.portfolio.repo.ProjectRepository;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/assistant")
@CrossOrigin
public class AssistantController {

    private final ProjectRepository projectRepository;
    private final PortfolioItemRepository contentRepository;

    public AssistantController(
            ProjectRepository projectRepository,
            PortfolioItemRepository contentRepository
    ) {
        this.projectRepository = projectRepository;
        this.contentRepository = contentRepository;
    }

    @GetMapping
    public Map<String, Object> ask(
            @RequestParam String question
    ) {

        String q = question
                .toLowerCase()
                .trim();

        List<Project> projects =
                projectRepository.findAll()
                        .stream()
                        .filter(p -> p.published)
                        .toList();

        List<PortfolioItem> content =
                contentRepository.findAll()
                        .stream()
                        .filter(c -> c.published)
                        .toList();

        String answer;

        /*
         * First try to identify a specific project.
         */
        Project matchedProject =
                findMatchingProject(q, projects);

        if (matchedProject != null) {

            answer = buildProjectResponse(matchedProject);

        } else if (containsAny(
                q,
                "project",
                "projects",
                "work",
                "portfolio"
        )) {

            answer = buildProjectsResponse(projects);

        } else if (containsAny(
                q,
                "skill",
                "skills",
                "technology",
                "technologies",
                "tech"
        )) {

            answer = buildContentResponse(
                    content,
                    "SKILL",
                    "Here are the main technical skills:"
            );

        } else if (containsAny(
                q,
                "education",
                "study",
                "degree",
                "college"
        )) {

            answer = buildContentResponse(
                    content,
                    "EDUCATION",
                    "Here is the education background:"
            );

        } else if (containsAny(
                q,
                "experience",
                "internship",
                "work experience"
        )) {

            answer = buildContentResponse(
                    content,
                    "EXPERIENCE",
                    "Here is the experience information:"
            );

        } else if (containsAny(
                q,
                "about",
                "who are you",
                "who is",
                "introduce"
        )) {

            answer = buildContentResponse(
                    content,
                    "ABOUT",
                    "Here is a quick introduction:"
            );

        } else if (containsAny(
                q,
                "contact",
                "email",
                "reach",
                "hire"
        )) {

            answer =
                    "You can use the Contact section of the portfolio to get in touch.";

        } else {

            answer =
                    "I can help you explore this portfolio. " +
                            "You can ask me about projects, skills, education, " +
                            "experience, about information, or contact details.";
        }

        Map<String, Object> response =
                new LinkedHashMap<>();

        response.put("question", question);
        response.put("answer", answer);

        return response;
    }


    /*
     * Find a project mentioned in the user's question.
     */
    private Project findMatchingProject(
            String question,
            List<Project> projects
    ) {

        Project bestMatch = null;
        int bestScore = 0;

        for (Project project : projects) {

            if (project.title == null ||
                    project.title.isBlank()) {
                continue;
            }

            String title =
                    project.title.toLowerCase();

            int score = 0;

            /*
             * 1. Exact project title
             */
            if (question.contains(title)) {
                return project;
            }

            /*
             * 2. Match words from project title
             */
            String[] titleWords =
                    title.split("[^a-z0-9]+");

            for (String word : titleWords) {

                if (word.length() < 4) {
                    continue;
                }

                if (question.contains(word)) {
                    score += 3;
                }
            }

            /*
             * 3. Match project category
             */
            if (project.category != null &&
                    !project.category.isBlank()) {

                String category =
                        project.category.toLowerCase();

                String[] categoryWords =
                        category.split("[^a-z0-9]+");

                for (String word : categoryWords) {

                    if (word.length() < 4) {
                        continue;
                    }

                    if (question.contains(word)) {
                        score += 2;
                    }
                }
            }

            /*
             * 4. Match important words from description
             */
            if (project.description != null &&
                    !project.description.isBlank()) {

                String description =
                        project.description.toLowerCase();

                String[] descriptionWords =
                        description.split("[^a-z0-9]+");

                for (String word : descriptionWords) {

                    if (word.length() < 6) {
                        continue;
                    }

                    if (question.contains(word)) {
                        score += 1;
                    }
                }
            }

            if (score > bestScore) {

                bestScore = score;
                bestMatch = project;
            }
        }

        /*
         * Require enough evidence before
         * deciding that a project was mentioned.
         */
        if (bestScore >= 3) {
            return bestMatch;
        }

        return null;
    }


    /*
     * Build response for a specific project.
     */
    private String buildProjectResponse(
            Project project
    ) {

        StringBuilder response =
                new StringBuilder();

        response.append("Here is what I found about ")
                .append(project.title)
                .append(":\n\n");


        if (project.description != null &&
                !project.description.isBlank()) {

            response.append("Description:\n")
                    .append(project.description)
                    .append("\n\n");
        }


        if (project.technologies != null &&
                !project.technologies.isBlank()) {

            response.append("Technologies:\n")
                    .append(
                            project.technologies
                                    .replace("|", ", ")
                    )
                    .append("\n\n");
        }


        if (project.category != null &&
                !project.category.isBlank()) {

            response.append("Category: ")
                    .append(project.category)
                    .append("\n");
        }


        if (project.githubUrl != null &&
                !project.githubUrl.isBlank() &&
                !project.githubUrl.equals("#")) {

            response.append("\nGitHub: ")
                    .append(project.githubUrl)
                    .append("\n");
        }


        if (project.liveUrl != null &&
                !project.liveUrl.isBlank() &&
                !project.liveUrl.equals("#")) {

            response.append("Live Demo: ")
                    .append(project.liveUrl)
                    .append("\n");
        }


        return response.toString().trim();
    }


    private boolean containsAny(
            String text,
            String... words
    ) {

        for (String word : words) {

            if (text.contains(word)) {
                return true;
            }
        }

        return false;
    }


    private String buildProjectsResponse(
            List<Project> projects
    ) {

        if (projects.isEmpty()) {

            return "There are currently no published projects.";
        }

        String projectList =
                projects.stream()
                        .limit(8)
                        .map(p ->
                                "• " +
                                        p.title +
                                        (p.category != null
                                                ? " — " + p.category
                                                : "")
                        )
                        .collect(
                                Collectors.joining("\n")
                        );

        return
                "Here are the published projects:\n\n" +
                        projectList;
    }


    private String buildContentResponse(
            List<PortfolioItem> content,
            String type,
            String heading
    ) {

        List<PortfolioItem> matching =
                content.stream()
                        .filter(c ->
                                type.equalsIgnoreCase(c.type)
                        )
                        .sorted(
                                Comparator.comparing(
                                        c -> c.sortOrder
                                )
                        )
                        .toList();

        if (matching.isEmpty()) {

            return "There is currently no information available for this section.";
        }

        String result =
                matching.stream()
                        .limit(8)
                        .map(c -> {

                            String value =
                                    c.title != null
                                            ? c.title
                                            : "";

                            if (c.description != null &&
                                    !c.description.isBlank()) {

                                value +=
                                        " — " +
                                                c.description;
                            }

                            return "• " + value;
                        })
                        .collect(
                                Collectors.joining("\n")
                        );

        return heading +
                "\n\n" +
                result;
    }
}