// Website Data and Functionality
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        // Theme is already applied by inline script, just setup the toggle
        this.setupThemeToggle();
        this.setupMobileNav();
        this.setupProfilePhoto();
        this.populateRecentUpdates();
        this.setupSmoothScrolling();
        this.setupScrollReveal();
        this.setupHeaderScroll();
    }

    // Improved Theme Management
    setupThemeToggle() {
        const toggle = document.getElementById('themeToggle');

        // Set initial icon based on current theme
        const isDark = document.documentElement.classList.contains('dark-mode');
        this.updateThemeIcon(isDark);

        if (toggle) {
            toggle.addEventListener('click', () => {
                // Toggle theme on both html and body for immediate effect
                document.documentElement.classList.toggle('dark-mode');
                document.body.classList.toggle('dark-mode');

                const isDark = document.documentElement.classList.contains('dark-mode');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                this.updateThemeIcon(isDark);
            });
        }
    }

    updateThemeIcon(isDark) {
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = isDark ? '🌞' : '🌙';
        }
    }

    // Mobile Navigation - Slide-in Drawer
    setupMobileNav() {
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');

        if (!mobileToggle || !navLinks) return;

        // Create backdrop element
        const backdrop = document.createElement('div');
        backdrop.className = 'nav-backdrop';
        document.body.appendChild(backdrop);

        // Create nav drawer footer with social links and info
        if (!navLinks.querySelector('.nav-drawer-footer')) {
            const drawerFooter = document.createElement('li');
            drawerFooter.className = 'nav-drawer-footer';
            drawerFooter.style.listStyle = 'none';
            drawerFooter.innerHTML = `
                <div class="nav-drawer-bio">
                    <div class="nav-drawer-name">Shubhajit Roy</div>
                    <div class="nav-drawer-role">PhD Student · CSE · IIT Gandhinagar</div>
                </div>
                <div class="nav-drawer-socials">
                    <a href="mailto:royshubhajit@iitgn.ac.in" title="Email">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    </a>
                    <a href="https://github.com/Roy-Shubhajit" target="_blank" title="GitHub">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                    <a href="https://www.linkedin.com/in/shubhajit-roy-518334139/" target="_blank" title="LinkedIn">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                    <a href="https://scholar.google.com/citations?user=W2WQapAAAAAJ&hl=en" target="_blank" title="Google Scholar">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/></svg>
                    </a>
                    <a href="https://x.com/RoyShubhajit" target="_blank" title="X / Twitter">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.53 3H21L14.56 10.09L22.24 21H15.66L10.85 14.53L5.25 21H2L8.83 13.38L1.5 3H8.24L12.6 8.93L17.53 3ZM16.24 19H17.94L7.85 4.5H6.04L16.24 19Z"/></svg>
                    </a>
                </div>
                <div class="nav-drawer-copyright">© 2026 Shubhajit Roy</div>
            `;
            navLinks.appendChild(drawerFooter);
        }

        const openNav = () => {
            navLinks.classList.add('active');
            mobileToggle.classList.add('open');
            backdrop.classList.add('visible');
            document.body.style.overflow = 'hidden';
            mobileToggle.setAttribute('aria-expanded', 'true');
        };

        const closeNav = () => {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('open');
            backdrop.classList.remove('visible');
            document.body.style.overflow = '';
            mobileToggle.setAttribute('aria-expanded', 'false');
        };

        mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (navLinks.classList.contains('active')) {
                closeNav();
            } else {
                openNav();
            }
        });

        // Close on backdrop click
        backdrop.addEventListener('click', closeNav);

        // Close on nav link click
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                closeNav();
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') &&
                !mobileToggle.contains(e.target) &&
                !navLinks.contains(e.target)) {
                closeNav();
            }
        });
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

    // Recent Updates Data and Population
    populateRecentUpdates() {
        const container = document.getElementById('updatesContainer');
        if (!container) return;

        const recentUpdates = [
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
                title: "Paper Published: FIT-GNN",
                description: "Our latest paper on faster inference time for GNNs using coarsening has been accepted to ArXiv",
                date: "2024-10-19",
                type: "publication",
                link: "publications.html",
                icon: "📄"
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
        recentUpdates.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Show only the 6 most recent updates
        const latestUpdates = recentUpdates.slice(0, 6);

        latestUpdates.forEach(update => {
            const updateElement = this.createUpdateElement(update);
            container.appendChild(updateElement);
        });
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
            updateDiv.style.cursor = 'pointer';
            updateDiv.addEventListener('click', () => {
                window.location.href = update.link;
            });
        }

        return updateDiv;
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
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
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

    // Header shrink on scroll
    setupHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScroll = 0;
        const scrollThreshold = 50;

        const handleScroll = this.debounce(() => {
            const currentScroll = window.scrollY;

            if (currentScroll > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        }, 10);

        window.addEventListener('scroll', handleScroll, { passive: true });
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

    // Add keyboard navigation support
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Escape key closes mobile menu
            if (e.key === 'Escape') {
                const navLinks = document.getElementById('navLinks');
                const mobileToggle = document.getElementById('mobileToggle');
                const backdrop = document.querySelector('.nav-backdrop');

                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileToggle) {
                        mobileToggle.classList.remove('open');
                        mobileToggle.setAttribute('aria-expanded', 'false');
                    }
                    if (backdrop) {
                        backdrop.classList.remove('visible');
                    }
                    document.body.style.overflow = '';
                }
            }
        });
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
