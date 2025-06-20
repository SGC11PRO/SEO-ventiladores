// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
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

// Amazon redirect function (simulated)
function redirectToAmazon(productId) {
    // En una implementación real, aquí irían los enlaces de afiliado reales
    const amazonLinks = {
        'dyson-tp07': 'https://amazon.es/dp/B08XXXXX?tag=tuaffiliateid-21',
        'xiaomi-pro-h': 'https://amazon.es/dp/B08YYYYY?tag=tuaffiliateid-21',
        'philips-3033': 'https://amazon.es/dp/B08ZZZZZ?tag=tuaffiliateid-21'
    };
    
    // Simulación de redirección (en producción usar los enlaces reales)
    console.log(`Redirigiendo a Amazon para producto: ${productId}`);
    alert(`Redirigiendo a Amazon para ver el producto ${productId}. En producción, esto abriría el enlace de afiliado real.`);
    
    // En producción, descomenta la siguiente línea:
    // window.open(amazonLinks[productId], '_blank');
}

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter__form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('.newsletter__input').value;
        
        if (email) {
            // Aquí integrarías con tu servicio de email marketing
            alert('¡Gracias por suscribirte! Te mantendremos informado de las mejores ofertas.');
            this.querySelector('.newsletter__input').value = '';
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.product__card, .benefit__card, .testimonial__card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Add scroll effect to header
header.style.transition = 'transform 0.3s ease';

// Product card hover effects
document.querySelectorAll('.product__card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Price animation effect
function animatePrice(element) {
    const finalPrice = parseFloat(element.textContent.replace('€', ''));
    const duration = 1000;
    const steps = 60;
    const increment = finalPrice / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
        current += increment;
        step++;
        
        if (step >= steps) {
            current = finalPrice;
            clearInterval(timer);
        }
        
        element.textContent = `€${current.toFixed(2)}`;
    }, duration / steps);
}

// Trigger price animation when prices come into view
const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            animatePrice(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.price__current').forEach(price => {
    priceObserver.observe(price);
});

// Add loading states for buttons
document.querySelectorAll('.product__btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirigiendo...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
        }, 2000);
    });
});

// Testimonials carousel (simple version)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial__card');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

// Auto-rotate testimonials on mobile
if (window.innerWidth <= 768) {
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Add click tracking for analytics (placeholder)
function trackClick(element, action) {
    // Aquí integrarías con Google Analytics o tu herramienta de análisis
    console.log(`Tracking: ${action} clicked on ${element}`);
    
    // Ejemplo para Google Analytics 4:
    // gtag('event', action, {
    //     event_category: 'engagement',
    //     event_label: element
    // });
}

// Track product clicks
document.querySelectorAll('.product__btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        trackClick(`product-${index + 1}`, 'amazon_redirect');
    });
});

// Track navigation clicks
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        trackClick(link.textContent, 'navigation');
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll handling code here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('VentiladorSinAspas.com loaded successfully!');
    
    // Add any initialization code here
    
    // Preload critical images
    const criticalImages = [
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=250&width=250'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});