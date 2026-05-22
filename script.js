document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // === FIREBASE SETUP ===
    const firebaseConfig = {
        apiKey: "AIzaSyAr1dpYc5kx25kZG7J2-QhIetkD7Bg08Go",
        authDomain: "recharge-hub-fa675.firebaseapp.com",
        databaseURL: "https://recharge-hub-fa675-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "recharge-hub-fa675",
        storageBucket: "recharge-hub-fa675.firebasestorage.app",
        messagingSenderId: "472948436692",
        appId: "1:472948436692:web:d403711495d6767b8f5541"
    };

    // Initialize Firebase
    if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
    const database = firebase.database();

    // Razorpay Configuration
    const RAZORPAY_KEY_ID = 'rzp_live_SmqlxPyhrtaTqz';

    // Initialize Razorpay Payment Directly
    window.initRazorpay = function(amount, serviceName) {
        // Generate a random email for the user
        const randomNum = Math.floor(100 + Math.random() * 899);
        const randomEmail = `user${randomNum}@gmail.com`;
        
        processPayment(amount, serviceName, '', '', randomEmail);
    }

    // Initialize Custom Razorpay Payment
    window.initCustomRazorpay = function() {
        const amount = document.getElementById('customAmount').value.trim();
        const work = document.getElementById('customWork').value.trim();

        if (!amount || isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        if (!work) {
            alert('Please describe the work you want done');
            return;
        }

        window.initRazorpay(amount, 'Custom Service: ' + work);
    }

    // Process Razorpay Payment
    function processPayment(amount, description, customerName, customerMobile, customerEmail) {
        const options = {
            key: RAZORPAY_KEY_ID,
            amount: amount * 100, // Amount in paise (₹1 = 100 paise)
            currency: 'INR',
            name: 'SN codeX Studio',
            description: description,
            prefill: {
                name: customerName || '',
                email: customerEmail || 'customer.care.verify@gmail.com',
                contact: customerMobile || ''
            },
            handler: function (response) {
                alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
                // Clear form
                document.getElementById('customerName').value = '';
                document.getElementById('customerMobile').value = '';
                // Here you can send the payment ID to your server for verification
            },
            modal: {
                ondismiss: function () {
                    alert('Payment window closed.');
                }
            },
            theme: {
                color: '#6366f1'
            }
        };

        const rzp1 = new Razorpay(options);
        rzp1.open();
    }

    function showMerchantID() {
        // Create or get the corner info box
        let infoBox = document.getElementById('merchantCornerInfo');
        if (!infoBox) {
            infoBox = document.createElement('div');
            infoBox.id = 'merchantCornerInfo';
            document.body.appendChild(infoBox);
        }

        infoBox.innerHTML = 'xx';
        infoBox.classList.add('show');

        // Hide after 1 second
        setTimeout(() => {
            infoBox.classList.remove('show');
        }, 1000);
    }

    // Make functions globally accessible
    window.initRazorpay = initRazorpay;
    window.initCustomRazorpay = initCustomRazorpay;
    window.selectSIM = selectSIM;
    window.closeSIMSelector = closeSIMSelector;
    window.showMerchantID = showMerchantID;

    // Mobile Menu Toggle
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#ffffff';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                navLinks.style.gap = '15px';
            }
        });
    }

    // Smooth Scroll for links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Form Submission (Simulated)
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! SN codeX Studio will get back to you soon.');
            contactForm.reset();
        });
    }

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            item.classList.toggle('active');

            // Close other items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });

    // Scroll Animation (Simple Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .pricing-card, .trust-item, .testimonial-card, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Handle animation class
    window.addEventListener('scroll', () => {
        document.querySelectorAll('.animate-in').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    });
});