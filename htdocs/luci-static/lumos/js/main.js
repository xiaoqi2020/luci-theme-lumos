var Lumos = (function() {
    'use strict';

    var _Lumos = {
        interval: null,

        start: function() {
            this.updateTime();
            this.updateSystemStats();
            this.interval = setInterval(function() {
                _Lumos.updateTime();
                _Lumos.updateSystemStats();
            }, 5000);
            this.initParticles();
            this.bindEvents();
        },

        init: function() {
            this.bindEvents();
        },

        initLogin: function() {
            this.initParticles();
            this.bindLoginEvents();
        },

        bindEvents: function() {
            var toggles = document.querySelectorAll('[data-toggle="collapse"]');
            for (var i = 0; i < toggles.length; i++) {
                toggles[i].addEventListener('click', function(e) {
                    e.preventDefault();
                    var target = this.getAttribute('data-target');
                    var element = document.querySelector(target);
                    if (element) {
                        element.classList.toggle('show');
                    }
                });
            }
        },

        bindLoginEvents: function() {
            var inputs = document.querySelectorAll('.lumos-input');
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                inputs[i].addEventListener('blur', function() {
                    this.parentElement.classList.remove('focused');
                });
            }

            var buttons = document.querySelectorAll('.lumos-btn');
            for (var j = 0; j < buttons.length; j++) {
                buttons[j].addEventListener('click', function(e) {
                    var ripple = document.createElement('span');
                    ripple.className = 'lumos-ripple';
                    this.appendChild(ripple);
                    setTimeout(function() {
                        ripple.remove();
                    }, 600);
                });
            }
        },

        updateTime: function() {
            var timeEl = document.getElementById('lumos-time');
            if (timeEl) {
                var now = new Date();
                var options = {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                };
                timeEl.textContent = now.toLocaleDateString('zh-CN', options);
            }
        },

        updateSystemStats: function() {
            this.getSystemStats(function(stats) {
                var cpuEl = document.getElementById('lumos-cpu');
                var memEl = document.getElementById('lumos-mem');
                if (cpuEl && stats.cpu !== undefined) {
                    this.animateValue(cpuEl, parseInt(cpuEl.textContent) || 0, stats.cpu, 500);
                }
                if (memEl && stats.memory !== undefined) {
                    this.animateValue(memEl, parseInt(memEl.textContent) || 0, stats.memory, 500);
                }
            }.bind(this));
        },

        getSystemStats: function(callback) {
            var stats = { cpu: 0, memory: 0 };
            try {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', '<%=controller%>/admin/status/luci', true);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        try {
                            var json = JSON.parse(xhr.responseText);
                            stats.cpu = json.cpu || 0;
                            stats.memory = json.memory || 0;
                        } catch (e) {}
                    }
                };
                xhr.send();
            } catch (e) {}
            callback(stats);
        },

        animateValue: function(element, start, end, duration) {
            var range = end - start;
            var current = start;
            var increment = range / (duration / 16);
            var timer = setInterval(function() {
                current += increment;
                if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                    element.textContent = end;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.round(current);
                }
            }, 16);
        },

        initParticles: function() {
            var container = document.querySelector('.lumos-particles');
            if (!container) return;

            var particleCount = 50;
            for (var i = 0; i < particleCount; i++) {
                this.createParticle(container);
            }
        },

        createParticle: function(container) {
            var particle = document.createElement('div');
            particle.className = 'lumos-particle';
            particle.style.cssText = 
                'position: absolute;' +
                'width: ' + (Math.random() * 4 + 1) + 'px;' +
                'height: ' + (Math.random() * 4 + 1) + 'px;' +
                'background: rgba(255, 255, 255, ' + (Math.random() * 0.5 + 0.1) + ');' +
                'border-radius: 50%;' +
                'left: ' + (Math.random() * 100) + '%;' +
                'top: ' + (Math.random() * 100) + '%;' +
                'animation: lumos-particle-float ' + (Math.random() * 20 + 10) + 's ease-in-out infinite;' +
                'animation-delay: -' + (Math.random() * 20) + 's;';
            container.appendChild(particle);
        }
    };

    var style = document.createElement('style');
    style.textContent = 
        '@keyframes lumos-particle-float {' +
        '0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0; }' +
        '10% { opacity: 1; }' +
        '90% { opacity: 1; }' +
        '100% { transform: translate(' + (Math.random() * 200 - 100) + 'px, ' + (Math.random() * -300 - 100) + 'px) rotate(360deg); opacity: 0; }' +
        '}' +
        '.lumos-ripple {' +
        'position: absolute;' +
        'border-radius: 50%;' +
        'background: rgba(255, 255, 255, 0.4);' +
        'width: 0;' +
        'height: 0;' +
        'top: 50%;' +
        'left: 50%;' +
        'transform: translate(-50%, -50%);' +
        'animation: lumos-ripple-effect 0.6s ease-out;' +
        '}' +
        '@keyframes lumos-ripple-effect {' +
        '0% { width: 0; height: 0; opacity: 1; }' +
        '100% { width: 300px; height: 300px; opacity: 0; }' +
        '}';
    document.head.appendChild(style);

    return _Lumos;
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Lumos;
}