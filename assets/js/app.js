/* ==========================================
   SoftMC.eu
   app.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initNavbar();
    initRevealAnimations();
    initCounters();
    initSmoothScroll();
    initParallax();
    initHeroAnimation();
    initMouseGlow();

});

/* ==========================================
   NAVBAR
========================================== */

function initNavbar(){

    const nav = document.querySelector("nav");

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 40){

            nav.classList.add("scrolled");

        }else{

            nav.classList.remove("scrolled");

        }

    });

}

/* ==========================================
   SCROLL REVEAL
========================================== */

function initRevealAnimations(){

    const hidden = document.querySelectorAll(
        ".feature,.gamemode-card,.stat-box,.status-card,.section-title,.discord-box"
    );

    hidden.forEach(el=>{

        el.classList.add("hidden");

    });

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{
        threshold:.15
    });

    hidden.forEach(el=>observer.observe(el));

}

/* ==========================================
   COUNTERS
========================================== */

function initCounters(){

    const counters = document.querySelectorAll(".stat-box h3");

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;

            const counter = entry.target;

            const value = parseInt(counter.innerText);

            if(isNaN(value)) return;

            animateCounter(counter,value);

            observer.unobserve(counter);

        });

    });

    counters.forEach(c=>observer.observe(c));

}

function animateCounter(element,target){

    let current = 0;

    const step = Math.max(1,Math.floor(target/80));

    const timer = setInterval(()=>{

        current += step;

        if(current >= target){

            current = target;
            clearInterval(timer);
        }

        element.innerText = current;

    },20);

}

/* ==========================================
   PARALLAX
========================================== */

function initParallax(){

    const hero = document.querySelector("header");

    window.addEventListener("scroll",()=>{

        let offset = window.scrollY * .4;

        hero.style.backgroundPositionY = offset + "px";

    });

}

/* ==========================================
   HERO FADE
========================================== */

function initHeroAnimation(){

    const hero = document.querySelector(".hero");

    window.addEventListener("scroll",()=>{

        let scroll = window.scrollY;

        hero.style.opacity = 1 - scroll / 800;

        hero.style.transform =
            `translateY(${scroll*.15}px)`;

    });

}

/* ==========================================
   SMOOTH SCROLL
========================================== */

function initSmoothScroll(){

    document.querySelectorAll("a[href^='#']").forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            e.preventDefault();

            const section =
                document.querySelector(
                    this.getAttribute("href")
                );

            if(!section) return;

            section.scrollIntoView({

                behavior:"smooth"

            });

        });

    });

}

/* ==========================================
   GLOW FOLLOW
========================================== */

function initMouseGlow(){

    const glow = document.createElement("div");

    glow.className = "glow";

    document.body.appendChild(glow);

    document.addEventListener("mousemove",(e)=>{

        glow.style.left = e.clientX - 250 + "px";
        glow.style.top = e.clientY - 250 + "px";

    });

}

/* ==========================================
   MOBILE MENU
========================================== */

const mobileButton =
document.querySelector(".mobile-toggle");

const menu =
document.querySelector("nav ul");

if(mobileButton){

mobileButton.addEventListener("click",()=>{

    mobileButton.classList.toggle("active");

    menu.classList.toggle("active");

});

}

/* ==========================================
   RIPPLE BUTTONS
========================================== */

document.querySelectorAll("button").forEach(button=>{

button.addEventListener("click",function(e){

    let circle=document.createElement("span");

    let diameter=Math.max(
        this.clientWidth,
        this.clientHeight
    );

    circle.style.width=diameter+"px";
    circle.style.height=diameter+"px";

    circle.style.left=
        e.clientX-
        this.offsetLeft-
        diameter/2+"px";

    circle.style.top=
        e.clientY-
        this.offsetTop-
        diameter/2+"px";

    circle.classList.add("ripple");

    let ripple=this.getElementsByClassName("ripple")[0];

    if(ripple){

        ripple.remove();

    }

    this.appendChild(circle);

});

});

/* ======================================
   TYPEWRITER (obsługuje HTML)
====================================== */

const subtitle = document.querySelector(".hero-description");

if (subtitle) {

    const originalHTML = subtitle.innerHTML;

    subtitle.innerHTML = "";

    const parser = document.createElement("div");
    parser.innerHTML = originalHTML;

    const speed = 18;

    function typeNodes(source, target, callback) {

        const nodes = Array.from(source.childNodes);

        let index = 0;

        function nextNode() {

            if (index >= nodes.length) {

                if (callback) callback();

                return;

            }

            const node = nodes[index++];

            // Tekst
            if (node.nodeType === Node.TEXT_NODE) {

                const text = node.textContent;
                let i = 0;

                const textNode = document.createTextNode("");

                target.appendChild(textNode);

                function typeText() {

                    if (i < text.length) {

                        textNode.textContent += text.charAt(i++);
                        setTimeout(typeText, speed);

                    } else {

                        nextNode();

                    }

                }

                typeText();

            }

            // Element HTML (span, strong itd.)
            else if (node.nodeType === Node.ELEMENT_NODE) {

                const clone = node.cloneNode(false);

                target.appendChild(clone);

                typeNodes(node, clone, nextNode);

            }

            else {

                nextNode();

            }

        }

        nextNode();

    }

    typeNodes(parser, subtitle);

}
/* ==========================================
   IMAGE TILT
========================================== */

document.querySelectorAll(".gamemode-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

    const rect=card.getBoundingClientRect();

    const x=e.clientX-rect.left;

    const y=e.clientY-rect.top;

    const rotateX=(y-rect.height/2)/18;

    const rotateY=(rect.width/2-x)/18;

    card.style.transform=
    `perspective(900px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    translateY(-8px)`;

});

card.addEventListener("mouseleave",()=>{

    card.style.transform="";

});

});

/* ==========================================
   PRELOADER
========================================== */

window.addEventListener("load",()=>{

const loader=document.querySelector(".loader");

if(loader){

loader.style.opacity=0;

setTimeout(()=>{

loader.remove();

},500);

}

});

/* ==========================================
   BACK TO TOP
========================================== */

const topButton=document.createElement("button");

topButton.className="topButton";

topButton.innerHTML="↑";

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

if(window.scrollY>600){

topButton.classList.add("show");

}else{

topButton.classList.remove("show");

}

});

topButton.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

/* ==========================================
   COPYRIGHT
========================================== */

console.log("%cSoftMC.eu","color:#45ff84;font-size:28px;font-weight:bold;");
console.log("Website created with ❤️");