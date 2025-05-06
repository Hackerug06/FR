// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active') && !e.target.closest('nav')) {
        navMenu.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Here you would typically send this to your server
        // For now, we'll just show an alert
        alert(`Thank you for subscribing with ${email}! You'll receive our updates soon.`);
        this.reset();
    });
}

// Simple image slider functionality
// This is a basic implementation - for production, consider using a library
let currentSlide = 0;
const autoSlideInterval = 5000; // 5 seconds

function setupSliders() {
    const sliders = [
        document.querySelector('.courses-slider'),
        document.querySelector('.testimonials-slider')
    ];
    
    sliders.forEach(slider => {
        if (!slider) return;
        
        // Clone the slides for infinite rotation if needed
        // This is a simple implementation
        const slides = slider.children;
        if (slides.length > 1) {
            setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateSlider(slider, currentSlide);
            }, autoSlideInterval);
        }
    });
}

function updateSlider(slider, index) {
    // This is a simple implementation
    // For a real site, consider using CSS transitions or a library
    const slideWidth = slider.children[0].offsetWidth;
    slider.style.transform = `translateX(-${index * slideWidth}px)`;
}

// Initialize sliders when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupSliders();
    
    // Add animation on scroll
    const animatedElements = document.querySelectorAll('.overview-card, .option-card, .course-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});

// Placeholder for course filtering functionality
// This would be expanded in the courses.html page
function filterCourses(category) {
    console.log(`Filtering courses by: ${category}`);
    // Implementation would depend on your courses page structure
}

// Placeholder for login/registration validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;
    
    // Basic validation example
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            // Add error styling
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}