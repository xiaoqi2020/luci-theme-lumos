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

    function setWidthImportant(element, width) {
        if (element) {
            element.style.setProperty('width', width, 'important');
        }
    }

    function toggleSidebar() {
        if (showSide) {
            if (darkMask) {
                darkMask.style.display = 'none';
            }
            setWidthImportant(mainLeft, '0');
            if (mainRight) {
                mainRight.style.overflow = 'visible';
            }
            showSide = false;
        } else {
            if (darkMask) {
                darkMask.style.display = 'block';
            }
            setWidthImportant(mainLeft, '15rem');
            if (mainRight) {
                mainRight.style.overflow = 'visible';
            }
            showSide = true;
        }
    }

    function closeSidebar() {
        if (showSide) {
            toggleSidebar();
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
            closeSidebar();
        });
    }

    if (mainLeft) {
        var sidebarLinks = mainLeft.querySelectorAll('a');
        sidebarLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                closeSidebar();
            });
        });
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            setWidthImportant(mainLeft, '');
            if (darkMask) {
                darkMask.style.display = 'none';
            }
            showSide = false;
        }
    });
});