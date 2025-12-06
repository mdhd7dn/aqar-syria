# نموذج إضافة العقارات (Add Property Modal)

## نظرة عامة
نظام متكامل لإضافة العقارات بـ 3 خطوات تفاعلية:
1. **الخطوة 1**: اختيار نوع العقار ورفع الصور
2. **الخطوة 2**: إدخال البيانات، السعر، وبيانات المالك
3. **الخطوة 3**: اختيار طريقة الدفع والتأكيد النهائي

## الملفات المُنشأة

### ملفات HTML
- `add-property-step1.html` - الخطوة الأولى (اختيار النوع والصور)
- `add-property-step2.html` - الخطوة الثانية (البيانات والسعر)
- `add-property-step3.html` - الخطوة الثالثة (الدفع والتأكيد)
- `add-property-demo.html` - صفحة عرض توضيحي كاملة

### ملفات CSS/JS
- `add-property.css` - جميع الأنماط (384+ سطر)
- `add-property.js` - منطق التطبيق الكامل مع Class AddPropertyManager

## المميزات

### أنواع العقارات
- ✅ بيت للبيع
- ✅ بيت للإيجار
- ✅ شقة سكنية
- ✅ أرض
- ✅ محل تجاري
- ✅ فيلا
- ✅ مكتب
- ✅ موقف سيارات

### خيارات رفع الصور
- ✅ اسحب وأفلت (Drag & Drop)
- ✅ انقر للاختيار
- ✅ دعم ما يصل إلى 8 صور
- ✅ معاينة فورية للصور

### طرق الدفع المدعومة
- ✅ محفظة الشام كاش (مع رفع صورة الحساب)
- ✅ PayPal
- ✅ تحويل بنكي
- ✅ العملات الرقمية (بيتكوين/إيثيريوم)

### بيانات المالك
- ✅ الاسم الكامل
- ✅ رقم التواصل
- ✅ البريد الإلكتروني
- ✅ عنوان المكتب/العنوان

### تفاصيل العقار
- ✅ العنوان
- ✅ المدينة والحي
- ✅ الوصف التفصيلي
- ✅ السعر
- ✅ نوع الإيجار (شهري/سنوي/يومي)
- ✅ المساحة
- ✅ عدد الغرف
- ✅ عدد الحمامات

## طرق الاستخدام

### 1. استدعاء النموذج من HTML
```html
<!-- إضافة الملفات -->
<link rel="stylesheet" href="add-property.css">
<script src="add-property.js"></script>

<!-- زر الإضافة -->
<button onclick="openAddPropertyModal()">+ إضافة عقار</button>
```

### 2. استدعاء من أي عنصر
```html
<button data-action="add-property">إضافة</button>
```

### 3. التحكم الكامل عبر JavaScript
```javascript
// فتح النموذج
propertyManager.openModal();

// الوصول إلى البيانات
console.log(propertyManager.propertyData);

// إغلاق النموذج
propertyManager.closeModal();

// إعادة تعيين النموذج
propertyManager.resetForm();
```

## التكامل في Angular

### الخطوة 1: نسخ الملفات
```bash
# انسخ إلى مجلد assets
cp add-property.css src/assets/styles/
cp add-property.js src/assets/scripts/

# أو استخدم SCSS للأنماط
# cp add-property.scss src/app/components/add-property/
```

### الخطوة 2: إنشاء Component
```bash
ng generate component components/add-property
```

### الخطوة 3: تحويل إلى TypeScript
```typescript
// add-property.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent {
  propertyManager: any;

  ngOnInit() {
    // تحويل كود JavaScript إلى TypeScript
    // ...
  }

  openAddPropertyModal() {
    // منطق الفتح
  }
}
```

### الخطوة 4: إنشاء Service
```typescript
// property.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  submitProperty(data: any) {
    // إرسال البيانات إلى API
    return this.http.post('/api/properties', data);
  }
}
```

## الهوية البصرية

### الألوان المستخدمة
- **اللون الأساسي**: `#82b85c` (الأخضر)
- **اللون الثانوي**: `#007bff` (الأزرق)
- **لون النجاح**: `#28a745` (الأخضر الغامق)
- **لون التحذير**: `#ffc107` (البرتقالي)

### الخطوط
- **الخط الرئيسي**: Cairo (عربي)
- **حجم النصوص**: 14px (افتراضي)

### التصميم المتجاوب
- ✅ يعمل على سطح المكتب (768px+)
- ✅ يعمل على التابلت (480px-768px)
- ✅ يعمل على الهاتف (أقل من 480px)

## البيانات المحفوظة

```javascript
propertyData = {
  type: 'apartment',
  images: [{name: '...', data: '...'}],
  title: 'شقة فاخرة',
  city: 'damascus',
  area: 'المنطقة الشرقية',
  description: '...',
  price: 50000000,
  rentalType: 'monthly',
  areaSize: 150,
  rooms: 3,
  bathrooms: 2,
  ownerName: 'أحمد محمد',
  phone: '0955112233',
  email: 'ahmed@example.com',
  officeAddress: 'دمشق - شارع النيل',
  paymentMethod: 'shaam-cash',
  paymentImage: {method: '...', data: '...'},
  termsAccepted: true
}
```

## الأحداث والتنبيهات

### تنبيهات التحقق
- ✅ تحقق من اختيار النوع
- ✅ تحقق من صحة البيانات المطلوبة
- ✅ تحقق من قبول الشروط
- ✅ تحقق من اختيار طريقة الدفع

### رسائل النجاح
- ✅ يحصل على رقم إعلان فريد
- ✅ رسالة تأكيد النجاح
- ✅ تعليمات المتابعة

## الاختبار المحلي

1. افتح `add-property-demo.html` في المتصفح
2. انقر على زر "إضافة"
3. اتبع الخطوات الثلاث
4. تحقق من رسالة النجاح

## ملاحظات مهمة

⚠️ **البيانات حالياً محفوظة في Memory**
- عند إعادة تحميل الصفحة تُفقد البيانات
- في الإنتاج: أرسل البيانات إلى API

⚠️ **رفع الصور محلي فقط**
- للإنتاج: استخدم AWS S3 أو CDN آخر

⚠️ **بيانات الدفع وهمية**
- تكامل طرق الدفع الحقيقية يتطلب تكوين إضافي

## التطور المستقبلي

- [ ] إضافة خريطة تفاعلية لتحديد الموقع
- [ ] دعم الفيديو بالإضافة إلى الصور
- [ ] نموذج جولة افتراضية (VR Tour)
- [ ] خيارات إعلانات مميزة
- [ ] نظام التقييم والتعليقات

## الدعم

في حالة وجود مشاكل أو استفسارات:
- تحقق من console للأخطاء
- تأكد من تحميل ملفات CSS و JS بشكل صحيح
- اختبر على متصفح حديث (Chrome, Firefox, Safari)

---

**آخر تحديث**: 6 ديسمبر 2025
**الإصدار**: 1.0
