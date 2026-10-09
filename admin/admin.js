const app = document.getElementById("app");


/* =========================================================
   HELPERS
========================================================= */

const esc = s => String(s ?? "").replace(
    /[&<>"']/g,
    c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[c])
);


const API_BASE = "https://moganavel-portfolio.onrender.com";


const api = async (path, opt = {}) => {

    const r = await fetch(
        API_BASE + path,
        {
            credentials: "include",

            headers: {
                "Content-Type": "application/json",
                ...(opt.headers || {})
            },

            ...opt
        }
    );


    if (!r.ok) {

        throw new Error(
            await r.text() ||
            "Request failed"
        );

    }


    return r.status === 204
        ? null
        : r.json();

};


let state = {

    section: "dashboard",

    projects: [],

    items: [],

    messages: [],

    settings: {}

};


/* =========================================================
   LOGIN
========================================================= */

function login() {

    app.innerHTML = `

        <div class="admin-layout">

            <form
                class="admin-card admin-login admin-form"
                id="loginForm"
            >

                <h1>
                    Portfolio Admin
                </h1>


                <p class="admin-muted">
                    Secure content management for the portfolio.
                </p>


                <input
                    name="username"
                    type="email"
                    placeholder="Admin email"
                    required
                >


                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                >


                <button class="admin-btn">
                    Sign in
                </button>


                <div
                    id="loginMsg"
                    class="admin-error"
                ></div>

            </form>

        </div>

    `;


    document
        .getElementById("loginForm")
        .onsubmit = async e => {

        e.preventDefault();


        const d =
            Object.fromEntries(
                new FormData(e.target)
            );


        try {

            await api(
                "/api/admin/login",
                {
                    method: "POST",

                    body:
                        JSON.stringify(d)
                }
            );


            render();


        } catch (x) {

            document.getElementById(
                "loginMsg"
            ).textContent =
                "Invalid credentials.";

        }

    };

}


/* =========================================================
   LOAD
========================================================= */

async function load() {

    [
        state.projects,
        state.items,
        state.messages
    ] = await Promise.all([

        api(
            "/api/admin/projects"
        ),

        api(
            "/api/admin/content"
        ),

        api(
            "/api/admin/messages"
        )

    ]);

}


/* =========================================================
   MESSAGE REFRESH
========================================================= */

async function loadMessages() {

    state.messages =
        await api(
            "/api/admin/messages"
        );

}


/* =========================================================
   ADMIN SHELL
========================================================= */

function shell() {

    app.innerHTML = `

        <div class="admin-layout">


            <header class="admin-header">

                <div>

                    <h1>
                        Portfolio Admin
                    </h1>


                    <div class="admin-muted">
                        Manage the public portfolio without editing source files.
                    </div>

                </div>


                <button
                    class="admin-btn"
                    id="logout"
                >
                    Logout
                </button>

            </header>


            <div class="admin-grid">


                <nav class="admin-nav">


                    <button
                        data-s="dashboard"
                    >
                        Dashboard
                    </button>


                    <button
                        data-s="projects"
                    >
                        Projects
                    </button>


                    <button
                        data-s="content"
                    >
                        About / Skills / Education / Experience
                    </button>


                    <button
                        data-s="settings"
                    >
                        Site Settings
                    </button>


                    <button
                        data-s="messages"
                    >
                        Messages
                    </button>


                </nav>


                <section
                    id="panel"
                ></section>


            </div>

        </div>

    `;


    document
        .querySelectorAll("[data-s]")
        .forEach(b => {

            b.onclick = () => {

                state.section =
                    b.dataset.s;


                renderPanel();

            };

        });


    document
        .getElementById("logout")
        .onclick = async () => {

        await api(
            "/api/admin/logout",
            {
                method: "POST"
            }
        );


        login();

    };


    renderPanel();

}


/* =========================================================
   PANEL
========================================================= */

function renderPanel() {

    document
        .querySelectorAll("[data-s]")
        .forEach(b => {

            b.classList.toggle(
                "active",
                b.dataset.s ===
                state.section
            );

        });


    const p =
        document.getElementById(
            "panel"
        );


    if (
        state.section ===
        "dashboard"
    ) {

        renderDashboard(p);


    } else if (
        state.section ===
        "projects"
    ) {

        renderProjects(p);


    } else if (
        state.section ===
        "content"
    ) {

        renderContent(p);


    } else if (
        state.section ===
        "settings"
    ) {

        renderSettings(p);


    } else {

        renderMessages(p);

    }

}


/* =========================================================
   DASHBOARD — FULL ANALYTICS
========================================================= */

function renderDashboard(p) {

    /* -----------------------------------------
       BASIC TOTALS
    ----------------------------------------- */

    const totalProjects =
        state.projects.length;


    const totalViews =
        state.projects.reduce(
            (total, project) =>
                total +
                Number(
                    project.views || 0
                ),
            0
        );


    const totalLikes =
        state.projects.reduce(
            (total, project) =>
                total +
                Number(
                    project.likes || 0
                ),
            0
        );


    const totalMessages =
        state.messages.length;


    const unreadMessages =
        state.messages.filter(
            message =>
                !message.read
        ).length;


    /* -----------------------------------------
       PROJECT LEVEL COUNTS
    ----------------------------------------- */

    const majorProjects =
        state.projects.filter(
            project =>
                String(
                    project.projectLevel ||
                    "major"
                ).toLowerCase() ===
                "major"
        ).length;


    const miniProjects =
        state.projects.filter(
            project =>
                String(
                    project.projectLevel ||
                    "major"
                ).toLowerCase() ===
                "mini"
        ).length;


    const publishedProjects =
        state.projects.filter(
            project =>
                project.published !== false
        ).length;


    const unpublishedProjects =
        state.projects.filter(
            project =>
                project.published === false
        ).length;


    /* -----------------------------------------
       MOST VIEWED
    ----------------------------------------- */

    const mostViewed =
        [...state.projects]
            .sort(
                (a, b) =>
                    Number(
                        b.views || 0
                    ) -
                    Number(
                        a.views || 0
                    )
            )
            .slice(0, 5);


    /* -----------------------------------------
       MOST LIKED
    ----------------------------------------- */

    const mostLiked =
        [...state.projects]
            .sort(
                (a, b) =>
                    Number(
                        b.likes || 0
                    ) -
                    Number(
                        a.likes || 0
                    )
            )
            .slice(0, 5);


    /* -----------------------------------------
       PERFORMANCE SCORE
    ----------------------------------------- */

    const topPerforming =
        [...state.projects]
            .map(project => ({

                ...project,

                performance:
                    (
                        Number(
                            project.views || 0
                        ) * 2
                    ) +
                    Number(
                        project.likes || 0
                    )

            }))
            .sort(
                (a, b) =>
                    b.performance -
                    a.performance
            )
            .slice(0, 10);


    /* -----------------------------------------
       HTML
    ----------------------------------------- */

    p.innerHTML = `

        <!-- =====================================
             DASHBOARD HEADER
        ====================================== -->

        <div class="admin-card">

            <div
                style="
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    gap:16px;
                    flex-wrap:wrap;
                "
            >

                <div>

                    <h2>
                        Dashboard Analytics
                    </h2>


                    <p class="admin-muted">
                        Monitor your portfolio performance
                        and visitor engagement.
                    </p>

                </div>


                <button
                    type="button"
                    class="admin-btn"
                    id="refreshDashboard"
                >
                    ↻ Refresh Data
                </button>

            </div>

        </div>


        <br>


        <!-- =====================================
             SUMMARY STATS
        ====================================== -->

        <div class="admin-stats">


            <div class="admin-stat">

                Projects

                <strong>
                    ${totalProjects}
                </strong>

            </div>


            <div class="admin-stat">

                Total Views

                <strong>
                    ${totalViews}
                </strong>

            </div>


            <div class="admin-stat">

                Total Likes

                <strong>
                    ${totalLikes}
                </strong>

            </div>


            <div class="admin-stat">

                Messages

                <strong>
                    ${totalMessages}
                </strong>


                ${
        unreadMessages > 0

            ? `
                            <small
                                style="
                                    display:block;
                                    margin-top:5px;
                                    color:#ff6b5f;
                                "
                            >
                                ${unreadMessages} new
                            </small>
                        `

            : `
                            <small
                                style="
                                    display:block;
                                    margin-top:5px;
                                    opacity:.7;
                                "
                            >
                                All read
                            </small>
                        `
    }

            </div>


        </div>


        <br>


        <!-- =====================================
             PROJECT OVERVIEW
        ====================================== -->

        <div class="admin-card">

            <h2>
                Project Overview
            </h2>


            <table class="admin-table">

                <tbody>


                    <tr>

                        <td>
                            Total Projects
                        </td>

                        <td>

                            <strong>
                                ${totalProjects}
                            </strong>

                        </td>

                    </tr>


                    <tr>

                        <td>
                            Major Projects
                        </td>

                        <td>

                            <strong>
                                ${majorProjects}
                            </strong>

                        </td>

                    </tr>


                    <tr>

                        <td>
                            Mini Projects
                        </td>

                        <td>

                            <strong>
                                ${miniProjects}
                            </strong>

                        </td>

                    </tr>


                    <tr>

                        <td>
                            Published Projects
                        </td>

                        <td>

                            <strong>
                                ${publishedProjects}
                            </strong>

                        </td>

                    </tr>


                    <tr>

                        <td>
                            Unpublished Projects
                        </td>

                        <td>

                            <strong>
                                ${unpublishedProjects}
                            </strong>

                        </td>

                    </tr>


                    <tr>

                        <td>
                            Unread Messages
                        </td>

                        <td>

                            <strong>
                                ${unreadMessages}
                            </strong>

                        </td>

                    </tr>


                </tbody>

            </table>

        </div>


        <br>


        <!-- =====================================
             MOST VIEWED + MOST LIKED
        ====================================== -->

        <div
            style="
                display:grid;
                grid-template-columns:
                    repeat(
                        auto-fit,
                        minmax(300px, 1fr)
                    );
                gap:20px;
            "
        >


            <!-- MOST VIEWED -->

            <div class="admin-card">

                <h2>
                    👁 Most Viewed Projects
                </h2>


                <table class="admin-table">

                    <thead>

                        <tr>

                            <th>
                                Project
                            </th>

                            <th>
                                Views
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        ${
        mostViewed.length === 0

            ? `

                                    <tr>

                                        <td colspan="2">
                                            No projects yet.
                                        </td>

                                    </tr>

                                `

            : mostViewed.map(
                (project, index) => `

                                        <tr>

                                            <td>

                                                <button
                                                    type="button"
                                                    class="dashboard-project-link"
                                                    data-dashboard-edit="${project.id}"
                                                    style="
                                                        background:none;
                                                        border:none;
                                                        padding:0;
                                                        color:inherit;
                                                        font:inherit;
                                                        font-weight:600;
                                                        cursor:pointer;
                                                        text-align:left;
                                                    "
                                                    title="Edit project"
                                                >

                                                    ${index + 1}.
                                                    ${esc(
                    project.title
                )}

                                                </button>

                                            </td>


                                            <td>

                                                👁
                                                ${project.views || 0}

                                            </td>

                                        </tr>

                                    `
            ).join("")

    }

                    </tbody>

                </table>

            </div>


            <!-- MOST LIKED -->

            <div class="admin-card">

                <h2>
                    ❤️ Most Liked Projects
                </h2>


                <table class="admin-table">

                    <thead>

                        <tr>

                            <th>
                                Project
                            </th>

                            <th>
                                Likes
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        ${
        mostLiked.length === 0

            ? `

                                    <tr>

                                        <td colspan="2">
                                            No projects yet.
                                        </td>

                                    </tr>

                                `

            : mostLiked.map(
                (project, index) => `

                                        <tr>

                                            <td>

                                                <button
                                                    type="button"
                                                    class="dashboard-project-link"
                                                    data-dashboard-edit="${project.id}"
                                                    style="
                                                        background:none;
                                                        border:none;
                                                        padding:0;
                                                        color:inherit;
                                                        font:inherit;
                                                        font-weight:600;
                                                        cursor:pointer;
                                                        text-align:left;
                                                    "
                                                    title="Edit project"
                                                >

                                                    ${index + 1}.
                                                    ${esc(
                    project.title
                )}

                                                </button>

                                            </td>


                                            <td>

                                                ❤️
                                                ${project.likes || 0}

                                            </td>

                                        </tr>

                                    `
            ).join("")

    }

                    </tbody>

                </table>

            </div>


        </div>


        <br>


        <!-- =====================================
             TOP PERFORMING PROJECTS
        ====================================== -->

        <div class="admin-card">

            <h2>
                🔥 Top Performing Projects
            </h2>


            <p class="admin-muted">

                Performance score =
                Views × 2 + Likes.

            </p>


            <div
                style="
                    overflow-x:auto;
                "
            >

                <table class="admin-table">

                    <thead>

                        <tr>

                            <th>
                                #
                            </th>

                            <th>
                                Project
                            </th>

                            <th>
                                Category
                            </th>

                            <th>
                                Level
                            </th>

                            <th>
                                Views
                            </th>

                            <th>
                                Likes
                            </th>

                            <th>
                                Performance
                            </th>

                            <th>
                                Action
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        ${
        topPerforming.length === 0

            ? `

                                    <tr>

                                        <td colspan="8">
                                            No projects available.
                                        </td>

                                    </tr>

                                `

            : topPerforming.map(
                (project, index) => `

                                        <tr>

                                            <td>
                                                ${index + 1}
                                            </td>


                                            <td>

                                                <strong>
                                                    ${esc(
                    project.title
                )}
                                                </strong>

                                            </td>


                                            <td>
                                                ${esc(
                    project.category ||
                    "—"
                )}
                                            </td>


                                            <td>

                                                ${
                    String(
                        project.projectLevel ||
                        "major"
                    ).toLowerCase() ===
                    "mini"

                        ? "Mini"

                        : "Major"
                }

                                            </td>


                                            <td>

                                                👁
                                                ${project.views || 0}

                                            </td>


                                            <td>

                                                ❤️
                                                ${project.likes || 0}

                                            </td>


                                            <td>

                                                <strong>
                                                    ${project.performance}
                                                </strong>

                                            </td>


                                            <td>

                                                <button
                                                    type="button"
                                                    class="admin-btn"
                                                    data-dashboard-edit="${project.id}"
                                                >
                                                    Edit
                                                </button>

                                            </td>

                                        </tr>

                                    `
            ).join("")

    }

                    </tbody>

                </table>

            </div>

        </div>


        <br>


        <!-- =====================================
             PROJECT PERFORMANCE OVERVIEW
        ====================================== -->

        <div class="admin-card">

            <h2>
                📊 Project Performance Overview
            </h2>


            <p class="admin-muted">
                Track views, likes, engagement and publication status for every project.
            </p>


            <div
                style="
                    overflow-x:auto;
                "
            >

                <table class="admin-table">

                    <thead>

                        <tr>

                            <th>
                                Project
                            </th>

                            <th>
                                Views
                            </th>

                            <th>
                                Likes
                            </th>

                            <th>
                                Engagement
                            </th>

                            <th>
                                Status
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        ${
        [...state.projects]
            .sort(
                (a, b) =>
                    Number(
                        b.views || 0
                    ) -
                    Number(
                        a.views || 0
                    )
            )
            .map(project => {

                const views =
                    Number(
                        project.views || 0
                    );


                const likes =
                    Number(
                        project.likes || 0
                    );


                let engagement =
                    "Low";


                if (
                    views >= 50 ||
                    likes >= 10
                ) {

                    engagement =
                        "High";

                } else if (
                    views >= 10 ||
                    likes >= 3
                ) {

                    engagement =
                        "Medium";

                }


                return `

                                        <tr>


                                            <td>

                                                <button
                                                    type="button"
                                                    class="dashboard-project-link"
                                                    data-dashboard-edit="${project.id}"
                                                    style="
                                                        background:none;
                                                        border:none;
                                                        padding:0;
                                                        color:inherit;
                                                        font:inherit;
                                                        font-weight:600;
                                                        cursor:pointer;
                                                        text-align:left;
                                                    "
                                                    title="Edit project"
                                                >

                                                    ${esc(
                    project.title
                )}

                                                </button>

                                            </td>


                                            <td>
                                                ${views}
                                            </td>


                                            <td>
                                                ${likes}
                                            </td>


                                            <td>
                                                ${engagement}
                                            </td>


                                            <td>

                                                ${
                    project.published === false
                        ? "Unpublished"
                        : "Published"
                }

                                            </td>


                                        </tr>

                                    `;

            })
            .join("")

    }

                    </tbody>

                </table>

            </div>

        </div>

    `;


    /* =========================================
       REFRESH DASHBOARD
    ========================================== */

    const refreshButton =
        document.getElementById(
            "refreshDashboard"
        );


    if (refreshButton) {

        refreshButton.onclick =
            async () => {

                refreshButton.disabled =
                    true;


                refreshButton.textContent =
                    "Refreshing...";


                try {

                    await load();


                    renderDashboard(p);


                } catch (error) {

                    console.error(
                        "Dashboard refresh failed:",
                        error
                    );


                    alert(
                        "Unable to refresh dashboard."
                    );


                    refreshButton.disabled =
                        false;


                    refreshButton.textContent =
                        "↻ Refresh Data";

                }

            };

    }


    /* =========================================
       PROJECT → EDIT
    ========================================== */

    p.querySelectorAll(
        "[data-dashboard-edit]"
    ).forEach(button => {

        button.onclick = () => {

            const project =
                state.projects.find(
                    project =>
                        String(project.id) ===
                        String(
                            button.dataset.dashboardEdit
                        )
                );


            if (!project) {

                return;

            }


            state.section =
                "projects";


            renderProjects(p);


            projectForm(project);

        };

    });

}


/* =========================================================
   PROJECTS
========================================================= */

function renderProjects(p) {

    p.innerHTML = `

        <div class="admin-card">

            <h2>
                Projects
            </h2>


            <button
                class="admin-btn"
                id="newProject"
            >
                + New project
            </button>


            <table class="admin-table">

                <thead>

                    <tr>

                        <th>
                            Project
                        </th>

                        <th>
                            Category
                        </th>

                        <th>
                            Level
                        </th>

                        <th>
                            Featured
                        </th>

                        <th>
                            Published
                        </th>

                        <th>
                            Likes
                        </th>

                        <th>
                            Views
                        </th>

                        <th></th>

                    </tr>

                </thead>


                <tbody>

                    ${
        state.projects
            .map(x => `

                                <tr>

                                    <td>
                                        ${esc(
                x.title
            )}
                                    </td>


                                    <td>
                                        ${esc(
                x.category
            )}
                                    </td>


                                    <td>

                                        ${
                String(
                    x.projectLevel ||
                    "major"
                ).toLowerCase() ===
                "mini"

                    ? "Mini"

                    : "Major"
            }

                                    </td>


                                    <td>

                                        ${
                x.featured
                    ? "⭐ Yes"
                    : "—"
            }

                                    </td>


                                    <td>

                                        ${
                x.published === false
                    ? "✕ No"
                    : "✓ Yes"
            }

                                    </td>


                                    <td>
                                        ${x.likes ?? 0}
                                    </td>


                                    <td>
                                        ${x.views ?? 0}
                                    </td>


                                    <td
                                        class="admin-actions"
                                    >

                                        <button
                                            type="button"
                                            class="admin-btn"
                                            data-edit="${x.id}"
                                        >
                                            Edit
                                        </button>


                                        <button
                                            type="button"
                                            class="admin-btn admin-danger"
                                            data-del="${x.id}"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            `)
            .join("")
    }

                </tbody>

            </table>

        </div>

    `;


    document
        .getElementById("newProject")
        .onclick =
        () => projectForm();


    p.onclick = async event => {

        const editButton =
            event.target.closest(
                "[data-edit]"
            );


        if (editButton) {

            const id =
                editButton.dataset.edit;


            const project =
                state.projects.find(
                    x =>
                        String(x.id) ===
                        String(id)
                );


            if (!project) {

                console.error(
                    "Project not found:",
                    id
                );


                return;

            }


            projectForm(project);


            return;

        }


        const deleteButton =
            event.target.closest(
                "[data-del]"
            );


        if (deleteButton) {

            const id =
                deleteButton.dataset.del;


            if (
                !confirm(
                    "Delete this project?"
                )
            ) {

                return;

            }


            try {

                await api(
                    `/api/admin/projects/${id}`,
                    {
                        method: "DELETE"
                    }
                );


                await load();


                renderPanel();


            } catch (error) {

                console.error(
                    "Delete failed:",
                    error
                );


                alert(
                    "Unable to delete project."
                );

            }

        }

    };

}


/* =========================================================
   PROJECT FORM
========================================================= */

function projectForm(x = {}) {

    const p =
        document.getElementById("panel");


    const technologies =
        Array.isArray(x.technologies)
            ? x.technologies.join(", ")
            : (x.technologies || "");


    const projectLevel =
        String(
            x.projectLevel || "major"
        ).toLowerCase();


    p.innerHTML = `
        <div class="admin-card project-editor">

            <div class="form-header">

                <div>

                    <h2>
                        ${
        x.id
            ? "Edit Project"
            : "New Project"
    }
                    </h2>

                    <p class="admin-muted">

                        ${
        x.id
            ? "Update the project information displayed on your portfolio."
            : "Add a new project to your portfolio."
    }

                    </p>

                </div>

            </div>


            <form
                class="admin-form"
                id="projectForm"
            >


                <!-- TITLE -->

                <div class="form-field">

                    <label for="project-title">
                        Title
                    </label>

                    <input
                        id="project-title"
                        name="title"
                        type="text"
                        placeholder="Enter project title"
                        value="${esc(x.title || "")}"
                        required
                    >

                </div>


                <!-- SLUG -->

                <div class="form-field">

                    <label for="project-slug">
                        Slug
                    </label>

                    <input
                        id="project-slug"
                        name="slug"
                        type="text"
                        placeholder="e.g. voice-ai"
                        value="${esc(x.slug || "")}"
                        required
                    >

                    <small>
                        Used for the project's URL and internal identification.
                    </small>

                </div>


                <!-- CATEGORY + TYPE -->

                <div class="form-row">

                    <div class="form-field">

                        <label for="project-category">
                            Category
                        </label>

                        <input
                            id="project-category"
                            name="category"
                            type="text"
                            placeholder="e.g. AI / Voice"
                            value="${esc(x.category || "")}"
                        >

                    </div>


                    <div class="form-field">

                        <label for="project-type">
                            Type
                        </label>

                        <input
                            id="project-type"
                            name="type"
                            type="text"
                            placeholder="e.g. AI Application"
                            value="${esc(x.type || "")}"
                        >

                    </div>

                </div>


                <!-- PROJECT LEVEL -->

                <div class="form-field">

                    <label for="project-level">
                        Project Level
                    </label>

                    <select
                        id="project-level"
                        name="projectLevel"
                    >

                        <option
                            value="major"
                            ${
        projectLevel === "major"
            ? "selected"
            : ""
    }
                        >
                            Major
                        </option>


                        <option
                            value="mini"
                            ${
        projectLevel === "mini"
            ? "selected"
            : ""
    }
                        >
                            Mini
                        </option>

                    </select>


                    <small>
                        Controls the Major / Mini public filter.
                    </small>

                </div>


                <!-- IMAGE -->

                <div class="form-field">

                    <label for="project-image">
                        Image Path
                    </label>

                    <input
                        id="project-image"
                        name="imagePath"
                        type="text"
                        placeholder="e.g. images/projects/project.jpg"
                        value="${esc(x.imagePath || "")}"
                    >

                    <small>
                        Path to the project image inside your portfolio.
                    </small>

                </div>


                <!-- GITHUB -->

                <div class="form-field">

                    <label for="project-github">
                        GitHub URL
                    </label>

                    <input
                        id="project-github"
                        name="githubUrl"
                        type="url"
                        placeholder="https://github.com/..."
                        value="${esc(
        x.githubUrl === "#"
            ? ""
            : (x.githubUrl || "")
    )}"
                    >

                    <small>
                        Optional.
                    </small>

                </div>


                <!-- LIVE WEBSITE -->

                <div class="form-field">

                    <label for="project-live">
                        Live Website URL
                    </label>

                    <input
                        id="project-live"
                        name="liveUrl"
                        type="url"
                        placeholder="https://..."
                        value="${esc(
        x.liveUrl === "#"
            ? ""
            : (x.liveUrl || "")
    )}"
                    >

                    <small>
                        Optional.
                    </small>

                </div>


                <!-- VIDEO -->

                <div class="form-field">

                    <label for="project-video">
                        Demo Video URL
                    </label>

                    <input
                        id="project-video"
                        name="videoUrl"
                        type="url"
                        placeholder="https://..."
                        value="${esc(
        x.videoUrl || ""
    )}"
                    >

                    <small>
                        Optional. Used by the Watch Demo button.
                    </small>

                </div>


                <!-- DESCRIPTION -->

                <div class="form-field">

                    <label for="project-description">
                        Description
                    </label>

                    <textarea
                        id="project-description"
                        name="description"
                        placeholder="Describe the project, its purpose and key features..."
                    >${esc(x.description || "")}</textarea>

                </div>


                <!-- TECHNOLOGIES -->

                <div class="form-field">

                    <label for="project-technologies">
                        Technologies
                    </label>

                    <input
                        id="project-technologies"
                        name="technologies"
                        type="text"
                        placeholder="Java, Spring Boot, MySQL, HTML, CSS"
                        value="${esc(technologies)}"
                    >

                    <small>
                        Separate technologies using commas.
                    </small>

                </div>


                <!-- FEATURED -->

                <div class="featured-option">

                    <label class="checkbox-label">

                        <input
                            type="checkbox"
                            name="featured"
                            ${
        x.featured
            ? "checked"
            : ""
    }
                        >

                        <span>

                            <strong>
                                Featured Project
                            </strong>

                            <small>
                                Display this project prominently on the portfolio.
                            </small>

                        </span>

                    </label>

                </div>


                <!-- PUBLISHED -->

                <div class="featured-option">

                    <label class="checkbox-label">

                        <input
                            type="checkbox"
                            name="published"
                            ${
        x.id === undefined ||
        x.published !== false
            ? "checked"
            : ""
    }
                        >

                        <span>

                            <strong>
                                Published
                            </strong>

                            <small>
                                Published projects are visible on the public portfolio.
                            </small>

                        </span>

                    </label>

                </div>


                <!-- ACTIONS -->

                <div class="form-actions">

                    <button
                        type="submit"
                        class="admin-btn"
                    >
                        ${
        x.id
            ? "Save Changes"
            : "Create Project"
    }
                    </button>


                    <button
                        type="button"
                        class="admin-btn admin-secondary"
                        id="cancel"
                    >
                        Cancel
                    </button>

                </div>


                <div
                    id="formMsg"
                    class="admin-error"
                ></div>

            </form>

        </div>
    `;


    document.getElementById("cancel").onclick =
        () => renderPanel();


    document.getElementById("projectForm").onsubmit =
        async e => {

            e.preventDefault();


            const f =
                new FormData(e.target);


            const body =
                Object.fromEntries(
                    f.entries()
                );


            body.featured =
                f.get("featured") === "on";


            body.published =
                f.get("published") === "on";


            body.projectLevel =
                String(
                    f.get("projectLevel") ||
                    "major"
                );


            body.videoUrl =
                String(
                    f.get("videoUrl") ||
                    ""
                ).trim();


            body.technologies =
                String(
                    body.technologies ||
                    ""
                )
                    .split(/[|,]/)
                    .map(
                        s => s.trim()
                    )
                    .filter(Boolean)
                    .join("|");


            try {

                await api(

                    x.id
                        ? `/api/admin/projects/${x.id}`
                        : "/api/admin/projects",

                    {
                        method:
                            x.id
                                ? "PUT"
                                : "POST",

                        body:
                            JSON.stringify(body)
                    }

                );


                await load();


                state.section =
                    "projects";


                renderPanel();


            } catch (err) {

                document.getElementById(
                    "formMsg"
                ).textContent =
                    err.message ||
                    "Unable to save project.";

            }

        };

}


/* =========================================================
   CONTENT
========================================================= */

function renderContent(p) {

    const types = [
        "ABOUT",
        "SKILL",
        "EDUCATION",
        "EXPERIENCE",
        "CERTIFICATION",
        "ACHIEVEMENT"
    ];


    p.innerHTML = `
        <div class="admin-card">

            <h2>
                Portfolio Content
            </h2>

            <p class="admin-muted">
                Add/edit structured content used by the assistant and the data-driven parts of the site.
            </p>

            <button
                class="admin-btn"
                id="newItem"
            >
                + New content item
            </button>


            <table class="admin-table">

                <thead>

                    <tr>
                        <th>Type</th>
                        <th>Title</th>
                        <th>Sort</th>
                        <th></th>
                    </tr>

                </thead>


                <tbody>

                    ${
        state.items.map(x => `
                            <tr>

                                <td>
                                    ${esc(x.type)}
                                </td>

                                <td>
                                    ${esc(x.title)}
                                </td>

                                <td>
                                    ${x.sortOrder}
                                </td>

                                <td class="admin-actions">

                                    <button
                                        class="admin-btn"
                                        data-ci="${x.id}"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        class="admin-btn admin-danger"
                                        data-cd="${x.id}"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        `).join("")
    }

                </tbody>

            </table>

        </div>
    `;


    document.getElementById("newItem").onclick =
        () => itemForm(types);


    document
        .querySelectorAll("[data-ci]")
        .forEach(b => {

            b.onclick = () =>
                itemForm(
                    types,
                    state.items.find(
                        x =>
                            x.id ==
                            b.dataset.ci
                    )
                );

        });


    document
        .querySelectorAll("[data-cd]")
        .forEach(b => {

            b.onclick = async () => {

                if (
                    confirm(
                        "Delete content item?"
                    )
                ) {

                    await api(
                        `/api/admin/content/${b.dataset.cd}`,
                        {
                            method: "DELETE"
                        }
                    );

                    await load();

                    renderPanel();

                }

            };

        });

}


/* =========================================================
   CONTENT FORM
========================================================= */

function itemForm(types, x = {}) {

    const p =
        document.getElementById("panel");


    p.innerHTML = `
        <div class="admin-card">

            <h2>
                ${x.id ? "Edit" : "New"}
                Content Item
            </h2>


            <form
                class="admin-form"
                id="itemForm"
            >

                <select name="type">

                    ${
        types.map(t => `
                            <option
                                ${
            x.type === t
                ? "selected"
                : ""
        }
                            >
                                ${t}
                            </option>
                        `).join("")
    }

                </select>


                <input
                    name="title"
                    placeholder="Title"
                    value="${esc(x.title)}"
                    required
                >


                <input
                    name="subtitle"
                    placeholder="Subtitle"
                    value="${esc(x.subtitle)}"
                >


                <textarea
                    name="description"
                    placeholder="Description"
                >${esc(x.description)}</textarea>


                <textarea
                    name="details"
                    placeholder="Details / assistant context"
                >${esc(x.details)}</textarea>


                <input
                    name="sortOrder"
                    type="number"
                    value="${x.sortOrder || 0}"
                >


                <label>

                    <input
                        type="checkbox"
                        name="published"
                        ${
        x.published !== false
            ? "checked"
            : ""
    }
                    >

                    Published

                </label>


                <button class="admin-btn">
                    Save
                </button>


                <button
                    type="button"
                    class="admin-btn"
                    id="cancel"
                >
                    Cancel
                </button>

            </form>

        </div>
    `;


    document.getElementById("cancel").onclick =
        () => renderPanel();


    document.getElementById("itemForm").onsubmit =
        async e => {

            e.preventDefault();


            const f =
                new FormData(e.target);


            const b =
                Object.fromEntries(
                    f.entries()
                );


            b.published =
                f.get("published") === "on";


            b.sortOrder =
                Number(
                    b.sortOrder || 0
                );


            await api(

                x.id
                    ? `/api/admin/content/${x.id}`
                    : "/api/admin/content",

                {
                    method:
                        x.id
                            ? "PUT"
                            : "POST",

                    body:
                        JSON.stringify(b)
                }

            );


            await load();

            renderPanel();

        };

}


/* =========================================================
   SETTINGS
========================================================= */

function renderSettings(p) {

    p.innerHTML = `
        <div class="admin-card">

            <h2>
                Site Settings
            </h2>


            <form
                class="admin-form"
                id="settingsForm"
            >

                <input
                    name="siteName"
                    placeholder="Site name"
                    value="${esc(
        state.settings.siteName || ""
    )}"
                >


                <input
                    name="headline"
                    placeholder="Headline"
                    value="${esc(
        state.settings.headline || ""
    )}"
                >


                <input
                    name="email"
                    placeholder="Public contact email"
                    value="${esc(
        state.settings.email || ""
    )}"
                >


                <input
                    name="github"
                    placeholder="GitHub URL"
                    value="${esc(
        state.settings.github || ""
    )}"
                >


                <input
                    name="linkedin"
                    placeholder="LinkedIn URL"
                    value="${esc(
        state.settings.linkedin || ""
    )}"
                >


                <button class="admin-btn">
                    Save settings
                </button>

            </form>

        </div>
    `;


    document.getElementById(
        "settingsForm"
    ).onsubmit = async e => {

        e.preventDefault();


        await api(
            "/api/admin/settings",
            {
                method: "PUT",

                body: JSON.stringify(
                    Object.fromEntries(
                        new FormData(e.target)
                    )
                )
            }
        );


        alert("Saved");

    };

}

/* =========================================================
   MESSAGES
========================================================= */

function renderMessages(p) {

    p.innerHTML = `

        <div class="admin-card">

            <div
                style="
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    gap:16px;
                    flex-wrap:wrap;
                    margin-bottom:20px;
                "
            >

                <div>

                    <h2>
                        Contact Messages
                    </h2>

                    <p class="admin-muted">
                        Messages submitted through the public portfolio contact form.
                    </p>

                </div>


                <button
                    type="button"
                    class="admin-btn"
                    id="refreshMessages"
                >
                    ↻ Refresh
                </button>

            </div>


            ${
        state.messages.length === 0

            ? `

                        <div class="admin-empty">

                            <p>
                                No contact messages yet.
                            </p>

                        </div>

                    `

            : `

                        <div class="admin-table-wrap">

                            <table class="admin-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Name
                                        </th>

                                        <th>
                                            Email
                                        </th>

                                        <th>
                                            Message
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    ${
                state.messages
                    .map(x => `

                                                <tr
                                                    data-message-id="${x.id}"
                                                >

                                                    <td>

                                                        <strong>
                                                            ${esc(
                        x.name ||
                        "Unknown"
                    )}
                                                        </strong>

                                                    </td>


                                                    <td>

                                                        <a
                                                            href="mailto:${esc(
                        x.email ||
                        ""
                    )}"
                                                            class="admin-email-link"
                                                        >
                                                            ${esc(
                        x.email ||
                        ""
                    )}
                                                        </a>

                                                    </td>


                                                    <td
                                                        class="message-cell"
                                                    >

                                                        ${esc(
                        x.message ||
                        ""
                    )}

                                                    </td>


                                                    <td>

                                                        ${
                        x.createdAt
                            ? new Date(
                                x.createdAt
                            ).toLocaleString()
                            : "—"
                    }

                                                    </td>


                                                    <td>

                                                        <span
                                                            class="message-status ${
                        x.read
                            ? "read"
                            : "new"
                    }"
                                                        >

                                                            ${
                        x.read
                            ? "Read"
                            : "New"
                    }

                                                        </span>

                                                    </td>


                                                    <td>

                                                        <div
                                                            class="message-actions"
                                                        >

                                                            ${
                        x.read
                            ? ""

                            : `

                                                                        <button
                                                                            type="button"
                                                                            class="admin-btn"
                                                                            data-read-message="${x.id}"
                                                                        >
                                                                            Mark Read
                                                                        </button>

                                                                    `
                    }


                                                            <a
                                                                href="mailto:${esc(
                        x.email ||
                        ""
                    )}?subject=${encodeURIComponent(
                        "Re: Portfolio Contact"
                    )}"
                                                                class="admin-btn secondary"
                                                            >
                                                                Reply
                                                            </a>

                                                        </div>

                                                    </td>

                                                </tr>

                                            `)
                    .join("")
            }

                                </tbody>

                            </table>

                        </div>

                    `
    }

        </div>

    `;


    /* =========================================
       REFRESH MESSAGES
    ========================================== */

    const refresh =
        document.getElementById(
            "refreshMessages"
        );


    if (refresh) {

        refresh.onclick =
            async () => {

                refresh.disabled =
                    true;


                refresh.textContent =
                    "Refreshing...";


                try {

                    await loadMessages();


                    renderMessages(p);


                } catch (error) {

                    console.error(
                        "Unable to refresh messages:",
                        error
                    );


                    alert(
                        "Unable to refresh messages."
                    );


                    refresh.disabled =
                        false;


                    refresh.textContent =
                        "↻ Refresh";

                }

            };

    }


    /* =========================================
       MARK MESSAGE AS READ
    ========================================== */

    p.querySelectorAll(
        "[data-read-message]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            async () => {

                const id =
                    button.dataset.readMessage;


                button.disabled =
                    true;


                button.textContent =
                    "Updating...";


                try {

                    await api(
                        `/api/admin/messages/${id}/read`,
                        {
                            method: "PUT"
                        }
                    );


                    await loadMessages();


                    renderMessages(p);


                } catch (error) {

                    console.error(
                        "Unable to update message:",
                        error
                    );


                    alert(
                        "Unable to mark message as read."
                    );


                    button.disabled =
                        false;


                    button.textContent =
                        "Mark Read";

                }

            }
        );

    });

}


/* =========================================================
   APPLICATION START
========================================================= */

async function render() {

    try {

        await api(
            "/api/admin/me"
        );


        await load();


        shell();


    } catch (error) {

        login();

    }

}


/* =========================================================
   INITIALIZE
========================================================= */

render();