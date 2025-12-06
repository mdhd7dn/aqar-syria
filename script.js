// Category Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Here you could add filtering logic for properties
            console.log('Selected category:', this.textContent);
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.trim();
            console.log('Search term:', searchTerm);
            
            // Here you could add search filtering logic
            if (searchTerm.length > 0) {
                filterProperties(searchTerm);
            } else {
                showAllProperties();
            }
        });
    }
    
    // Property card hover effects
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Click handler for property cards
        card.addEventListener('click', function() {
            const propertyTitle = this.querySelector('.property-title').textContent;
            console.log('Clicked on property:', propertyTitle);
            
            // Here you could add navigation to property details page
            // window.location.href = `property-details.html?property=${encodeURIComponent(propertyTitle)}`;
        });
    });
    
    // Button click handlers
    const addButton = document.querySelector('.header-buttons .btn-outline');
    if (addButton && addButton.textContent.includes('إضافة')) {
        addButton.addEventListener('click', function() {
            console.log('Add property clicked');
            // Here you could open an add property form
        });
    }
    
    const mapButton = document.querySelector('.header-buttons .btn-outline[title="بحث بالخريطة"]');
    if (mapButton) {
        mapButton.addEventListener('click', function() {
            console.log('Map search clicked');
            // Here you could open map view
        });
    }
    
    const dailyRentButton = document.querySelector('.btn-primary');
    if (dailyRentButton && dailyRentButton.textContent.includes('الإيجار اليومي')) {
        dailyRentButton.addEventListener('click', function() {
            console.log('Daily rent clicked');
            // Here you could filter for daily rentals
        });
    }
});

// Property filtering functions
function filterProperties(searchTerm) {
    const propertyCards = document.querySelectorAll('.property-card');
    
    propertyCards.forEach(card => {
        const title = card.querySelector('.property-title').textContent.toLowerCase();
        const location = card.querySelector('.property-location').textContent.toLowerCase();
        const searchLower = searchTerm.toLowerCase();
        
        if (title.includes(searchLower) || location.includes(searchLower)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease-in';
        } else {
            card.style.display = 'none';
        }
    });
}

function showAllProperties() {
    const propertyCards = document.querySelectorAll('.property-card');
    
    propertyCards.forEach(card => {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.3s ease-in';
    });
}

// Add CSS animation for fade in effect
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Smooth scrolling for category navigation
function smoothScrollToCategory(categoryName) {
    // This could be used if you have sections for each category
    console.log('Scrolling to category:', categoryName);
}

// Mobile menu toggle (if needed for responsive design)
function toggleMobileMenu() {
    const headerButtons = document.querySelector('.header-buttons');
    headerButtons.classList.toggle('mobile-open');
}

// Add loading animation for property images
document.querySelectorAll('.property-image img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
        this.style.transition = 'opacity 0.3s ease-in';
    });
    
    img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1NiIgZmlsbD0iI2Y5ZmFmYiIvPjx0ZXh0IHg9IjIwMCIgeT0iMTI4IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPtmE2Kcg2KrZiNis2K8g2LXZiNix2KU8L3RleHQ+PC9zdmc+';
        this.alt = 'لا توجد صورة';
    });
});