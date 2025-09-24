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

    // Mobile Navigation
    setupMobileNav() {
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');

        if (mobileToggle && navLinks) {
            mobileToggle.addEventListener('click', (e) => {
                e.preventDefault();
                navLinks.classList.toggle('active');

                // Update ARIA attributes for accessibility
                const isExpanded = navLinks.classList.contains('active');
                mobileToggle.setAttribute('aria-expanded', isExpanded);
            });

            // Close mobile nav when clicking on a link
            navLinks.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    navLinks.classList.remove('active');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                }
            });

            // Close mobile nav when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.classList.remove('active');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
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
                description: "Our latest paper on subgraph counting using GNNs has been accepted to DiffCoAlg@NeurIPS 2025",
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
                title: "Ethics Reviewer - NeurIPS 2025",
                description: "Served as Ethics Reviewer for NeurIPS 2025 for Main Track and Dataset Track",
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
        updateDiv.className = 'update-item';

        const formattedDate = this.formatDate(update.date);

        updateDiv.innerHTML = `
            <div class="update-header">
                <div>
                    <div class="update-title">
                        ${update.icon} ${update.title}
                    </div>
                    <div class="update-description">${update.description}</div>
                </div>
                <div class="update-meta">
                    <div class="update-date">${formattedDate}</div>
                </div>
            </div>
            <div class="update-type">${update.type}</div>
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

                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileToggle) {
                        mobileToggle.setAttribute('aria-expanded', 'false');
                    }
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
