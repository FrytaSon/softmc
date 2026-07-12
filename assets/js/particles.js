/* ==========================================
   SoftMC.eu
   Particles Engine
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("particles");

    if (!container) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    container.appendChild(canvas);

    let width;
    let height;

    function resize() {

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

    }

    resize();

    window.addEventListener("resize", resize);

    /* ======================================
       MOUSE
    ====================================== */

    const mouse = {

        x: width / 2,
        y: height / 2

    };

    window.addEventListener("mousemove", (e) => {

        mouse.x = e.clientX;
        mouse.y = e.clientY;

    });

    /* ======================================
       PARTICLES
    ====================================== */

    const particles = [];

    const particleCount = Math.min(
        120,
        Math.floor((width * height) / 18000)
    );

    class Particle {

        constructor() {

            this.reset();

            this.x = Math.random() * width;
            this.y = Math.random() * height;

        }

        reset() {

            this.x = Math.random() * width;
            this.y = Math.random() * height;

            this.size = Math.random() * 2.5 + 1;

            this.speedX = (Math.random() - 0.5) * 0.35;
            this.speedY = (Math.random() - 0.5) * 0.35;

            this.opacity = Math.random() * 0.5 + 0.2;

        }

        update() {

            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < -30) this.x = width + 30;
            if (this.x > width + 30) this.x = -30;

            if (this.y < -30) this.y = height + 30;
            if (this.y > height + 30) this.y = -30;

            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 140) {

                this.x -= dx * 0.002;
                this.y -= dy * 0.002;

            }

        }

        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(69,255,132,${this.opacity})`;

            ctx.shadowColor =
                "rgba(69,255,132,.8)";

            ctx.shadowBlur = 12;

            ctx.fill();

        }

    }

    for (let i = 0; i < particleCount; i++) {

        particles.push(new Particle());

    }

    /* ======================================
       CONNECTIONS
    ====================================== */

    function drawConnections() {

        for (let a = 0; a < particles.length; a++) {

            for (let b = a + 1; b < particles.length; b++) {

                const dx =
                    particles[a].x - particles[b].x;

                const dy =
                    particles[a].y - particles[b].y;

                const dist =
                    Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {

                    ctx.beginPath();

                    ctx.moveTo(
                        particles[a].x,
                        particles[a].y
                    );

                    ctx.lineTo(
                        particles[b].x,
                        particles[b].y
                    );

                    ctx.strokeStyle =
                        `rgba(69,255,132,${
                            (130 - dist) / 700
                        })`;

                    ctx.lineWidth = 1;

                    ctx.stroke();

                }

            }

        }

    }

    /* ======================================
       ANIMATION
    ====================================== */

    function animate() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        particles.forEach(p => {

            p.update();
            p.draw();

        });

        drawConnections();

        requestAnimationFrame(animate);

    }

    animate();

});