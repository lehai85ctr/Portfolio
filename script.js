/* =====================================================
   LE QUOC HAI - Senior Construction Project Manager
   Premium Executive Portfolio - JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {

    // ===================== LOADING SCREEN =====================
    const loader = document.getElementById('loader');

    window.addEventListener('load', function () {
        setTimeout(function () {
            loader.classList.add('hidden');
            document.body.classList.add('loaded');
            initAnimations();
        }, 2200);
    });

    // Fallback: hide loader after 4 seconds regardless
    setTimeout(function () {
        if (!loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
            document.body.classList.add('loaded');
            initAnimations();
        }
    }, 4000);

    // ===================== TYPING EFFECT =====================
    const typingElement = document.getElementById('typing-text');
    const typingWords = [
        'Project Director',
        'Construction Manager',
        'Project Management Expert',
        'Construction Consultant',
        'Construction Executive'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentWord = typingWords[wordIndex];

        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % typingWords.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    // ===================== STICKY NAVIGATION =====================
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        const backToTop = document.getElementById('backToTop');
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link
        let currentSection = '';
        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);

    // ===================== MOBILE MENU =====================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', function (e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // ===================== SMOOTH SCROLLING =====================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================== SCROLL REVEAL ANIMATION =====================
    function initAnimations() {
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    }

    // ===================== COUNTER ANIMATION =====================
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        counters.forEach(function (counter) {
            const target = parseInt(counter.getAttribute('data-target'));
            const suffix = counter.getAttribute('data-suffix') || '';
            const prefix = counter.getAttribute('data-prefix') || '';
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            function updateCounter() {
                current += step;
                if (current >= target) {
                    current = target;
                    counter.textContent = prefix + formatNumber(target) + suffix;
                    return;
                }
                counter.textContent = prefix + formatNumber(Math.floor(current)) + suffix;
                requestAnimationFrame(updateCounter);
            }

            updateCounter();
        });

        countersAnimated = true;
    }

    function formatNumber(num) {
        if (num >= 1000) {
            return num.toLocaleString('en-US');
        }
        return num.toString();
    }

    // Observe the stats section
    const statsSection = document.getElementById('highlights');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsSection);
    }

    // ===================== SKILL BAR ANIMATION =====================
    const skillBars = document.querySelectorAll('.skill-bar-bg');
    let skillsAnimated = false;

    function animateSkillBars() {
        if (skillsAnimated) return;

        skillBars.forEach(function (bar) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });

        skillsAnimated = true;
    }

    const skillsSection = document.getElementById('competencies');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        skillsObserver.observe(skillsSection);
    }

    // ===================== DARK / LIGHT MODE =====================
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', function () {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Update toggle icon
        const icon = themeToggle.querySelector('i');
        if (newTheme === 'dark') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    });

    // Set initial icon based on saved theme
    const initialIcon = themeToggle.querySelector('i');
    if (savedTheme === 'dark') {
        initialIcon.className = 'fas fa-moon';
    }

    // ===================== BACK TO TOP =====================
    const backToTop = document.getElementById('backToTop');
    backToTop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===================== TESTIMONIALS SLIDER =====================
    const testimonialTrack = document.getElementById('testimonialTrack');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.testimonial-card').length;

    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentSlide = index;
        testimonialTrack.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
        testimonialDots.forEach(function (dot, i) {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function () {
            goToSlide(currentSlide - 1);
        });
        nextBtn.addEventListener('click', function () {
            goToSlide(currentSlide + 1);
        });
    }

    testimonialDots.forEach(function (dot, index) {
        dot.addEventListener('click', function () {
            goToSlide(index);
        });
    });

    // Auto slide testimonials
    let testimonialInterval = setInterval(function () {
        goToSlide(currentSlide + 1);
    }, 5000);

    // Pause on hover
    const sliderContainer = document.querySelector('.testimonials-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', function () {
            clearInterval(testimonialInterval);
        });
        sliderContainer.addEventListener('mouseleave', function () {
            testimonialInterval = setInterval(function () {
                goToSlide(currentSlide + 1);
            }, 5000);
        });
    }

    // ===================== CONTACT FORM =====================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');

            // Simple validation
            if (!name || !email) {
                alert('Please fill in all required fields.');
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(function () {
                alert('Thank you, ' + name + '! Your message has been sent successfully. I will get back to you soon.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // ===================== PARALLAX SUBTLE EFFECT =====================
    window.addEventListener('scroll', function () {
        const scrolled = window.scrollY;
        const heroShapes = document.querySelectorAll('.hero-shape');
        heroShapes.forEach(function (shape, index) {
            const speed = 0.02 * (index + 1);
            shape.style.transform = 'translateY(' + (scrolled * speed) + 'px)';
        });
    });

    // ===================== INITIAL STATE =====================
    handleScroll();

});
