// chatbot.js

import { model } from "./firebase-services.js";

document.addEventListener("DOMContentLoaded", () => {

  createChatbot();

});


function createChatbot() {

  if (document.getElementById("ai-chatbot")) {
    return;
  }

  const chatbot = document.createElement("div");

  chatbot.id = "ai-chatbot";

  chatbot.innerHTML = `

    <button
      id="chatbot-toggle"
      class="chatbot-toggle"
      aria-label="Open AI Robotics Assistant"
    >
      🤖
    </button>


    <div
      id="chatbot-window"
      class="chatbot-window"
      aria-hidden="true"
    >

      <div class="chatbot-header">

        <div>
          <strong>AI Robotics Assistant</strong>
          <small>Powered by Gemini</small>
        </div>

        <button
          id="chatbot-close"
          class="chatbot-close"
          aria-label="Close chatbot"
        >
          ×
        </button>

      </div>


      <div
        id="chatbot-messages"
        class="chatbot-messages"
      >

        <div class="chat-message bot">

          <div class="chat-bubble">

            Hello! 👋

            I'm your AI Robotics Assistant.

            Ask me about robotics, Arduino, ESP32,
            AI, IoT, STEM education, 3D printing,
            robotics projects or training programs.

          </div>

        </div>

      </div>


      <div class="chatbot-suggestions">

        <button data-question="What robotics courses do you offer?">
          Courses
        </button>

        <button data-question="What is Arduino?">
          Arduino
        </button>

        <button data-question="What can I build with ESP32?">
          ESP32
        </button>

      </div>


      <form id="chatbot-form">

        <input
          id="chatbot-input"
          type="text"
          placeholder="Ask about robotics..."
          autocomplete="off"
          required
        >

        <button type="submit">
          ➤
        </button>

      </form>

    </div>
  `;

  document.body.appendChild(chatbot);

  setupChatbotEvents();
}


function setupChatbotEvents() {

  const toggle =
    document.getElementById("chatbot-toggle");

  const close =
    document.getElementById("chatbot-close");

  const windowElement =
    document.getElementById("chatbot-window");

  const form =
    document.getElementById("chatbot-form");

  const input =
    document.getElementById("chatbot-input");


  toggle.addEventListener("click", () => {

    windowElement.classList.toggle("open");

    windowElement.setAttribute(
      "aria-hidden",
      !windowElement.classList.contains("open")
    );

    if (windowElement.classList.contains("open")) {
      input.focus();
    }

  });


  close.addEventListener("click", () => {

    windowElement.classList.remove("open");

    windowElement.setAttribute(
      "aria-hidden",
      "true"
    );

  });


  form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const question = input.value.trim();

    if (!question) {
      return;
    }

    input.value = "";

    addMessage(question, "user");

    const loading = addMessage(
      "Thinking...",
      "bot",
      true
    );

    try {

      const answer =
        await askGemini(question);

      loading.remove();

      addMessage(answer, "bot");

    } catch (error) {

      console.error(
        "Gemini chatbot error:",
        error
      );

      loading.remove();

      addMessage(
        "Sorry, I couldn't process that request right now. Please try again.",
        "bot"
      );

    }

  });


  document
    .querySelectorAll(".chatbot-suggestions button")
    .forEach(button => {

      button.addEventListener("click", () => {

        input.value =
          button.dataset.question;

        form.dispatchEvent(
          new Event("submit", {
            bubbles: true,
            cancelable: true
          })
        );

      });

    });

}


async function askGemini(question) {

  const systemContext = `

You are the AI Robotics Assistant for a professional
AI and Robotics education website.

Your role is to answer questions about:

- Robotics
- Artificial Intelligence
- Machine Learning
- Arduino
- ESP32
- ESP8266
- Raspberry Pi
- IoT
- Sensors
- Electronics
- Automation
- STEM education
- 3D printing
- Robotics projects
- Programming
- Robotics training
- Workshops
- AI education

Give practical, accurate and beginner-friendly answers.

If the user asks about services or courses and the
website does not provide enough information, say that
they should contact the team through the contact page.

Do not invent prices, qualifications, certificates,
addresses, phone numbers or course schedules.

Keep answers concise unless the user asks for detail.

Website:
Professional AI Robotics Website.

`;


  const prompt = `
${systemContext}

User question:

${question}
`;


  const result =
    await model.generateContent(prompt);

  return result.response.text();
}


function addMessage(
  text,
  sender,
  temporary = false
) {

  const messages =
    document.getElementById("chatbot-messages");

  const wrapper =
    document.createElement("div");

  wrapper.className =
    `chat-message ${sender}`;

  const bubble =
    document.createElement("div");

  bubble.className =
    "chat-bubble";

  bubble.textContent = text;

  wrapper.appendChild(bubble);

  messages.appendChild(wrapper);

  messages.scrollTop =
    messages.scrollHeight;

  return wrapper;
}
