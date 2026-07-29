/*=========================================
 AI STEM Innovation
 Main JavaScript
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
      Mobile Navigation
    ==============================*/

    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector("nav");

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }

        });

        document.querySelectorAll("nav a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");

                const icon = menuBtn.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            });

        });

    }

    /*==============================
      Sticky Header Shadow
    ==============================*/

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (!header) return;

        if (window.scrollY > 50) {

            header.style.boxShadow =
                "0 10px 25px rgba(0,0,0,0.12)";

        } else {

            header.style.boxShadow =
                "0 5px 15px rgba(0,0,0,0.08)";

        }

    });

    /*==============================
      Fade Animation
    ==============================*/

    const animatedItems = document.querySelectorAll(
        ".card,.course,.testimonial-box,.stat,.cta,.hero-text,.hero-image,.contact-info,.contact-form"
    );

    animatedItems.forEach(item => item.classList.add("fade"));

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: 0.2
    });

    animatedItems.forEach(item => observer.observe(item));

    /*==============================
      Contact Form
    ==============================*/

    const form = document.getElementById("contactForm");

    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            const inputs = form.querySelectorAll(
                "input, textarea, select"
            );

            let valid = true;

            inputs.forEach(input => {

                if (!input.value.trim()) {

                    valid = false;
                    input.style.border = "2px solid red";

                } else {

                    input.style.border = "1px solid #ddd";

                }

            });

            if (!valid) {

                alert("Please fill all required fields.");

                return;

            }

            alert(
                "Thank you! Your message has been submitted successfully."
            );

            form.reset();

        });

    }

    /*==============================
      Smooth Scroll
    ==============================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (target) {

                e.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

    /*==============================
      Counter Animation
    ==============================*/

    const counters = document.querySelectorAll(".stat h2");

    function runCounter(counter) {

        const target = parseInt(
            counter.innerText.replace(/\D/g, "")
        );

        if (isNaN(target)) return;

        let value = 0;

        const speed = Math.max(20, Math.floor(target / 50));

        const timer = setInterval(() => {

            value += speed;

            if (value >= target) {

                value = target;

                clearInterval(timer);

            }

            const suffix = counter.innerText.includes("+") ? "+" : "";

            counter.innerText = value + suffix;

        }, 20);

    }

    const statObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                runCounter(entry.target);

                statObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.4
    });

    counters.forEach(counter => statObserver.observe(counter));

    /*==============================
      Back To Top Button
    ==============================*/

    const topBtn = document.createElement("button");

    topBtn.innerHTML = "↑";

    topBtn.id = "topBtn";

    document.body.appendChild(topBtn);

    Object.assign(topBtn.style, {
        position: "fixed",
        right: "25px",
        bottom: "25px",
        width: "50px",
        height: "50px",
        border: "none",
        borderRadius: "50%",
        background: "#0057ff",
        color: "#fff",
        fontSize: "22px",
        cursor: "pointer",
        display: "none",
        zIndex: "9999",
        boxShadow: "0 10px 20px rgba(0,0,0,.2)"
    });

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            topBtn.style.display = "block";

        } else {

            topBtn.style.display = "none";

        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

    /*==============================
      Current Year in Footer
    ==============================*/

    const year = new Date().getFullYear();

    const copyright = document.querySelector(".copyright");

    if (copyright) {

        copyright.innerHTML =
            `© ${year} AI STEM Innovation. All Rights Reserved.`;

    }

});