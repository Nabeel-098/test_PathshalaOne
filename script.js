// This script handles global functionality common to all pages.

// Function to handle theme toggling with a "blink" animation
function handleThemeToggle() {
    const isDark = document.documentElement.classList.contains('dark');
    const overlay = document.createElement('div');
    overlay.classList.add('theme-transition-overlay');

    // The overlay will flash the color of the theme we are transitioning TO.
    const flashColor = isDark ? '#fffcef' : '#100c08'; // light-bg, dark-bg
    overlay.style.backgroundColor = flashColor;
    
    document.body.appendChild(overlay);

    // Animate the "blink" effect.
    // It will quickly fade in, hold, and then fade out.
    overlay.animate([
        { opacity: 0 },
        { opacity: 1, offset: 0.3 }, // Quickly flash to full opacity
        { opacity: 1, offset: 0.7 }, // Hold the color for a moment
        { opacity: 0 }
    ], {
        duration: 500, // Total duration for the effect
        easing: 'ease-in-out',
        fill: 'forwards'
    });

    // We change the theme in the middle of the animation, while the overlay is opaque.
    // This prevents any jarring flash of content re-styling.
    setTimeout(() => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('color-theme', isDark ? 'light' : 'dark');
        updateThemeIcons();
    }, 150); // This timing corresponds to the 0.3 offset in the animation keyframes

    // Clean up the overlay element from the DOM after the animation is complete
    setTimeout(() => {
        overlay.remove();
    }, 500);
}


// Function to update the theme icons based on the current theme
function updateThemeIcons() {
    const lightIcon = document.getElementById('theme-icon-light');
    const darkIcon = document.getElementById('theme-icon-dark');
    // A guard clause in case a page doesn't have the theme toggle icons
    if (!lightIcon || !darkIcon) return; 
    
    if (document.documentElement.classList.contains('dark')) {
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
    } else {
        darkIcon.classList.remove('hidden');
        lightIcon.classList.add('hidden');
    }
}

// Function to handle the mobile menu toggle
function handleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Event listeners for common elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme icons on page load
    updateThemeIcons();

    // Attach event listeners
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', handleThemeToggle);
    }
    
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', handleMobileMenu);
    }
});

