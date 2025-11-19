// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link
    updateActiveNavLink();
    
    // Show/hide scroll to top button
    if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

// ===== Update Active Nav Link =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== Counter Animation =====
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate counters
            if (entry.target.classList.contains('stat-number')) {
                if (!entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateCounter(entry.target);
                }
            }
        }
    });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', function() {
    // Observe stat numbers
    document.querySelectorAll('.stat-number').forEach(stat => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        stat.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(stat);
    });
    
    // Observe service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe portfolio cards
    document.querySelectorAll('.portfolio-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe career benefit cards
    document.querySelectorAll('.career-benefit-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe job cards
    document.querySelectorAll('.job-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// ===== Contact Form Submission =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        this.reset();
    });
}

// ===== Notification System =====
function showNotification(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#D4AF37' : '#5E2A7A'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Scroll to Top Button =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #5E2A7A, #D4AF37);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 5px 15px rgba(139, 44, 139, 0.3);
`;

document.body.appendChild(scrollTopBtn);

// Scroll to top on click
scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});

// ===== AI Chat Assistant =====
const chatToggle = document.getElementById('chatToggle');
const aiChatWidget = document.getElementById('aiChatWidget');
const chatMinimize = document.getElementById('chatMinimize');
const chatBody = document.getElementById('chatBody');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

// Knowledge base for AI responses
const aiKnowledgeBase = {
    services: {
        keywords: ['service', 'services', 'what do you do', 'offer', 'provide', 'what services'],
        response: "We offer comprehensive software solutions including:\n\n• Web Development - Custom web applications\n• Mobile Development - iOS and Android apps\n• Cloud Solutions - Scalable infrastructure\n• Database Management - Design and optimization\n• Cybersecurity - Security solutions\n• Maintenance & Support - Ongoing support\n\nWould you like to know more about any specific service?"
    },
    careers: {
        keywords: ['career', 'careers', 'job', 'jobs', 'hiring', 'position', 'apply', 'join', 'employment', 'opportunity'],
        response: "We're always looking for talented individuals! We currently have open positions for:\n\n• Senior Full Stack Developer\n• UI/UX Designer\n• DevOps Engineer\n\nWe offer great benefits including learning & development opportunities, a collaborative team culture, and clear career growth paths. You can view all positions and apply directly on our Careers page!"
    },
    contact: {
        keywords: ['contact', 'reach', 'email', 'phone', 'address', 'location', 'get in touch', 'how to contact'],
        response: "You can reach us at:\n\n📧 Email: info@devlogicinfotech.com\n📞 Phone: +1 (555) 123-4567\n📍 Address: 123 Business Street, City, State 12345\n\nYou can also fill out the contact form on our website, and we'll get back to you soon!"
    },
    company: {
        keywords: ['company', 'about', 'who are you', 'dev logic', 'infotech', 'tell me about'],
        response: "Dev Logic Infotech is a leading software development company dedicated to delivering innovative solutions. We have:\n\n• 10+ years of experience\n• 500+ projects completed\n• 200+ happy clients\n• 50+ team members\n\nOur expert team combines technical expertise with creative vision to build software that exceeds expectations."
    },
    portfolio: {
        keywords: ['portfolio', 'projects', 'work', 'examples', 'showcase'],
        response: "We've completed numerous successful projects including E-Commerce Platforms, Enterprise Management Systems, and Mobile Banking Applications. You can view our portfolio section on the website to see more examples of our work!"
    },
    default: "I'm here to help! You can ask me about:\n\n• Our services\n• Career opportunities\n• Company information\n• How to contact us\n• Our portfolio\n\nFeel free to ask anything!"
};

// Toggle chat widget
if (chatToggle && aiChatWidget) {
    chatToggle.addEventListener('click', () => {
        aiChatWidget.classList.toggle('active');
        if (aiChatWidget.classList.contains('active')) {
            chatToggle.style.display = 'none';
            chatInput.focus();
        }
    });
}

if (chatMinimize) {
    chatMinimize.addEventListener('click', () => {
        aiChatWidget.classList.toggle('minimized');
        if (aiChatWidget.classList.contains('minimized')) {
            chatMinimize.innerHTML = '<i class="fas fa-plus"></i>';
        } else {
            chatMinimize.innerHTML = '<i class="fas fa-minus"></i>';
        }
    });
}

// Quick question buttons
document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const question = btn.getAttribute('data-question');
        if (chatInput) {
            chatInput.value = question;
            sendMessage();
        }
    });
});

// Send message function
function sendMessage() {
    if (!chatInput) return;
    
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Simulate AI response delay
    setTimeout(() => {
        hideTypingIndicator();
        const response = getAIResponse(message);
        addMessage(response, 'bot');
    }, 1000);
}

// Add message to chat
function addMessage(text, sender) {
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = text;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    if (chatBody) {
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}

// Show typing indicator
function showTypingIndicator() {
    if (!chatMessages) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot';
    typingDiv.id = 'typingIndicator';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = '<i class="fas fa-robot"></i>';
    
    const content = document.createElement('div');
    content.className = 'typing-indicator';
    content.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(content);
    chatMessages.appendChild(typingDiv);
    
    if (chatBody) {
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Get AI response based on message
function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [key, data] of Object.entries(aiKnowledgeBase)) {
        if (key === 'default') continue;
        if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
            return data.response;
        }
    }
    
    return aiKnowledgeBase.default;
}

// Send button click
if (chatSend) {
    chatSend.addEventListener('click', sendMessage);
}

// Enter key to send
if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// ===== Careers Section =====
// Job application form handling
document.querySelectorAll('.btn-apply').forEach(btn => {
    btn.addEventListener('click', () => {
        const jobTitle = btn.getAttribute('data-job');
        const modalTitle = document.getElementById('modalJobTitle');
        if (modalTitle) {
            modalTitle.textContent = jobTitle;
        }
        const modalElement = document.getElementById('jobApplicationModal');
        if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        }
    });
});

// Job application form submission
const jobApplicationForm = document.getElementById('jobApplicationForm');
if (jobApplicationForm) {
    jobApplicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const fullName = formData.get('fullName');
        const email = formData.get('email');
        const phone = formData.get('phone');
        
        // Validation
        if (!fullName || !email || !phone) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you! Your application has been submitted successfully. We will review it and get back to you soon.', 'success');
        
        // Close modal
        const modalElement = document.getElementById('jobApplicationModal');
        if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) {
                modal.hide();
            }
        }
        
        // Reset form
        this.reset();
    });
}


