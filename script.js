// Website Data and Functionality
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        // Theme is already applied by inline script, just setup the toggle
        this.setupThemeToggle();
        this.setupNavIcons();
        this.setupTabBar();
        this.setupSlidingIndicator(document.getElementById('navLinks'), 'nav-indicator:pill');
        this.setupSlidingIndicator(document.querySelector('.tab-bar'), 'nav-indicator:tabs');
        this.setupProfilePhoto();
        this.populateRecentUpdates();
        this.populateUpdatesHistory();
        this.setupSmoothScrolling();
        this.setupScrollReveal();
        this.setupExpandableAbstracts();
    }

    // Improved Theme Management
    setupThemeToggle() {
        const toggle = document.getElementById('themeToggle');

        if (toggle) {
            toggle.addEventListener('click', () => {
                const root = document.documentElement;
                const applyTheme = () => {
                    // Toggle theme on both html and body for immediate effect
                    root.classList.toggle('dark-mode');
                    document.body.classList.toggle('dark-mode');

                    const isDark = root.classList.contains('dark-mode');
                    localStorage.setItem('theme', isDark ? 'dark' : 'light');
                };

                // Cross-fade the whole page in one pass where supported
                if (!document.startViewTransition || this.prefersReducedMotion()) {
                    applyTheme();
                    return;
                }
                root.classList.add('theme-switching');
                document.startViewTransition(applyTheme).finished
                    .finally(() => root.classList.remove('theme-switching'));
            });
        }
    }

    prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // Icon and short label for each nav destination, shared by the header
    // pill and the mobile tab bar
    navItems() {
        const svg = paths => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
        return {
            'index.html': ['Home', svg('<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"/>')],
            'publications.html': ['Papers', svg('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/>')],
            'projects.html': ['Projects', svg('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>')],
            'roles.html': ['Roles', svg('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/>')],
            'blogs.html': ['Blogs', svg('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>')],
            'cv.html': ['CV', svg('<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M6 16c.6-1.5 1.8-2.2 3-2.2s2.4.7 3 2.2M14 9h4M14 13h4"/>')]
        };
    }

    // Prefix each header pill link with its icon
    setupNavIcons() {
        const navLinks = document.getElementById('navLinks');
        if (!navLinks) return;

        const items = this.navItems();
        navLinks.querySelectorAll('a').forEach(link => {
            const item = items[link.getAttribute('href')];
            if (item) link.insertAdjacentHTML('afterbegin', item[1]);
        });
    }

    // Mobile tab bar: icon + short label for each header link, shown at the
    // bottom of the screen on small viewports (see .tab-bar in style.css)
    setupTabBar() {
        const navLinks = document.getElementById('navLinks');
        if (!navLinks) return;

        const items = this.navItems();
        const bar = document.createElement('nav');
        bar.className = 'tab-bar';
        bar.setAttribute('aria-label', 'Site');

        navLinks.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            const [label, icon] = items[href] || [link.textContent.trim(), ''];
            const tab = document.createElement('a');
            tab.href = href;
            tab.innerHTML = `${icon}<span>${label}</span>`;
            if (link.classList.contains('active')) {
                tab.classList.add('active');
                tab.setAttribute('aria-current', 'page');
            }
            bar.appendChild(tab);
        });

        const wrap = document.createElement('div');
        wrap.className = 'tab-bar-wrap';
        wrap.appendChild(bar);
        document.body.appendChild(wrap);
    }

    // One highlight pill that slides between tabs. Each page is a separate
    // document, so on click we remember where the highlight was, and the next
    // page starts it there and slides it to its own active tab.
    setupSlidingIndicator(container, storageKey) {
        if (!container) return;

        const indicator = document.createElement('span');
        indicator.className = 'nav-indicator';
        indicator.setAttribute('aria-hidden', 'true');
        container.prepend(indicator);
        container.classList.add('has-indicator');

        const links = [...container.querySelectorAll('a')];
        const active = links.find(link => link.classList.contains('active'));

        const moveTo = (rect, animate) => {
            indicator.classList.toggle('no-anim', !animate);
            indicator.style.width = `${rect.width}px`;
            indicator.style.transform = `translateX(${rect.left}px)`;
            indicator.style.opacity = '1';
        };
        // Relative to the container's padding box, where the indicator is positioned
        const rectOf = link => {
            const box = container.getBoundingClientRect();
            const r = link.getBoundingClientRect();
            return { left: r.left - box.left - container.clientLeft, width: r.width };
        };
        const visible = () => container.offsetWidth > 0;

        // Re-aim at the active tab; animated, so a slide already in flight
        // is retargeted rather than cut short
        const settle = (animate = true) => {
            if (active && visible()) moveTo(rectOf(active), animate);
        };

        // Start from the previous page's position, then slide in
        let from = null;
        try {
            from = JSON.parse(sessionStorage.getItem(storageKey));
            sessionStorage.removeItem(storageKey);
        } catch (e) { /* storage unavailable: just place it */ }

        if (active && visible() && from && from.width > 0) {
            moveTo(from, false);
            indicator.getBoundingClientRect(); // commit the start position
            requestAnimationFrame(() => moveTo(rectOf(active), true));
        } else {
            settle(false);
        }

        links.forEach(link => {
            link.addEventListener('click', () => {
                if (!visible()) return;
                const current = active ? rectOf(active) : rectOf(link);
                try {
                    sessionStorage.setItem(storageKey, JSON.stringify(current));
                } catch (e) { /* ignore */ }
                moveTo(rectOf(link), true); // start sliding before the page swaps
            });
        });

        // Widths change once the web font loads, on resize, and when the
        // page is restored from the back/forward cache
        if (document.fonts) document.fonts.ready.then(() => settle());
        window.addEventListener('resize', this.debounce(() => settle(), 100));
        window.addEventListener('pageshow', e => { if (e.persisted) settle(false); });
    }

    // Enhanced Profile Photo Management
    setupProfilePhoto() {
        const profilePhoto = document.getElementById('profilePhoto');
        if (profilePhoto) {
            // Handle photo loading errors gracefully
            profilePhoto.addEventListener('load', () => {
                profilePhoto.style.display = 'block';
                const placeholder = profilePhoto.nextElementSibling;
                if (placeholder) {
                    placeholder.style.display = 'none';
                }
            });

            profilePhoto.addEventListener('error', () => {
                profilePhoto.style.display = 'none';
                const placeholder = profilePhoto.nextElementSibling;
                if (placeholder) {
                    placeholder.style.display = 'flex';
                }
            });
        }
    }

    // Recent Updates Data, newest first
    getUpdates() {
        const recentUpdates = [
            {
                title: "Paper Accepted: FIT-GNN",
                description: "Our paper on faster inference time for GNNs using coarsening has been accepted to the TMLR track at LoG 2026",
                date: "2026-10-13",
                type: "publication",
                link: "publications.html",
                icon: "📄"
            },
            {
                title: "Paper on ArXiv: T-SNN",
                description: "Our paper on temporal simplicial neural networks for EEG decoding is now on ArXiv",
                date: "2026-09-27",
                type: "publication",
                link: "publications.html",
                icon: "📄"
            },
            {
                title: "Paper Accepted: FIT-GNN",
                description: "Our paper on faster inference time for GNNs using coarsening has been accepted to the Hot-off-the-press track at AutoML 2026",
                date: "2026-08-17",
                type: "publication",
                link: "publications.html",
                icon: "📄"
            },
            {
                title: "Reviewer - LoG 2026",
                description: "Served as Reviewer for the Learning on Graphs Conference 2026",
                date: "2026-08-13",
                type: "service",
                link: "roles.html",
                icon: "🤝"
            },
            {
                title: "Completed IBM Research Internship",
                description: "Completed internship as Research Intern in Platforms in AI at IBM Research - Bangalore",
                date: "2026-08-07",
                type: "experience",
                link: "roles.html",
                icon: "💼"
            },
            {
                title: "Released Package: simplicial-sindy",
                description: "Published simplicial-sindy on PyPI, a package for discovering simplicial complexes from multivariate time series",
                date: "2026-07-29",
                type: "project",
                link: "projects.html",
                icon: "📦"
            },
            {
                title: "Attended: ACM SIGMOD/PODS 2026",
                description: "Attended the ACM SIGMOD/PODS 2026 conference in Bangalore, India",
                date: "2026-05-31",
                type: "event",
                link: "cv.html",
                icon: "🕸️"
            },
            {
                title: "Paper on ArXiv: SiST-GNN",
                description: "Our latest paper on simultaneous spatial-temporal message passing for dynamic graph representation learning is now on ArXiv",
                date: "2026-05-25",
                type: "publication",
                link: "publications.html",
                icon: "📄"
            },
            {
                title: "Started IBM Research Internship",
                description: "Started internship as Research Intern in Platforms in AI at IBM Research - Bangalore",
                date: "2026-05-08",
                type: "experience",
                link: "roles.html",
                icon: "💼"
            },
            {
                title: "Paper Published: FIT-GNN",
                description: "Our latest paper on faster inference time for GNNs using coarsening has been accepted to TMLR",
                date: "2026-03-02",
                type: "publication",
                link: "publications.html",
                icon: "📄"
            },
            {
                title: "Paper Published: Local Fragments, Global Gains",
                description: "Our latest paper on subgraph counting using GNNs has been accepted to Web&Graph @ WSDM 2026",
                date: "2025-12-22",
                type: "publication",
                link: "publications.html",
                icon: "📄"
            },
            {
                title: "Attended: IndoML 2025",
                description: "Attended symposium on Machine Learning at BITS Pilani Hyderabad",
                date: "2025-12-19",
                type: "event",
                link: "cv.html",
                icon: "🤖"
            },
            {
                title: "Attended: Frontiers of Graph Algorithms",
                description: "Attended workshop on Dynamic, Distributed, and Streaming Algorithms on Graphs at IISc Bangalore",
                date: "2025-12-08",
                type: "event",
                link: "cv.html",
                icon: "🕸️"
            },
            {
                title: "Reviewer - Empowering Global South AI @ AAAI 2026",
                description: "Served as Reviewer for Workshop on Empowering Global South AI at AAAI 2026",
                date: "2025-12-01",
                type: "service",
                link: "roles.html",
                icon: "🤝"
            },
            {
                title: "Reviewer - GCLR @ AAAI 2026",
                description: "Served as Reviewer for Workshop on Graphs and more Complex Structures For Learning and Reasoning 2026 at AAAI 2026",
                date: "2025-10-24",
                type: "service",
                link: "roles.html",
                icon: "🤝"
            },
            {
                title: "Paper Published: Local Fragments, Global Gains",
                description: "Our latest paper on subgraph counting using GNNs has been accepted to DiffCoAlg @ NeurIPS 2025",
                date: "2025-09-23",
                type: "publication",
                link: "publications.html",
                icon: "📄"
            },
            {
                title: "Received Best Poster Award",
                description: "Received for Best Poster presentation on Scalable Graph Neural Networks",
                date: "2025-08-15",
                type: "Awards",
                link: "cv.html",
                icon: "🏅"
            },
            {
                title: "Reviewer - NeurIPS 2025",
                description: "Served as Reviewer for NeurIPS 2025 for Main Track and Dataset Track",
                date: "2025-07-20",
                type: "service",
                link: "roles.html",
                icon: "🤝"
            },
            {
                title: "Teaching Assistant - Scalable Data Science",
                description: "Started as TA for Scalable Data Science course at IIT Gandhinagar",
                date: "2025-07-01",
                type: "teaching",
                link: "roles.html",
                icon: "🎓"
            },
            {
                title: "Tutorial at ACM Summer School - Graph Neural Network",
                description: "Conducted hands-on tutorial sessions on Graph Neural Networks, providing practical implementation guidance and theoretical understanding to participants.",
                date: "2025-06-11",
                type: "teaching",
                link: "roles.html",
                icon: "🎓"
            },
            {
                title: "Ethics Reviewer - NeurIPS 2024",
                description: "Appointed as Ethics Reviewer for Neural Information Processing Systems 2024",
                date: "2024-08-01",
                type: "service",
                link: "roles.html",
                icon: "🤝"
            },
            {
                title: "Attended: Neuroscience, Data Science and Dynamics",
                description: "Participated in interdisciplinary conference at IIIT Bangalore",
                date: "2025-04-21",
                type: "event",
                link: "cv.html",
                icon: "🧠"
            },
            {
                title: "Volunteer - FSTTCS 2024",
                description: "Volunteered at Foundations of Software Technology and Theoretical Computer Science conference",
                date: "2024-12-14",
                type: "service",
                link: "roles.html",
                icon: "🤝"
            }
        ];

        // Sort by date (most recent first)
        return recentUpdates.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Home page: the 6 most recent updates as cards
    populateRecentUpdates() {
        const container = document.getElementById('updatesContainer');
        if (!container) return;

        this.getUpdates().slice(0, 6).forEach(update => {
            container.appendChild(this.createUpdateElement(update));
        });
    }

    // Updates page: every update, grouped by year, with type filters
    populateUpdatesHistory() {
        const timeline = document.getElementById('updatesTimeline');
        const filters = document.getElementById('updatesFilters');
        if (!timeline) return;

        const updates = this.getUpdates();
        const typeOf = update => update.type.toLowerCase();
        const label = type => type.charAt(0).toUpperCase() + type.slice(1);

        const render = (type) => {
            timeline.innerHTML = '';
            const shown = type === 'all' ? updates : updates.filter(u => typeOf(u) === type);
            let yearList = null;
            let currentYear = null;

            shown.forEach(update => {
                const year = update.date.slice(0, 4);
                if (year !== currentYear) {
                    currentYear = year;
                    const group = document.createElement('section');
                    group.className = 'timeline-year';
                    group.innerHTML = `<h2 class="timeline-year-title">${year}</h2>`;
                    yearList = document.createElement('ol');
                    yearList.className = 'timeline-list';
                    group.appendChild(yearList);
                    timeline.appendChild(group);
                }

                const item = document.createElement('li');
                const tag = update.link ? 'a' : 'div';
                const href = update.link ? ` href="${update.link}"` : '';
                item.innerHTML = `
                    <${tag} class="timeline-item"${href}>
                        <time class="timeline-date" datetime="${update.date}">${this.formatShortDate(update.date)}</time>
                        <div class="timeline-body">
                            <div class="timeline-title">${update.icon} ${update.title}</div>
                            <div class="timeline-description">${update.description}</div>
                        </div>
                        <span class="update-type">${label(typeOf(update))}</span>
                    </${tag}>
                `;
                yearList.appendChild(item);
            });
        };

        if (filters) {
            const types = ['all', ...new Set(updates.map(typeOf))];
            types.forEach(type => {
                const count = type === 'all' ? updates.length : updates.filter(u => typeOf(u) === type).length;
                const chip = document.createElement('button');
                chip.type = 'button';
                chip.className = 'filter-chip';
                chip.textContent = `${type === 'all' ? 'All' : label(type)} ${count}`;
                chip.setAttribute('aria-pressed', String(type === 'all'));
                chip.addEventListener('click', () => {
                    filters.querySelectorAll('.filter-chip').forEach(c => c.setAttribute('aria-pressed', 'false'));
                    chip.setAttribute('aria-pressed', 'true');
                    render(type);
                });
                filters.appendChild(chip);
            });
        }

        render('all');
    }

    createUpdateElement(update) {
        const updateDiv = document.createElement('div');
        updateDiv.className = 'update-item reveal';

        const formattedDate = this.formatDate(update.date);

        updateDiv.innerHTML = `
            <div class="update-header">
                <div class="update-title">
                    ${update.icon} ${update.title}
                </div>
                <div class="update-description">${update.description}</div>
            </div>
            <div class="update-footer">
                <div class="update-type">${update.type}</div>
                <div class="update-date">${formattedDate}</div>
            </div>
        `;

        // Add click handler for navigation
        if (update.link) {
            updateDiv.classList.add('is-link');
            updateDiv.addEventListener('click', () => {
                window.location.href = update.link;
            });
        }

        return updateDiv;
    }

    formatShortDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
    }

    // Smooth Scrolling for Internal Links
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: this.prefersReducedMotion() ? 'auto' : 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Scroll Reveal Animation using IntersectionObserver
    setupScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

        if (!revealElements.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.12
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // Publication abstracts start clamped to a few lines; add a toggle only
    // where the text actually overflows
    setupExpandableAbstracts() {
        document.querySelectorAll('.publications-grid .card-description').forEach(desc => {
            if (desc.scrollHeight <= desc.clientHeight + 1) return;

            const toggle = document.createElement('button');
            toggle.type = 'button';
            toggle.className = 'read-more';
            toggle.textContent = 'Read more';
            toggle.setAttribute('aria-expanded', 'false');
            toggle.addEventListener('click', () => {
                const expanded = desc.classList.toggle('expanded');
                toggle.textContent = expanded ? 'Show less' : 'Read more';
                toggle.setAttribute('aria-expanded', String(expanded));
            });
            desc.after(toggle);
        });
    }

    // Utility method for lazy loading images
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Performance optimization for scroll events
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Analytics and error tracking (placeholder for future implementation)
    trackEvent(eventName, properties = {}) {
        // Placeholder for analytics tracking
        console.log('Event tracked:', eventName, properties);
    }

    handleError(error, context = '') {
        // Placeholder for error handling
        console.error('Portfolio App Error:', error, context);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        new PortfolioApp();
    } catch (error) {
        console.error('Failed to initialize Portfolio App:', error);
    }
});

// Add some global utility functions
window.portfolioUtils = {
    // Copy text to clipboard
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            return successful;
        }
    },

    // Format academic dates
    formatAcademicDate: (dateString) => {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'short'
        };
        return date.toLocaleDateString('en-US', options);
    },

    // Generate citation text
    generateCitation: (paper) => {
        const authors = Array.isArray(paper.authors) ? paper.authors.join(', ') : paper.authors;
        const year = new Date(paper.date).getFullYear();
        return `${authors}. "${paper.title}" ${paper.venue} (${year}).`;
    }
};
