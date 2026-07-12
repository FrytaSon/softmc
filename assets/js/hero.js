/* ==========================================
   SoftMC.eu
   Hero Effects
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector(".hero");
    const heroBackground = document.querySelector(".hero-background img");
    const heroLogo = document.querySelector(".hero-logo");
    const liveCard = document.querySelector(".live-card");
    const heroGlow = document.querySelector(".hero-glow");

    if (!hero) return;

    /* ======================================
       HERO ENTRANCE
    ====================================== */

    hero.style.opacity = "0";
    hero.style.transform = "translateY(40px)";

    setTimeout(() => {

        hero.style.transition =
            "opacity .9s ease, transform .9s ease";

        hero.style.opacity = "1";
        hero.style.transform = "translateY(0)";

    }, 200);

    /* ======================================
       PARALLAX
    ====================================== */

    hero.addEventListener("mousemove", (e) => {

        const rect = hero.getBoundingClientRect();

        const x =
            (e.clientX - rect.left) / rect.width - 0.5;

        const y =
            (e.clientY - rect.top) / rect.height - 0.5;

        if (heroBackground) {

            heroBackground.style.transform =
                `translate(${x * 25}px, ${y * 25}px) scale(1.08)`;

        }

        if (heroLogo) {

            heroLogo.style.transform =
                `translate(${x * 10}px, ${y * 10}px)
                 rotateY(${x * 10}deg)
                 rotateX(${-y * 8}deg)`;

        }

        if (liveCard) {

            liveCard.style.transform =
                `perspective(1200px)
                 rotateY(${x * 12}deg)
                 rotateX(${-y * 12}deg)
                 translateY(-6px)`;

        }

        if (heroGlow) {

            heroGlow.style.transform =
                `translate(${x * 60}px, ${y * 60}px)`;

        }

    });

    /* ======================================
       RESET
    ====================================== */

    hero.addEventListener("mouseleave", () => {

        if (heroBackground) {

            heroBackground.style.transform =
                "scale(1.05)";

        }

        if (heroLogo) {

            heroLogo.style.transform = "";

        }

        if (liveCard) {

            liveCard.style.transform = "";

        }

        if (heroGlow) {

            heroGlow.style.transform = "";

        }

    });

    /* ======================================
       SCROLL PARALLAX
    ====================================== */

    window.addEventListener("scroll", () => {

        const scroll = window.scrollY;

        if (heroBackground) {

            heroBackground.style.transform =
                `translateY(${scroll * .18}px) scale(1.08)`;

        }

    });

    /* ======================================
       FLOAT CARD
    ====================================== */

    if (liveCard) {

        let start = null;

        function float(timestamp) {

            if (!start) start = timestamp;

            const progress =
                (timestamp - start) / 1000;

            const move =
                Math.sin(progress * 1.6) * 8;

            liveCard.style.marginTop =
                move + "px";

            requestAnimationFrame(float);

        }

        requestAnimationFrame(float);

    }

    /* ======================================
       HERO BUTTONS
    ====================================== */

    document.querySelectorAll(".hero-buttons button, .hero-buttons a")
        .forEach(button => {

            button.addEventListener("mouseenter", () => {

                button.style.transform =
                    "translateY(-6px) scale(1.03)";

            });

            button.addEventListener("mouseleave", () => {

                button.style.transform = "";

            });

        });

    /* ======================================
       COUNTERS
    ====================================== */

    document.querySelectorAll(".stat-number").forEach(counter => {

        const target =
            parseInt(counter.innerText);

        if (isNaN(target)) return;

        let current = 0;

        const increment =
            Math.max(1, Math.floor(target / 70));

        function update() {

            current += increment;

            if (current >= target) {

                counter.innerText = target;

                return;

            }

            counter.innerText = current;

            requestAnimationFrame(update);

        }

        update();

    });

    /* ======================================
       MOUSE LIGHT
    ====================================== */

    const light = document.createElement("div");

    light.className = "hero-light";

    hero.appendChild(light);

    hero.addEventListener("mousemove", (e) => {

        const rect = hero.getBoundingClientRect();

        light.style.left =
            e.clientX - rect.left + "px";

        light.style.top =
            e.clientY - rect.top + "px";

    });

});