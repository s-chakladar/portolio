// script.js
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Custom Cursor & Follower
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    gsap.ticker.add(() => {
        // Fast follow for inner cursor dot
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;
        gsap.set(cursor, { x: cursorX, y: cursorY });

        // Smooth follow for outer follower ring
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        gsap.set(follower, { x: followerX, y: followerY });
    });

    // Cursor hover effects on links/magnetic items/interactive
    const interactiveElements = document.querySelectorAll('a, button, .magnetic, .resume-item');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(follower, {
                width: 70,
                height: 70,
                backgroundColor: 'rgba(242, 84, 91, 0.15)', // Lobster Pink hover tint
                borderColor: 'transparent',
                duration: 0.3
            });
            gsap.to(cursor, { scale: 0, duration: 0.3 });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(follower, {
                width: 40,
                height: 40,
                backgroundColor: 'transparent',
                borderColor: '#19323C', // Jet Black edge

                duration: 0.3
            });
            gsap.to(cursor, { scale: 1, duration: 0.3 });
        });
    });

    // Magnetic interaction logic for links
    const magnetics = document.querySelectorAll('.magnetic');
    magnetics.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.6,
                ease: 'power3.out'
            });
        });

        btn.addEventListener('mouseleave', function() {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 1,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });

    // --- GSAP Animations ---

    // 1. Loading Sequence & Hero Entry
    let progress = { value: 0 };
    const counterEl = document.querySelector('.loader-counter');

    const tl = gsap.timeline({
        onComplete: () => {
            document.body.style.overflow = "auto";
        }
    });

    document.body.style.overflow = "hidden"; // Prevent scroll during load

    tl.to(progress, {
        value: 100,
        duration: 2.2,
        ease: "power3.inOut",
        onUpdate: () => {
            counterEl.innerHTML = Math.round(progress.value) + "%";
        }
    })
    .to('.loader', {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut"
    }, "+=0.2")
    // Hero Text Reveal
    .to('.hero-text', {
        y: "0%",
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
    }, "-=0.6")
    .from('.nav-links a, .logo', {
        y: -15,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
    }, "-=1")
    .from('.scroll-indicator', {
        opacity: 0,
        y: 20,
        duration: 1
    }, "-=0.5");


    // 2. Scroll Animations
    
    // About Text Scrub Parallax
    gsap.from('.reveal-text', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 85%',
            end: 'top 20%', // Ends when the element gets near the top
            scrub: 1
        },
        y: 60,
        opacity: 0.1, 
        ease: "none"
    });

    // Skill Blocks Reveal
    gsap.to('.skill-category', {
        scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 85%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Generalized Resume Items Reaveal
    const resumeItems = gsap.utils.toArray('.resume-item');
    resumeItems.forEach(item => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Contact Title Reveal
    gsap.to('.contact-title', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out"
    });

});
