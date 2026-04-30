document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initClock();
    initSystemStats();
    initParticles();
    initNavigation();
    initAnimations();
});

function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    const icon = toggle.querySelector('.toggle-icon');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('lumos-theme') || 'dark';
    body.classList.add(savedTheme);
    icon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
    
    toggle.addEventListener('click', function() {
        if (body.classList.contains('dark')) {
            body.classList.remove('dark');
            body.classList.add('light');
            localStorage.setItem('lumos-theme', 'light');
            icon.textContent = '☀️';
        } else {
            body.classList.remove('light');
            body.classList.add('dark');
            localStorage.setItem('lumos-theme', 'dark');
            icon.textContent = '🌙';
        }
    });
}

function initClock() {
    const timeElement = document.getElementById('sys-time');
    
    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    updateTime();
    setInterval(updateTime, 1000);
}

function initSystemStats() {
    const cpuElement = document.getElementById('cpu-load');
    const memElement = document.getElementById('mem-load');
    
    function fetchStats() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/cgi-bin/luci/admin/status/overview', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                try {
                    const response = xhr.responseText;
                    const cpuMatch = response.match(/CPU.*?(\d+)%/);
                    const memMatch = response.match(/Mem.*?(\d+)%/);
                    
                    if (cpuMatch) {
                        animateValue(cpuElement, parseInt(cpuElement.textContent) || 0, parseInt(cpuMatch[1]), 500);
                    }
                    if (memMatch) {
                        animateValue(memElement, parseInt(memElement.textContent) || 0, parseInt(memMatch[1]), 500);
                    }
                } catch (e) {
                    console.log('Failed to parse system stats');
                }
            }
        };
        xhr.send();
    }
    
    fetchStats();
    setInterval(fetchStats, 5000);
}

function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    const diff = end - start;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + diff * easeOut);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function initParticles() {
    const container = document.querySelector('.bg-particles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${6 + Math.random() * 4}s`;
        particle.style.width = `${2 + Math.random() * 4}px`;
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

function initNavigation() {
    const menuLinks = document.querySelectorAll('.menu-link');
    
    menuLinks.forEach(link => {
        link.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        link.addEventListener('mouseleave', function(e) {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        link.addEventListener('click', function(e) {
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function initAnimations() {
    const panels = document.querySelectorAll('.glass-panel');
    
    panels.forEach((panel, index) => {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            panel.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            panel.style.opacity = '1';
            panel.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    const buttons = document.querySelectorAll('button, .cbi-button, .btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.width = '10px';
            ripple.style.height = '10px';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            ripple.style.transition = 'transform 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            requestAnimationFrame(() => {
                ripple.style.transform = 'translate(-50%, -50%) scale(4)';
            });
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement?.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement?.classList.remove('focused');
        });
    });
}

function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: rgba(30, 30, 50, 0.9);
        backdrop-filter: blur(10px);
        border-radius: 12px;
        color: white;
        font-weight: 500;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        transform: translateX(120%);
        transition: transform 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(notification);
    
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

window.addEventListener('resize', function() {
    initParticles();
});