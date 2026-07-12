/* ==========================================
   SoftMC.eu
   Navbar
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.querySelector("nav");
    const menu = document.querySelector("nav ul");
    const mobileButton = document.querySelector(".mobile-toggle");
    const navLinks = document.querySelectorAll("nav ul li a");

    let lastScroll = 0;

    /* ======================================
       NAVBAR SCROLL
    ====================================== */

    function handleNavbarScroll() {

        const currentScroll = window.scrollY;

        if (currentScroll > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        if (window.innerWidth > 992) {

            if (currentScroll > lastScroll && currentScroll > 200) {

                navbar.style.transform = "translateY(-100%)";

            } else {

                navbar.style.transform = "translateY(0)";

            }

        }

        lastScroll = currentScroll;

    }

    window.addEventListener("scroll", handleNavbarScroll);

    handleNavbarScroll();

    /* ======================================
       MOBILE MENU
    ====================================== */

    if (mobileButton) {

        mobileButton.addEventListener("click", () => {

            menu.classList.toggle("active");
            mobileButton.classList.toggle("active");

            document.body.classList.toggle("menu-open");

        });

    }

    /* ======================================
       CLOSE MENU AFTER CLICK
    ====================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("active");

            if (mobileButton) {
                mobileButton.classList.remove("active");
            }

            document.body.classList.remove("menu-open");

        });

    });

    /* ======================================
       CLOSE MENU WHEN CLICK OUTSIDE
    ====================================== */

    document.addEventListener("click", (e) => {

        if (!menu.contains(e.target) &&
            !mobileButton.contains(e.target)) {

            menu.classList.remove("active");

            if (mobileButton) {
                mobileButton.classList.remove("active");
            }

            document.body.classList.remove("menu-open");

        }

    });

    /* ======================================
       ACTIVE SECTION
    ====================================== */

    const sections = document.querySelectorAll("section");

    function updateActiveSection() {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;
            const height = section.offsetHeight;

            if (window.scrollY >= top &&
                window.scrollY < top + height) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === "#" && window.scrollY < 150) {

                link.classList.add("active");

            }

            if (href === "#" + current) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", updateActiveSection);

    updateActiveSection();

    /* ======================================
       SMOOTH SCROLL
    ====================================== */

    navLinks.forEach(link => {

        const href = link.getAttribute("href");

        if (!href.startsWith("#")) return;

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(href);

            if (!target) return;

            const navbarHeight = navbar.offsetHeight;

            const position =
                target.offsetTop - navbarHeight;

            window.scrollTo({

                top: position,

                behavior: "smooth"

            });

        });

    });

    /* ======================================
       ESC KEY
    ====================================== */

    document.addEventListener("keydown", (e) => {

        if (e.key !== "Escape") return;

        menu.classList.remove("active");

        if (mobileButton) {
            mobileButton.classList.remove("active");
        }

        document.body.classList.remove("menu-open");

    });

});