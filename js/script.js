

document.addEventListener("DOMContentLoaded", function () {

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // ---------- NAVBAR SCROLL ANIMATION ----------
    const navbar = document.getElementById('mainNavbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = "0.4rem 0";
            navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
        } else {
            navbar.style.padding = "0.8rem 0";
            navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.05)";
        }
    });

    // ---------- HERO SECTION ANIMATIONS ----------
    const heroTimeline = gsap.timeline();
    heroTimeline
        .from(".hero-title", {
            duration: 1,
            y: 80,
            opacity: 0,
            ease: "power3.out",
            stagger: 0.2
        })
        .from(".hero-subtitle", {
            duration: 0.8,
            y: 40,
            opacity: 0,
            ease: "back.out(1)"
        }, "-=0.5")
        .from(".hero-buttons .btn", {
            duration: 0.6,
            stagger: 0.2,
            ease: "elastic.out(1, 0.5)"
        }, "-=0.3")
        .from(".floating-shape", {
            duration: 1.2,
            scale: 0,
            rotation: 360,
            opacity: 0,
            ease: "back.out(1.2)"
        }, "-=0.8");

    // ---------- ABOUT SECTION FADE IN ----------
    gsap.from(".about-text", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 75%",
            toggleActions: "play none none reverse"
        },
        duration: 1,
        x: -60,
        opacity: 0,
        ease: "power2.out"
    });

    gsap.from(".about-illustration", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 75%"
        },
        duration: 1,
        x: 60,
        opacity: 0,
        ease: "power2.out"
    });

    // ---------- SERVICES SECTION STAGGER ANIMATION ----------
    gsap.from(".service-card", {
        scrollTrigger: {
            trigger: "#services",
            start: "top 70%",
            toggleActions: "play none none reset"
        },
        duration: 0.8,
        y: 50,
        stagger: 0.2,
        ease: "back.out(0.8)"
    });

    // ---------- PROJECTS SECTION - CARDS ENTRANCE ----------
    gsap.from(".project-card", {
        scrollTrigger: {
            trigger: "#projects",
            start: "top 70%",
        },
        duration: 0.7,
        scale: 0.9,
        stagger: 0.15,
        ease: "power2.out"
    });

    // ---------- ARTICLES SECTION ----------
    gsap.from(".article-card", {
        scrollTrigger: {
            trigger: "#articles",
            start: "top 75%",
        },
        duration: 0.8,
        y: 40,
        stagger: 0.2,
        ease: "sine.out"
    });

    // ---------- CONTACT FORM FLOATING ANIMATION ----------
    gsap.from(".contact-form", {
        scrollTrigger: {
            trigger: "#contact",
            start: "top 70%",
        },
        duration: 1,
        y: 60,
        ease: "elastic.out(1, 0.4)"
    });

    // ---------- FOOTER REVEAL ----------
    gsap.from(".footer-section .row", {
        scrollTrigger: {
            trigger: ".footer-section",
            start: "top 85%",
        },
        duration: 0.9,
        y: 30,
        opacity: 0,
        clearProps: "all"
    });

    // ---------- ADD SMOOTH SCROLL FOR NAV LINKS ----------
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Update active link state
                    navLinks.forEach(lnk => lnk.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // ---------- ACTIVE NAV HIGHLIGHT ON SCROLL (Intersection Observer) ----------
    const sections = document.querySelectorAll('section');
    const observerOptions = { threshold: 0.4 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    sections.forEach(section => observer.observe(section));

    // ---------- CONTACT FORM HANDLER WITH VALIDATION & FEEDBACK ----------
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                formFeedback.innerHTML = '<div class="alert alert-danger">⚠️ Please fill in all fields.</div>';
                // auto dismiss after 3 seconds
                setTimeout(() => { formFeedback.innerHTML = ''; }, 3000);
                return;
            }
            if (!email.includes('@') || !email.includes('.')) {
                formFeedback.innerHTML = '<div class="alert alert-danger">📧 Please enter a valid email address.</div>';
                setTimeout(() => { formFeedback.innerHTML = ''; }, 3000);
                return;
            }
            // Success simulation
            formFeedback.innerHTML = '<div class="alert alert-success">Message sent! I\'ll get back to you soon.</div>';
            contactForm.reset();
            // add a tiny success animation for button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            gsap.to(submitBtn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });

            setTimeout(() => { formFeedback.innerHTML = ''; }, 4000);
        });
    }

    // ---------- ADDITIONAL HOVER ANIMATIONS (magnetic for social icons) ----------
    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            gsap.to(icon, { y: -5, duration: 0.2, ease: "power1.out" });
        });
        icon.addEventListener('mouseleave', () => {
            gsap.to(icon, { y: 0, duration: 0.2 });
        });
    });

});