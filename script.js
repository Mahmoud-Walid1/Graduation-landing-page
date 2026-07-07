// Preloader Logic
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Add a small delay to ensure smooth transition
        setTimeout(() => {
            document.body.classList.add('loaded');
            // Remove from DOM after transition matches CSS duration
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 500);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('suggestionForm');
    const statusMsg = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = form.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;

            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'جاري الإرسال...';
            statusMsg.style.display = 'none';

            // Collect form data
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                suggestion: formData.get('suggestion')
            };

            // REPLACE THIS URL WITH YOUR GOOGLE APPS SCRIPT WEB APP URL
            const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwiaJw6DgBmebBtFEk7yszvU-6rg4qgvj4UmBfE01Hwt0r6sCAtuNk2e3xAedDFI_VRgQ/exec';

            // Validation removed to allow submission

            fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Important for Google Apps Script
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    // With no-cors, we can't check response.ok, so we assume success if no error
                    statusMsg.textContent = 'تم إرسال اقتراحك بنجاح! شكراً لك.';
                    statusMsg.style.color = '#25D366'; // Success green
                    statusMsg.style.display = 'block';
                    form.reset();
                })
                .catch(error => {
                    console.error('Error:', error);
                    statusMsg.textContent = 'حدث خطأ أثناء الإرسال. حاول مرة أخرى.';
                    statusMsg.style.color = '#ff4444'; // Error red
                    statusMsg.style.display = 'block';
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;

                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        statusMsg.style.display = 'none';
                    }, 5000);
                });
        });
    }
});

// Theme Toggle Logic
const themeToggleBtns = document.querySelectorAll('.theme-toggle');
const htmlElement = document.documentElement;
const sunIcons = document.querySelectorAll('.sun-icon');
const moonIcons = document.querySelectorAll('.moon-icon');

// Check for saved user preference, if any, on load of the website
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

function updateIcons(theme) {
    if (theme === 'dark') {
        sunIcons.forEach(icon => icon.style.display = 'none');
        moonIcons.forEach(icon => icon.style.display = 'block');
    } else {
        sunIcons.forEach(icon => icon.style.display = 'block');
        moonIcons.forEach(icon => icon.style.display = 'none');
    }
}

if (currentTheme) {
    htmlElement.setAttribute('data-theme', currentTheme);
    updateIcons(currentTheme);
} else {
    // Default to light mode icons
    updateIcons('light');
}

themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        if (htmlElement.getAttribute('data-theme') === 'dark') {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            updateIcons('light');
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateIcons('dark');
        }
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');

        // Animate hamburger to X
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            document.body.style.overflow = 'hidden';
        } else {
            spans.forEach(span => span.style.transform = 'none');
            spans[1].style.opacity = '1';
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach(span => span.style.transform = 'none');
            spans[1].style.opacity = '1';
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach(span => span.style.transform = 'none');
            spans[1].style.opacity = '1';
            document.body.style.overflow = '';
        });
    });
}

// Copy text to clipboard and show toast
function copyText(text, label) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`تم نسخ ${label} إلى الذاكرة: \n${text}`);
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Switch simulator roles and details
function switchSimRole(role) {
    // 1. Update button states
    const buttons = document.querySelectorAll('.sim-tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Find matching button
    let index = 0;
    if (role === 'admin') index = 0;
    else if (role === 'teacher') index = 1;
    else if (role === 'parent') index = 2;
    buttons[index].classList.add('active');
    
    // 2. Switch content views
    const views = document.querySelectorAll('.sim-view');
    views.forEach(view => view.classList.remove('active'));
    
    const activeView = document.getElementById(`sim-content-${role}`);
    if (activeView) activeView.classList.add('active');
    
    // 3. Update credential text
    const emailEl = document.getElementById('sim-active-email');
    const passEl = document.getElementById('sim-active-password');
    
    if (role === 'admin') {
        emailEl.textContent = 'admin@edu.eye';
        passEl.textContent = 'youssef123';
    } else if (role === 'teacher') {
        emailEl.textContent = 'adam.f@sch.edu';
        passEl.textContent = 'fawzy123';
    } else if (role === 'parent') {
        emailEl.textContent = 'm.fahad@test.com';
        passEl.textContent = '12345678';
    }
}

// Redirect to demo page and copy active credentials
function goToActiveDemo() {
    const email = document.getElementById('sim-active-email').textContent.trim();
    const password = document.getElementById('sim-active-password').textContent.trim();
    const textToCopy = `البريد الإلكتروني: ${email}\nكلمة المرور: ${password}`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`تم نسخ بيانات الحساب للذاكرة!\nالبريد: ${email}\nكلمة المرور: ${password}\nجاري توجيهك لصفحة تسجيل الدخول...`);
        setTimeout(() => {
            window.open('https://ece2026.onrender.com/', '_blank');
        }, 1500);
    }).catch(err => {
        console.error('Copy failed, redirecting directly', err);
        window.open('https://ece2026.onrender.com/', '_blank');
    });
}

// Open Mobile Bottom Sheet with active role
function openMobileSheet(role) {
    const sheet = document.getElementById('mobile-demo-sheet');
    const backdrop = document.getElementById('mobile-demo-sheet-backdrop');
    const titleEl = document.getElementById('sheet-role-title');
    const descEl = document.getElementById('sheet-role-desc');
    const emailEl = document.getElementById('sheet-email-val');
    const passEl = document.getElementById('sheet-password-val');
    const iconContainer = document.getElementById('sheet-icon-container');

    if (!sheet || !backdrop) return;

    // Define content mapping
    let title = "";
    let desc = "";
    let email = "";
    let password = "";
    let iconSvg = "";

    if (role === 'admin') {
        title = "لوحة مدير المدرسة (أدمن)";
        desc = "إدارة شؤون الطلاب، الفصول، تقارير الحضور الذكي ونقاط التقييم للجميع.";
        email = "admin@edu.eye";
        password = "youssef123";
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:64px;height:64px;color:#e8a832"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="21" x2="9" y2="9"></line><line x1="3" y1="9" x2="21" y2="9"></line></svg>`;
    } else if (role === 'teacher') {
        title = "لوحة معلم الفصل (رصد درجات)";
        desc = "تسجيل حضور الحصص الدراسية، تقييم السلوك اليومي ورصد درجات الطلاب.";
        email = "adam.f@sch.edu";
        password = "fawzy123";
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:64px;height:64px;color:#e8a832"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`;
    } else if (role === 'parent') {
        title = "بوابة ولي الأمر (متابعة)";
        desc = "متابعة حضور طفلك فورا لحظة بلحظة، وتقارير السلوك ومستوى الدرجات.";
        email = "m.fahad@test.com";
        password = "12345678";
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:64px;height:64px;color:#e8a832"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>`;
    }

    // Set text
    titleEl.textContent = title;
    descEl.textContent = desc;
    emailEl.textContent = email;
    passEl.textContent = password;

    // Inject SVG
    iconContainer.innerHTML = iconSvg;

    // Show sheet and backdrop
    backdrop.classList.add('active');
    sheet.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Mobile Bottom Sheet
function closeMobileSheet() {
    const sheet = document.getElementById('mobile-demo-sheet');
    const backdrop = document.getElementById('mobile-demo-sheet-backdrop');
    if (sheet) sheet.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
}

// Launch Demo from Mobile Bottom Sheet
function launchMobileDemo() {
    const email = document.getElementById('sheet-email-val').textContent.trim();
    const password = document.getElementById('sheet-password-val').textContent.trim();
    const textToCopy = `البريد الإلكتروني: ${email}\nكلمة المرور: ${password}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`تم نسخ بيانات الحساب للذاكرة!\nالبريد: ${email}\nكلمة المرور: ${password}\nجاري توجيهك لصفحة تسجيل الدخول...`);
        closeMobileSheet();
        setTimeout(() => {
            window.open('https://ece2026.onrender.com/', '_blank');
        }, 1500);
    }).catch(err => {
        closeMobileSheet();
        window.open('https://ece2026.onrender.com/', '_blank');
    });
}

// Smart Sticky Header (Hide on Scroll Down, Show on Scroll Up)
let lastScrollTop = 0;
const header = document.querySelector('.navbar');
if (header) {
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 80) {
            header.classList.add('sticky-scrolled');
            if (scrollTop > lastScrollTop) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('sticky-scrolled');
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

