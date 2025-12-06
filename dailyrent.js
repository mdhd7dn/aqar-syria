// انتظر حتى يتم تحميل كل محتوى الصفحة قبل تشغيل الكود
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. تحديد كل العناصر التي سنتعامل معها ---
    const filterTabs = document.querySelectorAll('.filter-tab');
    const propertyCards = document.querySelectorAll('.property-card');
    const propertyGrid = document.getElementById('propertyGrid');
    const paginationBtns = document.querySelectorAll('.pagination-btn');

    // --- 2. تشغيل كل الوظائف عند بدء تشغيل الصفحة ---
    initializeEventListeners();
    initializeLazyLoading(); // تشغيل التحميل الكسول للصور

    // --- 3. إضافة مستمعي الأحداث (Event Listeners) ---
    function initializeEventListeners() {
        
        // أ. مستمع لأزرار الفلترة (هذا هو الكود الجديد والمهم)
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const category = this.dataset.category;
                
                // تحديث الزر النشط
                filterTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // استدعاء دالة الفلترة
                filterProperties(category);

                // تتبع النقرة للتحليلات
                trackEvent('click', 'Filter', category);
            });
        });

        // ب. مستمع لأزرار ترقيم الصفحات (من كودك)
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // هذا الجزء يبقى كما هو في كودك للتعامل مع ترقيم الصفحات
                // ... يمكنك إضافة منطق ترقيم الصفحات هنا لاحقاً ...
                trackEvent('click', 'Pagination', this.dataset.page || this.id);
            });
        });
    }

    // --- 4. الدوال الرئيسية ---

    /**
     * الدالة الرئيسية لفلترة العقارات بناءً على الفئة
     * @param {string} category - الفئة التي سيتم عرضها ('all', 'apartments','villa','camp','farm','hall', etc.)
     */
    function filterProperties(category) {
        // إظهار تأثير التحميل باستخدام الكلاس الذي صممته في CSS
        propertyGrid.classList.add('loading');

        // استخدام setTimeout لمحاكاة التحميل وإعطاء وقت للتأثير البصري
        setTimeout(() => {
            propertyCards.forEach((card, index) => {
                const cardCategory = card.dataset.category;
                
                // التحقق مما إذا كانت البطاقة يجب أن تظهر
                const shouldShow = (category === 'all' || category === cardCategory);

                if (shouldShow) {
                    card.style.display = 'block'; // إظهار البطاقة
                    // إعادة تشغيل الأنيميشن لكل بطاقة ظاهرة
                    card.style.animation = 'none';
                    card.offsetHeight; // خدعة لإجبار المتصفح على إعادة رسم العنصر
                    card.style.animation = `fadeInUp 0.5s ease-out forwards ${index * 0.07}s`;
                } else {
                    card.style.display = 'none'; // إخفاء البطاقة
                }
            });

            // إخفاء تأثير التحميل بعد انتهاء الفلترة
            propertyGrid.classList.remove('loading');
        }, 300); // 0.3 ثانية للمحاكاة
    }

    /**
     * دالة التحميل الكسول للصور (من كودك)
     * لتحسين أداء الصفحة
     */
    function initializeLazyLoading() {
        // هذا الكود يعمل فقط إذا كان المتصفح يدعم IntersectionObserver
        if ('IntersectionObserver' in window) {
            const images = document.querySelectorAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src; // تحميل الصورة الحقيقية
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }

    /**
     * دالة تتبع التحليلات (من كودك)
     */
    function trackEvent(action, category, label) {
        console.log(`Analytics Event: Action=${action}, Category=${category}, Label=${label}`);
        // في مشروع حقيقي، هذا الكود يرسل البيانات إلى Google Analytics أو خدمة مشابهة
    }
});