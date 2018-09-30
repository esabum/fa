/****  Variables Initiation  ****/
var doc = document;
var docEl = document.documentElement;
var $body = jQuery('body');
var $sidebar = jQuery('.sidebar');
var $sidebarFooter = jQuery('.sidebar .sidebar-footer');
var $mainContent = jQuery('.main-content');
var $pageContent = jQuery('.page-content');
var $topbar = jQuery('.topbar');
var $logopanel = jQuery('.logopanel');
var $sidebarWidth = jQuery(".sidebar").width();
var content = document.querySelector('.page-content');
var is_RTL = false;
var $loader = jQuery('#preloader');
var docHeight = jQuery(document).height();
var windowHeight = jQuery(window).height();
var topbarWidth = jQuery('.topbar').width();
var headerLeftWidth = jQuery('.header-left').width();
var headerRightWidth = jQuery('.header-right').width();
var start = delta = end = 0;
jQuery(window).load(function() {
    "use strict";
    setTimeout(function() {
        jQuery('.loader-overlay').addClass('loaded');
        jQuery('body > section').animate({
            opacity: 1
        }, 400);
    }, 500);
});

/* ==========================================================*/
/* APPLICATION SCRIPTS                                       */
/* ========================================================= */
if (jQuery('body').hasClass('rtl')) {
    is_RTL = true;
}
/**** Automatic Language Translation ****/
function switchLanguage() {

    if(jQuery('body').hasClass('builder-admin') || jQuery('body').hasClass('builder-page')) return;
    if(!$.fn.jqTranslate) return;
    // $.removeCookie('app-language');
    // $.removeCookie('app-language', { path: '/'});
    var userLang = navigator.language || navigator.userLanguage;
    var language = 'en';
    if(userLang == 'fr') language = 'fr';
    if(userLang == 'es') language = 'es';
    jQuery('#language-header').on('click', 'ul a', function(e) {
        e.preventDefault();
        language = jQuery(this).data('lang');
        if(jQuery('body').hasClass('builder-admin') || jQuery('.page-content').hasClass('page-builder') || jQuery('.page-content').hasClass('email-builder') || jQuery('.page-content').hasClass('frontend-builder')) {
            jQuery("[data-translate]").jqTranslate('../../admin/assets/plugins/translate/application', {
                forceLang: language
            });
        }
        else{
            jQuery("[data-translate]").jqTranslate('assets/plugins/translate/application', {
                forceLang: language
            });
        }

        $.cookie('app-language', language);
        $.cookie('app-language', language, { path: '/' });
    });
    /* If user has selected a language, we apply it */
    if ($.cookie('app-language')) {
        var language = $.cookie('app-language');

    }
    if(jQuery('body').hasClass('builder-admin') || jQuery('.page-content').hasClass('page-builder') || jQuery('.page-content').hasClass('email-builder')  || jQuery('.page-content').hasClass('frontend-builder')) {
        jQuery("[data-translate]").jqTranslate('../../admin/assets/plugins/translate/application', {
            forceLang: language
        });
    }
    else{

        jQuery("[data-translate]").jqTranslate('assets/plugins/translate/application', {
            forceLang: language
        });
    }

}

/* ==========================================================*/
/* LAYOUTS API                                                */
/* ========================================================= */
/* Create RTL: Sidebar on Right Side */
function enableRTL() {
    jQuery('#switch-rtl').prop('checked', true);
    jQuery('body').removeClass('rtl').addClass('rtl');
    jQuery('html').removeClass('rtl').addClass('rtl');
    jQuery('.sidebar').css('width', '');
    jQuery('.sidebar .searchform input').css('width', '');
    jQuery('.sidebar .sidebar-footer').css('width', '');
    jQuery('.logopanel').css('width', '');
    jQuery('.searchform input').css('width', '');
    jQuery('.sidebar .sidebar-footer .pull-left').css('');
    jQuery('.main-content').css('margin-left', '');
    jQuery('.topbar').css('left', '');
    if (jQuery('body').hasClass('sidebar-hover')) sidebarHover();
    jQuery('#switch-rtl').prop('checked', true);
    handleboxedLayout();
    $.cookie('rtl', 1);
    $.cookie('rtl', 1, {
        path: '/'
    });
}

/* Remove RTL: Sidebar on Left Side */
function disableRTL() {
    jQuery('#switch-rtl').prop('checked', false);
    jQuery('html').removeClass('rtl');
    jQuery('body').removeClass('rtl');
    jQuery('.sidebar').css('width', '');
    jQuery('.sidebar').css('left', '');
    jQuery('.sidebar .searchform input').css('width', '');
    jQuery('.sidebar .sidebar-footer').css('width', '');
    jQuery('.logopanel').css('width', '');
    jQuery('.searchform input').css('width', '');
    jQuery('.sidebar .sidebar-footer .pull-left').css('');
    jQuery('.main-content').css('margin-right', '');
    jQuery('.topbar').css('right', '');
    if (jQuery('body').hasClass('sidebar-hover')) sidebarHover();
    handleboxedLayout();
    $.removeCookie('rtl');
    $.removeCookie('rtl', {
        path: '/'
    });
}

/* Toggle RTL */
function toggleRTL() {
    if (jQuery('html').hasClass('rtl')) disableRTL();
    else enableRTL();
}

/* Create Sidebar Fixed */
function handleSidebarFixed() {
    // removeSidebarHover();
    jQuery('#switch-sidebar').prop('checked', true);
    jQuery('#switch-submenu').prop('checked', false);
    $.removeCookie('submenu-hover');
    if (jQuery('body').hasClass('sidebar-top')) {
        jQuery('body').removeClass('fixed-topbar').addClass('fixed-topbar');
        $.removeCookie('fluid-topbar');
        jQuery('#switch-topbar').prop('checked', true);
    }
    jQuery('body').removeClass('fixed-sidebar').addClass('fixed-sidebar');
    jQuery('.sidebar').height('');
    handleboxedLayout();
    if (!jQuery('body').hasClass('sidebar-collapsed')) removeSubmenuHover();
    createSideScroll();
    $.removeCookie('fluid-sidebar');
    $.removeCookie('fluid-sidebar', { path: '/'});
    $.cookie('fixed-sidebar', 1);
    $.cookie('fixed-sidebar', 1, {
        path: '/'
    });
}

/* Create Sidebar Fluid / Remove Sidebar Fixed */
function handleSidebarFluid() {
    jQuery('#switch-sidebar').prop('checked', false);
    if (jQuery('body').hasClass('sidebar-hover')) {
        removeSidebarHover();
        jQuery('#switch-sidebar-hover').prop('checked', false);
    }
    jQuery('body').removeClass('fixed-sidebar');
    handleboxedLayout();
    destroySideScroll();
    $.removeCookie('fixed-sidebar');
    $.removeCookie('fixed-sidebar', {
        path: '/'
    });
    $.cookie('fluid-sidebar', 1);
    $.cookie('fluid-sidebar', 1);
    $.cookie('fluid-sidebar', 1, {
        path: '/'
    });
    $.cookie('fluid-sidebar', 1, {
        path: '/'
    });
}

/* Toggle Sidebar Fixed / Fluid */
function toggleSidebar() {
    if (jQuery('body').hasClass('fixed-sidebar')) handleSidebarFluid();
    else handleSidebarFixed();
}

/* Create Sidebar on Top */
function createSidebarTop() {
    jQuery('#switch-sidebar-top').prop('checked', true);
    removeSidebarHover();
    jQuery('body').removeClass('sidebar-collapsed');
    $.removeCookie('sidebar-collapsed');
    jQuery('body').removeClass('sidebar-top').addClass('sidebar-top');
    jQuery('.main-content').css('margin-left', '').css('margin-right', '');
    jQuery('.topbar').css('left', '').css('right', '');
    if (jQuery('body').hasClass('fixed-sidebar') && !jQuery('body').hasClass('fixed-topbar')) {
        jQuery('body').removeClass('fixed-topbar').addClass('fixed-topbar');
        $.removeCookie('fluid-topbar');
        $.removeCookie('fluid-topbar'), {
            path: '/'
        };
        jQuery('#switch-topbar').prop('checked', true);
    }
    jQuery('.sidebar').height('');
    destroySideScroll();
    jQuery('#switch-sidebar-hover').prop('checked', false);
    handleboxedLayout();
    $.cookie('sidebar-top', 1);
    $.cookie('sidebar-top', 1, {
        path: '/'
    });
    $.removeCookie('sidebar-hover');
    $.removeCookie('sidebar-hover', {
        path: '/'
    });
}

/* Remove Sidebar on Top */
function removeSidebarTop() {
    jQuery('#switch-sidebar-top').prop('checked', false);
    jQuery('body').removeClass('sidebar-top');
    createSideScroll();
    jQuery('#switch-sidebar-top').prop('checked', false);
    $.removeCookie('sidebar-top');
    $.removeCookie('sidebar-top', {
        path: '/'
    });
    handleboxedLayout();
}

/* Toggle Sidebar on Top */
function toggleSidebarTop() {
    if (jQuery('body').hasClass('sidebar-top')) removeSidebarTop();
    else createSidebarTop();
}

/* Create Sidebar only visible on Hover */
function createSidebarHover() {
    jQuery('body').addClass('sidebar-hover');
    jQuery('body').removeClass('fixed-sidebar').addClass('fixed-sidebar');
    jQuery('.main-content').css('margin-left', '').css('margin-right', '');
    jQuery('.topbar').css('left', '').css('right', '');
    jQuery('body').removeClass('sidebar-top');
    removeSubmenuHover();
    removeBoxedLayout();
    removeCollapsedSidebar();
    sidebarHover();
    handleSidebarFixed();
    jQuery('#switch-sidebar-hover').prop('checked', true);
    jQuery('#switch-sidebar').prop('checked', true);
    jQuery('#switch-sidebar-top').prop('checked', false);
    jQuery('#switch-boxed').prop('checked', false);
    $.removeCookie('fluid-topbar');
    $.removeCookie('sidebar-top');
    $.removeCookie('fluid-topbar', {
        path: '/'
    });
    $.removeCookie('sidebar-top', {
        path: '/'
    });
    $.cookie('sidebar-hover', 1);
    $.cookie('sidebar-hover', 1, {
        path: '/'
    });
}

/* Remove Sidebar on Hover */
function removeSidebarHover() {
    jQuery('#switch-sidebar-hover').prop('checked', false);
    jQuery('body').removeClass('sidebar-hover');
    if (!jQuery('body').hasClass('boxed')) jQuery('.sidebar, .sidebar-footer').attr('style', '');
    jQuery('.logopanel2').remove();
    $.removeCookie('sidebar-hover');
    $.removeCookie('sidebar-hover', {
        path: '/'
    });
}

/* Toggle Sidebar on Top */
function toggleSidebarHover() {
    if (jQuery('body').hasClass('sidebar-hover')) removeSidebarHover();
    else createSidebarHover();
}

/* Create Sidebar Submenu visible on Hover */
function createSubmenuHover() {
    removeSidebarHover();
    removeSidebarTop();
    handleSidebarFluid();
    jQuery('#switch-submenu-hover').prop('checked', true);
    jQuery('body').addClass('submenu-hover');
    jQuery('.nav-sidebar .children').css('display', '');
    $.cookie('submenu-hover', 1);
    $.cookie('submenu-hover', 1, {
        path: '/'
    });
    jQuery('#switch-sidebar').prop('checked', false);
}

/* Remove Submenu on Hover */
function removeSubmenuHover() {
    jQuery('#switch-submenu-hover').prop('checked', false);
    jQuery('body').removeClass('submenu-hover');
    jQuery('.nav-sidebar .nav-parent.active .children').css('display', 'block');
    $.removeCookie('submenu-hover');
    $.removeCookie('submenu-hover', {
        path: '/'
    });
}

/* Toggle Submenu on Hover */
function toggleSubmenuHover() {
    if (jQuery('body').hasClass('submenu-hover')) removeSubmenuHover();
    else createSubmenuHover();
}

/* Create Topbar Fixed */
function handleTopbarFixed() {
    jQuery('#switch-topbar').prop('checked', true);
    jQuery('body').removeClass('fixed-topbar').addClass('fixed-topbar');
    $.removeCookie('fluid-topbar');
    $.removeCookie('fluid-topbar', {
        path: '/'
    });
}

/* Create Topbar Fluid / Remove Topbar Fixed */
function handleTopbarFluid() {
    jQuery('#switch-topbar').prop('checked', false);
    jQuery('body').removeClass('fixed-topbar');
    if (jQuery('body').hasClass('sidebar-top') && jQuery('body').hasClass('fixed-sidebar')) {
        jQuery('body').removeClass('fixed-sidebar');
        jQuery('#switch-sidebar').prop('checked', false);
    }
    $.cookie('fluid-topbar', 1);
    $.cookie('fluid-topbar', 1, {
        path: '/'
    });
}

/* Toggle Topbar Fixed / Fluid */
function toggleTopbar() {
    if (jQuery('body').hasClass('fixed-topbar')) handleTopbarFluid();
    else handleTopbarFixed();
}

/* Adjust margin of content for boxed layout */
function handleboxedLayout() {
    if (jQuery('body').hasClass('builder-admin')) return;
    $logopanel.css('left', '').css('right', '');
    $topbar.css('width', '');
    $sidebar.css('margin-left', '').css('margin-right', '');
    $sidebarFooter.css('left', '').css('right', '');
    if (jQuery('body').hasClass('boxed')) {
        windowWidth = jQuery(window).width();
        windowHeight = jQuery(window).height();
        var margin = (windowWidth - 1200) / 2;
        if (!jQuery('body').hasClass('sidebar-top') && windowWidth > 1220)  {
            if (jQuery('body').hasClass('rtl')) {
                $logopanel.css('right', margin);
                if (jQuery('body').hasClass('sidebar-collapsed')) {
                    $topbar.css('width', 1200);
                }
                else {
                    if (jQuery('body').hasClass('fixed-sidebar')) {
                        $sidebar.css('margin-right', margin);
                        topbarWidth = (1200 - $sidebarWidth);
                        jQuery('.topbar').css('width', topbarWidth);
                    }
                    $sidebarFooter.css('right', margin);
                    $topbar.css('width', 960);
                }
            }
            else {
                $logopanel.css('left', margin);
                if (jQuery('body').hasClass('sidebar-collapsed')) {
                    $topbar.css('width', 1200);
                }
                else {
                    if (jQuery('body').hasClass('fixed-sidebar')) {
                        $sidebar.css('margin-left', margin);
                        topbarWidth = (1200 - $sidebarWidth);
                        jQuery('.topbar').css('width', topbarWidth);
                    }
                    $sidebarFooter.css('left', margin);
                    $topbar.css('width', 960);
                }
            }
            $.backstretch(
                ["/banks/assets/images/gallery/bg1.jpg", "/banks/assets/images/gallery/bg4.jpg"],
                {fade: 3000,
                duration: 4000
            });
        }
        else{
            jQuery('.backstretch').remove();
        }

    }
}

/* Create Boxed Layout */
function createBoxedLayout() {
    removeSidebarHover();
    jQuery('body').addClass('boxed');
    handleboxedLayout();
    jQuery('#switch-boxed').prop('checked', true);
    $.cookie('boxed-layout', 1);
    $.cookie('boxed-layout', 1, {
        path: '/'
    });
}

/* Remove boxed layout */
function removeBoxedLayout() {
    if (jQuery('body').hasClass('boxed')) {
        jQuery('body').removeClass('boxed');
        $logopanel.css('left', '').css('right', '');
        $topbar.css('width', '');
        $sidebar.css('margin-left', '').css('margin-right', '');
        $sidebarFooter.css('left', '').css('right', '');
        $.removeCookie('boxed-layout');
        $.removeCookie('boxed-layout', {
            path: '/'
        });
        jQuery('#switch-boxed').prop('checked', false);
        $.backstretch("destroy");
    }
}

function toggleboxedLayout() {
        if (jQuery('body').hasClass('boxed')) removeBoxedLayout();
        else createBoxedLayout();
    }
    /* Toggle Sidebar Collapsed */
function collapsedSidebar() {
    if ($body.css('position') != 'relative') {
        if (!$body.hasClass('sidebar-collapsed')) createCollapsedSidebar();
        else removeCollapsedSidebar();
    } else {
        if ($body.hasClass('sidebar-show')) $body.removeClass('sidebar-show');
        else $body.addClass('sidebar-show');
    }
    handleboxedLayout();
}

function createCollapsedSidebar() {
    $body.addClass('sidebar-collapsed');
    jQuery('.sidebar').css('width', '').resizable().resizable('destroy');
    jQuery('.nav-sidebar ul').attr('style', '');
    jQuery(this).addClass('menu-collapsed');
    destroySideScroll();
    jQuery('#switch-sidebar').prop('checked');
    $.cookie('sidebar-collapsed', 1);
    $.cookie('sidebar-collapsed', 1, {
        path: '/'
    });
}

function removeCollapsedSidebar() {
    $body.removeClass('sidebar-collapsed');
    if (!$body.hasClass('submenu-hover')) jQuery('.nav-sidebar li.active ul').css({
        display: 'block'
    });
    jQuery(this).removeClass('menu-collapsed');
    if ($body.hasClass('sidebar-light') && !$body.hasClass('sidebar-fixed')) {
        jQuery('.sidebar').height('');
    }
    createSideScroll();
    $.removeCookie('sidebar-collapsed');
    $.removeCookie('sidebar-collapsed', {
        path: '/'
    });
}
jQuery('[data-toggle]').on('click', function(event) {
    event.preventDefault();
    var toggleLayout = jQuery(this).data('toggle');
    if (toggleLayout == 'rtl') toggleRTL();
    if (toggleLayout == 'sidebar-behaviour') toggleSidebar();
    if (toggleLayout == 'submenu') toggleSubmenuHover();
    if (toggleLayout == 'sidebar-collapsed') collapsedSidebar();
    if (toggleLayout == 'sidebar-top') toggleSidebarTop();
    if (toggleLayout == 'sidebar-hover') toggleSidebarHover();
    if (toggleLayout == 'boxed') toggleboxedLayout();
    if (toggleLayout == 'topbar') toggleTopbar();
});

/* Reset to Default Style, remove all cookie and custom layouts */

function resetStyle() {
    removeBoxedLayout();
    jQuery('body').removeAttr('class');
    jQuery('body').addClass('fixed-topbar color-default fixed-sidebar theme-sdtl bg-clean');
    jQuery('.switch-input').removeAttr('checked');
    jQuery('.switch-input:first, #switch-topbar').attr('checked','checked');
    jQuery('.bg-color').removeClass('active');
    jQuery('.bg-color:first').addClass('active');
    jQuery('.theme-color').removeClass('active');
    jQuery('.theme-color:first').addClass('active');
}


/******************** END LAYOUT API  ************************/
/* ========================================================= */
/****  Full Screen Toggle  ****/
function toggleFullScreen() {
    if (!doc.fullscreenElement && !doc.msFullscreenElement && !doc.webkitIsFullScreen && !doc.mozFullScreenElement) {
        if (docEl.requestFullscreen) {
            docEl.requestFullscreen();
        } else if (docEl.webkitRequestFullScreen) {
            docEl.webkitRequestFullscreen();
        } else if (docEl.webkitRequestFullScreen) {
            docEl.webkitRequestFullScreen();
        } else if (docEl.msRequestFullscreen) {
            docEl.msRequestFullscreen();
        } else if (docEl.mozRequestFullScreen) {
            docEl.mozRequestFullScreen();
        }
    } else {
        if (doc.exitFullscreen) {
            doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
            doc.webkitExitFullscreen();
        } else if (doc.webkitCancelFullScreen) {
            doc.webkitCancelFullScreen();
        } else if (doc.msExitFullscreen) {
            doc.msExitFullscreen();
        } else if (doc.mozCancelFullScreen) {
            doc.mozCancelFullScreen();
        }
    }
}
jQuery('.toggle_fullscreen').click(function() {
    toggleFullScreen();
});

/* Simulate Ajax call on Panel with reload effect */
function blockUI(item) {
    jQuery(item).block({
        message: '<svg class="circular"><circle class="path" cx="40" cy="40" r="10" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg>',
        css: {
            border: 'none',
            width: '14px',
            backgroundColor: 'none'
        },
        overlayCSS: {
            backgroundColor: '#fff',
            opacity: 0.6,
            cursor: 'wait'
        }
    });
}

function unblockUI(item) {
    jQuery(item).unblock();
}

/**** PANEL ACTIONS ****/
function handlePanelAction() {
    /* Create Portlets Controls automatically: reload, fullscreen, toggle, remove, popout */
    function handlePanelControls() {
        jQuery('.panel-controls').each(function() {
            var controls_html = '<div class="control-btn">' + '<a href="#" class="panel-reload hidden"><i class="icon-reload"></i></a>' + '<a class="hidden" id="dropdownMenu1" data-toggle="dropdown">' + '<i class="icon-settings"></i>' + '</a>' + '<ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dropdownMenu1">' + '<li><a href="#">Action</a>' + '</li>' + '<li><a href="#">Another action</a>' + '</li>' + '<li><a href="#">Something else here</a>' + '</li>' + '</ul>' + '<a href="#" class="panel-popout hidden tt" title="Pop Out/In"><i class="icons-office-58"></i></a>' + '<a href="#" class="panel-maximize hidden"><i class="icon-size-fullscreen"></i></a>' + '<a href="#" class="panel-toggle"><i class="fas fa-angle-down"></i></a>' + '<a href="#" class="panel-close"><i class="icon-trash"></i></a>' + '</div>';
            jQuery(this).append(controls_html);
        });
    }
    handlePanelControls();
    // Remove Panel
    jQuery(".panel-header .panel-close").on("click", function(event) {
        event.preventDefault();
        $item = jQuery(this).parents(".panel:first");
        bootbox.confirm("Are you sure to remove this panel?", function(result) {
            if (result === true) {
                $item.addClass("animated bounceOutRight");
                window.setTimeout(function() {
                    $item.remove();
                }, 300);
            }
        });
    });
    // Toggle Panel Content
    jQuery(document).on("click", ".panel-header .panel-toggle", function(event) {
        event.preventDefault();
        jQuery(this).toggleClass("closed").parents(".panel:first").find(".panel-content").slideToggle();
    });
    // Popout / Popin Panel
    jQuery(document).on("click", ".panel-header .panel-popout", function(event) {
        event.preventDefault();
        var panel = jQuery(this).parents(".panel:first");
        if (panel.hasClass("modal-panel")) {
            jQuery("i", this).removeClass("icons-office-55").addClass("icons-office-58");
            panel.removeAttr("style").removeClass("modal-panel");
            panel.find(".panel-maximize,.panel-toggle").removeClass("nevershow");
            panel.draggable("destroy").resizable("destroy");
        } else {
            panel.removeClass("maximized");
            panel.find(".panel-maximize,.panel-toggle").addClass("nevershow");
            jQuery("i", this).removeClass("icons-office-58").addClass("icons-office-55");
            var w = panel.width();
            var h = panel.height();
            panel.addClass("modal-panel").removeAttr("style").width(w).height(h);
            jQuery(panel).draggable({
                handle: ".panel-header",
                containment: ".page-content"
            }).css({
                "left": panel.position().left - 10,
                "top": panel.position().top + 2
            }).resizable({
                minHeight: 150,
                minWidth: 200
            });
        }
        window.setTimeout(function() {
            jQuery("body").trigger("resize");
        }, 300);
    });
    // Reload Panel Content
    jQuery(document).on("click", '.panel-header .panel-reload', function(event) {
        event.preventDefault();
        var el = jQuery(this).parents(".panel:first");
        blockUI(el);
        window.setTimeout(function() {
            unblockUI(el);
        }, 1800);
    });
    // Maximize Panel Dimension
    jQuery(document).on("click", ".panel-header .panel-maximize", function(event) {
        event.preventDefault();
        var panel = jQuery(this).parents(".panel:first");
        $body.toggleClass("maximized-panel");
        panel.removeAttr("style").toggleClass("maximized");
        maximizePanel();
        if (panel.hasClass("maximized")) {
            panel.parents(".portlets:first").sortable("destroy");
            jQuery(window).trigger('resize');
        }
        else {
            jQuery(window).trigger('resize');
            panel.parent().height('');
            sortablePortlets();
        }
        jQuery("i", this).toggleClass("icon-size-fullscreen").toggleClass("icon-size-actual");
        panel.find(".panel-toggle").toggleClass("nevershow");
        jQuery("body").trigger("resize");
        return false;
    });
}

function maximizePanel(){
    if(jQuery('.maximized').length){
        var panel = jQuery('.maximized');
        var windowHeight = jQuery(window).height() - 2;
        panelHeight = panel.find('.panel-header').height() + panel.find('.panel-content').height() + 100;
        if(panel.hasClass('maximized')){
            if(windowHeight > panelHeight) panel.parent().height(windowHeight);
            else{
                if(jQuery('.main-content').height() > panelHeight) {
                    panel.parent().height(jQuery('.main-content').height());
                }
                else{
                    panel.parent().height(panelHeight);
                }
            }
        }
        else {
            panel.parent().height('');
        }
    }
}


/****  Custom Scrollbar  ****/
/* Create Custom Scroll for elements like Portlets or Dropdown menu */
function customScroll() {
    if ($.fn.mCustomScrollbar) {
        jQuery('.withScroll').each(function() {
            jQuery(this).mCustomScrollbar("destroy");
            var scroll_height = jQuery(this).data('height') ? jQuery(this).data('height') : 'auto';
            var data_padding = jQuery(this).data('padding') ? jQuery(this).data('padding') : 0;
            if (jQuery(this).data('height') == 'window') {
                thisHeight = jQuery(this).height();
                windowHeight = jQuery(window).height() - data_padding - 50;
                if (thisHeight < windowHeight) scroll_height = thisHeight;
                else scroll_height = windowHeight;
            }
            jQuery(this).mCustomScrollbar({
                scrollButtons: {
                    enable: false
                },
                autoHideScrollbar: jQuery(this).hasClass('show-scroll') ? false : true,
                scrollInertia: 150,
                theme: "light",
                set_height: scroll_height,
                advanced: {
                    updateOnContentResize: true
                }
            });
        });
    }
}

/* ==========================================================*/
/* BEGIN SIDEBAR                                             */
/* Sidebar Sortable menu & submenu */
function handleSidebarSortable() {
    jQuery('.menu-settings').on('click', '#reorder-menu', function(e) {
        e.preventDefault();
        jQuery('.nav-sidebar').removeClass('remove-menu');
        jQuery(".nav-sidebar").sortable({
            connectWith: ".nav-sidebar > li",
            handle: "a",
            placeholder: "nav-sidebar-placeholder",
            opacity: 0.5,
            axis: "y",
            dropOnEmpty: true,
            forcePlaceholderSize: true,
            receive: function(event, ui) {
                jQuery("body").trigger("resize")
            }
        });
        /* Sortable children */
        jQuery(".nav-sidebar .children").sortable({
            connectWith: "li",
            handle: "a",
            opacity: 0.5,
            dropOnEmpty: true,
            forcePlaceholderSize: true,
            receive: function(event, ui) {
                jQuery("body").trigger("resize")
            }
        });
        jQuery(this).attr("id", "end-reorder-menu");
        jQuery(this).html('End reorder menu');
        jQuery('.remove-menu').attr("id", "remove-menu").html('Remove menu');
    });
    /* End Sortable Menu Elements*/
    jQuery('.menu-settings').on('click', '#end-reorder-menu', function(e) {
        e.preventDefault();
        jQuery(".nav-sidebar").sortable();
        jQuery(".nav-sidebar").sortable("destroy");
        jQuery(".nav-sidebar .children").sortable().sortable("destroy");
        jQuery(this).attr("id", "remove-menu").html('Reorder menu');
    });
}

/* Sidebar Remove Menu Elements*/
function handleSidebarRemove() {
    /* Remove Menu Elements*/
    jQuery('.menu-settings').on('click', '#remove-menu', function(e) {
        e.preventDefault();
        jQuery(".nav-sidebar").sortable();
        jQuery(".nav-sidebar").sortable("destroy");
        jQuery(".nav-sidebar .children").sortable().sortable("destroy");
        jQuery('.nav-sidebar').removeClass('remove-menu').addClass('remove-menu');
        jQuery(this).attr("id", "end-remove-menu").html('End remove menu');
        jQuery('.reorder-menu').attr("id", "reorder-menu").html('Reorder menu');
    });
    /* End Remove Menu Elements*/
    jQuery('.menu-settings').on('click', '#end-remove-menu', function(e) {
        e.preventDefault();
        jQuery('.nav-sidebar').removeClass('remove-menu');
        jQuery(this).attr("id", "remove-menu").html('Remove menu');
    });
    jQuery('.sidebar').on('click', '.remove-menu > li', function() {
        $menu = jQuery(this);
        if (jQuery(this).hasClass('nav-parent')) $remove_txt = "Are you sure to remove this menu (all submenus will be deleted too)?";
        else $remove_txt = "Are you sure to remove this menu?";
        bootbox.confirm($remove_txt, function(result) {
            if (result === true) {
                $menu.addClass("animated bounceOutLeft");
                window.setTimeout(function() {
                    $menu.remove();
                }, 300);
            }
        });
    });
}

/* Hide User & Search Sidebar */
function handleSidebarHide() {
    hiddenElements = jQuery(':hidden');
    visibleElements = jQuery(':visible');
    jQuery('.menu-settings').on('click', '#hide-top-sidebar', function(e) {
        e.preventDefault();
        var this_text = jQuery(this).text();
        jQuery('.sidebar .sidebar-top').slideToggle(300);
        if (this_text == 'Hide user & search') {
            jQuery(this).text('Show user & search');
        }
    });
    jQuery('.topbar').on('click', '.toggle-sidebar-top', function(e) {
        e.preventDefault();
        jQuery('.sidebar .sidebar-top').slideToggle(300);
        if (jQuery('.toggle-sidebar-top span').hasClass('icon-user-following')) {
            jQuery('.toggle-sidebar-top span').removeClass('icon-user-following').addClass('icon-user-unfollow');
        }
        else {
            jQuery('.toggle-sidebar-top span').removeClass('icon-user-unfollow').addClass('icon-user-following');
        }
    });
}

/* Change statut of user in sidebar: available, busy, away, invisible */
function changeUserStatut() {
    jQuery('.sidebar').on('click', '.user-login li a', function(e) {
        e.preventDefault();
        var statut = jQuery(this).find('span').text();
        currentStatut = jQuery('.user-login button span').text();
        jQuery('.user-login button span').text(statut);
        if (statut == 'Busy') {
            jQuery('.user-login button i:not(.fa)').removeClass().addClass('busy');
        }
        if (statut == 'Invisible') {
            jQuery('.user-login button i:not(.fa)').removeClass().addClass('turquoise');
        }
        if (statut == 'Away') {
            jQuery('.user-login button i:not(.fa)').removeClass().addClass('away');
        }
    });
}

/* Create custom scroll for sidebar used for fixed sidebar */
function createSideScroll() {
    if ($.fn.mCustomScrollbar) {
        destroySideScroll();
        if (!jQuery('body').hasClass('sidebar-collapsed') && !jQuery('body').hasClass('sidebar-collapsed') && !jQuery('body').hasClass('submenu-hover') && jQuery('body').hasClass('fixed-sidebar')) {
            jQuery('.sidebar-inner').mCustomScrollbar({
                scrollButtons: {
                    enable: false
                },
                autoHideScrollbar: true,
                scrollInertia: 150,
                theme: "light-thin",
                alwaysShowScrollbar: 1,
                advanced: {
                    updateOnContentResize: true
                }
            });
        }
        if (jQuery('body').hasClass('sidebar-top')) {
            destroySideScroll();
        }
    }
}

/* Destroy sidebar custom scroll */
function destroySideScroll() {
    jQuery('.sidebar-inner').mCustomScrollbar("destroy");
}

/* Toggle submenu open */
function toggleSidebarMenu() {
    // Check if sidebar is collapsed
    if (jQuery('body').hasClass('sidebar-collapsed') || jQuery('body').hasClass('sidebar-top') || jQuery('body').hasClass('submenu-hover')) jQuery('.nav-sidebar .children').css({
        display: ''
    });
    else jQuery('.nav-active.active .children').css('display', 'block');
    jQuery('.sidebar').on('click', '.nav-sidebar li.nav-parent > a', function(e) {
        e.preventDefault();
        if (jQuery('body').hasClass('sidebar-collapsed') && !jQuery('body').hasClass('sidebar-hover')) return;
        if (jQuery('body').hasClass('submenu-hover')) return;
        var parent = jQuery(this).parent().parent();
        parent.children('li.active').children('.children').slideUp(200);
        jQuery('.nav-sidebar .arrow').removeClass('active').css({"transform":"rotate(0deg)",  "-moz-transform":"rotate(0deg)","-ms-transform":"rotate(0deg)","-o-transform":"rotate(0deg)", "-webkit-transform":"rotate(0deg)"});
        parent.children('li.active').removeClass('active');
        var sub = jQuery(this).next();
        if (sub.is(":visible")) {
            sub.children().addClass('hidden-item')
            jQuery(this).parent().removeClass("active");
            sub.slideUp(200, function() {
                sub.children().removeClass('hidden-item')
            });
        } else {
            jQuery(this).find('.arrow').addClass('active').css({"transform":"rotate(90deg)",  "-moz-transform":"rotate(90deg)","-ms-transform":"rotate(90deg)","-o-transform":"rotate(90deg)", "-webkit-transform":"rotate(90deg)"});
            sub.children().addClass('is-hidden');
            setTimeout(function() {
                sub.children().addClass('is-shown');
            }, 0);
            sub.slideDown(200, function() {
                jQuery(this).parent().addClass("active");
                setTimeout(function() {
                    sub.children().removeClass('is-hidden').removeClass('is-shown');
                }, 500);
            });
        }
    });
}

/**** Handle Sidebar Widgets ****/
function sidebarWidgets() {
    /* Folders Widget */
    if (jQuery('.sidebar-widgets .folders').length) {
        jQuery('.new-folder').on('click', function() {
            jQuery('.sidebar-widgets .add-folder').show();
            return false;
        });
        jQuery(".add-folder input").keypress(function(e) {
            if (e.which == 13) {
                jQuery('.sidebar-widgets .add-folder').hide();
                jQuery('<li><a href="#"><i class="icon-docs c-blue"></i>' + jQuery(this).val() + '</a> </li>').insertBefore(".add-folder");
                jQuery(this).val('');
            }
        });
        content.addEventListener('click', function(ev) {
            addFolder = document.getElementById('add-folder');
            var target = ev.target;
            if (target !== addFolder) {
                jQuery('.sidebar-widgets .add-folder').hide();
            }
        });
    }
    /* Labels Widget */
    if (jQuery('.sidebar-widgets .folders').length) {
        jQuery('.new-label').on('click', function() {
            jQuery('.sidebar-widgets .add-label').show();
            return false;
        });
        jQuery(".add-label input").keypress(function(e) {
            if (e.which == 13) {
                jQuery('.sidebar-widgets .add-label').hide();
                jQuery('<li><a href="#"><i class="far fa-circle c-blue"></i>' + jQuery(this).val() + '</a> </li>').insertBefore(".add-label");
                jQuery(this).val('');
            }
        });
        content.addEventListener('click', function(ev) {
            addFolder = document.getElementById('add-label');
            var target = ev.target;
            if (target !== addFolder) {
                jQuery('.sidebar-widgets .add-label').hide();
            }
        });
    }
    /* Sparkline  Widget */
    if ($.fn.sparkline && jQuery('.dynamicbar1').length) {
        var myvalues1 = [13, 14, 16, 15, 11, 14, 20, 14, 12, 16, 11, 17, 19, 16];
        var myvalues2 = [14, 17, 16, 12, 18, 16, 22, 15, 14, 17, 11, 18, 11, 12];
        var myvalues3 = [18, 14, 15, 14, 15, 12, 21, 16, 18, 14, 12, 15, 17, 19];
        var sparkline1 = jQuery('.dynamicbar1').sparkline(myvalues1, {
            type: 'bar',
            barColor: '#319DB5',
            barWidth: 4,
            barSpacing: 1,
            height: '28px'
        });
        var sparkline2 = jQuery('.dynamicbar2').sparkline(myvalues2, {
            type: 'bar',
            barColor: '#C75757',
            barWidth: 4,
            barSpacing: 1,
            height: '28px'
        });
        var sparkline3 = jQuery('.dynamicbar3').sparkline(myvalues3, {
            type: 'bar',
            barColor: '#18A689',
            barWidth: 4,
            barSpacing: 1,
            height: '28px'
        });
    };
    /* Progress Bar  Widget */
    if (jQuery('.sidebar-widgets .progress-chart').length) {
        jQuery(window).load(function() {
            setTimeout(function() {
                jQuery('.sidebar-widgets .progress-chart .stat1').progressbar();
            }, 900);
            setTimeout(function() {
                jQuery('.sidebar-widgets .progress-chart .stat2').progressbar();
            }, 1200);
            setTimeout(function() {
                jQuery('.sidebar-widgets .progress-chart .stat3').progressbar();
            }, 1500);
        });
    };
    jQuery('.sidebar').on('click', '.hide-widget', function(e) {
        e.preventDefault();
        if (start == 0) {
            start = new Date().getTime();
            jQuery(this).toggleClass('widget-hidden');
            var this_widget = jQuery(this).parent().parent().next();
            this_widget.slideToggle(200, function() {
                createSideScroll();
            });
            end = new Date().getTime();
            delta = end - start;
        }
        else {
            end = new Date().getTime();
            delta = end - start;
            if (delta > 200) {
                start = new Date().getTime();
                jQuery(this).toggleClass('widget-hidden');
                var this_widget = jQuery(this).parent().parent().next();
                this_widget.slideToggle(200, function() {
                    createSideScroll();
                });
                end = new Date().getTime();
                delta = end - start;
            }
        }
    });
}

// Add class everytime a mouse pointer hover over it
var hoverTimeout;
jQuery('.nav-sidebar > li').hover(function() {
    clearTimeout(hoverTimeout);
    jQuery(this).siblings().removeClass('nav-hover');
    jQuery(this).addClass('nav-hover');
}, function() {
    var $self = jQuery(this);
    hoverTimeout = setTimeout(function() {
        $self.removeClass('nav-hover');
    }, 200);
});
jQuery('.nav-sidebar > li .children').hover(function() {
    clearTimeout(hoverTimeout);
    jQuery(this).closest('.nav-parent').siblings().removeClass('nav-hover');
    jQuery(this).closest('.nav-parent').addClass('nav-hover');
}, function() {
    var $self = jQuery(this);
    hoverTimeout = setTimeout(function() {
        jQuery(this).closest('.nav-parent').removeClass('nav-hover');
    }, 200);
});
/* END SIDEBAR                                               */
/* ========================================================= */
/* Switch Top navigation to Sidebar */
function reposition_topnav() {
    if (jQuery('.nav-horizontal').length > 0) {
        topbarWidth = jQuery('.topbar').width();
        headerRightWidth = jQuery('.header-right').width();
        if (jQuery('.header-left .nav-horizontal').length) headerLeftWidth = jQuery('.header-left').width() + 40;
        else headerLeftWidth = jQuery('.nav-sidebar.nav-horizontal > li').length * 140;
        var topbarSpace = topbarWidth - headerLeftWidth - headerRightWidth;
        // top navigation move to left nav if not enough space in topbar
        if (jQuery('.nav-horizontal').css('position') == 'relative' || topbarSpace < 0) {
            if (jQuery('.sidebar .nav-sidebar').length == 2) {
                jQuery('.nav-horizontal').insertAfter('.nav-sidebar:eq(1)');
            } else {
                // only add to bottom if .nav-horizontal is not yet in the left panel
                if (jQuery('.sidebar .nav-horizontal').length == 0) {
                    jQuery('.nav-horizontal').appendTo('.sidebar-inner');
                    jQuery('.sidebar-widgets').css('margin-bottom', 20);
                }
            }
            jQuery('.nav-horizontal').css({
                display: 'block'
            }).addClass('nav-sidebar').css('margin-bottom', 100);
            createSideScroll();
            jQuery('.nav-horizontal .children').removeClass('dropdown-menu');
            jQuery('.nav-horizontal > li').each(function() {
                jQuery(this).removeClass('open');
                jQuery(this).find('a').removeAttr('class');
                jQuery(this).find('a').removeAttr('data-toggle');
            });
            /* We hide mega menu in sidebar since video / images are too big and not adapted to sidebar */
            if (jQuery('.nav-horizontal').hasClass('mmenu')) jQuery('.nav-horizontal.mmenu').css('height', 0).css('overflow', 'hidden');
        } else {
            if (jQuery('.sidebar .nav-horizontal').length > 0) {
                jQuery('.sidebar-widgets').css('margin-bottom', 100);
                jQuery('.nav-horizontal').removeClass('nav-sidebar').appendTo('.topnav');
                jQuery('.nav-horizontal .children').addClass('dropdown-menu').removeAttr('style');
                jQuery('.nav-horizontal li:last-child').show();
                jQuery('.nav-horizontal > li > a').each(function() {
                    jQuery(this).parent().removeClass('active');
                    if (jQuery(this).parent().find('.dropdown-menu').length > 0) {
                        jQuery(this).attr('class', 'dropdown-toggle');
                        jQuery(this).attr('data-toggle', 'dropdown');
                    }
                });
            }
            /* If mega menu, we make it visible */
            if (jQuery('.nav-horizontal').hasClass('mmenu')) jQuery('.nav-horizontal.mmenu').css('height', '').css('overflow', '');
        }
    }
}

// Check if sidebar is collapsed
if (jQuery('body').hasClass('sidebar-collapsed')) jQuery('.nav-sidebar .children').css({
    display: ''
});
// Handles form inside of dropdown
jQuery('.dropdown-menu').find('form').click(function(e) {
    e.stopPropagation();
});
/***** Scroll to top button *****/
function scrollTop() {
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > 100) {
            jQuery('.scrollup').fadeIn();
        } else {
            jQuery('.scrollup').fadeOut();
        }
    });
    jQuery('.scrollup').click(function() {
        jQuery("html, body").animate({
            scrollTop: 0
        }, 1000);
        return false;
    });
}

function sidebarBehaviour() {
    windowWidth = jQuery(window).width();
    windowHeight = jQuery(window).height() - jQuery('.topbar').height();
    sidebarMenuHeight = jQuery('.nav-sidebar').height();
    if (windowWidth < 1024) {
        jQuery('body').removeClass('sidebar-collapsed');
    }
    if (jQuery('body').hasClass('sidebar-collapsed') && sidebarMenuHeight > windowHeight) {
        jQuery('body').removeClass('fixed-sidebar');
        destroySideScroll();
    }
}

/* Function for datables filter in head */
function stopPropagation(evt) {
    if (evt.stopPropagation !== undefined) {
        evt.stopPropagation();
    } else {
        evt.cancelBubble = true;
    }
}

function detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');
    var edge = ua.indexOf('Edge/');
    if (msie > 0 || trident > 0 || edge > 0) {
        jQuery('html').addClass('ie-browser');
    }
}

/****  Initiation of Main Functions  ****/
jQuery(document).ready(function() {
    switchLanguage();
    createSideScroll();
    toggleSidebarMenu();
    customScroll();
    handleSidebarSortable();
    sidebarWidgets();
    reposition_topnav();
    handleSidebarRemove();
    handleSidebarHide();
    changeUserStatut();
    handlePanelAction();
    scrollTop();
    sidebarBehaviour();
    detectIE();
    setTimeout(function() {
        handleboxedLayout();
    }, 100);

    if (jQuery('body').hasClass('sidebar-hover')){ sidebarHover();}


    /* Background Color */
    jQuery('.bg-color').on('click', function (e) {
        e.preventDefault();
        var bg_color = jQuery(this).data('color');
        var bg_name = jQuery(this).attr('data-bg');
        jQuery('body').removeClass(function (index, css) {
            return (css.match(/(^|\s)bg-\S+/g) || []).join(' ');
        });
        jQuery('body').addClass('bg-' + bg_name);
        jQuery('.bg-color').removeClass('active');
        jQuery(this).addClass('active');
        jQuery.cookie('bg-color', bg_color);
        jQuery.cookie('bg-name', bg_name);
        jQuery.cookie('bg-color', bg_color, {path: '/'});
        jQuery.cookie('bg-name', bg_name, {path: '/'});
    });

    jQuery('.theme-color').on('click', function (e) {
        e.preventDefault();
        var main_color = jQuery(this).data('color');
        var main_name = jQuery(this).attr('data-main');
        jQuery('body').removeClass(function (index, css) {
            return (css.match(/(^|\s)color-\S+/g) || []).join(' ');
        });
        jQuery('body').addClass('color-' + main_name);
        jQuery('.theme-color').removeClass('active');
        jQuery(this).addClass('active');
        if (jQuery(this).data('main') == 'default') {
            jQuery('.theme-left').css('background-color', '#202226');
            jQuery('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#393E44');
            jQuery('.theme-sidebar-light, .theme-right-light').css('background-color', '#fff');
            jQuery('.sltl .theme-left').css('background-color', '#fff');
        }
        if (jQuery(this).data('main') == 'primary') {
            jQuery('.theme-left').css('background-color', '#319DB5');
            jQuery('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#164954');
            jQuery('.theme-sidebar-light, .theme-right-light').css('background-color', '#DDE6E9');
        }
        if (jQuery(this).data('main') == 'red') {
            jQuery('.theme-left').css('background-color', '#C9625F');
            jQuery('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#4E3232');
            jQuery('.theme-sidebar-light, .theme-right-light').css('background-color', '#F8F3F1');
        }
        if (jQuery(this).data('main') == 'green') {
            jQuery('.theme-left').css('background-color', '#18A689');
            jQuery('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#24392E');
            jQuery('.theme-sidebar-light, .theme-right-light').css('background-color', '#F1F8F3');
        }
        if (jQuery(this).data('main') == 'orange') {
            jQuery('.theme-left').css('background-color', '#C58627');
            jQuery('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#50361F');
            jQuery('.theme-sidebar-light, .theme-right-light').css('background-color', '#F8F4F1');
        }
        if (jQuery(this).data('main') == 'purple') {
            jQuery('.theme-left').css('background-color', '#6E62B5');
            jQuery('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#393F51');
            jQuery('.theme-sidebar-light, .theme-right-light').css('background-color', '#F3F2F7');
        }
        if (jQuery(this).data('main') == 'blue') {
            jQuery('.theme-left').css('background-color', '#4A89DC');
            jQuery('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#1E3948');
            jQuery('.theme-sidebar-light, .theme-right-light').css('background-color', '#F2F4F7');
        }
        jQuery.cookie('main-color', main_color);
        jQuery.cookie('main-name', main_name);
        jQuery.cookie('main-color', main_color, {path: '/'});
        jQuery.cookie('main-name', main_name, {path: '/'});
    });


    jQuery('.layout-option input').on('click', function () {
        var layout = jQuery(this).attr('data-layout');
        var is_checked = jQuery(this).prop('checked');
        if (layout == 'rtl' && is_checked == true){toggleRTL();}
        if (layout == 'rtl' && is_checked == false){toggleRTL();}
        if (layout == 'sidebar' && is_checked == true){handleSidebarFixed();}
        if (layout == 'sidebar' && is_checked == false){handleSidebarFluid();}
        if (layout == 'topbar' && is_checked == true){handleTopbarFixed();}
        if (layout == 'topbar' && is_checked == false){handleTopbarFluid();}
        if (layout == 'sidebar-hover' && is_checked == true){createSidebarHover();}
        if (layout == 'sidebar-hover' && is_checked == false){removeSidebarHover();}
        if (layout == 'submenu-hover' && is_checked == true){createSubmenuHover();}
        if (layout == 'submenu-hover' && is_checked == false){removeSubmenuHover();}
        if (layout == 'boxed' && is_checked == true){createBoxedLayout();}
        if (layout == 'boxed' && is_checked == false){removeBoxedLayout();}
    });

    jQuery('.builder-toggle').on('click', function () {
        if (jQuery('#builder').hasClass('open')){jQuery('#builder').removeClass('open');}
        else{jQuery('#builder').addClass('open');}
    });

});

/****  Resize Event Functions  ****/

jQuery(window).resize(function() {
    setTimeout(function() {
        customScroll();
        reposition_topnav();
        if (!jQuery('body').hasClass('fixed-sidebar') && !jQuery('body').hasClass('builder-admin')) sidebarBehaviour();
        handleboxedLayout();
        maximizePanel();
    }, 100);
});
