document.addEventListener('DOMContentLoaded', () => {

    // 1. Intersection Observer for Fade-in Animations
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // 1b. Staggered Project Card Animations
    const projectCards = document.querySelectorAll('.project-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const index = parseInt(card.dataset.cardIndex || '0');
                setTimeout(() => {
                    card.classList.add('card-visible');
                }, index * 120);
                cardObserver.unobserve(card);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    projectCards.forEach((card, i) => {
        card.dataset.cardIndex = i;
        cardObserver.observe(card);
    });

    // 2. Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach((section) => {
        observer.observe(section);
    });

    // 4. Interactive Eye Tracking
    const eyes = document.querySelectorAll('.eye');

    document.addEventListener('mousemove', (e) => {
        eyes.forEach(eye => {
            const pupil = eye.querySelector('.pupil');
            if (!pupil) return;

            // Get eye positioning
            const rect = eye.getBoundingClientRect();
            const eyeCenterX = rect.left + rect.width / 2;
            const eyeCenterY = rect.top + rect.height / 2;

            // Mouse position relative to eye center
            const dx = e.clientX - eyeCenterX;
            const dy = e.clientY - eyeCenterY;

            // Calculate angle
            const angle = Math.atan2(dy, dx);

            // Calculate distance, clamped to maximum radius
            const maxRadius = 12;
            const distance = Math.min(maxRadius, Math.hypot(dx, dy));

            // Calculate new pupil position
            const pupilX = Math.cos(angle) * distance;
            const pupilY = Math.sin(angle) * distance;

            // Update pupil styles
            pupil.style.transform = `translate(-50%, -50%) translate(${pupilX}px, ${pupilY}px)`;
        });
    });

    // 5. Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    const body = document.body;

    // Check saved theme
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                if (sunIcon) sunIcon.style.display = 'none';
                if (moonIcon) moonIcon.style.display = 'block';
            } else {
                localStorage.setItem('theme', 'light');
                if (sunIcon) sunIcon.style.display = 'block';
                if (moonIcon) moonIcon.style.display = 'none';
            }
        });
    }

    // 6. Scroll Progress Bar + Navbar Compact on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (progressBar) progressBar.style.width = scrollPercent + '%';

        // Compact navbar after scrolling 60px
        if (navbar) {
            if (scrollTop > 60) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // 7. Language Toggle
    const langToggle = document.getElementById('lang-toggle');
    const translations = {
        en: {
            nav: {
                name: "Thitiwut Sriamonrat",
                about: "About Me",
                projects: "Projects",
                contact: "Contact",
                resume: "Resume"
            },
            hero: {
                role: "Game Developer.",
                desc: "Interested in gameplay programming and interactive systems. Passionate about building interactive experiences in Unity and Godot.",
                downloadResume: "Download Resume",

            },
            about: {
                title: "About Me",
                techStack: "Tech Stack & Tools",
                skills: "Personal Skills",
                p1: "Hi! My name is Thitiwut Sriamonrat. I am a third-year Computer Science student at the College of Computing, Khon Kaen University. My academic focus is game development, with a particular interest in creating interactive systems.",
                p2: "My interest in games and animation began at an early age, driven by curiosity about how interactive experiences are designed and built. This led to my first experience in game development during high school, where I created simple projects using Unity.",
                p3: "Currently, I focus on building gameplay features and small systems in Unity and Godot. I learn through experimentation and iteration, refining my projects to gain practical understanding of system implementation.",
                certifications: "Certifications",
                downloadCert: "Download Certificate"
            },
            projects: {
                title: "Projects",
                playDemo: "Play Demo",
                viewDetails: "View Details ",
                overview: "Project Overview",
                features: "Key Features",
                technical: "Technical Contributions",
                projectInfo: "Project Info",
                backToProjects: "Back to Projects",
                nurse: {
                    card: "A collaborative nursing simulation platform featuring Pre-test/Post-test assessments and game-based learning. Includes clinical certification.",
                    overview: "The Nursing Simulation Platform was developed in collaboration with nursing students to create a platform for awareness and learning in managing common problems in the elderly. It includes Pre-test & Post-test assessments and game-based simulations to apply nursing knowledge. A certificate is awarded upon passing the Post-test with a score of over 60%.",
                    b1: "Scenario FSM: Finite State Machine validates player actions against strict medical steps.",
                    b2: "Interaction System: Clean and responsive system for manipulating tools and patient avatars.",
                    b3: "2D Bone Animation: Visualized complex medical procedures dynamically using advanced bone controllers."
                },
                soa: {
                    b1: "Stealth AI: Modular state machine (Idle/Suspicious/Alert)",
                    b2: "Perception: 2D raycasting and Area2D triggers for dynamic enemy vision.",
                    b3: "Architecture: Signal-driven logic decoupling combat, UI, and audio.",
                    awardTitle: "NSC 2025 National Round Funded Project",
                    awardBadge: "NSC 2025 National Round Funded Project Certificate"
                }
            },
            contact: {
                title: "Contact",
                desc: "Feel free to reach out on any platform!"
            }
        },
        th: {
            nav: {
                name: "ธิติวุฒิ ศรีอมรรัตน์",
                about: "เกี่ยวกับฉัน",
                projects: "ผลงาน",
                contact: "ติดต่อ",
                resume: "เรซูเม่"
            },
            hero: {
                role: "Game Developer.",
                desc: "มีความสนใจในด้าน Gameplay Programming และมีความหลงใหลในการสร้างประสบการณ์เชิงโต้ตอบใน Unity และ Godot",
                downloadResume: "ดาวน์โหลดเรซูเม่",
                contact: "ติดต่อฉัน"
            },
            about: {
                title: "เกี่ยวกับฉัน",
                techStack: "เครื่องมือและภาษาที่ใช้",
                skills: "ทักษะส่วนบุคคล",
                p1: "สวัสดีครับ ผมชื่อ ธิติวุฒิ ศรีอมรรัตน์ นักศึกษาวิทยาลัยการคอมพิวเตอร์ หลักสูตรวิทยาการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น มีความสนใจในด้านการพัฒนาเกม โดยมีความสนใจเป็นพิเศษในด้านการสร้างระบบเชิงโต้ตอบ",
                p2: "ความสนใจด้านเกมและแอนิเมชันของผมเริ่มต้นตั้งแต่วัยเด็ก จากความอยากรู้เกี่ยวกับกระบวนการออกแบบและพัฒนาประสบการณ์เชิงโต้ตอบ นำไปสู่ประสบการณ์แรกในการพัฒนาเกมในช่วงมัธยมศึกษา โดยใช้ Unity",
                p3: "ปัจจุบัน ผมเน้นการพัฒนาฟีเจอร์เกมใน Unity และ Godot ผมเรียนรู้ผ่านการทดลองและการพัฒนาอย่างต่อเนื่อง เพื่อเสริมสร้างความเข้าใจเชิงปฏิบัติในการพัฒนาระบบต่างๆ",
                certifications: "ใบรับรอง / เกียรติบัตร",
                downloadCert: "ดาวน์โหลดใบรับรอง"
            },
            projects: {
                title: "ผลงาน",
                playDemo: "เล่น Demo",
                viewDetails: "ดูรายละเอียด",
                overview: "ภาพรวมโครงการ",
                features: "ฟีเจอร์สำคัญ",
                technical: "ส่วนที่รับผิดชอบ",
                projectInfo: "ข้อมูลโครงการ",
                backToProjects: "กลับหน้าหลัก",
                nurse: {
                    card: "แพลตฟอร์มจำลองการเรียนรู้ด้านการพยาบาลที่ประกอบไปด้วยแบบทดสอบ Pre/Post-test และการเรียนรู้ผ่านเกม พร้อมใบรับรองผล",
                    overview: "Nursing Simulation Platform ถูกพัฒนาร่วมกับนักศึกษาคณะพยาบาลศาสตร์ ในการสร้างแพลตฟอร์มที่ให้นักศึกษาพยาบาลได้สร้างความตระหนักและการเรียนรู้ในการจัดการปัญหาที่พบบ่อยในผู้สูงอายุ โดยประกอบไปด้วยการทำแบบทดสอบ Pre-test & Post-test และการเล่นเกมเพื่อจำลองการประยุกต์ใช้ความรู้ด้านการพยาบาล พร้อมยังมี Certificate รับรองหลังการทำ Post-test ผ่านเกิน 60%",
                    b1: "Scenario FSM: ใช้ Finite State Machine ตรวจสอบการกระทำของผู้เล่นตามขั้นตอนทางการแพทย์",
                    b2: "Interaction System: ระบบการโต้ตอบที่เรียบง่ายและตอบสนองได้ดี สำหรับการหยิบจับอุปกรณ์",
                    b3: "2D Bone Animation: ใช้ 2D Bone Animate จำลองขั้นตอนทางการแพทย์ที่ซับซ้อนให้เห็นภาพแบบไดนามิก"
                },
                soa: {
                    b1: "Stealth AI: State Machine แบบโมดูลาร์ (Idle/Suspicious/Alert)",
                    b2: "Perception: ใช้ 2D Raycasting และ Area2D Triggers สร้างระยะการมองเห็นของศัตรูแบบไดนามิก",
                    b3: "Architecture: ใช้ Signal Pattern แยกการทำงานระหว่างระบบต่อสู้, UI และเสียง",
                    awardTitle: "โครงการที่ผ่านเข้ารอบชิงชนะเลิศ NSC 2025 (ได้รับทุนสนับสนุน)",
                    awardBadge: "ใบรับรองโครงการที่ผ่านเข้ารอบชิงชนะเลิศ NSC 2025"
                }
            },
            contact: {
                title: "ข้อมูลติดต่อ",
                desc: "สามารถติดต่อได้ผ่านช่องทางเหล่านี้!"
            }
        }
    };

    function updateLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const keys = key.split('.');
            let text = translations[lang];
            keys.forEach(k => {
                if (text) text = text[k];
            });
            if (text) element.textContent = text;
        });
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.textContent = lang.toUpperCase();
        }
        localStorage.setItem('lang', lang);
    }

    // Check saved language
    const savedLang = localStorage.getItem('lang') || 'en';
    updateLanguage(savedLang);

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const currentLang = localStorage.getItem('lang') || 'en';
            const newLang = currentLang === 'en' ? 'th' : 'en';
            updateLanguage(newLang);
        });
    }

    // Download Button Loading State
    const downloadBtn = document.getElementById('download-demo-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            if (downloadBtn.classList.contains('loading')) return;
            alert("Download started! It will take a while (84MB), please don't press it again.");
            downloadBtn.classList.add('loading');
            setTimeout(() => {
                downloadBtn.classList.remove('loading');
            }, 10000);
        });
    }
});
