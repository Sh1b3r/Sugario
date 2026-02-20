(() => {
    const header = document.getElementById('mainHeader');
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const hero = document.getElementById('hero');
    const cards = document.querySelectorAll('.title-card');
    const slides = document.querySelectorAll('.hero-slide');
    const video = document.getElementById('bgVideo');

    // ── Slide Sidebar Menu ──
    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        hamburger.classList.add('active');
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.classList.remove('active');
    }

    if (hamburger && sidebar) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (sidebar.classList.contains('active')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    // Close sidebar when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    // Close sidebar when clicking a sidebar link
    sidebar.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', closeSidebar);
    });

    // ── Scroll Header ──
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    // ── Reveal Cards via IntersectionObserver ──
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.35,
        root: hero
    });

    cards.forEach(card => revealObserver.observe(card));

    // ── Subtle Breathing / Float Animation ──
    function animateFloat() {
        const t = (video && !video.paused)
            ? video.currentTime
            : Date.now() / 1000;

        cards.forEach(card => {
            const speed = parseFloat(card.dataset.floatSpeed) || 0.5;
            const wave1 = Math.sin(t * speed);
            const wave2 = Math.sin(t * speed * 2.8);

            const y = wave1 * 6 + wave2 * 2;
            const glow = 0.18 + Math.abs(wave1) * 0.08;

            card.style.transform = card.classList.contains('visible')
                ? `translateY(${y.toFixed(2)}px) scale(1)`
                : `translateY(50px) scale(0.97)`;

            card.style.setProperty('--card-glow', glow.toFixed(3));
        });

        requestAnimationFrame(animateFloat);
    }

    requestAnimationFrame(animateFloat);

    // ── Button Scroll Logic ──
    document.querySelectorAll('.card-btn[data-scroll-to]').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.scrollTo;

            if (target === 'main') {
                document.getElementById('mainContent')
                    .scrollIntoView({ behavior: 'smooth' });
            } else {
                const idx = parseInt(target, 10);
                if (slides[idx]) {
                    slides[idx].scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // ── Hide scroll hint after first scroll ──
    const scrollHint = document.querySelector('.scroll-hint');
    if (scrollHint && hero) {
        hero.addEventListener('scroll', () => {
            if (hero.scrollTop > 60) {
                scrollHint.style.opacity = '0';
                scrollHint.style.transition = 'opacity 0.6s ease';
            }
        }, { passive: true, once: true });
    }
})();
const sections = document.querySelectorAll('.main-section');
const cards = document.querySelectorAll('.title-card');

const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            if (entry.target.classList.contains('title-card')) {
                entry.target.classList.add('visible');
            }
        }
    });
}, observerOptions);

sections.forEach(s => observer.observe(s));
cards.forEach(c => observer.observe(c));
