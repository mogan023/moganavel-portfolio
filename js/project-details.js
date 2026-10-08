const PROJECTS_API = "http://localhost:8080/api/projects";

const container = document.getElementById("projectDetails");


// ======================================================
// GET PROJECT ID FROM URL
// ======================================================

const params = new URLSearchParams(window.location.search);

const projectId = params.get("id");


// ======================================================
// LOAD PROJECT
// ======================================================

async function loadProject() {

    if (!projectId) {
        showError("Project ID was not provided.");
        return;
    }

    try {

        const response = await fetch(
            `${PROJECTS_API}/${projectId}`
        );

        if (!response.ok) {
            throw new Error("Project not found");
        }

        const project = await response.json();

        renderProject(project);

        document.title =
            `${project.title} | Moganavel Venkatachalam`;

    } catch (error) {

        console.error(error);

        showError("Unable to load this project.");

    }
}


// ======================================================
// RENDER PROJECT
// ======================================================

function renderProject(project) {

    const image = project.imagePath
        ? "../" + project.imagePath
        : "../images/projects/default.jpg";


    const technologies = Array.isArray(project.technologies)
        ? project.technologies
        : String(project.technologies || "")
            .split("|")
            .map(item => item.trim())
            .filter(Boolean);


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


    container.innerHTML = `

        <div class="project-details-page">

            <a
                href="projects.html"
                class="project-details-back"
            >
                <i class="fa-solid fa-arrow-left"></i>
                Back to Projects
            </a>


            <img
                class="project-details-image"
                src="${escapeHTML(image)}"
                alt="${escapeHTML(project.title)}"
            >


            <span class="project-details-category">
                ${escapeHTML(project.category || "")}
            </span>


            <h1 class="project-details-title">
                ${escapeHTML(project.title)}
            </h1>


            <p class="project-details-description">
                ${escapeHTML(project.description || "")}
            </p>


            <div class="project-details-tech">

                ${technologies.map(tech => `
                    <span>
                        ${escapeHTML(tech)}
                    </span>
                `).join("")}

            </div>


            <div class="project-details-stats">

                <button
                    class="project-details-like"
                    id="likeButton"
                >

                    <i class="fa-solid fa-heart"></i>

                    <span id="likeCount">
                        ${project.likes ?? 0}
                    </span>

                </button>


                <span class="project-details-view">

                    <i class="fa-solid fa-eye"></i>

                    <span id="viewCount">
                        ${project.views ?? 0}
                    </span>

                </span>

            </div>


            <div class="project-details-actions">

                ${
        github
            ?
            `
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
            :
            ""
    }


                ${
        live
            ?
            `
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
            :
            ""
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

        </div>
    `;


    setupLike(project);

    setupView(project);
}


// ======================================================
// LIKE
// ======================================================

function setupLike(project) {

    const button = document.getElementById("likeButton");

    if (!button) return;


    const likeKey = `project-liked-${project.id}`;


    if (localStorage.getItem(likeKey)) {
        button.disabled = true;
    }


    button.addEventListener("click", async () => {

        if (localStorage.getItem(likeKey)) {
            return;
        }


        try {

            button.disabled = true;


            const response = await fetch(
                `${PROJECTS_API}/${project.id}/like`,
                {
                    method: "POST"
                }
            );


            if (!response.ok) {
                throw new Error("Like failed");
            }


            const updatedProject =
                await response.json();


            document.getElementById("likeCount")
                .textContent = updatedProject.likes;


            localStorage.setItem(likeKey, "true");


        } catch (error) {

            console.error("Like error:", error);

            button.disabled = false;

        }

    });

}


// ======================================================
// VIEW
// ======================================================

async function setupView(project) {

    const viewKey = `project-detail-viewed-${project.id}`;


    if (sessionStorage.getItem(viewKey)) {
        return;
    }


    try {

        const response = await fetch(
            `${PROJECTS_API}/${project.id}/view`,
            {
                method: "POST"
            }
        );


        if (!response.ok) {
            throw new Error("View tracking failed");
        }


        const updatedProject =
            await response.json();


        document.getElementById("viewCount")
            .textContent = updatedProject.views;


        sessionStorage.setItem(viewKey, "true");


    } catch (error) {

        console.error("View error:", error);

    }

}


// ======================================================
// ERROR
// ======================================================

function showError(message) {

    container.innerHTML = `

        <div class="project-details-error">

            <h2>${escapeHTML(message)}</h2>

            <a href="projects.html">
                ← Back to Projects
            </a>

        </div>
    `;
}


// ======================================================
// HTML ESCAPE
// ======================================================

function escapeHTML(value) {

    return String(value ?? "").replace(
        /[&<>"']/g,
        character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[character]
    );

}


// ======================================================
// START
// ======================================================

loadProject();
// ======================================================
// WATCH DEMO
// ======================================================

document.addEventListener("click", event => {

    const button = event.target.closest(".watch-demo-btn");

    if (!button) return;

    const videoUrl = button.dataset.video;
    const title = button.dataset.title || "Project Demo";

    if (!videoUrl) return;

    openVideoModal(videoUrl, title);
});


// ======================================================
// VIDEO MODAL
// ======================================================

function openVideoModal(videoUrl, title) {

    const existingModal =
        document.getElementById("projectVideoModal");

    if (existingModal) {
        existingModal.remove();
    }


    const modal =
        document.createElement("div");

    modal.id = "projectVideoModal";

    modal.innerHTML = `
        <div class="project-video-overlay">

            <div class="project-video-modal">

                <button
                    type="button"
                    class="project-video-close"
                    aria-label="Close video"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <h2>
                    ${escapeHTML(title)}
                </h2>

                <div class="project-video-container">

                    <iframe
                        src="${escapeHTML(
        convertVideoUrl(videoUrl)
    )}"
                        title="${escapeHTML(title)}"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    const closeButton =
        modal.querySelector(
            ".project-video-close"
        );


    closeButton.addEventListener(
        "click",
        () => modal.remove()
    );


    modal
        .querySelector(".project-video-overlay")
        .addEventListener("click", event => {

            if (
                event.target.classList.contains(
                    "project-video-overlay"
                )
            ) {
                modal.remove();
            }

        });


    document.addEventListener(
        "keydown",
        function closeOnEscape(event) {

            if (event.key === "Escape") {

                modal.remove();

                document.removeEventListener(
                    "keydown",
                    closeOnEscape
                );

            }

        }
    );
}


// ======================================================
// VIDEO URL CONVERTER
// ======================================================

function convertVideoUrl(url) {

    try {

        const parsed =
            new URL(url);

        // YouTube watch URL
        if (
            parsed.hostname.includes("youtube.com") &&
            parsed.searchParams.get("v")
        ) {

            return `https://www.youtube.com/embed/${
                parsed.searchParams.get("v")
            }?autoplay=1`;

        }


        // YouTube short URL
        if (
            parsed.hostname === "youtu.be"
        ) {

            return `https://www.youtube.com/embed/${
                parsed.pathname.substring(1)
            }?autoplay=1`;

        }


        return url;

    } catch (error) {

        console.error(
            "Invalid video URL:",
            error
        );

        return url;
    }
}