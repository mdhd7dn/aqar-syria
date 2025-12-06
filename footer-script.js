// Arabic Footer JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Footer link click tracking
    const footerLinks = document.querySelectorAll('.footer-link');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent.trim();
            console.log('Footer link clicked:', linkText);
            
            // Add specific functionality based on link
            handleFooterLinkClick(linkText);
        });
    });
    
    // App download tracking
    const appLinks = document.querySelectorAll('.app-link');
    
    appLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const appName = this.querySelector('img').alt;
            console.log('App download clicked:', appName);
            
            // Add download tracking or redirect logic
            handleAppDownload(appName);
        });
    });
    
    // Social media links
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.textContent;
            console.log('Social media clicked:', platform);
            
            // Add social media redirect logic
            handleSocialClick(platform);
        });
    });
    
    // Smooth scroll to top functionality
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
   // Add scroll to top button with a modern icon
const scrollButton = document.createElement('button');

// ===[ بداية التعديل: استخدام أيقونة Font Awesome ]===
scrollButton.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
// ===[ نهاية التعديل ]===

scrollButton.className = 'scroll-to-top';
scrollButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px; /* يمكنك تغييرها إلى right: 20px; لوضعها على اليمين */
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #28a745; /* لون أخضر أكثر حداثة */
    color: white;
    border: none;
    font-size: 20px; /* حجم الأيقونة */
    cursor: pointer;
    display: none; /* سيظهر عند النزول في الصفحة */
    z-index: 1000;
    transition: all 0.3s;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2); /* إضافة ظل لجعل الزر بارزاً */
`;

document.body.appendChild(scrollButton);

// Function to scroll to the top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Event listener to show/hide the button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) { // إظهار الزر بعد النزول 300 بكسل
        scrollButton.style.display = 'flex';
        scrollButton.style.justifyContent = 'center';
        scrollButton.style.alignItems = 'center';
    } else {
        scrollButton.style.display = 'none';
    }
});

scrollButton.addEventListener('click', scrollToTop);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });
    
    // Footer animation on scroll
    const footer = document.querySelector('.footer');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    observer.observe(footer);
    
    console.log('Arabic Footer loaded successfully!');
});

// Handle footer link clicks
function handleFooterLinkClick(linkText) {
    const linkActions = {
        'تمييز الإعلانات': () => {
            console.log('Navigate to premium ads');
            // window.location.href = '/premium-ads';
        },
        'مدونة عقار': () => {
            console.log('Navigate to blog');
            // window.location.href = '/blog';
        },
        'شركاء النجاح': () => {
            console.log('Navigate to partners');
            // window.location.href = '/partners';
        },
        'اتفاقية الاستخدام': () => {
            console.log('Navigate to terms');
            // window.location.href = '/terms';
        },
        'حاسبة البناء': () => {
            console.log('Navigate to calculator');
            // window.location.href = '/calculator';
        },
        'اتصل بنا': () => {
            console.log('Navigate to contact');
            // window.location.href = '/contact';
        },
        'إضافة إعلان': () => {
            console.log('Navigate to add listing');
            // window.location.href = '/add-listing';
        },
        'دفع الرسوم': () => {
            console.log('Navigate to payments');
            // window.location.href = '/payments';
        },
        'متوسط الأسعار': () => {
            console.log('Navigate to price averages');
            // window.location.href = '/price-averages';
        },
        'عقود الإيجار': () => {
            console.log('Navigate to rental contracts');
            // window.location.href = '/rental-contracts';
        }
    };
    
    // Execute action if exists
    const action = linkActions[linkText.replace(/[•📊🏢👥📋🧮💬➕💰📊📝]/g, '').trim()];
    if (action) {
        action();
    }
}

// Handle app download clicks
function handleAppDownload(appName) {
    const downloadUrls = {
        'AppGallery': 'https://appgallery.huawei.com/',
        'App Store': 'https://apps.apple.com/',
        'Google Play': 'https://play.google.com/'
    };
    
    const url = downloadUrls[appName];
    if (url) {
        console.log(`Redirecting to ${appName}: ${url}`);
        // window.open(url, '_blank');
    }
}

// Handle social media clicks
function handleSocialClick(platform) {
    const socialUrls = {
        '🎵': 'https://tiktok.com/',
        '👻': 'https://snapchat.com/',
        '📺': 'https://youtube.com/',
        '📷': 'https://instagram.com/',
        '❌': 'https://x.com/',
        '💼': 'https://linkedin.com/',
        '📘': 'https://facebook.com/'
    };
    
    const url = socialUrls[platform];
    if (url) {
        console.log(`Redirecting to social platform: ${url}`);
        // window.open(url, '_blank');
    }
}

// Newsletter subscription (if needed)
function subscribeNewsletter(email) {
    console.log('Newsletter subscription:', email);
    // Add newsletter subscription logic
}

// Language switcher (if needed)
function switchLanguage(lang) {
    console.log('Language switched to:', lang);
    // Add language switching logic
}

// Footer utilities
const FooterUtils = {
    // Format phone numbers
    formatPhone: (phone) => {
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    },
    
    // Validate email
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Get current year
    getCurrentYear: () => {
        return new Date().getFullYear();
    }
};

// Export for potential use in other scripts
window.FooterUtils = FooterUtils;

// Update copyright year automatically
document.addEventListener('DOMContentLoaded', function() {
    const copyrightElements = document.querySelectorAll('.copyright p');
    copyrightElements.forEach(element => {
        if (element.textContent.includes('2025')) {
            element.textContent = element.textContent.replace('2025', FooterUtils.getCurrentYear());
        }
    });
});