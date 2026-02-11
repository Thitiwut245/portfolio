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

    // 3. Optional: Smooth Scroll fix for some browsers or older systems (if needed)
    // The CSS scroll-behavior: smooth handles this natively in modern browsers,
    // keeping JS minimal.

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
            // Eye width ~50px (updated), Pupil ~20px. Max movement radius approx 10-12px.
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
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            localStorage.setItem('theme', 'light');
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    });

    // 6. Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        document.querySelector('.scroll-progress-bar').style.width = scrollPercent + '%';
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
                desc: "Interested in gameplay programming and development. Always ready to learn and contribute in a game development environment.",
                downloadResume: "Download Resume",

            },
            about: {
                title: "About Me",
                techStack: "Tech Stack",
                skills: "Personal Skills",
                p1: "Hi! My name is Thitiwut Sriamonrat. I am a third-year Computer Science student at the College of Computing, Khon Kaen University. My academic focus is game development, with a particular interest in gameplay programming and interactive systems.",
                p2: "My interest in games and animation began at an early age, driven by curiosity about how interactive experiences are designed and built. This led to my first experience in game development during high school, where I created simple projects using Unity. That experience influenced my decision to pursue formal studies in programming and game development at the university level.",
                p3: "Currently, I focus on building gameplay features and small systems in Unity, including player interaction, mechanics, and UI behavior. I learn through experimentation and iteration, refining my projects to gain practical understanding of gameplay implementation.",
                certifications: "Certifications",
                downloadCert: "Download Certificate"
            },
            projects: {
                title: "Projects",
                playDemo: "Play Demo",
                viewDetails: "View Details ",
                nurse: {
                    b1: "Scenario FSM: Finite State Machine validates player actions against strict medical steps.",
                    b2: "Interaction System: Clean and responsive system for manipulating tools and patient avatars.",
                    b3: "Tech: Unity (C#), ScriptableObjects for data-driven design."
                },
                soa: {
                    b1: "Stealth AI: Modular state machine (Idle/Suspicious/Alert)",
                    b2: "Perception: 2D raycasting and Area2D triggers for dynamic enemy vision.",
                    b3: "Architecture: Signal-driven logic decoupling combat, UI, and audio.",
                    awardTitle: "NSC 2025 National Round Funded Project",
                    awardBadge: "NSC 2025 National Round Funded Project Certificate"
                },
                tech2d: {
                    b1: "Physics Controller: Responsive movement with coyote time and jump buffering.",
                    b2: "Modular Logic: Tunable acceleration parameters to simulate weight/inertia.",
                    b3: "Combat: Shotgun logic with procedural spread and decoupled input readers."
                },
                tech3d: {
                    b1: "Procedural Legs: Step-target logic calculating ideal foot positions from velocity.",
                    b2: "Grounding: Raycast-based body orientation adapting to uneven terrain.",
                    b3: "Math & Easing: `Mathf.SmoothStep` for naturalistic, weight-simulated step arcs."
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
                desc: "สนใจในการเขียนโปรแกรมและการพัฒนาเกม พร้อมที่จะเรียนรู้และมีส่วนร่วมในการทำงานภายในสภาพแวดล้อมการพัฒนาเกม",
                downloadResume: "ดาวน์โหลดเรซูเม่",
                contact: "ติดต่อฉัน"
            },
            about: {
                title: "เกี่ยวกับฉัน",
                techStack: "เครื่องมือที่ใช้",
                skills: "ทักษะส่วนบุคคล",
                p1: "สวัสดีครับ ผมชื่อ ธิติวุฒิ ศรีอมรรัตน์ นักศึกษาวิทยาลัยการคอมพิวเตอร์ หลักสูตรวิทยาการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น มีความสนใจด้านการพัฒนาเกม โดยมีความสนใจเป็นพิเศษในด้านการเขียนโปรแกรมเกมเพลย์และระบบเชิงโต้ตอบ",
                p2: "ความสนใจด้านเกมและแอนิเมชันของผมเริ่มต้นตั้งแต่วัยเด็ก จากความอยากรู้เกี่ยวกับกระบวนการออกแบบและพัฒนาประสบการณ์เชิงโต้ตอบ ความสนใจดังกล่าวนำไปสู่ประสบการณ์แรกในการพัฒนาเกมในช่วงระดับมัธยมศึกษา ซึ่งผมได้สร้างเกมเล็กๆโดยใช้ Unity ประสบการณ์เหล่านี้มีบทบาทสำคัญต่อการตัดสินใจศึกษาต่อด้านการเขียนโปรแกรมและการพัฒนาเกมในระดับอุดมศึกษา",
                p3: "ปัจจุบัน ผมได้โฟกัสกับการพัฒนาฟีเจอร์ด้านเกมเพลย์และระบบเล็กๆใน Unity เช่น ระบบ Interaction Mechanics และ UI Behavior โดยใช้การเรียนรู้ผ่านการทดลองและการพัฒนาแบบซ้ำๆ (iterative development) เพื่อปรับปรุงและยกระดับโครงการอย่างต่อเนื่อง และเสริมสร้างความเข้าใจเชิงปฏิบัติในการพัฒนาระบบเกมเพลย์",
                certifications: "ใบรับรอง / เกียรติบัตร",
                downloadCert: "ดาวน์โหลดใบรับรอง"
            },
            projects: {
                title: "ผลงาน",
                playDemo: "เล่น Demo",
                viewDetails: "ดูรายละเอียด",
                nurse: {
                    b1: "Scenario FSM: ใช้ Finite State Machine ตรวจสอบการกระทำของผู้เล่นตามขั้นตอนทางการแพทย์",
                    b2: "Interaction System: ระบบการโต้ตอบที่เรียบง่ายและตอบสนองได้ดี สำหรับการหยิบจับอุปกรณ์",
                    b3: "Tech: Unity (C#) และ ScriptableObjects สำหรับการออกแบบที่ขับเคลื่อนด้วยข้อมูล"
                },
                soa: {
                    b1: "Stealth AI: State Machine แบบโมดูลาร์ (Idle/Suspicious/Alert)",
                    b2: "Perception: ใช้ 2D Raycasting และ Area2D Triggers สร้างระยะการมองเห็นของศัตรูแบบไดนามิก",
                    b3: "Architecture: ใช้ Signal Pattern แยกการทำงานระหว่างระบบต่อสู้, UI และเสียง",
                    awardTitle: "โครงการที่ผ่านเข้ารอบชิงชนะเลิศ NSC 2025 (ได้รับทุนสนับสนุน)",
                    awardBadge: "ใบรับรองโครงการที่ผ่านเข้ารอบชิงชนะเลิศ NSC 2025"
                },
                tech2d: {
                    b1: "Physics Controller: ระบบควบคุมตอบสนองฉับไว พร้อม Coyote Time และ Jump Buffering",
                    b2: "Modular Logic: พารามิเตอร์อัตราเร่งที่ปรับจูนได้ เพื่อจำลองน้ำหนักและแรงเฉื่อย",
                    b3: "Combat: ตรรกะปืนลูกซองที่มีการกระจายกระสุนแบบ Procedural และแยกระบบรับอินพุต"
                },
                tech3d: {
                    b1: "Procedural Legs: คำนวณตำแหน่งวางเท้าที่เหมาะสมจากความเร็วและความสูงของพื้นที่",
                    b2: "Grounding: ปรับองศาของลำตัวตามพื้นผิวที่ไม่เรียบด้วย Raycast",
                    b3: "Math & Easing: ใช้ `Mathf.SmoothStep` คำนวณส่วนโค้งการก้าวเท้าให้ดูเป็นธรรมชาติ"
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
            const currentLang = langToggle.textContent.toLowerCase();
            const newLang = currentLang === 'en' ? 'th' : 'en';
            updateLanguage(newLang);
        });
    }

    // Download Button Loading State
    const downloadBtn = document.getElementById('download-demo-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            if (downloadBtn.classList.contains('loading')) return;

            // Show alert
            alert("Download started! It will take a while (84MB), please don't press it again.");

            // Add loading class
            downloadBtn.classList.add('loading');

            // Optional: Store original text if we wanted to revert, but for now we just disable.
            // We can append "Downloading..." text or just let the spinner show.
            // The spinner is added via CSS ::after, so text remains legible.

            // Re-enable after 10 seconds just in case (optional, but good UX if download fails to start or is quick)
            setTimeout(() => {
                downloadBtn.classList.remove('loading');
            }, 10000);
        });
    }
});
