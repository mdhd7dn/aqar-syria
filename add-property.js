// ===== Add Property Modal - Complete Fixed Version =====

class AddPropertyManager {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 3;
        this.propertyData = {
            type: null,
            images: [],
            title: '',
            city: '',
            area: '',
            description: '',
            price: null,
            rentalType: '',
            areaSize: null,
            rooms: null,
            bathrooms: null,
            ownerName: '',
            phone: '',
            email: '',
            officeAddress: '',
            paymentMethod: null,
            shaamCashImage: null,
            termsAccepted: false
        };
    }

    // ===== Step 1: Property Type & Images =====
    initStep1() {
        console.log('📍 تهيئة الخطوة 1');
        
        // Property type cards
        const propertyCards = document.querySelectorAll('.property-type-card');
        console.log('🏠 عدد بطاقات العقار:', propertyCards.length);
        
        propertyCards.forEach((card, idx) => {
            console.log(`✅ إضافة listener للبطاقة ${idx + 1}`);
            
            // Remove old listeners
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
            
            // Add new listener
            newCard.addEventListener('click', (e) => {
                console.log('🎯 تم الضغط على بطاقة عقار');
                document.querySelectorAll('.property-type-card').forEach(c => c.classList.remove('selected'));
                newCard.classList.add('selected');
                this.propertyData.type = newCard.getAttribute('data-type');
                console.log('🏠 نوع العقار:', this.propertyData.type);
                this.updateNextButtonState();
            });
        });

        // Image upload
        const uploadArea = document.getElementById('uploadArea');
        console.log('📸 Upload area:', uploadArea ? '✅ موجود' : '❌ غير موجود');
        
        if (uploadArea) {
            uploadArea.addEventListener('click', () => {
                console.log('🖱️ تم الضغط على منطقة الرفع');
                const imageInput = document.getElementById('imageInput');
                if (imageInput) imageInput.click();
            });
            
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.style.backgroundColor = 'rgba(130, 184, 92, 0.1)';
            });
            
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.style.backgroundColor = '#f9fafb';
            });
            
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                console.log('📥 تم سحب الملفات');
                this.handleImages(e.dataTransfer.files);
            });
        }

        const imageInput = document.getElementById('imageInput');
        console.log('📁 Image input:', imageInput ? '✅ موجود' : '❌ غير موجود');
        
        if (imageInput) {
            imageInput.addEventListener('change', (e) => {
                console.log('📂 تم اختيار صور');
                this.handleImages(e.target.files);
            });
        }
        
        console.log('✅ انتهت تهيئة الخطوة 1');
    }

    handleImages(files) {
        console.log('📸 محاولة رفع', files.length, 'ملف');
        
        let added = 0;
        for (let file of files) {
            if (this.propertyData.images.length >= 8) {
                console.warn('⚠️ تم الوصول لحد الـ 8 صور');
                break;
            }
            
            if (file.type.startsWith('image/')) {
                console.log('✅ معالجة الصورة:', file.name);
                
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.propertyData.images.push({
                        name: file.name,
                        data: e.target.result
                    });
                    console.log('💾 تم حفظ الصورة. الإجمالي:', this.propertyData.images.length);
                    this.updateImagePreview();
                    this.updateNextButtonState();
                };
                reader.readAsDataURL(file);
                added++;
            } else {
                console.warn('⚠️ الملف ليس صورة:', file.type);
            }
        }
        
        console.log('🎉 تم إضافة', added, 'صور');
    }

    updateImagePreview() {
        const preview = document.getElementById('imagesPreview');
        console.log('🖼️ تحديث معاينة الصور. Preview element:', preview ? '✅' : '❌');
        
        if (!preview) return;

        preview.innerHTML = '';
        this.propertyData.images.forEach((img, idx) => {
            const div = document.createElement('div');
            div.className = 'image-preview';
            div.innerHTML = `
                <img src="${img.data}" alt="صورة">
                <button type="button" class="image-remove" onclick="propertyManager.removeImage(${idx})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            preview.appendChild(div);
        });
        
        console.log('✅ تم عرض', this.propertyData.images.length, 'صورة');
    }

    removeImage(index) {
        this.propertyData.images.splice(index, 1);
        this.updateImagePreview();
        this.updateNextButtonState();
    }

    updateNextButtonState() {
        const nextBtn = document.getElementById('nextBtn');
        
        if (!nextBtn) {
            console.warn('⚠️ لم يتم العثور على زر التالي');
            return;
        }
        
        const hasType = !!this.propertyData.type;
        const hasImages = this.propertyData.images.length > 0;
        
        const shouldEnable = hasType && hasImages;
        
        console.log('🔘 حالة الزر - نوع عقار:', hasType, '| صور:', hasImages, '| تفعيل:', shouldEnable);
        
        nextBtn.disabled = !shouldEnable;
    }

    // ===== Step 2: Property Details =====
    loadStep2() {
        console.log('📋 تحميل الخطوة 2');
        const body = document.querySelector('.modal-body');
        
        body.innerHTML = `
            <div class="form-section">
                <h3>تفاصيل العقار</h3>
                <div class="form-group">
                    <label>عنوان العقار *</label>
                    <input type="text" id="propertyTitle" placeholder="مثال: شقة فاخرة في دمشق" required>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>المدينة *</label>
                        <select id="city" required>
                            <option value="">اختر المدينة</option>
                            <option value="damascus">دمشق</option>
                            <option value="aleppo">حلب</option>
                            <option value="homs">حمص</option>
                            <option value="hama">حماة</option>
                            <option value="latakia">اللاذقية</option>
                            <option value="tartous">طرطوس</option>
                            <option value="idlib">إدلب</option>
                            <option value="raqqa">الرقة</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>الحي/المنطقة *</label>
                        <input type="text" id="area" placeholder="مثال: المنطقة الشرقية" required>
                    </div>
                </div>

                <div class="form-group">
                    <label>الوصف التفصيلي</label>
                    <textarea id="description" placeholder="صف العقار بالتفاصيل..." rows="3"></textarea>
                </div>
            </div>

            <div class="form-section">
                <h3>السعر والمالية</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label>السعر *</label>
                        <div class="price-input">
                            <input type="number" id="price" placeholder="0" min="0" required>
                            <span class="currency">ل.س</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>نوع الإيجار (إن كان إيجار)</label>
                        <select id="rentalType">
                            <option value="">لا ينطبق</option>
                            <option value="monthly">شهري</option>
                            <option value="yearly">سنوي</option>
                            <option value="daily">يومي</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>المساحة (م²)</label>
                        <input type="number" id="area-size" placeholder="0" min="0">
                    </div>
                    <div class="form-group">
                        <label>عدد الغرف</label>
                        <input type="number" id="rooms" placeholder="0" min="0">
                    </div>
                    <div class="form-group">
                        <label>عدد الحمامات</label>
                        <input type="number" id="bathrooms" placeholder="0" min="0">
                    </div>
                </div>
            </div>

            <div class="form-section">
                <h3>بيانات المالك</h3>
                <div class="form-group">
                    <label>الاسم الكامل *</label>
                    <input type="text" id="ownerName" placeholder="اسمك الكامل" required>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>رقم التواصل *</label>
                        <input type="tel" id="phone" placeholder="0955112233" required>
                    </div>
                    <div class="form-group">
                        <label>البريد الإلكتروني</label>
                        <input type="email" id="email" placeholder="your@email.com">
                    </div>
                </div>

                <div class="form-group">
                    <label>عنوان المكتب/العنوان</label>
                    <input type="text" id="officeAddress" placeholder="عنوان مكتبك">
                </div>
            </div>
        `;

        this.updateFooter('step2');
    }

    validateStep2() {
        const title = document.getElementById('propertyTitle')?.value;
        const city = document.getElementById('city')?.value;
        const area = document.getElementById('area')?.value;
        const price = document.getElementById('price')?.value;
        const ownerName = document.getElementById('ownerName')?.value;
        const phone = document.getElementById('phone')?.value;

        if (!title) { alert('أدخل عنوان العقار'); return false; }
        if (!city) { alert('اختر المدينة'); return false; }
        if (!area) { alert('أدخل اسم الحي'); return false; }
        if (!price || parseFloat(price) <= 0) { alert('أدخل السعر بشكل صحيح'); return false; }
        if (!ownerName) { alert('أدخل الاسم الكامل'); return false; }
        if (!phone) { alert('أدخل رقم التواصل'); return false; }

        this.propertyData.title = title;
        this.propertyData.city = city;
        this.propertyData.area = area;
        this.propertyData.price = parseFloat(price);
        this.propertyData.ownerName = ownerName;
        this.propertyData.phone = phone;
        this.propertyData.description = document.getElementById('description')?.value || '';
        this.propertyData.rentalType = document.getElementById('rentalType')?.value || '';
        this.propertyData.areaSize = parseFloat(document.getElementById('area-size')?.value) || null;
        this.propertyData.rooms = parseInt(document.getElementById('rooms')?.value) || null;
        this.propertyData.bathrooms = parseInt(document.getElementById('bathrooms')?.value) || null;
        this.propertyData.email = document.getElementById('email')?.value || '';
        this.propertyData.officeAddress = document.getElementById('officeAddress')?.value || '';

        return true;
    }

    // ===== Step 3: Payment =====
    loadStep3() {
        console.log('💳 تحميل الخطوة 3');
        const body = document.querySelector('.modal-body');
        
        body.innerHTML = `
            <div class="form-section">
                <h3>ملخص الإعلان</h3>
                <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <p><strong>نوع العقار:</strong> ${this.getTypeLabel(this.propertyData.type)}</p>
                    <p><strong>العنوان:</strong> ${this.propertyData.title}</p>
                    <p><strong>الموقع:</strong> ${this.propertyData.area} - ${this.propertyData.city}</p>
                    <p><strong>السعر:</strong> ${this.propertyData.price} ل.س</p>
                    <p><strong>عدد الصور:</strong> ${this.propertyData.images.length}</p>
                </div>
            </div>

            <div class="form-section">
                <h3>اختر طريقة الدفع</h3>
                <div class="payment-methods" id="paymentMethods">
                    <!-- Shaam Cash -->
                    <div class="payment-method-card" data-method="shaam-cash" onclick="propertyManager.selectPaymentMethod('shaam-cash')">
                        <div class="method-header">
                            <div class="method-logo">
                                <i class="fas fa-mobile-alt" style="font-size: 28px; color: #82b85c;"></i>
                            </div>
                            <div class="method-info">
                                <h4>🇸🇾 الشام كاش</h4>
                                <p>المحفظة الرقمية السورية</p>
                            </div>
                            <div class="radio-btn">
                                <input type="radio" name="paymentMethod" value="shaam-cash" id="shaammMethod">
                            </div>
                        </div>
                    </div>

                    <!-- PayPal -->
                    <div class="payment-method-card" data-method="paypal" onclick="propertyManager.selectPaymentMethod('paypal')">
                        <div class="method-header">
                            <div class="method-logo">
                                <i class="fab fa-paypal" style="font-size: 28px; color: #003087;"></i>
                            </div>
                            <div class="method-info">
                                <h4>PayPal</h4>
                                <p>محفظة رقمية عالمية</p>
                            </div>
                            <div class="radio-btn">
                                <input type="radio" name="paymentMethod" value="paypal" id="paypalMethod">
                            </div>
                        </div>
                    </div>

                    <!-- Credit/Debit Card -->
                    <div class="payment-method-card" data-method="card" onclick="propertyManager.selectPaymentMethod('card')">
                        <div class="method-header">
                            <div class="method-logo">
                                <i class="fas fa-credit-card" style="font-size: 28px; color: #1434cb;"></i>
                            </div>
                            <div class="method-info">
                                <h4>بطاقة بنكية</h4>
                                <p>بطاقة ائتمان أو خصم</p>
                            </div>
                            <div class="radio-btn">
                                <input type="radio" name="paymentMethod" value="card" id="cardMethod">
                            </div>
                        </div>
                    </div>

                    <!-- Bank Transfer -->
                    <div class="payment-method-card" data-method="bank-transfer" onclick="propertyManager.selectPaymentMethod('bank-transfer')">
                        <div class="method-header">
                            <div class="method-logo">
                                <i class="fas fa-university" style="font-size: 28px; color: #0066cc;"></i>
                            </div>
                            <div class="method-info">
                                <h4>تحويل بنكي</h4>
                                <p>دفع آمن عبر البنك</p>
                            </div>
                            <div class="radio-btn">
                                <input type="radio" name="paymentMethod" value="bank-transfer" id="bankMethod">
                            </div>
                        </div>
                    </div>

                    <!-- Crypto -->
                    <div class="payment-method-card" data-method="crypto" onclick="propertyManager.selectPaymentMethod('crypto')">
                        <div class="method-header">
                            <div class="method-logo">
                                <i class="fab fa-bitcoin" style="font-size: 28px; color: #f7931a;"></i>
                            </div>
                            <div class="method-info">
                                <h4>العملات الرقمية</h4>
                                <p>البيتكوين أو الإيثيريوم</p>
                            </div>
                            <div class="radio-btn">
                                <input type="radio" name="paymentMethod" value="crypto" id="cryptoMethod">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-section">
                <div class="checkbox-group">
                    <input type="checkbox" id="termsCheckbox">
                    <label for="termsCheckbox">
                        أوافق على الشروط والأحكام وسياسة الخصوصية
                    </label>
                </div>
            </div>
        `;

        this.updateFooter('step3');
    }

    selectPaymentMethod(method) {
        console.log('💳 اختيار طريقة دفع:', method);
        
        // Update UI
        document.querySelectorAll('.payment-method-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`[data-method="${method}"]`)?.classList.add('selected');
        
        document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
            radio.checked = false;
        });
        
        const methodRadio = document.getElementById(this.getMethodId(method));
        if (methodRadio) {
            methodRadio.checked = true;
        }
        
        this.propertyData.paymentMethod = method;

        // Show appropriate dialog based on method
        switch(method) {
            case 'shaam-cash':
                this.showShaammCashDialog();
                break;
            case 'card':
                this.showCardDialog();
                break;
            case 'paypal':
                this.showPayPalDialog();
                break;
            case 'bank-transfer':
                this.showBankTransferDialog();
                break;
            case 'crypto':
                this.showCryptoDialog();
                break;
        }
    }

    getMethodId(method) {
        const map = {
            'shaam-cash': 'shaammMethod',
            'card': 'cardMethod',
            'paypal': 'paypalMethod',
            'bank-transfer': 'bankMethod',
            'crypto': 'cryptoMethod'
        };
        return map[method] || '';
    }

    // Shaam Cash Dialog
    showShaammCashDialog() {
        const html = `
            <div class="payment-dialog">
                <div class="dialog-content">
                    <div class="dialog-header">
                        <h3>🇸🇾 الشام كاش</h3>
                        <button class="close-dialog" onclick="this.closest('.payment-dialog').remove()">✕</button>
                    </div>
                    <div class="dialog-body">
                        <p>الرجاء رفع صورة حسابك على الشام كاش أو صورة الـ QR</p>
                        
                        <div class="upload-field" style="margin: 20px 0; text-align: center;">
                            <label for="shaammImageInput" style="display: block; border: 2px dashed #82b85c; padding: 30px; border-radius: 8px; cursor: pointer; background: rgba(130, 184, 92, 0.05);">
                                <div style="font-size: 40px; margin-bottom: 10px;">📱</div>
                                <div style="font-weight: 600; color: #333;">انقر لاختيار صورة أو اسحبها</div>
                                <div style="font-size: 12px; color: #999; margin-top: 5px;">JPG, PNG (حتى 5MB)</div>
                                <input type="file" id="shaammImageInput" accept="image/*" style="display: none;">
                            </label>
                            <div id="shaammImagePreview" style="margin-top: 15px;"></div>
                        </div>

                        <div style="background: #f0f9ff; padding: 12px; border-radius: 6px; margin-bottom: 15px; font-size: 13px; color: #0066cc;">
                            <i class="fas fa-info-circle" style="margin-left: 8px;"></i>
                            تأكد من وضوح رقم حسابك أو الـ QR في الصورة
                        </div>
                    </div>
                    <div class="dialog-footer">
                        <button class="btn btn-secondary" onclick="this.closest('.payment-dialog').remove()">إلغاء</button>
                        <button class="btn btn-primary" onclick="propertyManager.saveShaammData()">حفظ</button>
                    </div>
                </div>
            </div>
        `;
        this.showPaymentDialog(html);
        
        const shaammInput = document.getElementById('shaammImageInput');
        if (shaammInput) {
            shaammInput.addEventListener('change', (e) => this.handleShaammImage(e));
        }
    }

    handleShaammImage(e) {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                this.propertyData.shaamCashImage = evt.target.result;
                const preview = document.getElementById('shaammImagePreview');
                if (preview) {
                    preview.innerHTML = `
                        <div style="position: relative; display: inline-block;">
                            <img src="${evt.target.result}" style="max-width: 150px; border-radius: 8px; border: 2px solid #82b85c;">
                            <button style="position: absolute; top: -10px; right: -10px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-size: 18px;" onclick="document.getElementById('shaammImageInput').value=''; this.parentElement.remove();">✕</button>
                        </div>
                    `;
                }
                console.log('✅ تم رفع صورة الشام كاش');
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    saveShaammData() {
        if (!this.propertyData.shaamCashImage) {
            alert('الرجاء رفع صورة حسابك');
            return;
        }
        console.log('💾 تم حفظ بيانات الشام كاش');
        document.querySelector('.payment-dialog')?.remove();
    }

    // Card Dialog
    showCardDialog() {
        const html = `
            <div class="payment-dialog">
                <div class="dialog-content">
                    <div class="dialog-header">
                        <h3>💳 بيانات البطاقة البنكية</h3>
                        <button class="close-dialog" onclick="this.closest('.payment-dialog').remove()">✕</button>
                    </div>
                    <div class="dialog-body">
                        <div class="form-group" style="margin-bottom: 15px;">
                            <label>اسم حامل البطاقة *</label>
                            <input type="text" id="cardName" placeholder="مثال: أحمد محمد" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-family: 'Cairo', sans-serif;">
                        </div>

                        <div class="form-group" style="margin-bottom: 15px;">
                            <label>رقم البطاقة *</label>
                            <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-family: 'Cairo', sans-serif; direction: ltr; text-align: left;">
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                            <div class="form-group">
                                <label>تاريخ الانتهاء *</label>
                                <input type="text" id="cardExpiry" placeholder="MM/YY" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-family: 'Cairo', sans-serif; direction: ltr; text-align: left;">
                            </div>
                            <div class="form-group">
                                <label>CVV *</label>
                                <input type="text" id="cardCVV" placeholder="123" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-family: 'Cairo', sans-serif; direction: ltr; text-align: left;">
                            </div>
                        </div>

                        <div style="background: #fff3cd; padding: 12px; border-radius: 6px; border-left: 4px solid #ffc107; margin-bottom: 15px; font-size: 13px;">
                            <i class="fas fa-shield-alt" style="margin-left: 8px; color: #856404;"></i>
                            <span style="color: #856404;">بياناتك محمية وآمنة - لا نخزن معلومات البطاقة</span>
                        </div>
                    </div>
                    <div class="dialog-footer">
                        <button class="btn btn-secondary" onclick="this.closest('.payment-dialog').remove()">إلغاء</button>
                        <button class="btn btn-primary" onclick="propertyManager.saveCardData()">حفظ</button>
                    </div>
                </div>
            </div>
        `;
        this.showPaymentDialog(html);
    }

    saveCardData() {
        const name = document.getElementById('cardName')?.value;
        const number = document.getElementById('cardNumber')?.value;
        const expiry = document.getElementById('cardExpiry')?.value;
        const cvv = document.getElementById('cardCVV')?.value;

        if (!name || !number || !expiry || !cvv) {
            alert('الرجاء ملء جميع الحقول المطلوبة');
            return;
        }

        this.propertyData.cardData = { name, number: number.slice(-4), expiry };
        console.log('💾 تم حفظ بيانات البطاقة');
        document.querySelector('.payment-dialog')?.remove();
    }

    // PayPal Dialog
    showPayPalDialog() {
        const html = `
            <div class="payment-dialog">
                <div class="dialog-content">
                    <div class="dialog-header">
                        <h3>PayPal</h3>
                        <button class="close-dialog" onclick="this.closest('.payment-dialog').remove()">✕</button>
                    </div>
                    <div class="dialog-body">
                        <div style="text-align: center; padding: 20px;">
                            <div style="font-size: 60px; margin-bottom: 15px;">
                                <i class="fab fa-paypal" style="color: #003087;"></i>
                            </div>
                            <p style="font-size: 16px; font-weight: 600; margin-bottom: 10px;">سيتم تحويلك إلى PayPal</p>
                            <p style="color: #666; font-size: 14px; margin-bottom: 20px;">ستتمكن من الدفع بآمان من حسابك على PayPal</p>
                            
                            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: right;">
                                <p style="margin: 5px 0;"><strong>المبلغ المستحق:</strong> ${this.propertyData.price} ل.س</p>
                                <p style="margin: 5px 0; font-size: 12px; color: #666;">سيتم تحويل رسوم الخدمة إليك</p>
                            </div>
                        </div>
                    </div>
                    <div class="dialog-footer">
                        <button class="btn btn-secondary" onclick="this.closest('.payment-dialog').remove()">إلغاء</button>
                        <button class="btn btn-primary" onclick="propertyManager.savePayPalData()">الدفع عبر PayPal</button>
                    </div>
                </div>
            </div>
        `;
        this.showPaymentDialog(html);
    }

    savePayPalData() {
        this.propertyData.paypalEmail = 'pending@paypal.com';
        console.log('💾 تم تأكيد الدفع عبر PayPal');
        document.querySelector('.payment-dialog')?.remove();
    }

    // Bank Transfer Dialog
    showBankTransferDialog() {
        const html = `
            <div class="payment-dialog">
                <div class="dialog-content">
                    <div class="dialog-header">
                        <h3>🏦 تحويل بنكي</h3>
                        <button class="close-dialog" onclick="this.closest('.payment-dialog').remove()">✕</button>
                    </div>
                    <div class="dialog-body">
                        <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-right: 4px solid #4caf50;">
                            <p style="margin: 0; color: #2e7d32; font-weight: 600;">
                                <i class="fas fa-check-circle" style="margin-left: 8px;"></i>
                                سيتم إرسال تفاصيل التحويل إلى بريدك الإلكتروني
                            </p>
                        </div>

                        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <p style="margin: 0 0 10px 0; font-weight: 600; color: #333;">معلومات الدفع ستتضمن:</p>
                            <ul style="margin: 10px 0; padding-right: 20px;">
                                <li>اسم المستفيد</li>
                                <li>رقم الحساب البنكي</li>
                                <li>رمز IBAN</li>
                                <li>مرجع التحويل</li>
                                <li>المبلغ المستحق</li>
                            </ul>
                        </div>

                        <div style="background: #fff3cd; padding: 12px; border-radius: 6px; border-right: 4px solid #ffc107;">
                            <p style="margin: 0; font-size: 13px; color: #856404;">
                                <i class="fas fa-info-circle" style="margin-left: 8px;"></i>
                                بريدك الإلكتروني: <strong>${this.propertyData.email || 'لم يتم إدخاله'}</strong>
                            </p>
                        </div>
                    </div>
                    <div class="dialog-footer">
                        <button class="btn btn-secondary" onclick="this.closest('.payment-dialog').remove()">إلغاء</button>
                        <button class="btn btn-primary" onclick="propertyManager.saveBankData()">تأكيد</button>
                    </div>
                </div>
            </div>
        `;
        this.showPaymentDialog(html);
    }

    saveBankData() {
        this.propertyData.bankTransferPending = true;
        console.log('💾 تم تأكيد التحويل البنكي');
        document.querySelector('.payment-dialog')?.remove();
    }

    // Crypto Dialog
    showCryptoDialog() {
        const html = `
            <div class="payment-dialog">
                <div class="dialog-content">
                    <div class="dialog-header">
                        <h3>🪙 العملات الرقمية</h3>
                        <button class="close-dialog" onclick="this.closest('.payment-dialog').remove()">✕</button>
                    </div>
                    <div class="dialog-body">
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 10px; font-weight: 600;">اختر العملة المفضلة:</label>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                                <label style="display: flex; align-items: center; padding: 10px; border: 2px solid #ddd; border-radius: 6px; cursor: pointer;">
                                    <input type="radio" name="cryptoType" value="bitcoin" id="cryptoBTC"> 
                                    <span style="margin-right: 8px;"><i class="fab fa-bitcoin" style="color: #f7931a; font-size: 20px;"></i></span>
                                    <span>البيتكوين</span>
                                </label>
                                <label style="display: flex; align-items: center; padding: 10px; border: 2px solid #ddd; border-radius: 6px; cursor: pointer;">
                                    <input type="radio" name="cryptoType" value="ethereum" id="cryptoETH">
                                    <span style="margin-right: 8px;"><i class="fas fa-code" style="color: #627eea; font-size: 20px;"></i></span>
                                    <span>الإيثيريوم</span>
                                </label>
                            </div>
                        </div>

                        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; border-right: 4px solid #2196f3;">
                            <p style="margin: 5px 0; font-size: 13px; color: #1565c0;">
                                <i class="fas fa-lightbulb" style="margin-left: 8px;"></i>
                                سيتم إرسال عنوان محفظتنا إلى بريدك الإلكتروني
                            </p>
                            <p style="margin: 5px 0; font-size: 13px; color: #1565c0;">
                                <i class="fas fa-clock" style="margin-left: 8px;"></i>
                                سيتم التحقق من التحويل تلقائياً خلال 30 دقيقة
                            </p>
                        </div>
                    </div>
                    <div class="dialog-footer">
                        <button class="btn btn-secondary" onclick="this.closest('.payment-dialog').remove()">إلغاء</button>
                        <button class="btn btn-primary" onclick="propertyManager.saveCryptoData()">متابعة</button>
                    </div>
                </div>
            </div>
        `;
        this.showPaymentDialog(html);
    }

    saveCryptoData() {
        const cryptoType = document.querySelector('input[name="cryptoType"]:checked')?.value;
        if (!cryptoType) {
            alert('اختر نوع العملة');
            return;
        }
        this.propertyData.cryptoType = cryptoType;
        console.log('💾 تم اختيار:', cryptoType);
        document.querySelector('.payment-dialog')?.remove();
    }

    showPaymentDialog(html) {
        // Remove existing dialog if present
        document.querySelector('.payment-dialog')?.remove();
        
        // Add new dialog
        const dialogDiv = document.createElement('div');
        dialogDiv.innerHTML = html;
        document.body.appendChild(dialogDiv.firstElementChild);
    }

    getTypeLabel(type) {
        const labels = {
            'house': 'بيت للبيع',
            'house-rent': 'بيت للإيجار',
            'apartment': 'شقة سكنية',
            'land': 'أرض',
            'commercial': 'محل تجاري',
            'villa': 'فيلا',
            'office': 'مكتب',
            'garage': 'موقف سيارات'
        };
        return labels[type] || type;
    }

    // ===== Navigation =====
    nextStep() {
        console.log('➡️ محاولة الانتقال من الخطوة:', this.currentStep);
        console.log('📊 البيانات:', {
            type: this.propertyData.type,
            images: this.propertyData.images.length,
            currentStep: this.currentStep
        });
        
        if (this.currentStep === 1) {
            if (!this.propertyData.type) {
                console.error('❌ لم يتم اختيار نوع عقار');
                alert('اختر نوع العقار');
                return;
            }
            if (this.propertyData.images.length === 0) {
                console.error('❌ لم يتم رفع صور');
                alert('ارفع صورة واحدة على الأقل');
                return;
            }
            
            console.log('✅ التحقق من الخطوة 1 نجح - الانتقال للخطوة 2');
            this.currentStep = 2;
            this.updateProgress();
            this.loadStep2();
            
        } else if (this.currentStep === 2) {
            console.log('🔍 التحقق من بيانات الخطوة 2');
            if (!this.validateStep2()) {
                console.error('❌ فشل التحقق من الخطوة 2');
                return;
            }
            
            console.log('✅ التحقق من الخطوة 2 نجح - الانتقال للخطوة 3');
            this.currentStep = 3;
            this.updateProgress();
            this.loadStep3();
            
        } else if (this.currentStep === 3) {
            console.log('📋 التحقق من قبول الشروط');
            
            if (!this.propertyData.paymentMethod) {
                alert('اختر طريقة دفع');
                return;
            }
            
            if (!document.getElementById('termsCheckbox')?.checked) {
                alert('وافق على الشروط والأحكام');
                return;
            }
            
            // Validate payment data based on method
            if (!this.validatePaymentData()) {
                return;
            }
            
            console.log('✅ تم قبول الشروط - تقديم الإعلان');
            this.submitProperty();
        }
    }

    validatePaymentData() {
        const method = this.propertyData.paymentMethod;
        
        switch(method) {
            case 'shaam-cash':
                if (!this.propertyData.shaamCashImage) {
                    alert('الرجاء رفع صورة حسابك على الشام كاش');
                    return false;
                }
                break;
            case 'card':
                if (!this.propertyData.cardData) {
                    alert('الرجاء إدخال بيانات البطاقة');
                    return false;
                }
                break;
            case 'paypal':
                if (!this.propertyData.paypalEmail) {
                    alert('الرجاء تأكيد بيانات PayPal');
                    return false;
                }
                break;
            case 'bank-transfer':
                if (!this.propertyData.bankTransferPending) {
                    alert('الرجاء تأكيد بيانات التحويل البنكي');
                    return false;
                }
                break;
            case 'crypto':
                if (!this.propertyData.cryptoType) {
                    alert('الرجاء اختيار نوع العملة الرقمية');
                    return false;
                }
                break;
        }
        
        return true;
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateProgress();
            
            if (this.currentStep === 1) {
                this.loadStep1();
                this.initStep1();
            } else if (this.currentStep === 2) {
                this.loadStep2();
            }
        }
    }

    updateProgress() {
        const steps = document.querySelectorAll('.progress-step');
        const lines = document.querySelectorAll('.progress-line');

        steps.forEach((step, idx) => {
            step.classList.remove('active', 'completed');
            if (idx < this.currentStep - 1) step.classList.add('completed');
            if (idx === this.currentStep - 1) step.classList.add('active');
        });

        lines.forEach((line, idx) => {
            line.classList.remove('active');
            if (idx < this.currentStep - 1) line.classList.add('active');
        });
    }

    updateFooter(step) {
        const footer = document.querySelector('.modal-footer');
        let html = '';

        if (step === 'step1') {
            html = `
                <button class="btn btn-secondary" onclick="propertyManager.closeModal()">إلغاء</button>
                <button class="btn btn-primary" id="nextBtn" disabled onclick="propertyManager.nextStep()">التالي</button>
            `;
        } else if (step === 'step2') {
            html = `
                <button class="btn btn-secondary" onclick="propertyManager.previousStep()">السابق</button>
                <button class="btn btn-secondary" onclick="propertyManager.closeModal()">إلغاء</button>
                <button class="btn btn-primary" onclick="propertyManager.nextStep()">التالي</button>
            `;
        } else if (step === 'step3') {
            html = `
                <button class="btn btn-secondary" onclick="propertyManager.previousStep()">السابق</button>
                <button class="btn btn-secondary" onclick="propertyManager.closeModal()">إلغاء</button>
                <button class="btn btn-primary" onclick="propertyManager.nextStep()">تأكيد وإضافة</button>
            `;
        }

        if (footer) {
            footer.innerHTML = html;
        }
    }

    // ===== Modal Management =====
    openModal() {
        console.log('🔵 فتح النموذج');
        this.resetForm();
        
        const modal = document.getElementById('addPropertyModal');
        if (!modal) {
            console.error('❌ لم يتم العثور على الـ modal');
            return;
        }
        
        modal.style.display = 'flex';
        this.updateProgress();
        this.updateFooter('step1');
        
        // تأخير بسيط للتأكد من رسم الـ DOM
        setTimeout(() => {
            console.log('⚙️ تهيئة الخطوة 1');
            this.initStep1();
        }, 50);
    }

    closeModal() {
        const modal = document.getElementById('addPropertyModal');
        const successModal = document.getElementById('successModal');
        if (modal) modal.style.display = 'none';
        if (successModal) successModal.style.display = 'none';
    }

    resetForm() {
        this.currentStep = 1;
        this.propertyData = {
            type: null,
            images: [],
            title: '',
            city: '',
            area: '',
            description: '',
            price: null,
            rentalType: '',
            areaSize: null,
            rooms: null,
            bathrooms: null,
            ownerName: '',
            phone: '',
            email: '',
            officeAddress: '',
            paymentMethod: null,
            shaamCashImage: null,
            termsAccepted: false
        };
    }

    submitProperty() {
        console.log('========================================');
        console.log('✅ تم تقديم الإعلان بنجاح!');
        console.log('========================================');
        console.log('📊 ملخص البيانات:');
        console.log('🏠 نوع العقار:', this.getTypeLabel(this.propertyData.type));
        console.log('📝 العنوان:', this.propertyData.title);
        console.log('📍 الموقع:', this.propertyData.area, '-', this.propertyData.city);
        console.log('💰 السعر:', this.propertyData.price, 'ل.س');
        console.log('👤 صاحب العقار:', this.propertyData.ownerName);
        console.log('📞 رقم التواصل:', this.propertyData.phone);
        console.log('📧 البريد:', this.propertyData.email);
        console.log('🖼️ عدد الصور:', this.propertyData.images.length);
        console.log('💳 طريقة الدفع:', this.propertyData.paymentMethod);
        
        if (this.propertyData.paymentMethod === 'shaam-cash') {
            console.log('🇸🇾 صورة الشام كاش:', this.propertyData.shaamCashImage ? '✅ مرفوعة' : '❌ لم ترفع');
        } else if (this.propertyData.paymentMethod === 'card') {
            console.log('💳 آخر 4 أرقام:', this.propertyData.cardData?.number);
        } else if (this.propertyData.paymentMethod === 'crypto') {
            console.log('🪙 نوع العملة:', this.propertyData.cryptoType);
        }
        console.log('========================================');

        const listingId = Math.floor(Math.random() * 1000000);
        
        const modal = document.getElementById('addPropertyModal');
        if (modal) modal.style.display = 'none';

        const successModal = document.getElementById('successModal');
        if (successModal) {
            successModal.style.display = 'flex';
            const listingIdEl = successModal.querySelector('#listingId');
            if (listingIdEl) listingIdEl.textContent = `#${listingId}`;

            // Success notification
            const alert = document.createElement('div');
            alert.style.cssText = `
                position: fixed;
                top: 20px;
                left: 20px;
                background: #28a745;
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                z-index: 10000;
                font-family: 'Cairo', sans-serif;
                font-weight: 600;
            `;
            alert.textContent = '✅ تمت عملية رفع العقار بنجاح! رقم الإعلان: #' + listingId;
            document.body.appendChild(alert);

            setTimeout(() => alert.remove(), 3000);
            setTimeout(() => this.closeModal(), 3000);
        }
    }
}

// Global function
function openAddPropertyModal() {
    if (!window.propertyManager) {
        window.propertyManager = new AddPropertyManager();
    }
    window.propertyManager.openModal();
}

// Initialize close button
document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.getElementById('closeBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (window.propertyManager) {
                window.propertyManager.closeModal();
            }
        });
    }
    
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', () => {
            if (window.propertyManager) {
                window.propertyManager.closeModal();
            }
        });
    }
    
    console.log('✅ Add Property Module Ready');
});
