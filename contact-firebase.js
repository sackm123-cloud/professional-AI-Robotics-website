// contact-firebase.js

import { saveContactMessage } from "./firebase-services.js";

document.addEventListener("DOMContentLoaded", () => {

  const form =
    document.querySelector("#contactForm") ||
    document.querySelector("form");

  if (!form) {
    console.warn("Contact form not found.");
    return;
  }

  form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const submitButton =
      form.querySelector('button[type="submit"], input[type="submit"]');

    const name =
      form.querySelector("#name, [name='name']")?.value.trim() || "";

    const email =
      form.querySelector("#email, [name='email']")?.value.trim() || "";

    const subject =
      form.querySelector("#subject, [name='subject']")?.value.trim() || "";

    const message =
      form.querySelector("#message, textarea[name='message']")?.value.trim() || "";

    if (!name || !email || !message) {
      showStatus(
        form,
        "Please complete your name, email and message.",
        "error"
      );
      return;
    }

    if (!isValidEmail(email)) {
      showStatus(
        form,
        "Please enter a valid email address.",
        "error"
      );
      return;
    }

    try {

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.dataset.originalText =
          submitButton.textContent || submitButton.value;

        if ("value" in submitButton) {
          submitButton.value = "Sending...";
        } else {
          submitButton.textContent = "Sending...";
        }
      }

      await saveContactMessage({
        name,
        email,
        subject,
        message
      });

      showStatus(
        form,
        "Thank you! Your message has been sent successfully.",
        "success"
      );

      form.reset();

    } catch (error) {

      console.error("Firebase contact error:", error);

      showStatus(
        form,
        "Something went wrong. Please try again later.",
        "error"
      );

    } finally {

      if (submitButton) {

        submitButton.disabled = false;

        const original =
          submitButton.dataset.originalText || "Send Message";

        if ("value" in submitButton) {
          submitButton.value = original;
        } else {
          submitButton.textContent = original;
        }
      }
    }
  });
});


function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


function showStatus(form, message, type) {

  let status = form.querySelector(".firebase-form-status");

  if (!status) {

    status = document.createElement("div");

    status.className = "firebase-form-status";

    form.appendChild(status);
  }

  status.textContent = message;

  status.classList.remove(
    "success",
    "error"
  );

  status.classList.add(type);

  setTimeout(() => {
    status.classList.remove(type);
  }, 6000);
}
