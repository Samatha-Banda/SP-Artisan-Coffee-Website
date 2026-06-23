// Sticky Navbar
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Parallax Effect for Hero Image
const heroImage = document.querySelector('.hero-image');

window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    if (heroImage && scrollPos < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrollPos * 0.4}px)`;
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    
    revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Trigger on load

// Animated Counters
const counters = document.querySelectorAll('.stat-number');
let hasCounted = false;

const startCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // ms
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
                if (counter.getAttribute('data-suffix')) {
                    counter.innerText += counter.getAttribute('data-suffix');
                }
            }
        };
        
        updateCounter();
    });
};

// Check if stats section is in view to start counters
const statsSection = document.querySelector('.stats-grid');
window.addEventListener('scroll', () => {
    if (!hasCounted && statsSection) {
        const statsTop = statsSection.getBoundingClientRect().top;
        if (statsTop < window.innerHeight - 50) {
            startCounters();
            hasCounted = true;
        }
    }
});

// Auto Sliding Testimonials
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

const showSlide = (index) => {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
};

const nextSlide = () => {
    let next = currentSlide + 1;
    if (next >= slides.length) next = 0;
    showSlide(next);
};

const startSlideShow = () => {
    if (slides.length > 0) {
        slideInterval = setInterval(nextSlide, 5000);
    }
};

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(index);
        startSlideShow();
    });
});

// Start slideshow on load
startSlideShow();

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}
