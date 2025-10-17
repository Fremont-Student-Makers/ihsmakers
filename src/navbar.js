document.addEventListener('DOMContentLoaded', () => {
            // Hamburger menu toggle
            const hamburgerBtn = document.getElementById('hamburger-btn');
            const mobileMenu = document.getElementById('mobile-menu');

            hamburgerBtn.addEventListener('click', () => {
                hamburgerBtn.classList.toggle('open');
                mobileMenu.classList.toggle('hidden');
            });
        });