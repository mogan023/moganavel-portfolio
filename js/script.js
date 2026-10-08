/* =====================================================
   MOGANAVEL PORTFOLIO
   SINGLE COMPLETE JAVASCRIPT FILE
===================================================== */


/* =====================================================
   INTRO SCREEN
===================================================== */

window.addEventListener("load", () => {

    const introScreen =
        document.getElementById("introScreen");

    if (introScreen) {
        setTimeout(() => {
            introScreen.classList.add("hide");
        }, 1800);
    }

});


/* =====================================================
   RIGHT SIDE MENU
===================================================== */

const menuButton =
    document.getElementById("menuButton");

const menuClose =
    document.getElementById("menuClose");

const sideMenu =
    document.getElementById("sideMenu");

const menuOverlay =
    document.getElementById("menuOverlay");


function openMenu() {

    if (!sideMenu) return;

    sideMenu.classList.add("open");
    sideMenu.classList.add("show");

    if (menuOverlay) {
        menuOverlay.classList.add("show");
    }

    if (menuButton) {
        menuButton.classList.add("active");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );
    }

    document.body.classList.add("menu-open");
}


function closeMenu() {

    if (!sideMenu) return;

    sideMenu.classList.remove("open");
    sideMenu.classList.remove("show");

    if (menuOverlay) {
        menuOverlay.classList.remove("show");
    }

    if (menuButton) {
        menuButton.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );
    }

    document.body.classList.remove("menu-open");
}


if (menuButton) {

    menuButton.addEventListener(
        "click",
        () => {

            if (
                sideMenu &&
                (
                    sideMenu.classList.contains("open") ||
                    sideMenu.classList.contains("show")
                )
            ) {
                closeMenu();
            } else {
                openMenu();
            }

        }
    );

}


if (menuClose) {
    menuClose.addEventListener(
        "click",
        closeMenu
    );
}


if (menuOverlay) {
    menuOverlay.addEventListener(
        "click",
        closeMenu
    );
}


document
    .querySelectorAll(".nav-link")
    .forEach((link) => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            sideMenu &&
            (
                sideMenu.classList.contains("open") ||
                sideMenu.classList.contains("show")
            )
        ) {
            closeMenu();
        }

    }
);


/* =====================================================
   LANGUAGE DROPDOWN
===================================================== */

const languageButton =
    document.getElementById("languageButton");

const languageDropdown =
    document.getElementById("languageDropdown");


if (languageButton) {

    languageButton.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            if (languageDropdown) {
                languageDropdown.classList.toggle(
                    "show"
                );
            }

        }
    );

}


document.addEventListener(
    "click",
    (event) => {

        if (
            languageDropdown &&
            languageButton &&
            !languageDropdown.contains(event.target) &&
            !languageButton.contains(event.target)
        ) {

            languageDropdown.classList.remove(
                "show"
            );

        }

    }
);


/* =====================================================
   TRANSLATIONS
===================================================== */

const translations = {

    en: {

        introSmall:
            "Welcome to my portfolio",

        introGreeting:
            "Hello, I'm Moganavel",

        navigation:
            "Navigation",

        explore:
            "Explore",

        home:
            "Home",

        about:
            "About Me",

        education:
            "Education",

        experience:
            "Experience",

        skills:
            "Skills",

        projects:
            "Projects",

        achievements:
            "Achievements",

        certificates:
            "Certificates",

        interactive:
            "Interactive Zone",

        contact:
            "Contact",

        menuFooter:
            "Let's build something meaningful.",

        available:
            "Exploring • Learning • Building",

        hello:
            "Hello, I'm",

        role:
            "AI & Data Science Developer",

        heroDescription:
            "Turning ideas into intelligent, practical and meaningful digital experiences.",

        exploreWork:
            "Explore My Work",

        letsConnect:
            "Let's Connect",

        projectsCount:
            "Projects",

        certificatesCount:
            "Certificates",

        robotics:
            "Robotics Achievement",

        scroll:
            "Scroll to explore",

        localTime:
            "Local Time",

        rightNow:
            "Right Now",

        currentlyBuilding:
            "Currently Building",

        currently:
            "Currently",

        footerRole:
            "AI & Data Science Developer",

        allRights:
            "All Rights Reserved."

    },


    ta: {

        introSmall:
            "எனது போர்ட்ஃபோலியோவிற்கு வரவேற்கிறேன்",

        introGreeting:
            "வணக்கம், நான் மோகனவேல்",

        navigation:
            "வழிசெலுத்தல்",

        explore:
            "ஆராயுங்கள்",

        home:
            "முகப்பு",

        about:
            "என்னைப் பற்றி",

        education:
            "கல்வி",

        experience:
            "அனுபவம்",

        skills:
            "திறன்கள்",

        projects:
            "திட்டங்கள்",

        achievements:
            "சாதனைகள்",

        certificates:
            "சான்றிதழ்கள்",

        interactive:
            "ஊடாடும் பகுதி",

        contact:
            "தொடர்பு",

        menuFooter:
            "அர்த்தமுள்ள ஒன்றை உருவாக்குவோம்.",

        available:
            "கற்றல் • உருவாக்குதல் • ஆராய்தல்",

        hello:
            "வணக்கம், நான்",

        role:
            "AI & Data Science Developer",

        heroDescription:
            "யோசனைகளை புத்திசாலித்தனமான மற்றும் பயனுள்ள டிஜிட்டல் அனுபவங்களாக மாற்றுகிறேன்.",

        exploreWork:
            "எனது திட்டங்களைப் பாருங்கள்",

        letsConnect:
            "தொடர்பு கொள்ளுங்கள்",

        projectsCount:
            "திட்டங்கள்",

        certificatesCount:
            "சான்றிதழ்கள்",

        robotics:
            "ரோபாட்டிக்ஸ் சாதனை",

        scroll:
            "ஆராய கீழே செல்லவும்",

        localTime:
            "உள்ளூர் நேரம்",

        rightNow:
            "தற்போது",

        currentlyBuilding:
            "தற்போது உருவாக்குவது",

        currently:
            "தற்போது",

        footerRole:
            "AI & Data Science Developer",

        allRights:
            "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை."

    },


    hi: {

        introSmall:
            "मेरे पोर्टफोलियो में आपका स्वागत है",

        introGreeting:
            "नमस्ते, मैं मोगनावेल हूँ",

        navigation:
            "नेविगेशन",

        explore:
            "एक्सप्लोर करें",

        home:
            "होम",

        about:
            "मेरे बारे में",

        education:
            "शिक्षा",

        experience:
            "अनुभव",

        skills:
            "कौशल",

        projects:
            "प्रोजेक्ट्स",

        achievements:
            "उपलब्धियाँ",

        certificates:
            "प्रमाणपत्र",

        interactive:
            "इंटरैक्टिव ज़ोन",

        contact:
            "संपर्क",

        menuFooter:
            "आइए कुछ अर्थपूर्ण बनाएं।",

        available:
            "सीखना • बनाना • एक्सप्लोर करना",

        hello:
            "नमस्ते, मैं हूँ",

        role:
            "AI & Data Science Developer",

        heroDescription:
            "विचारों को बुद्धिमान, उपयोगी और अर्थपूर्ण डिजिटल अनुभवों में बदलना।",

        exploreWork:
            "मेरे प्रोजेक्ट्स देखें",

        letsConnect:
            "संपर्क करें",

        projectsCount:
            "प्रोजेक्ट्स",

        certificatesCount:
            "प्रमाणपत्र",

        robotics:
            "रोबोटिक्स उपलब्धि",

        scroll:
            "एक्सप्लोर करने के लिए स्क्रॉल करें",

        localTime:
            "स्थानीय समय",

        rightNow:
            "अभी",

        currentlyBuilding:
            "वर्तमान में बना रहा हूँ",

        currently:
            "वर्तमान में",

        footerRole:
            "AI & Data Science Developer",

        allRights:
            "सर्वाधिकार सुरक्षित।"

    },


    ru: {

        introSmall:
            "Добро пожаловать в моё портфолио",

        introGreeting:
            "Здравствуйте, я Моганавел",

        navigation:
            "Навигация",

        explore:
            "Обзор",

        home:
            "Главная",

        about:
            "Обо мне",

        education:
            "Образование",

        experience:
            "Опыт",

        skills:
            "Навыки",

        projects:
            "Проекты",

        achievements:
            "Достижения",

        certificates:
            "Сертификаты",

        interactive:
            "Интерактивная зона",

        contact:
            "Контакты",

        menuFooter:
            "Давайте создадим что-нибудь значимое.",

        available:
            "Изучаю • Создаю • Развиваюсь",

        hello:
            "Здравствуйте, я",

        role:
            "Разработчик AI и Data Science",

        heroDescription:
            "Превращаю идеи в интеллектуальные, практичные и значимые цифровые решения.",

        exploreWork:
            "Посмотреть мои проекты",

        letsConnect:
            "Связаться со мной",

        projectsCount:
            "Проектов",

        certificatesCount:
            "Сертификатов",

        robotics:
            "Достижение в робототехнике",

        scroll:
            "Прокрутите, чтобы изучить",

        localTime:
            "Местное время",

        rightNow:
            "Сейчас",

        currentlyBuilding:
            "Сейчас создаю",

        currently:
            "Сейчас",

        footerRole:
            "Разработчик AI и Data Science",

        allRights:
            "Все права защищены."

    }

};


/* =====================================================
   APPLY LANGUAGE
===================================================== */

function applyLanguage(language) {

    const selected =
        translations[language];

    if (!selected) return;


    document
        .querySelectorAll("[data-i18n]")
        .forEach((element) => {

            const key =
                element.getAttribute("data-i18n");

            if (selected[key]) {

                element.textContent =
                    selected[key];

            }

        });


    const currentLanguage =
        document.getElementById(
            "currentLanguage"
        );


    if (currentLanguage) {

        currentLanguage.textContent =
            language.toUpperCase();

    }


    document.documentElement.lang =
        language;


    localStorage.setItem(
        "portfolioLanguage",
        language
    );

}


/* LANGUAGE BUTTONS */

document
    .querySelectorAll("[data-language]")
    .forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                const language =
                    button.dataset.language;

                applyLanguage(language);

                if (languageDropdown) {

                    languageDropdown.classList.remove(
                        "show"
                    );

                }

            }
        );

    });


const savedLanguage =
    localStorage.getItem(
        "portfolioLanguage"
    ) || "en";


applyLanguage(savedLanguage);


/* =====================================================
   THEME SYSTEM
===================================================== */

const themeButton =
    document.getElementById("themeButton");

const themeIcon =
    document.getElementById("themeIcon");


const themes = [
    "light",
    "dark",
    "system"
];


function applyTheme(theme) {

    document.body.classList.remove(
        "light-theme"
    );


    if (theme === "light") {

        document.body.classList.add(
            "light-theme"
        );


        if (themeIcon) {
            themeIcon.className =
                "fa-solid fa-sun";
        }


        if (themeButton) {
            themeButton.title =
                "Theme: Light";
        }

    }


    else if (theme === "dark") {

        if (themeIcon) {
            themeIcon.className =
                "fa-solid fa-moon";
        }


        if (themeButton) {
            themeButton.title =
                "Theme: Dark";
        }

    }


    else {

        const prefersLight =
            window.matchMedia(
                "(prefers-color-scheme: light)"
            ).matches;


        if (prefersLight) {

            document.body.classList.add(
                "light-theme"
            );

        }


        if (themeIcon) {
            themeIcon.className =
                "fa-solid fa-circle-half-stroke";
        }


        if (themeButton) {
            themeButton.title =
                "Theme: System";
        }

    }


    localStorage.setItem(
        "portfolioTheme",
        theme
    );

}


let currentTheme =
    localStorage.getItem(
        "portfolioTheme"
    ) || "system";


applyTheme(currentTheme);


if (themeButton) {

    themeButton.addEventListener(
        "click",
        () => {

            const currentIndex =
                themes.indexOf(currentTheme);


            const nextIndex =
                (currentIndex + 1) %
                themes.length;


            currentTheme =
                themes[nextIndex];


            applyTheme(currentTheme);

        }
    );

}


/* =====================================================
   LIVE DATE & TIME
===================================================== */

function updateDateTime() {

    const now =
        new Date();


    const timeElement =
        document.getElementById("liveTime");

    const dateElement =
        document.getElementById("liveDate");


    if (timeElement) {

        timeElement.textContent =
            now.toLocaleTimeString(
                undefined,
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                }
            );

    }


    if (dateElement) {

        dateElement.textContent =
            now.toLocaleDateString(
                undefined,
                {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
            );

    }

}


updateDateTime();


setInterval(
    updateDateTime,
    1000
);


/* =====================================================
   CURRENTLY BUILDING
===================================================== */

const buildingText =
    document.getElementById(
        "buildingText"
    );

const buildingDots =
    document.querySelectorAll(
        ".building-dot"
    );


const buildingItems = [

    "Web Development",
    "Node.js & Express",
    "AI & Data Science",
    "New Projects"

];


let buildingIndex = 0;


function changeBuildingText() {

    if (!buildingText) return;


    buildingText.style.opacity =
        "0";


    setTimeout(() => {

        buildingIndex =
            (
                buildingIndex + 1
            ) %
            buildingItems.length;


        buildingText.textContent =
            buildingItems[
                buildingIndex
            ];


        buildingDots.forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === buildingIndex
                );

            }
        );


        buildingText.style.opacity =
            "1";

    }, 250);

}


if (buildingText) {

    buildingText.style.transition =
        "opacity 0.25s ease";


    setInterval(
        changeBuildingText,
        3000
    );

}


/* =====================================================
   PROFILE CURSOR PARALLAX
===================================================== */

const profileFrame =
    document.getElementById(
        "profileFrame"
    );


if (
    profileFrame &&
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    profileFrame.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                profileFrame.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateY =
                (
                    (x - centerX) /
                    centerX
                ) * 7;


            const rotateX =
                (
                    (centerY - y) /
                    centerY
                ) * 7;


            profileFrame.style.transform =
                `rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 scale(1.02)`;

        }
    );


    profileFrame.addEventListener(
        "mouseleave",
        () => {

            profileFrame.style.transform =
                "rotateX(0deg) rotateY(0deg) scale(1)";

        }
    );

}


/* =====================================================
   COPYRIGHT YEAR
===================================================== */

const copyrightYear =
    document.getElementById(
        "copyrightYear"
    );


if (copyrightYear) {

    copyrightYear.textContent =
        new Date().getFullYear();

}


/* =====================================================
   PROJECT FILTER
===================================================== */

const projectFilterButtons =
    document.querySelectorAll(
        ".project-filter-btn"
    );

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectFilterButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const filter =
                    button.dataset.filter;


                projectFilterButtons.forEach(
                    (item) => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                projectCards.forEach(
                    (card) => {

                        const category =
                            card.dataset.category;


                        if (
                            filter === "all" ||
                            category === filter
                        ) {

                            card.classList.remove(
                                "project-hidden"
                            );

                        }

                        else {

                            card.classList.add(
                                "project-hidden"
                            );

                        }

                    }
                );

            }
        );

    }
);


/* =====================================================
   PROJECT VIDEO MODAL
===================================================== */

const videoModal =
    document.getElementById(
        "videoModal"
    );

const videoModalBackdrop =
    document.getElementById(
        "videoModalBackdrop"
    );

const videoModalClose =
    document.getElementById(
        "videoModalClose"
    );

const projectVideo =
    document.getElementById(
        "projectVideo"
    );

const videoModalTitle =
    document.getElementById(
        "videoModalTitle"
    );

const demoButtons =
    document.querySelectorAll(
        ".demo-button"
    );


function openProjectVideo(
    videoFile,
    title
) {

    if (
        !videoModal ||
        !projectVideo
    ) {
        return;
    }


    projectVideo.src =
        `../videos/${videoFile}`;


    if (videoModalTitle) {

        videoModalTitle.textContent =
            title;

    }


    videoModal.classList.add(
        "show"
    );


    videoModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "menu-open"
    );


    projectVideo.load();


    const playPromise =
        projectVideo.play();


    if (
        playPromise !== undefined
    ) {

        playPromise.catch(() => {
            // Browser may require manual play.
        });

    }

}


function closeProjectVideo() {

    if (!videoModal) return;


    if (projectVideo) {

        projectVideo.pause();

        projectVideo.currentTime =
            0;

        projectVideo.removeAttribute(
            "src"
        );

        projectVideo.load();

    }


    videoModal.classList.remove(
        "show"
    );


    videoModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "menu-open"
    );

}


demoButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                const video =
                    button.dataset.video;


                const title =
                    button.dataset.title;


                openProjectVideo(
                    video,
                    title
                );

            }
        );

    }
);


if (videoModalClose) {

    videoModalClose.addEventListener(
        "click",
        closeProjectVideo
    );

}


if (videoModalBackdrop) {

    videoModalBackdrop.addEventListener(
        "click",
        closeProjectVideo
    );

}


/* =====================================================
   ACHIEVEMENT CERTIFICATE PREVIEW
===================================================== */

const achievementCertificateButton =
    document.getElementById(
        "achievementCertificateButton"
    );

const certificatePreviewImage =
    document.querySelector(
        ".certificate-preview-image"
    );

const certificateModal =
    document.getElementById(
        "certificateModal"
    );

const certificateModalClose =
    document.getElementById(
        "certificateModalClose"
    );

const certificateModalBackdrop =
    document.getElementById(
        "certificateModalBackdrop"
    );


function openCertificatePreview() {

    if (!certificateModal) return;


    certificateModal.classList.add(
        "show"
    );


    certificateModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "menu-open"
    );

}


function closeCertificatePreview() {

    if (!certificateModal) return;


    certificateModal.classList.remove(
        "show"
    );


    certificateModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "menu-open"
    );

}


if (achievementCertificateButton) {

    achievementCertificateButton.addEventListener(
        "click",
        openCertificatePreview
    );

}


if (certificatePreviewImage) {

    certificatePreviewImage.addEventListener(
        "click",
        openCertificatePreview
    );

}


if (certificateModalClose) {

    certificateModalClose.addEventListener(
        "click",
        closeCertificatePreview
    );

}


if (certificateModalBackdrop) {

    certificateModalBackdrop.addEventListener(
        "click",
        closeCertificatePreview
    );

}


/* =====================================================
   CERTIFICATES PAGE PREVIEW
===================================================== */

const certificateViewButtons =
    document.querySelectorAll(
        "[data-certificate]"
    );

const certificatesPreviewModal =
    document.getElementById(
        "certificatesPreviewModal"
    );

const certificatesPreviewClose =
    document.getElementById(
        "certificatesPreviewClose"
    );

const certificatesPreviewBackdrop =
    document.getElementById(
        "certificatesPreviewBackdrop"
    );

const previewCertificateImage =
    document.getElementById(
        "previewCertificateImage"
    );

const previewCertificateTitle =
    document.getElementById(
        "previewCertificateTitle"
    );

const previewCertificateDownload =
    document.getElementById(
        "previewCertificateDownload"
    );


function openCertificateModal(
    number
) {

    if (!certificatesPreviewModal) {
        return;
    }


    const imagePath =
        `../images/certificates/certificate-${number}.jpg`;

    const pdfPath =
        `../certificates/certificate-${number}.pdf`;


    if (previewCertificateImage) {

        previewCertificateImage.src =
            imagePath;

        previewCertificateImage.alt =
            `Certificate ${number}`;

    }


    if (previewCertificateTitle) {

        previewCertificateTitle.textContent =
            `Certificate ${number}`;

    }


    if (previewCertificateDownload) {

        previewCertificateDownload.href =
            pdfPath;

    }


    certificatesPreviewModal.classList.add(
        "show"
    );


    certificatesPreviewModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "menu-open"
    );

}


function closeCertificateModal() {

    if (!certificatesPreviewModal) {
        return;
    }


    certificatesPreviewModal.classList.remove(
        "show"
    );


    certificatesPreviewModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "menu-open"
    );


    if (previewCertificateImage) {

        previewCertificateImage.src =
            "";

    }

}


certificateViewButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const number =
                    button.dataset.certificate;


                openCertificateModal(
                    number
                );

            }
        );

    }
);


if (certificatesPreviewClose) {

    certificatesPreviewClose.addEventListener(
        "click",
        closeCertificateModal
    );

}


if (certificatesPreviewBackdrop) {

    certificatesPreviewBackdrop.addEventListener(
        "click",
        closeCertificateModal
    );

}


/* =====================================================
   ESCAPE FOR MODALS
===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        if (
            videoModal &&
            videoModal.classList.contains("show")
        ) {

            closeProjectVideo();

        }


        if (
            certificateModal &&
            certificateModal.classList.contains("show")
        ) {

            closeCertificatePreview();

        }


        if (
            certificatesPreviewModal &&
            certificatesPreviewModal.classList.contains("show")
        ) {

            closeCertificateModal();

        }

    }
);


/* =====================================================
   INTERACTIVE ZONE
===================================================== */


/* -----------------------------------------------------
   LIVE CLOCK
----------------------------------------------------- */

const liveTime =
    document.getElementById(
        "liveTime"
    );

const liveDate =
    document.getElementById(
        "liveDate"
    );

const timeZone =
    document.getElementById(
        "timeZone"
    );


function updateLiveClock() {

    const now =
        new Date();


    if (liveTime) {

        liveTime.textContent =
            now.toLocaleTimeString(
                undefined,
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false
                }
            );

    }


    if (liveDate) {

        liveDate.textContent =
            now.toLocaleDateString(
                undefined,
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );

    }


    if (timeZone) {

        const zone =
            Intl.DateTimeFormat()
                .resolvedOptions()
                .timeZone;


        timeZone.textContent =
            zone;

    }

}


updateLiveClock();


setInterval(
    updateLiveClock,
    1000
);


/* -----------------------------------------------------
   TECHNOLOGY INTERACTION
----------------------------------------------------- */

const techNodes =
    document.querySelectorAll(
        ".tech-node"
    );

const techDescriptionTitle =
    document.getElementById(
        "techDescriptionTitle"
    );

const techDescriptionText =
    document.getElementById(
        "techDescriptionText"
    );

const techDescriptionIcon =
    document.getElementById(
        "techDescriptionIcon"
    );


techNodes.forEach(
    (node) => {

        function showTechnology() {

            const tech =
                node.dataset.tech;

            const description =
                node.dataset.description;

            const icon =
                node.dataset.icon;


            techNodes.forEach(
                (item) => {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            node.classList.add(
                "active"
            );


            if (techDescriptionTitle) {

                techDescriptionTitle.textContent =
                    tech;

            }


            if (techDescriptionText) {

                techDescriptionText.textContent =
                    description;

            }


            if (techDescriptionIcon) {

                techDescriptionIcon.className =
                    icon;

            }

        }


        node.addEventListener(
            "mouseenter",
            showTechnology
        );


        node.addEventListener(
            "click",
            showTechnology
        );

    }
);


/* -----------------------------------------------------
   DEVELOPER THOUGHTS
----------------------------------------------------- */

const developerQuotes = [

    "The best way to learn technology is to build something with it.",

    "A project becomes valuable when it solves a real problem.",

    "Curiosity starts the journey. Consistency completes it.",

    "Every bug is another opportunity to understand the system.",

    "Don't just learn the technology. Build with it.",

    "Small projects today can become big ideas tomorrow.",

    "The most interesting solutions usually begin with a simple question."

];


const developerQuote =
    document.getElementById(
        "developerQuote"
    );

const newQuoteButton =
    document.getElementById(
        "newQuoteButton"
    );


let lastQuoteIndex = 0;


function showRandomQuote() {

    if (!developerQuote) return;


    let randomIndex;


    do {

        randomIndex =
            Math.floor(
                Math.random() *
                developerQuotes.length
            );

    } while (
        randomIndex === lastQuoteIndex &&
        developerQuotes.length > 1
    );


    lastQuoteIndex =
        randomIndex;


    developerQuote.style.opacity =
        "0";


    setTimeout(
        () => {

            developerQuote.textContent =
                developerQuotes[
                    randomIndex
                ];


            developerQuote.style.opacity =
                "1";

        },
        180
    );

}


if (newQuoteButton) {

    newQuoteButton.addEventListener(
        "click",
        showRandomQuote
    );

}


/* =====================================================
   SECURE BACKEND CONTACT FORM
===================================================== */

const contactForm = document.getElementById("contactForm");
const contactSubmitButton = document.getElementById("contactSubmitButton");
const contactSuccessModal = document.getElementById("contactSuccessModal");
const contactSuccessBackdrop = document.getElementById("contactSuccessBackdrop");
const successClose = document.getElementById("successClose");
const successDone = document.getElementById("successDone");

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(contactForm).entries());
        if (contactSubmitButton) contactSubmitButton.classList.add("loading");
        if (contactFormStatus) {
            contactFormStatus.textContent = "Sending...";
            contactFormStatus.className = "contact-form-status";
        }
        try {
            const response = await PortfolioAPI.request("/api/public/contact", {
                method: "POST",
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error("Unable to send message");
            contactForm.reset();
            if (contactFormStatus) {
                contactFormStatus.textContent = "Message sent successfully.";
                contactFormStatus.className = "contact-form-status success";
            }
            if (contactSuccessModal) contactSuccessModal.classList.add("show");
        } catch (error) {
            if (contactFormStatus) {
                contactFormStatus.textContent = "The message could not be sent right now. Please try again.";
                contactFormStatus.className = "contact-form-status error";
            }
        } finally {
            if (contactSubmitButton) contactSubmitButton.classList.remove("loading");
        }
    });
}

function closeContactSuccess() {
    if (contactSuccessModal) contactSuccessModal.classList.remove("show");
}
if (successClose) successClose.addEventListener("click", closeContactSuccess);
if (successDone) successDone.addEventListener("click", closeContactSuccess);
if (contactSuccessBackdrop) contactSuccessBackdrop.addEventListener("click", closeContactSuccess);

/* =====================================================
   CONTACT SUCCESS MODAL
===================================================== */

function closeContactSuccess() {

    if (!contactSuccessModal) {
        return;
    }


    contactSuccessModal.classList.remove(
        "show"
    );


    contactSuccessModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


if (successClose) {

    successClose.addEventListener(
        "click",
        closeContactSuccess
    );

}


if (successDone) {

    successDone.addEventListener(
        "click",
        closeContactSuccess
    );

}


if (contactSuccessBackdrop) {

    contactSuccessBackdrop.addEventListener(
        "click",
        closeContactSuccess
    );

}


/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */

const siteHeader =
    document.querySelector(
        ".site-header"
    );


function handleHeaderScroll() {

    if (!siteHeader) return;


    if (window.scrollY > 30) {

        siteHeader.classList.add(
            "scrolled"
        );

    }

    else {

        siteHeader.classList.remove(
            "scrolled"
        );

    }

}


window.addEventListener(
    "scroll",
    handleHeaderScroll,
    {
        passive: true
    }
);


handleHeaderScroll();




/* =====================================================
   PORTFOLIO FULL-STACK ENHANCEMENTS
===================================================== */

const API_BASE = window.PORTFOLIO_API_BASE || "http://localhost:8080";
const PortfolioAPI = {
    async request(path, options = {}) {
        const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
        return fetch(`${API_BASE}${path}`, { credentials: "include", ...options, headers });
    },
    async json(path, options = {}) {
        const response = await this.request(path, options);
        if (!response.ok) throw new Error(await response.text() || "Request failed");
        return response.json();
    }
};

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>'\"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'\"':"&quot;"}[c]));
}

function slugFromProjectCard(card) {
    const image = card.querySelector("img")?.getAttribute("src") || "";
    const file = image.split("/").pop() || "";
    return file.replace(/\.[^.]+$/, "");
}

function enhanceProjectCards() {
    document.querySelectorAll(".project-card").forEach(card => {
        if (card.dataset.enhanced === "true") return;
        const slug = slugFromProjectCard(card);
        if (!slug) return;
        card.dataset.projectSlug = slug;
        card.dataset.enhanced = "true";
        const actions = card.querySelector(".project-actions");
        if (!actions) return;
        const stats = document.createElement("div");
        stats.className = "project-social-stats";
        stats.innerHTML = `
            <button class="project-like-button" type="button" data-like-project="${escapeHTML(slug)}" aria-label="Like project">
                <i class="fa-regular fa-heart"></i><span class="project-like-count">0</span>
            </button>
            <span class="project-view-count"><i class="fa-regular fa-eye"></i><span>0</span> views</span>`;
        actions.parentNode.insertBefore(stats, actions);
        loadProjectStats(card, slug);
    });
    document.querySelectorAll("[data-like-project]").forEach(btn => {
        btn.addEventListener("click", async () => {
            if (btn.dataset.busy === "true") return;
            btn.dataset.busy = "true";
            try {
                const data = await PortfolioAPI.json(`/api/public/projects/${encodeURIComponent(btn.dataset.likeProject)}/like`, { method: "POST" });
                btn.querySelector(".project-like-count").textContent = data.likes;
                btn.classList.toggle("liked", data.liked);
                btn.querySelector("i").className = data.liked ? "fa-solid fa-heart" : "fa-regular fa-heart";
            } catch (_) {}
            finally { btn.dataset.busy = "false"; }
        });
    });
}

async function loadProjectStats(card, slug) {
    try {
        const data = await PortfolioAPI.json(`/api/public/projects/${encodeURIComponent(slug)}`);
        const likes = card.querySelector(".project-like-count");
        const views = card.querySelector(".project-view-count span");
        if (likes) likes.textContent = data.likes;
        if (views) views.textContent = data.views;
    } catch (_) {}
}

async function registerProjectView() {
    const slug = new URLSearchParams(window.location.search).get("project");
    if (!slug) return;
    try { await PortfolioAPI.request(`/api/public/projects/${encodeURIComponent(slug)}/view`, { method: "POST" }); } catch (_) {}
}

async function renderDynamicProjects() {
    const grid = document.querySelector(".projects-grid");
    if (!grid) return;
    try {
        const projects = await PortfolioAPI.json("/api/public/projects");
        if (!Array.isArray(projects) || !projects.length) return;
        grid.innerHTML = projects.map((p, i) => `
            <article class="project-card ${p.featured ? "featured-project-card" : ""}" data-category="${escapeHTML(p.category || "other")}" data-project-slug="${escapeHTML(p.slug)}" data-enhanced="true">
                <div class="project-image">
                    <img src="../${escapeHTML(p.imagePath || "images/projects/default.jpg")}" alt="${escapeHTML(p.title)}" loading="lazy">
                    <span class="project-number">${String(i + 1).padStart(2, "0")}</span>
                    <span class="project-type">${p.featured ? "Featured" : escapeHTML(p.type || "Project")}</span>
                </div>
                <div class="project-content">
                    <span class="project-category">${escapeHTML(p.category || "Project")}</span>
                    <h2>${escapeHTML(p.title)}</h2>
                    <p>${escapeHTML(p.description)}</p>
                    <div class="project-tech">${(p.technologies || []).map(x => `<span>${escapeHTML(x)}</span>`).join("")}</div>
                    <div class="project-social-stats">
                        <button class="project-like-button" type="button" data-like-project="${escapeHTML(p.slug)}"><i class="fa-regular fa-heart"></i><span class="project-like-count">${p.likes || 0}</span></button>
                        <span class="project-view-count"><i class="fa-regular fa-eye"></i><span>${p.views || 0}</span> views</span>
                    </div>
                    <div class="project-actions">
                        ${p.githubUrl && p.githubUrl !== "#" ? `<a href="${escapeHTML(p.githubUrl)}" target="_blank" rel="noopener" class="project-link"><i class="fa-brands fa-github"></i> GitHub</a>` : ""}
                        ${p.liveUrl && p.liveUrl !== "#" ? `<a href="${escapeHTML(p.liveUrl)}" target="_blank" rel="noopener" class="project-link"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>` : ""}
                        <a href="?project=${encodeURIComponent(p.slug)}" class="project-link"><i class="fa-solid fa-circle-info"></i> Details</a>
                    </div>
                </div>
            </article>`).join("");
        enhanceProjectCards();
    } catch (_) {}
}

function buildAssistant() {
    if (document.getElementById("portfolioAssistant")) return;
    const root = document.createElement("div");
    root.id = "portfolioAssistant";
    root.innerHTML = `
        <button class="assistant-fab" id="assistantFab" aria-label="Open portfolio assistant"><i class="fa-solid fa-comments"></i></button>
        <section class="assistant-panel" id="assistantPanel" aria-label="Portfolio Assistant">
            <header><div><strong>Portfolio Assistant</strong><small>Built into this portfolio</small></div><button id="assistantClose" aria-label="Close">×</button></header>
            <div class="assistant-messages" id="assistantMessages"><div class="assistant-message bot">Hi! 👋 Ask me about projects, skills, education, experience, certifications or how to contact Moganavel.</div></div>
            <div class="assistant-suggestions" id="assistantSuggestions"><button>What projects are available?</button><button>What are the main skills?</button><button>Tell me about the education.</button></div>
            <form id="assistantForm"><input id="assistantInput" autocomplete="off" placeholder="Ask about the portfolio…"><button aria-label="Send"><i class="fa-solid fa-paper-plane"></i></button></form>
        </section>`;
    document.body.appendChild(root);
    const fab=document.getElementById("assistantFab"), panel=document.getElementById("assistantPanel"), close=document.getElementById("assistantClose"), form=document.getElementById("assistantForm"), input=document.getElementById("assistantInput"), messages=document.getElementById("assistantMessages");
    const addMessage=(text,who)=>{ const el=document.createElement("div"); el.className=`assistant-message ${who}`; el.textContent=text; messages.appendChild(el); messages.scrollTop=messages.scrollHeight; };
    const ask=async q=>{ if(!q.trim()) return; addMessage(q,"user"); input.value=""; try { const r=await PortfolioAPI.json(`/api/public/assistant?question=${encodeURIComponent(q)}`); addMessage(r.answer,"bot"); } catch(_) { addMessage("I can answer questions about the portfolio, projects, skills, education, experience and contact details.","bot"); } };
    fab.onclick=()=>{ panel.classList.toggle("open"); if(panel.classList.contains("open")) input.focus(); };
    close.onclick=()=>panel.classList.remove("open");
    form.onsubmit=e=>{e.preventDefault(); ask(input.value);};
    document.querySelectorAll("#assistantSuggestions button").forEach(b=>b.onclick=()=>ask(b.textContent));
}

function injectPortfolioEnhancements(){
    enhanceProjectCards();
    renderDynamicProjects();
    registerProjectView();
    buildAssistant();
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", injectPortfolioEnhancements); else injectPortfolioEnhancements();

/* =====================================================
   SCROLL ANIMATIONS
===================================================== */

const animatedElements =
    document.querySelectorAll(
        ".animate-on-scroll"
    );


if (
    animatedElements.length &&
    "IntersectionObserver" in window
) {

    const animationObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            animationObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.8
            }
        );


    animatedElements.forEach(
        (element) => {

            animationObserver.observe(
                element
            );

        }

    );

}
/* =====================================================
   CONTACT FORM
   SPRING BOOT BACKEND
===================================================== */


const formStatus =
    document.getElementById("formStatus");



if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const name =
                document
                    .getElementById("visitorName")
                    ?.value
                    .trim();

            const email =
                document
                    .getElementById("visitorEmail")
                    ?.value
                    .trim();

            const subject =
                document
                    .getElementById("visitorSubject")
                    ?.value
                    .trim();

            const message =
                document
                    .getElementById("visitorMessage")
                    ?.value
                    .trim();


            /* -----------------------------------------
               VALIDATION
            ----------------------------------------- */

            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                if (formStatus) {

                    formStatus.textContent =
                        "Please fill in all fields.";

                    formStatus.className =
                        "form-status error";
                }

                return;
            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                if (formStatus) {

                    formStatus.textContent =
                        "Please enter a valid email address.";

                    formStatus.className =
                        "form-status error";
                }

                return;
            }


            /* -----------------------------------------
               LOADING STATE
            ----------------------------------------- */

            if (contactSubmitButton) {

                contactSubmitButton.disabled = true;

                contactSubmitButton.classList.add(
                    "loading"
                );

                const buttonText =
                    contactSubmitButton.querySelector(
                        "span"
                    );

                if (buttonText) {

                    buttonText.textContent =
                        "Sending...";
                }
            }


            if (formStatus) {

                formStatus.textContent =
                    "Sending your message...";

                formStatus.className =
                    "form-status";
            }


            /* -----------------------------------------
               SEND TO SPRING BOOT
            ----------------------------------------- */

            try {

                const response =
                    await fetch(
                        "http://localhost:8080/api/public/contact",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                name: name,

                                email: email,

                                /*
                                 * ContactMessage currently stores
                                 * name, email and message.
                                 *
                                 * Therefore we include the subject
                                 * inside the saved message.
                                 */

                                message:
                                    `Subject: ${subject}\n\n${message}`
                            })
                        }
                    );


                /* -------------------------------------
                   CHECK RESPONSE
                ------------------------------------- */

                if (!response.ok) {

                    let errorMessage =
                        "Unable to send your message.";

                    try {

                        const errorData =
                            await response.json();

                        if (
                            errorData.message
                        ) {

                            errorMessage =
                                errorData.message;
                        }

                    } catch (_) {

                        // Ignore invalid error JSON

                    }

                    throw new Error(
                        errorMessage
                    );
                }


                /* -------------------------------------
                   SUCCESS
                ------------------------------------- */

                if (formStatus) {

                    formStatus.textContent =
                        "Thank you! Your message has been received.";

                    formStatus.className =
                        "form-status success";
                }


                /*
                 * Optional local copy.
                 * This keeps the existing portfolio's
                 * local-response idea intact.
                 */

                try {

                    const existingMessages =
                        JSON.parse(
                            localStorage.getItem(
                                "portfolioContactMessages"
                            ) || "[]"
                        );


                    existingMessages.push({

                        name: name,

                        email: email,

                        subject: subject,

                        message: message,

                        createdAt:
                            new Date().toISOString()
                    });


                    localStorage.setItem(
                        "portfolioContactMessages",
                        JSON.stringify(
                            existingMessages
                        )
                    );

                } catch (storageError) {

                    console.warn(
                        "Local contact storage unavailable:",
                        storageError
                    );
                }


                /* Reset form */

                contactForm.reset();


                /* Restore button */

                if (contactSubmitButton) {

                    const buttonText =
                        contactSubmitButton.querySelector(
                            "span"
                        );

                    if (buttonText) {

                        buttonText.textContent =
                            "Send Message";
                    }
                }


            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );


                if (formStatus) {

                    formStatus.textContent =
                        "The message could not be sent right now. Please try again.";

                    formStatus.className =
                        "form-status error";
                }

            } finally {

                if (contactSubmitButton) {

                    contactSubmitButton.disabled =
                        false;

                    contactSubmitButton.classList.remove(
                        "loading"
                    );

                    const buttonText =
                        contactSubmitButton.querySelector(
                            "span"
                        );

                    if (buttonText) {

                        buttonText.textContent =
                            "Send Message";
                    }
                }
            }

        }
    );

}