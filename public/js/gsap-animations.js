/**
 * GSAP Animations for Index and Landing Page
 */

document.addEventListener('DOMContentLoaded', () => {

    // Register ScrollTrigger if available (not strictly used here yet, but good practice)
    gsap.registerPlugin(ScrollTrigger);

    // --- Index Page Animations ---
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {

        // Header: Fade down
        gsap.from("header", {
            duration: 1,
            y: -50,
            opacity: 0,
            ease: "power3.out"
        });

        // Illustration: Scale up + Rotate slight
        gsap.from("main > div:first-of-type", {
            duration: 1.2,
            scale: 0.8,
            opacity: 0,
            rotation: -5,
            ease: "elastic.out(1, 0.5)",
            delay: 0.3
        });

        // Typography: Stagger up
        gsap.from(".text-center h1, .text-center p", {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out",
            delay: 0.6
        });

        // Footer Button: Slide up
        // gsap.from("footer a", {
        //     duration: 0.8,
        //     y: 30,
        //     opacity: 0,
        //     ease: "",
        //     delay: 1
        // });
    }

    // --- Landing Page Animations ---
    if (window.location.pathname.endsWith('landing-page.html')) {

        const tl = gsap.timeline();

        // Header
        tl.from("header", {
            duration: 0.8,
            y: -30,
            opacity: 0,
            ease: "power2.out"
        });

        // Hero Banner (search by partial class match or structure)
        tl.from(".group[data-alt]", {
            duration: 1,
            y: 30,
            opacity: 0,
            scale: 0.95,
            ease: "power3.out"
        }, "-=0.4");

        // Headline Text
        tl.from(".text-center h2, .text-center > p", {
            duration: 0.8,
            y: 20,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.6");

        // Timer blocks
        tl.from(".flex.gap-3 > div", {
            duration: 0.6,
            y: 20,
            opacity: 0,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.4");

        // Principal Message & Event Highlights & Location
        // We can target specific sections or just generic cards if we want a cascade
        const cards = document.querySelectorAll(".rounded-2xl.bg-white, .rounded-2xl.bg-\\[\\#2c2618\\]");

        // Use ScrollTrigger for these main content cards if they are below fold
        gsap.utils.toArray(cards).forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                duration: 0.8,
                y: 50,
                opacity: 0,
                ease: "power2.out"
            });
        });

        // Floating CTA
        // gsap.from(".fixed.bottom-0 button", {
        //     duration: 1,
        //     y: 100,
        //     ease: "power4.out",
        //     delay: 1.5 // Delay until initial load settles
        // });
    }
});
