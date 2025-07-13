        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });

    
        document.addEventListener('DOMContentLoaded', () => {
            const themeToggle = document.getElementById('theme-toggle');
            const body = document.body;

            const savedTheme = localStorage.getItem('theme');
            
            if (savedTheme === 'dark') {
                body.classList.add('dark-mode');
            }
            
            themeToggle.addEventListener('click', () => {
                body.classList.toggle('dark-mode');
                
                if (body.classList.contains('dark-mode')) {
                    localStorage.setItem('theme', 'dark');
                } else {
                    localStorage.setItem('theme', 'light');
                }
            });
            
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 70,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            const skillFilterButtons = document.querySelectorAll('.skill-filter button');
            const skillItems = document.querySelectorAll('.skill-item');
            
            skillFilterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    skillFilterButtons.forEach(btn => btn.classList.remove('active'));
                    
 
                    button.classList.add('active');
                    
                    const filter = button.getAttribute('data-filter');
                    
                    skillItems.forEach(item => {
                        if (filter === 'all' || item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
            

            document.querySelectorAll('.gallery-img').forEach(img => {
                img.addEventListener('click', function() {
                    const modalImage = document.getElementById('modalImage');
                    modalImage.src = this.getAttribute('data-img');
                });
            });

            const contactForm = document.getElementById('contactForm');
            
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let isValid = true;
                const name = document.getElementById('name');
                const email = document.getElementById('email');
                const subject = document.getElementById('subject');
                const message = document.getElementById('message');
                

                if (!name.value.trim()) {
                    name.classList.add('is-invalid');
                    isValid = false;
                } else {
                    name.classList.remove('is-invalid');
                }
                
                if (!email.value.trim() || !isValidEmail(email.value)) {
                    email.classList.add('is-invalid');
                    isValid = false;
                } else {
                    email.classList.remove('is-invalid');
                }
                
                if (!subject.value.trim()) {
                    subject.classList.add('is-invalid');
                    isValid = false;
                } else {
                    subject.classList.remove('is-invalid');
                }
                
                if (!message.value.trim()) {
                    message.classList.add('is-invalid');
                    isValid = false;
                } else {
                    message.classList.remove('is-invalid');
                }
                
                if (isValid) {

                    const contactData = {
                        name: name.value,
                        email: email.value,
                        subject: subject.value,
                        message: message.value,
                        date: new Date().toISOString()
                    };
                    
                    const existingMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];
                    existingMessages.push(contactData);
                    localStorage.setItem('contactMessages', JSON.stringify(existingMessages));
                    

                    contactForm.reset();

                    showAlert('Message sent successfully!', 'success');
                }
            });
            
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
            
            window.addEventListener('scroll', () => {
                let current = '';
                const offset = 150;
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (pageYOffset >= sectionTop - offset && pageYOffset < sectionTop + sectionHeight - offset) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            });
        });
        

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        function showAlert(message, type = 'info') {
            const alertPlaceholder = document.createElement('div');
            alertPlaceholder.classList.add('alert-container');
            alertPlaceholder.style.position = 'fixed';
            alertPlaceholder.style.top = '20px';
            alertPlaceholder.style.right = '20px';
            alertPlaceholder.style.zIndex = '9999';
            
            const wrapper = document.createElement('div');
            wrapper.classList.add('alert', `alert-${type}`, 'alert-dismissible', 'fade', 'show');
            wrapper.role = 'alert';
            wrapper.innerHTML = `
                <div>${message}</div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            
            alertPlaceholder.append(wrapper);
            document.body.append(alertPlaceholder);
            
            setTimeout(() => {
                wrapper.classList.remove('show');
                setTimeout(() => alertPlaceholder.remove(), 300);
            }, 5000);
        }