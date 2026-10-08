/* =========================================================
   PORTFOLIO ASSISTANT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const API_URL =
        "http://localhost:8080/api/assistant";

    const trigger =
        document.getElementById("assistantTrigger");

    const assistant =
        document.getElementById("portfolioAssistant");

    const closeButton =
        document.getElementById("assistantClose");

    const messages =
        document.getElementById("assistantMessages");

    const form =
        document.getElementById("assistantForm");

    const input =
        document.getElementById("assistantInput");

    const sendButton =
        document.getElementById("assistantSend");

    const suggestions =
        document.getElementById("assistantSuggestions");

    if (
        !trigger ||
        !assistant ||
        !closeButton ||
        !messages ||
        !form ||
        !input
    ) {
        return;
    }


    /* =====================================================
       OPEN / CLOSE
    ===================================================== */

    function openAssistant() {

        assistant.classList.add("open");

        assistant.setAttribute(
            "aria-hidden",
            "false"
        );

        setTimeout(() => {
            input.focus();
        }, 200);
    }


    function closeAssistant() {

        assistant.classList.remove("open");

        assistant.setAttribute(
            "aria-hidden",
            "true"
        );
    }


    trigger.addEventListener(
        "click",
        openAssistant
    );

    closeButton.addEventListener(
        "click",
        closeAssistant
    );


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                assistant.classList.contains("open")
            ) {
                closeAssistant();
            }

        }
    );


    /* =====================================================
       ADD MESSAGE
    ===================================================== */

    function addMessage(text, type) {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            `assistant-message assistant-${type}`;


        if (type === "bot") {

            const avatar =
                document.createElement("div");

            avatar.className =
                "assistant-message-avatar";

            avatar.innerHTML =
                '<i class="fa-solid fa-sparkles"></i>';

            wrapper.appendChild(avatar);
        }


        const content =
            document.createElement("div");

        content.className =
            "assistant-message-content";

        content.textContent = text;

        wrapper.appendChild(content);

        messages.appendChild(wrapper);

        messages.scrollTop =
            messages.scrollHeight;
    }


    /* =====================================================
       TYPING INDICATOR
    ===================================================== */

    function showTyping() {

        const typing =
            document.createElement("div");

        typing.className =
            "assistant-message assistant-bot";

        typing.id =
            "assistantTyping";


        const avatar =
            document.createElement("div");

        avatar.className =
            "assistant-message-avatar";

        avatar.innerHTML =
            '<i class="fa-solid fa-sparkles"></i>';


        const content =
            document.createElement("div");

        content.className =
            "assistant-message-content assistant-typing";

        content.innerHTML =
            "<span></span><span></span><span></span>";


        typing.appendChild(avatar);

        typing.appendChild(content);

        messages.appendChild(typing);

        messages.scrollTop =
            messages.scrollHeight;
    }


    function hideTyping() {

        const typing =
            document.getElementById(
                "assistantTyping"
            );

        if (typing) {
            typing.remove();
        }
    }


    /* =====================================================
       ASK ASSISTANT
    ===================================================== */

    async function askAssistant(question) {

        const cleanQuestion =
            String(question || "").trim();


        if (!cleanQuestion) {
            return;
        }


        addMessage(
            cleanQuestion,
            "user"
        );


        input.value = "";

        sendButton.disabled = true;

        showTyping();


        try {

            const response =
                await fetch(
                    `${API_URL}?question=${encodeURIComponent(cleanQuestion)}`
                );


            if (!response.ok) {
                throw new Error(
                    "Assistant request failed"
                );
            }


            const data =
                await response.json();


            hideTyping();


            addMessage(
                data.answer ||
                "I couldn't find an answer.",
                "bot"
            );


        } catch (error) {

            console.error(
                "Assistant error:",
                error
            );


            hideTyping();


            addMessage(
                "Sorry, I couldn't connect to the portfolio assistant right now.",
                "bot"
            );


        } finally {

            sendButton.disabled = false;

            input.focus();
        }
    }


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            askAssistant(
                input.value
            );
        }
    );


    /* =====================================================
       SUGGESTED QUESTIONS
    ===================================================== */

    if (suggestions) {

        suggestions
            .querySelectorAll(
                "[data-question]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        askAssistant(
                            button.dataset.question
                        );
                    }
                );

            });
    }

});