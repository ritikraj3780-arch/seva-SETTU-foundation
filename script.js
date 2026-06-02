// ============================================
// SEVA SETTU - DONATION WEBSITE
// JavaScript Interactivity
// ============================================

// Smooth scrolling for navigation links
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

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe impact cards and payment cards
document.querySelectorAll('.impact-card, .payment-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active link styling
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: #d4af37;
        border-bottom: 2px solid #d4af37;
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);

// Donation tracking (optional - for analytics)
function trackDonation(type) {
    console.log(`User initiated ${type} donation`);
    // You can add analytics tracking here
}

// Add click tracking to payment buttons
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('click', () => {
        trackDonation('one-time');
    });
});

document.querySelectorAll('.subscription-button').forEach(btn => {
    btn.addEventListener('click', () => {
        trackDonation('subscription');
    });
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Prevent multiple rapid clicks on donation buttons
let lastClickTime = 0;
const clickDelay = 1000; // 1 second

document.querySelectorAll('.subscription-button, form').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const now = Date.now();
        if (now - lastClickTime < clickDelay) {
            e.preventDefault();
            return;
        }
        lastClickTime = now;
    });
});

// Log page load
console.log('Seva Settu Donation Website Loaded Successfully');
console.log('Payment Methods: Razorpay One-time & Subscription');
