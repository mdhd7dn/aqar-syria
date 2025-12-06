// عناصر DOM
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const passwordToggle = document.getElementById('passwordToggle');
const loginPassword = document.getElementById('loginPassword');

// وظيفة التبديل إلى نموذج تسجيل الدخول
function showLoginForm() {
    // إزالة الفئة النشطة من جميع العناصر
    loginBtn.classList.add('active');
    signupBtn.classList.remove('active');
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
    
    // إعادة تعيين النماذج
    document.getElementById('loginPhone').value = '';
    document.getElementById('loginPassword').value = '';
}

// وظيفة التبديل إلى نموذج إنشاء الحساب
function showSignupForm() {
    // إزالة الفئة النشطة من جميع العناصر
    signupBtn.classList.add('active');
    loginBtn.classList.remove('active');
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
    
    // إعادة تعيين النماذج
    document.getElementById('signupPhone').value = '';
}

// وظيفة إظهار/إخفاء كلمة المرور
function togglePassword() {
    const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    loginPassword.setAttribute('type', type);
    
    // تغيير أيقونة العين
    const eyeIcon = passwordToggle.querySelector('svg');
    if (type === 'text') {
        eyeIcon.innerHTML = `
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" stroke-width="2" fill="none"/>
            <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2"/>
        `;
    } else {
        eyeIcon.innerHTML = `
            <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" stroke="currentColor" stroke-width="2" fill="none"/>
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
        `;
    }
}

// إضافة مستمعي الأحداث
loginBtn.addEventListener('click', showLoginForm);
signupBtn.addEventListener('click', showSignupForm);
passwordToggle.addEventListener('click', togglePassword);

// التحقق من صحة النماذج
function validatePhone(phone) {
    // تحقق بسيط من رقم الجوال (يمكن تحسينه حسب المتطلبات)
    const phoneRegex = /^[0-9+\-\s()]+$/;
    return phoneRegex.test(phone) && phone.length >= 10;
}

function validatePassword(password) {
    // كلمة المرور يجب أن تكون 6 أحرف على الأقل
    return password.length >= 6;
}

// معالجة إرسال نموذج تسجيل الدخول
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const phone = document.getElementById('loginPhone').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    // التحقق من البيانات
    if (!phone) {
        alert('الرجاء إدخال رقم الجوال');
        return;
    }
    
    if (!validatePhone(phone)) {
        alert('الرجاء إدخال رقم جوال صحيح');
        return;
    }
    
    if (!password) {
        alert('الرجاء إدخال كلمة المرور');
        return;
    }
    
    if (!validatePassword(password)) {
        alert('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        return;
    }
    
    // محاكاة عملية تسجيل الدخول
    alert('تم تسجيل الدخول بنجاح!');
});

// معالجة إرسال نموذج إنشاء الحساب
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const phone = document.getElementById('signupPhone').value.trim();
    
    // التحقق من البيانات
    if (!phone) {
        alert('الرجاء إدخال رقم الجوال');
        return;
    }
    
    if (!validatePhone(phone)) {
        alert('الرجاء إدخال رقم جوال صحيح');
        return;
    }
    
    // محاكاة إرسال رمز التحقق
    alert('تم إرسال رمز التحقق إلى رقم الجوال المدخل');
});

// تأثيرات إضافية للتفاعل
document.addEventListener('DOMContentLoaded', function() {
    // إضافة تأثير التركيز على الحقول
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // إضافة تأثير الضغط على الأزرار
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

console.log('تم تحميل صفحة تسجيل الدخول وإنشاء الحساب بنجاح!');