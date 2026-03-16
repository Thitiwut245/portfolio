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
                role: "Game & Web Developer.",
                desc: "Interested in gameplay programming and full-stack web development. Passionate about building interactive experiences across multiple platforms.",
                downloadResume: "Download Resume",

            },
            about: {
                title: "About Me",
                techStack: "Tech Stack & Tools",
                skills: "Personal Skills",
                p1: "Hi! My name is Thitiwut Sriamonrat. I am a third-year Computer Science student at the College of Computing, Khon Kaen University. My academic focus spans across game development and web technology, with a particular interest in creating interactive systems.",
                p2: "My interest in games and animation began at an early age, driven by curiosity about how interactive experiences are designed and built. This led to my first experience in game development during high school, and later expanded into web development, where I enjoy building functional and visually appealing applications.",
                p3: "Currently, I focus on building gameplay features in Unity and developing modern web applications using frameworks like Vue 3 and Spring Boot. I learn through experimentation and iteration, refining my projects to gain practical understanding of system implementation.",
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
                },
                calendarX: {
                    card: "A vibrant calendar app allowing emoji-based custom events, supporting global holidays and religious dates.",
                    overview: "Calendar X is a calendar application where users can insert emojis or stickers into custom events to make them attractive and colorful. It supports holidays and important dates for various countries and religions.",
                    b1: "UI/UX Design: Designed user interface and app flow using Figma.",
                    b2: "App Development: Built the application using Flutter framework.",
                    b3: "Tools: Developed with Visual Studio Code and Android Studio."
                },
                archery: {
                    b1: "Management System: Solves unsystematic data storage and data loss issues.",
                    b2: "Equipment Tracking: Database system for equipment borrowing and returning.",
                    b3: "Progress Tracking: Records scores and practice statistics so users can evaluate themselves."
                },
                squader: {
                    b1: "Swipe-to-Match: Find players with similar interests and games.",
                    b2: "Real-Time Chat: Instant messaging for matched players.",
                    b3: "Tech Stack: Developed using Vue 3, Node.js, and PostgreSQL."
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
                role: "Game & Web Developer.",
                desc: "มีความสนใจในด้าน Gameplay Programming และการพัฒนา Full-stack Web พร้อมที่จะเรียนรู้และสร้างประสบการณ์เชิงโต้ตอบในรูปแบบต่างๆ",
                downloadResume: "ดาวน์โหลดเรซูเม่",
                contact: "ติดต่อฉัน"
            },
            about: {
                title: "เกี่ยวกับฉัน",
                techStack: "เครื่องมือและภาษาที่ใช้",
                skills: "ทักษะส่วนบุคคล",
                p1: "สวัสดีครับ ผมชื่อ ธิติวุฒิ ศรีอมรรัตน์ นักศึกษาวิทยาลัยการคอมพิวเตอร์ หลักสูตรวิทยาการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น มีความสนใจในด้านการพัฒนาเกมและเทคโนโลยีเว็บ โดยมีความสนใจเป็นพิเศษในด้านการสร้างระบบเชิงโต้ตอบ",
                p2: "ความสนใจด้านเกมและแอนิเมชันของผมเริ่มต้นตั้งแต่วัยเด็ก จากความอยากรู้เกี่ยวกับกระบวนการออกแบบและพัฒนาประสบการณ์เชิงโต้ตอบ นำไปสู่ประสบการณ์แรกในการพัฒนาเกมในช่วงมัธยมศึกษา และต่อมาได้ขยายความสนใจไปยังการพัฒนาเว็บ ซึ่งผมสนุกกับการสร้างแอปพลิเคชันที่มีประสิทธิภาพและสวยงาม",
                p3: "ปัจจุบัน ผมเน้นการพัฒนาฟีเจอร์เกมใน Unity และสร้างเว็บแอปพลิเคชันสมัยใหม่โดยใช้เฟรมเวิร์กอย่าง Vue 3 และ Spring Boot ผมเรียนรู้ผ่านการทดลองและการพัฒนาอย่างต่อเนื่อง เพื่อเสริมสร้างความเข้าใจเชิงปฏิบัติในการพัฒนาระบบต่างๆ",
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
                },
                calendarx: {
                    b1: "UI/UX Design: ออกแบบ UI และการทำงานของแอปฯ ผ่าน Figma",
                    b2: "App Development: พัฒนาแอปพลิเคชันโดยใช้ Flutter",
                    b3: "Tools: ใช้เครื่องมือ Visual Studio Code และ Android Studio ในการพัฒนา"
                },
                archery: {
                    b1: "Management System: แก้ปัญหาการจัดเก็บข้อมูลที่ไม่เป็นระบบ และการสูญหายของข้อมูล",
                    b2: "Equipment Tracking: จัดการฐานข้อมูลของการยืม-คืนอุปกรณ์",
                    b3: "Progress Tracking: เก็บคะแนนและสถิติการซ้อมเพื่อให้ผู้ใช้งานสามารถติดตามและประเมินผลตนเองได้"
                },
                squader: {
                    b1: "Swipe-to-Match: ค้นหาเพื่อนเล่นเกมที่มีความสนใจตรงกัน",
                    b2: "Real-Time Chat: ระบบแชทแบบเรียลไทม์เพื่อสื่อสารได้ทันที",
                    b3: "Tech Stack: พัฒนาด้วย Vue 3, Node.js และ PostgreSQL"
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
