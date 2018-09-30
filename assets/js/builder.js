                                       
/* ============================================================
 * Builder Script
 =========================================================== */
/**** BUILDER FUNCTIONS ****/
function toggleBuilder(){
    jQuery('.builder-toggle').on('click', function(){
        if(jQuery('#builder').hasClass('open')) jQuery('#builder').removeClass('open');
        else jQuery('#builder').addClass('open');
    });
}
/* Active Custom Scroll for Builder Sidebar */
function builderScroll() {
    jQuery('.builder .inner').mCustomScrollbar("destroy");
    scroll_height = "100%";
    jQuery('.builder .inner').mCustomScrollbar({
        scrollButtons: {
            enable: false
        },
        autoHideScrollbar: true,
        scrollInertia: 150,
        theme: "light",
        set_height: scroll_height,
        advanced: {
            updateOnContentResize: true
        }
    });
}
/* Enable / Disable Layouts */
function handleLayout(){
    jQuery('.layout-option input').on('click', function(){
        var layout = jQuery(this).attr('data-layout');
        var is_checked = jQuery(this).prop('checked');
        if(layout == 'rtl' && is_checked == true) toggleRTL();
        if(layout == 'rtl' && is_checked == false) toggleRTL();
        if(layout == 'sidebar' && is_checked == true) handleSidebarFixed();
        if(layout == 'sidebar' && is_checked == false) handleSidebarFluid();
        if(layout == 'topbar' && is_checked == true) handleTopbarFixed();
        if(layout == 'topbar' && is_checked == false) handleTopbarFluid();
        if(layout == 'sidebar-hover' && is_checked == true) createSidebarHover();
        if(layout == 'sidebar-hover' && is_checked == false) removeSidebarHover();
        if(layout == 'submenu-hover' && is_checked == true) createSubmenuHover();
        if(layout == 'submenu-hover' && is_checked == false) removeSubmenuHover();
        if(layout == 'boxed' && is_checked == true) createBoxedLayout();
        if(layout == 'boxed' && is_checked == false) removeBoxedLayout();
    });
}

/* Main Color */
function mainColor(){
    jQuery('.theme-color').on('click', function(e){
        e.preventDefault();
        var main_color = jQuery(this).data('color');
        var main_name = jQuery(this).attr('data-main');
        jQuery('body').removeClass (function (index, css) {
            return (css.match (/(^|\s)color-\S+/g) || []).join(' ');
        });
        jQuery('body').addClass('color-'+main_name);
        jQuery('.theme-color').removeClass('active');
        jQuery(this).addClass('active');
        if (jQuery(this).data('main') == 'default'){
            jQuery('.theme-left').css('background-color', '#202226');
            jQuery('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#393E44');
            jQuery('.theme-sidebar-light, .theme-right-light').css('background-color', '#fff');
            jQuery('.sltl .theme-left').css('background-color', '#fff');
        }
        if (jQuery(this).data('main') == 'primary'){
            jQuery('.theme-left').css('background-color', '#319DB5');
            jQuery('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#164954');
            jQuery('.theme-sidebar-light, .theme-right-light').css('background-color', '#DDE6E9');
        }
        if (jQuery(this).data('main') == 'red'){
            jQuery('.theme-left').css('background-color', '#C9625F');
            jQuery('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#4E3232');
            jQuery('.theme-sidebar-light, .theme-right-light').css('background-color', '#F8F3F1');
        }
        if (jQuery(this).data('main') == 'green'){
            jQuery('.theme-left').css('background-color', '#18A689');
            jQuery('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#24392E');
            jQuery('.theme-sidebar-light, .theme-right-light').css('background-color', '#F1F8F3');
        }
        if (jQuery(this).data('main') == 'orange'){
            jQuery('.theme-left').css('background-color', '#C58627');
            jQuery('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#50361F');
            jQuery('.theme-sidebar-light, .theme-right-light').css('background-color', '#F8F4F1');
        }
        if (jQuery(this).data('main') == 'purple'){
            jQuery('.theme-left').css('background-color', '#6E62B5');
            jQuery('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#393F51');
            jQuery('.theme-sidebar-light, .theme-right-light').css('background-color', '#F3F2F7');
        }
        if (jQuery(this).data('main') == 'blue'){
            jQuery('.theme-left').css('background-color', '#4A89DC');
            jQuery('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#1E3948');
            jQuery('.theme-sidebar-light, .theme-right-light').css('background-color', '#F2F4F7');
        }
        $.cookie('main-color', main_color);
        $.cookie('main-name', main_name);
        $.cookie('main-color', main_color, { path: '/' });
        $.cookie('main-name', main_name, { path: '/' });
    });
}

/* Switch Theme */
function handleTheme(){
    jQuery('.theme').on('click', function(e) {
        e.preventDefault();
        jQuery('.theme').removeClass('active');
        jQuery(this).addClass('active');
        var theme_name = jQuery(this).attr('data-theme');
        switchTheme(theme_name);
    });

    function switchTheme(name){
        if (name == null){
            jQuery('.theme-sidebar-defaut').addClass('active');
            $.cookie('theme', name);
            $.cookie('theme', name, { path: '/' });
        }
        else{
            jQuery('.theme-sidebar-'+name).addClass('active');
            jQuery('body').removeClass (function (index, css) {
                return (css.match (/(^|\s)theme-\S+/g) || []).join(' ');
            });
            jQuery('body').addClass('theme-'+name);
            $.cookie('theme', name);
            $.cookie('theme', name, { path: '/' });
        }
    }
}

/* Background Color */
function backgroundColor(){
    jQuery('.bg-color').on('click', function(e){
        e.preventDefault();
        var bg_color = jQuery(this).data('color');
        var bg_name = jQuery(this).attr('data-bg');
        jQuery('body').removeClass (function (index, css) {
            return (css.match (/(^|\s)bg-\S+/g) || []).join(' ');
        });
        jQuery('body').addClass('bg-'+bg_name);
        jQuery('.bg-color').removeClass('active');
        jQuery(this).addClass('active');
        $.cookie('bg-color', bg_color);
        $.cookie('bg-name', bg_name);
        $.cookie('bg-color', bg_color, { path: '/' });
        $.cookie('bg-name', bg_name, { path: '/' });
    });
}

/* Manage Cookie */
function handleCookie(){
    if($.cookie('rtl')) enableRTL();
    if($.cookie('fluid-topbar')) handleTopbarFluid();
    if($.cookie('fixed-sidebar')) handleSidebarFixed();
    if($.cookie('fluid-sidebar')) handleSidebarFluid();
    if($.cookie('sidebar-hover')) createSidebarHover(); 
    if($.cookie('submenu-hover')) createSubmenuHover();  
    if($.cookie('boxed-layout')) createBoxedLayout();
    if($.cookie('sidebar-collapsed') && $.cookie('first-load')) createCollapsedSidebar();
    if($.cookie('main-name')) {
        var main_name = $.cookie('main-name');
        jQuery('body').removeClass (function (index, css) {
            return (css.match (/(^|\s)color-\S+/g) || []).join(' ');
        });
        jQuery('body').addClass('color-'+main_name);
        jQuery('.theme-color').each(function(){
            if(jQuery(this).data('main') == main_name) jQuery(this).addClass('active');
        });
        if (main_name == 'default'){
            jQuery('.theme-left').css('background-color', '#202226');
            jQuery('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#393E44');
            jQuery('.theme-sidebar-light, .theme-right-light').css('background-color', '#fff');
            jQuery('.sltl .theme-left').css('background-color', '#fff');
        }
        if (main_name == 'primary'){
            jQuery('.theme-left').css('background-color', '#319DB5');
            jQuery('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#164954');
        }
        if (main_name == 'red'){
            jQuery('.theme-left').css('background-color', '#C9625F');
            jQuery('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#4E3232');
        }
        if (main_name == 'green'){
            jQuery('.theme-left').css('background-color', '#18A689');
            jQuery('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#24392E');
        }
        if (main_name == 'orange'){
            jQuery('.theme-left').css('background-color', '#C58627');
            jQuery('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#50361F');
        }
        if (main_name == 'purple'){
            jQuery('.theme-left').css('background-color', '#6E62B5');
            jQuery('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#393F51');
        }
        if (main_name == 'blue'){
            jQuery('.theme-left').css('background-color', '#4A89DC');
            jQuery('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#1E3948');
        }
   }

   if(!$.cookie('main-color')) {
        jQuery('.theme-color').each(function(){
            if(jQuery(this).data('color') == '#2B2E33') jQuery(this).addClass('active');
        });
        jQuery('body').addClass('color-default');
    }
    // Background Color
    if($.cookie('bg-color')) {
        var bg_color = $.cookie('bg-color');
        jQuery('.bg-color').each(function(){
            if(jQuery(this).data('color') == bg_color) jQuery(this).addClass('active');
        });
    }
    if($.cookie('bg-name')) {
        var bg_color = $.cookie('bg-name');
        jQuery('body').addClass('bg-'+bg_color);
    }
    if(!$.cookie('bg-color')) {
        jQuery('.bg-color').each(function(){
            if(jQuery(this).data('color') == '#E9E9E9') jQuery(this).addClass('active');
        });
    }
    // Sidebar Color
    if($.cookie('theme')) {
        jQuery('body').removeClass (function (index, css) {
            return (css.match (/(^|\s)theme-\S+/g) || []).join(' ');
        });
        var theme = $.cookie('theme');
        jQuery('.'+theme).addClass('active');
        jQuery('body').addClass('theme-'+theme);
     
        jQuery('.theme').each(function(){
            if(jQuery(this).data('theme') == theme) jQuery(this).addClass('active');
        });
    }
    if(!$.cookie('theme')) {
        jQuery('.theme.sdtl').addClass('active'); 
    }
    if(!$.cookie('main-color')) {
        jQuery('body').addClass('theme-sdtl');
        jQuery('.theme-left').css('background-color', '#202226');
        jQuery('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#393E44');
    }
}

jQuery(document).ready(function() {
   "use strict";
   
    toggleBuilder();
    builderScroll();
    handleLayout();
    handleTheme();
    handleCookie();
    mainColor();
    backgroundColor();
    resetStyle();

    if(jQuery('body').hasClass('sidebar-top')){
      destroySideScroll();
    }
});