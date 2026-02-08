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

            if (SCRIPT_URL === 'https://script.google.com/macros/s/AKfycbwiaJw6DgBmebBtFEk7yszvU-6rg4qgvj4UmBfE01Hwt0r6sCAtuNk2e3xAedDFI_VRgQ/exec') {
                alert('Please configure the Google Apps Script URL in script.js first!');
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                return;
            }

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
