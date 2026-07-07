# Project Architecture - EDU EYE Landing Page

This document provides a comprehensive map of the `EDU EYE` landing page project structure. It details the role of each file and directory within the codebase.

## Directory Structure

```
d:\Mega Project\Web Page\
│
├── .git/                      # Version control history
├── index.html                 # Main landing page HTML file
├── style.css                  # Core design system and layout styling
├── script.js                  # Preloader, form submission, and UI logic
│
├── Assets & Media:
│   ├── logo.png               # System logo
│   ├── loader.png             # Loader image asset
│   ├── project_device.png     # Existing hardware scanner device image
│   ├── image-removebg-preview.png # New hardware scanner device image
│   ├── card_front.png         # Front face of the NFC student ID card
│   ├── card_back.png          # Back face of the NFC student ID card
│   ├── Final video.mp4        # Project explanatory video
│   └── EduEye.apk             # Android app installer (APK)
│
└── project_architecture.md    # Map of project components and architecture
```

---

## Component Details

### Core Files
1. **[index.html](file:///d:/Mega%20Project/Web%20Page/index.html)**
   * **Role**: Defines the markup structure, sections, SEO tags, and navigation links.
   * **Key Sections**: Navbar, Hero showcase, Explanatory Video, Vision/About, How it Works (Ecosystem), Why choose EDU EYE, Target Users, Team Members, Suggestion Form, and Footer.

2. **[style.css](file:///d:/Mega%20Project/Web%20Page/style.css)**
   * **Role**: Contains the full CSS styling, theme support (light/dark variables), custom layout grids, animations, mobile menu sizing, and modern UI enhancements (glassmorphism/custom transitions).
   * **Key Features**: Vertical stack layouts on mobile, flat borderless layouts for Ecosystem cards, responsive grid layouts for Team Members (2x2 grid), and theme contrast overrides for the mobile bottom sheet modal.

3. **[script.js](file:///d:/Mega%20Project/Web%20Page/script.js)**
   * **Role**: Handles dynamic page behaviors:
     * Preloader transition and removal.
     * Suggestion form submission to Google Apps Script via AJAX POST request.
     * Dark/Light mode theme switching with local storage persistence.
     * Mobile hamburger menu active class toggling and scroll locking.
     * Mobile Bottom Sheet toggles, credential copies, and launches with local inline SVGs.

### Key Media Assets
* **[image-removebg-preview.png](file:///d:/Mega%20Project/Web%20Page/image-removebg-preview.png)**: Image of the new hardware scanner device, to be integrated into the product showcase layout.
* **[EduEye.apk](file:///d:/Mega%20Project/Web%20Page/EduEye.apk)**: The Android app installer. Downloadable directly from the page.
* **[Final video.mp4](file:///d:/Mega%20Project/Web%20Page/Final%20video.mp4)**: Walkthrough video explaining how the attendance and data flow operate.
