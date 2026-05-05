/**
 *  Lumos is a clean HTML5 theme for LuCI. It is based on luci-theme-material and Lumos Template
 *
 *  luci-theme-lumos
 *      Copyright 2026 xiaoqi <xiaoqi2020@qq.com>
 *
 *  Have a bug? Please create an issue here on GitHub!
 *      https://github.com/xiaoqi2020/luci-theme-lumos/issues
 *
 *  luci-theme-bootstrap:
 *      Copyright 2008 Steven Barth <steven@midlink.org>
 *      Copyright 2008 Jo-Philipp Wich <jow@openwrt.org>
 *      Copyright 2012 David Menting <david@nut-bolt.nl>
 *
 *  MUI:
 *      https://github.com/muicss/mui
 *
 *  luci-theme-material:
 *      https://github.com/LuttyYang/luci-theme-material/
 *
 *  Lumos Theme
 *	    https://demos.creative-tim.com/Lumos-dashboard/index.html
 *
 *  Login background
 *      https://unsplash.com/
 *
 *  Licensed to the public under the Apache License 2.0
 */

/*
 *  Font generate by Icomoon<icomoon.io>
 */
(function ($) {
    $(".main > .loading").fadeOut();

    /**
     * trim text, Remove spaces, wrap
     * @param text
     * @returns {string}
     */
    function trimText(text) {
        return text.replace(/[ \t\n\r]+/g, " ");
    }

// define what element should be observed by the observer
// and what types of mutations trigger the callback
    const observer = new MutationObserver(() => {
    console.log("callback that runs when observer is triggered");
    });
    if ($("#cbi-dhcp-lan-ignore").length > 0) {
        observer.observe(document.getElementById("cbi-dhcp-lan-ignore"), {
            subtree: true,
            attributes: true
        });
    }

    $(".cbi-button-up").val("�?);
    $(".cbi-button-down").val("�?);

    /**
     * hook other "A Label" and add hash to it.
     */
    $("#maincontent > .container").find("a").each(function () {
        var that = $(this);
        var onclick = that.attr("onclick");
        if (onclick == undefined || onclick == "") {
            that.click(function () {
                var href = that.attr("href");
                if (href.indexOf("#") == -1) {
                    $(".main > .loading").fadeIn("fast");
                    return true;
                }
            });
        }
    });

    /**
     * fix legend position
     */
    $("legend").each(function () {
        var that = $(this);
        that.after("<span class='panel-title'>" + that.text() + "</span>");
    });

    $(".cbi-section-table-titles, .cbi-section-table-descr, .cbi-section-descr").each(function () {
        var that = $(this);
        if (that.text().trim() == "") {
            that.css("padding", "0px");
        }
    });

    $(".node-main-login > .main .cbi-value.cbi-value-last .cbi-input-text").focus(function () {
        //$(".node-main-login > .main > .main-right > .login-bg").addClass("blur");
    });
    $(".node-main-login > .main .cbi-value.cbi-value-last .cbi-input-text").blur(function () {
        //$(".node-main-login > .main > .main-right > .login-bg").removeClass("blur");
    });

    $(".main-right").focus();
    $(".main-right").blur();
    $("input").attr("size", "0");

    /**
     * Convert progress bars to circular rings
     */
    function initCircularProgress() {
        var bars = ["#swaptotal", "#swapfree", "#memfree", "#membuff", "#conns", "#memtotal"];
        bars.forEach(function(id) {
            var $bar = $(id);
            if ($bar.length > 0) {
                var $inner = $bar.find("> div > div");
                if ($inner.length > 0) {
                    var width = $inner.width();
                    var percent = (width / $bar.find("> div").width()) * 100;
                    var deg = (percent / 100) * 360;
                    $bar.find("> div").css({
                        background: "conic-gradient(rgba(124, 92, 191, 0.9) 0deg, rgba(168, 127, 232, 0.8) " + (deg * 0.5) + "deg, rgba(106, 140, 255, 0.9) " + deg + "deg, transparent " + deg + "deg)"
                    });
                }
            }
        });
    }

    $(document).ready(function() {
        setTimeout(initCircularProgress, 100);
    });

})(jQuery);
