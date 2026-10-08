const PROJECTS_API = "http://localhost:8080/api/projects";

const projectsGrid = document.querySelector(".projects-grid");
const filterButtons = document.querySelectorAll(".project-filter-btn");


/* =========================================================
   LOAD PROJECTS
========================================================= */

async function loadProjectsFromAPI() {

    if (!projectsGrid) return;

    try {

        const response = await fetch(PROJECTS_API);

        if (!response.ok) {
            throw new Error("Unable to load projects");
        }

        const projects = await response.json();

        renderProjects(projects);

        updateProjectFilters(projects);

    } catch (error) {

        console.error(
            "Project loading error:",
            error
        );

    }
}


/* =========================================================
   RENDER PROJECTS
========================================================= */

function renderProjects(projects) {

    projectsGrid.innerHTML = "";


    projects.forEach((project, index) => {

        const number =
            String(index + 1).padStart(2, "0");


        const type =
            project.type || "Project";


        const category =
            project.category || "Project";


        const image =
            project.imagePath
                ? "../" + project.imagePath
                : "../images/projects/default.jpg";


        /* -----------------------------------------
           TECHNOLOGIES
        ----------------------------------------- */

        const technologies =
            Array.isArray(project.technologies)
                ? project.technologies
                : String(
                    project.technologies || ""
                )
                    .split(/[|,]/)
                    .map(
                        tech => tech.trim()
                    )
                    .filter(Boolean);


        /* -----------------------------------------
           URLS
        ----------------------------------------- */

        const github =
            project.githubUrl &&
            project.githubUrl !== "#"
                ? project.githubUrl
                : "";


        const live =
            project.liveUrl &&
            project.liveUrl !== "#"
                ? project.liveUrl
                : "";


        const video =
            project.videoUrl &&
            project.videoUrl !== "#"
                ? project.videoUrl
                : "";


        /* -----------------------------------------
           PROJECT LEVEL
        ----------------------------------------- */

        const projectLevel =
            String(
                project.projectLevel ||
                "major"
            ).toLowerCase();


        /* -----------------------------------------
           CARD
        ----------------------------------------- */

        const card =
            document.createElement("article");


        card.className =
            "project-card";


        card.dataset.category =
            projectLevel;


        card.dataset.projectId =
            project.id;


        card.innerHTML = `

            <div class="project-image">

                <img
                    src="${escapeHTML(image)}"
                    alt="${escapeHTML(project.title)}"
                >


                <span class="project-number">
                    ${number}
                </span>


                <span class="project-type">
                    ${escapeHTML(type)}
                </span>

            </div>


            <div class="project-content">

                <span class="project-category">
                    ${escapeHTML(category)}
                </span>


                <h2>
                    ${escapeHTML(project.title)}
                </h2>


                <p>
                    ${escapeHTML(
            project.description || ""
        )}
                </p>


                <div class="project-tech">

                    ${
            technologies
                .map(
                    tech =>
                        `<span>${escapeHTML(tech)}</span>`
                )
                .join("")
        }

                </div>


                <div class="project-actions">

                    ${
            github
                ? `
                                <a
                                    href="${escapeHTML(github)}"
                                    class="project-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i class="fa-brands fa-github"></i>
                                    GitHub
                                </a>
                            `
                : ""
        }


                    ${
            live
                ? `
                                <a
                                    href="${escapeHTML(live)}"
                                    class="project-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                    Live Demo
                                </a>
                            `
                : ""
        }


                    ${
            video
                ? `
                                <button
                                    type="button"
                                    class="project-link watch-demo-btn"
                                    data-video="${escapeHTML(video)}"
                                    data-title="${escapeHTML(project.title)}"
                                >
                                    <i class="fa-solid fa-play"></i>
                                    Watch Demo
                                </button>
                            `
                : ""
        }

                </div>


                <div class="project-stats">

                    <button
                        type="button"
                        class="project-like-btn"
                        data-like-id="${project.id}"
                        aria-label="Like ${escapeHTML(project.title)}"
                    >
                        <i class="fa-regular fa-heart"></i>
                        <span class="like-count">
                            ${project.likes ?? 0}
                        </span>
                    </button>


                    <span class="project-view-count">
                        <i class="fa-regular fa-eye"></i>
                        <span class="view-count">
                            ${project.views ?? 0}
                        </span>
                    </span>

                </div>

            </div>
        `;


        projectsGrid.appendChild(card);


        /* -----------------------------------------
           OPEN PROJECT DETAILS
        ----------------------------------------- */

        card.addEventListener("click", event => {

            if (
                event.target.closest("a") ||
                event.target.closest("button")
            ) {
                return;
            }

            window.location.href =
                `project-details.html?id=${project.id}`;
        });


        /* -----------------------------------------
           VIEW COUNT
        ----------------------------------------- */

        registerProjectView(project);


        /* -----------------------------------------
           LIKE BUTTON
        ----------------------------------------- */

        const likeButton =
            card.querySelector(
                "[data-like-id]"
            );


        likeButton.addEventListener(
            "click",
            () => likeProject(
                project,
                likeButton
            )
        );

    });
}


/* =========================================================
   LIKE PROJECT
========================================================= */

async function likeProject(
    project,
    button
) {

    const storageKey =
        `portfolio-liked-${project.id}`;


    /* Already liked */

    if (
        localStorage.getItem(
            storageKey
        ) === "true"
    ) {

        return;

    }


    try {

        button.disabled = true;


        const response =
            await fetch(
                `${PROJECTS_API}/${project.id}/like`,
                {
                    method: "POST"
                }
            );


        if (!response.ok) {
            throw new Error(
                "Unable to like project"
            );
        }


        const updatedProject =
            await response.json();


        const count =
            button.querySelector(
                ".like-count"
            );


        if (count) {

            count.textContent =
                updatedProject.likes;

        }


        const icon =
            button.querySelector("i");


        if (icon) {

            icon.classList.remove(
                "fa-regular"
            );

            icon.classList.add(
                "fa-solid"
            );

        }


        localStorage.setItem(
            storageKey,
            "true"
        );


    } catch (error) {

        console.error(
            "Like error:",
            error
        );

    } finally {

        button.disabled = false;

    }
}


/* =========================================================
   REGISTER VIEW
========================================================= */

async function registerProjectView(
    project
) {

    const storageKey =
        `portfolio-viewed-${project.id}`;


    /*
       Count only once per browser session.
       Refreshing the page will NOT increase
       the view again.
    */

    if (
        sessionStorage.getItem(
            storageKey
        ) === "true"
    ) {

        return;

    }


    try {

        const response =
            await fetch(
                `${PROJECTS_API}/${project.id}/view`,
                {
                    method: "POST"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Unable to register view"
            );

        }


        const updatedProject =
            await response.json();


        const card =
            document.querySelector(
                `[data-project-id="${project.id}"]`
            );


        if (!card) return;


        const viewCount =
            card.querySelector(
                ".view-count"
            );


        if (viewCount) {

            viewCount.textContent =
                updatedProject.views;

        }


        sessionStorage.setItem(
            storageKey,
            "true"
        );


    } catch (error) {

        console.error(
            "View error:",
            error
        );

    }
}


/* =========================================================
   FILTER COUNTS
========================================================= */

function updateProjectFilters(
    projects
) {

    const allCount =
        projects.length;


    const majorCount =
        projects.filter(
            project =>
                String(
                    project.projectLevel ||
                    "major"
                ).toLowerCase() === "major"
        ).length;


    const miniCount =
        projects.filter(
            project =>
                String(
                    project.projectLevel ||
                    "major"
                ).toLowerCase() === "mini"
        ).length;


    filterButtons.forEach(button => {

        const filter =
            button.dataset.filter;


        const span =
            button.querySelector("span");


        if (!span) return;


        if (filter === "all") {

            span.textContent =
                allCount;

        } else if (filter === "major") {

            span.textContent =
                majorCount;

        } else if (filter === "mini") {

            span.textContent =
                miniCount;

        }

    });


    setupFilters();

}


/* =========================================================
   FILTERING
========================================================= */

function setupFilters() {

    filterButtons.forEach(
        button => {

            button.onclick = () => {

                const filter =
                    button.dataset.filter;


                filterButtons.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


                button.classList.add(
                    "active"
                );


                document
                    .querySelectorAll(
                        ".project-card"
                    )
                    .forEach(card => {

                        const category =
                            card.dataset.category;


                        if (
                            filter === "all" ||
                            category === filter
                        ) {

                            card.classList.remove(
                                "project-hidden"
                            );

                        } else {

                            card.classList.add(
                                "project-hidden"
                            );

                        }

                    });

            };

        }
    );

}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(
            /[&<>"']/g,
            character =>
                ({
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                }[character])
        );

}


/* =========================================================
   START
========================================================= */

loadProjectsFromAPI();