// Image Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize image slider if it exists on the page
    initImageSlider();
    
    // Initialize form submission if the form exists on the page
    initJoinForm();
    
    // Initialize gallery filters if they exist on the page
    initGalleryFilters();
    
    // Initialize hamburger menu if it exists on the page
    initHamburgerMenu();
});

// Image Slider Functionality
function initImageSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    // Auto-advance slides every 5 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 3000);
}

// Join Form Submission
function initJoinForm() {
    const joinForm = document.getElementById('joinForm');
    if (!joinForm) return;
    
    joinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const maritalStatus = document.getElementById('maritalStatus').value;
        const contactMethod = document.querySelector('input[name="contactMethod"]:checked').value;
        const email = document.getElementById('email').value || 'Not provided';
        const message = document.getElementById('message').value || 'Not provided';
        
        // Check if user is married
        if (maritalStatus !== 'married') {
            alert('Sorry, our association is exclusively for married women.');
            return;
        }
        
        // Create WhatsApp message
        const whatsappMessage = `New Membership Application:%0A%0AName: ${name}%0APhone: ${phone}%0AMarital Status: ${maritalStatus}%0ABest Contact Method: ${contactMethod}%0AEmail: ${email}%0AMessage: ${message}`;
        
        // Open WhatsApp with pre-filled message
        window.open(`https://wa.me/2347066312994?text=${whatsappMessage}`, '_blank');
        
        // Show confirmation message
        alert('Thank you for your application! We have opened WhatsApp for you to send your details to our admin.');
        
        // Reset form
        joinForm.reset();
    });
}

// Video Control Functions (can be added to video elements if needed)
function playVideo(videoId) {
    const video = document.getElementById(videoId);
    if (video) {
        video.play();
    }
}

function pauseVideo(videoId) {
    const video = document.getElementById(videoId);
    if (video) {
        video.pause();
    }
}

// Gallery Filter Functionality
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length === 0 || galleryItems.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Hamburger Menu Functionality
function initHamburgerMenu() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    
    if (!hamburgerMenu || !mobileNav || !hamburgerIcon) return;
    
    hamburgerMenu.addEventListener('click', function() {
        // Toggle mobile navigation
        mobileNav.classList.toggle('active');
        
        // Toggle hamburger icon animation
        hamburgerIcon.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            hamburgerIcon.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburgerMenu.contains(e.target) && !mobileNav.contains(e.target)) {
            mobileNav.classList.remove('active');
            hamburgerIcon.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            mobileNav.classList.remove('active');
            hamburgerIcon.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Add CSS animation for smooth transitions
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);