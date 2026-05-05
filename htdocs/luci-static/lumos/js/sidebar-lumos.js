/**
 *  Lumos is a clean HTML5 theme for LuCI. It is based on luci-theme-material and Lumos Template
 *
 *  luci-theme-lumos
 *      Copyright 2026 xiaoqi <xiaoqi2020@qq.com>
 *
 *  Have a bug? Please create an issue here on GitHub!
 *      https://github.com/xiaoqi2020/luci-theme-lumos/issues
 *
 *  Licensed to the public under the Apache License 2.0
 */

document.addEventListener('DOMContentLoaded', function() {
    var showSide = false;
    var showSideBtn = document.querySelector('.showSide');
    var darkMask = document.querySelector('.darkMask');
    var mainLeft = document.querySelector('.main-left');
    var mainRight = document.querySelector('.main-right');

    function toggleSidebar() {
        if (showSide) {
            if (darkMask) {
                darkMask.style.display = 'none';
            }
            if (mainLeft) {
                mainLeft.style.width = '0';
            }
            if (mainRight) {
                mainRight.style.overflowY = 'auto';
            }
            showSide = false;
        } else {
            if (darkMask) {
                darkMask.style.display = 'block';
            }
            if (mainLeft) {
                mainLeft.style.width = '15rem';
            }
            if (mainRight) {
                mainRight.style.overflowY = 'hidden';
            }
            showSide = true;
        }
    }

    if (showSideBtn) {
        showSideBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleSidebar();
        });
    }

    if (darkMask) {
        darkMask.addEventListener('click', function() {
            if (showSide) {
                toggleSidebar();
            }
        });
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            if (mainLeft) {
                mainLeft.style.width = '';
            }
            if (darkMask) {
                darkMask.style.display = 'none';
            }
            showSide = false;
        }
    });
});