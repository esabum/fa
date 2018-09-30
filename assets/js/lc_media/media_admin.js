
/******/
/*View image*/
jQuery('[id^="view_"]').click(function(){
    var file = jQuery(this).siblings('img').attr('src').split('cache/_default_');
    jQuery.magnificPopup.open({
        items: {
          src: file[0]+'raw/images'+file[1] 
        },
        type: 'image', 
        cursor: 'mfp-zoom-out-cur'
    });
});