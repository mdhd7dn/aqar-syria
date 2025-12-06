// Property Detail Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Sample property data
    const propertyData = {
        images: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            'https://images.unsplash.com/photo-1574180045827-681f8a1a9622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
        ],
        title: 'شقة مفروشة للحجز في شارع رقم 572 ، حي دمشق ، اشام ، ',
        details: {
            'نوع العقار': 'شقة مفروشة',
            'المساحة': '120 متر مربع',
            'عدد الغرف': '2 غرفة نوم',
            'عدد الحمامات': '2 حمام',
            'المدينة': 'الرياض',
            'الحي': 'المنقا',
            'رقم الإعلان': '572'
        }
    };

    // Initialize the property detail page
    initializePropertyDetail();

    function initializePropertyDetail() {
        createPropertyDetailHTML();
        setupImageGallery();
        setupActionButtons();
        setupContactButtons();
    }

    function createPropertyDetailHTML() {
        const mainContent = document.querySelector('.main-content .container');
        
        const propertyDetailHTML = `
            <div class="property-detail-section">
                <div class="property-container">
                    <!-- Breadcrumb Navigation -->
                    <nav class="breadcrumb-nav">
                        <a href="#">الإيجار اليومي</a>
                        <span class="breadcrumb-separator">‹</span>
                        <a href="#">شقق مفروشة للحجز</a>
                        <span class="breadcrumb-separator">‹</span>
                        <a href="#">حلب</a>
                        <span class="breadcrumb-separator">‹</span>
                        <a href="#">شمال حلب</a>
                        <span class="breadcrumb-separator">‹</span>
                        <span>حي حلب</span>
                    </nav>

                    <!-- Property Title -->
                    <h1 class="property-title">${propertyData.title}</h1>

                    <!-- Main Content -->
                    <div class="property-content">
                        <!-- Image Gallery -->
                        <div class="image-gallery">
                            <div class="main-image-container">
                                <img src="${propertyData.images[0]}" alt="صورة الشقة الرئيسية" class="main-image" id="mainImage">
                                
                                <!-- Action Buttons -->
                                <div class="image-actions">
                                    <button class="action-btn share" onclick="shareProperty()">
                                        <i class="fas fa-share-alt"></i>
                                        مشاركة
                                    </button>
                                    <button class="action-btn favorite" onclick="toggleFavorite()">
                                        <i class="far fa-heart"></i>
                                        حفظ
                                    </button>
                                   
                                </div>

                                <!-- Image Counter -->
                                <div class="image-counter">
                                    <i class="fas fa-images"></i>
                                    الصور (${propertyData.images.length})
                                </div>
                            </div>

                            <!-- Thumbnail Gallery -->
                            <div class="thumbnail-gallery" id="thumbnailGallery">
                                ${propertyData.images.map((img, index) => `
                                    <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMainImage(${index})">
                                        <img src="${img}" alt="صورة ${index + 1}">
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                    
                     
                           
                              
                            </div>

                            <!-- Property Details -->
                            <div class="property-details">
                                ${Object.entries(propertyData.details).map(([key, value]) => `
                                   
                                `).join('')}
                            </div>

                         
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Insert the property detail section after the filter tabs
        const filterTabs = mainContent.querySelector('.filter-tabs');
        if (filterTabs) {
            filterTabs.insertAdjacentHTML('afterend', propertyDetailHTML);
        }
    }

    function setupImageGallery() {
        // Image gallery is already set up in the HTML creation
        console.log('Image gallery initialized');
    }

    function setupActionButtons() {
        // Action buttons are already set up with onclick handlers
        console.log('Action buttons initialized');
    }

    function setupContactButtons() {
        // Contact buttons are already set up with onclick handlers
        console.log('Contact buttons initialized');
    }

    // Global functions for button interactions
    window.changeMainImage = function(index) {
        const mainImage = document.getElementById('mainImage');
        const thumbnails = document.querySelectorAll('.thumbnail');
        
        // Update main image
        mainImage.src = propertyData.images[index];
        mainImage.classList.add('fade-in');
        
        // Update active thumbnail
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnails[index].classList.add('active');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            mainImage.classList.remove('fade-in');
        }, 500);
    };

    window.shareProperty = function() {
        if (navigator.share) {
            navigator.share({
                title: propertyData.title,
                text: `شاهد هذه الشقة المفروشة للإيجار بسعر ${propertyData.price} ${propertyData.period}`,
                url: window.location.href
            }).catch(console.error);
        } else {
            // Fallback for browsers that don't support Web Share API
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                alert('تم نسخ رابط الإعلان إلى الحافظة');
            }).catch(() => {
                alert('لا يمكن نسخ الرابط');
            });
        }
    };

    window.toggleFavorite = function() {
        const favoriteBtn = document.querySelector('.action-btn.favorite i');
        const isFavorited = favoriteBtn.classList.contains('fas');
        
        if (isFavorited) {
            favoriteBtn.classList.remove('fas');
            favoriteBtn.classList.add('far');
            showNotification('تم إزالة الإعلان من المفضلة');
        } else {
            favoriteBtn.classList.remove('far');
            favoriteBtn.classList.add('fas');
            showNotification('تم إضافة الإعلان إلى المفضلة');
        }
    };

    window.reportProperty = function() {
        const reasons = [
            'إعلان وهمي',
            'صور مضللة',
            'معلومات خاطئة',
            'سعر غير صحيح',
            'أخرى'
        ];
        
       
    };

    window.contactOwner = function() {
        // Simulate phone call
        const phoneNumber = '+966501234567';
        window.open(`tel:${phoneNumber}`, '_self');
    };

    window.contactWhatsApp = function() {
        const phoneNumber = '966501234567';
        const message = encodeURIComponent(`مرحباً، أنا مهتم بالشقة المفروشة للإيجار: ${propertyData.title}`);
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            font-family: 'Cairo', sans-serif;
            font-weight: 500;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add smooth scrolling for better UX
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

   // Add loading animation for images (فقط لصور معرض العقار)
const galleryImages = document.querySelectorAll('.image-gallery img'); // <-- ✅ تم التعديل هنا
galleryImages.forEach(img => {
    // تأكد من أن الصورة لم يتم تحميلها بالفعل (لتجنب الوميض)
    if (!img.complete) {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    }
});

});

// Add keyboard navigation for image gallery
document.addEventListener('keydown', function(e) {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const activeThumbnail = document.querySelector('.thumbnail.active');
    
    if (!activeThumbnail) return;
    
    const currentIndex = Array.from(thumbnails).indexOf(activeThumbnail);
    let newIndex = currentIndex;
    
    switch(e.key) {
        case 'ArrowLeft':
            newIndex = currentIndex > 0 ? currentIndex - 1 : thumbnails.length - 1;
            break;
        case 'ArrowRight':
            newIndex = currentIndex < thumbnails.length - 1 ? currentIndex + 1 : 0;
            break;
        default:
            return;
    }
    
    e.preventDefault();
    window.changeMainImage(newIndex);
});