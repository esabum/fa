jQuery(document).ready(function () {
    /* Enable Avatar Icons*/
    jQuery('.profile').initial();
    
    /* Geneal Spinner activation on ajax calls*/
    jQuery(document).on("ajaxSend", function () {
        blockUI('.page-content');
    });
    jQuery(document).on("ajaxStop", function () {
        unblockUI('.page-content');
    });
    jQuery(document).on("ajaxError", function () {
        unblockUI('.page-content');
    });

    /*Member Site Left Pane Button*/
    jQuery('#site').click(function () {
        var newWindow = window.open("", "_blank");
        jQuery.ajax({
            type: "POST",
            url: '/members/search.php?SelLang=' + SelLang,
            data: {
                ecb: ecb,
                eck: eck
            },
            success: function () {
                newWindow.location.href = ("/members/search.php?SelLang=" + SelLang);
            }
        });
    });

    jQuery(document).on('click', 'i.viewdetails', function () {
        if (jQuery(this).hasClass('fa-chevron-right')) {
            jQuery(this).attr('class', 'fas fa-chevron-down viewdetails');
            jQuery(this).parents('li').next('ul').show();
        } else {
            jQuery(this).attr('class', 'fas fa-chevron-right viewdetails');
            jQuery(this).parents('li').next('ul').hide();
        }
        ;
    });

    selectMenu();
});

/*Menu selector*/
function selectMenu() {
    var urlMenu = window.location.href;
    urlMenu = urlMenu.replace('http://' + window.location.hostname, '');
    jQuery('a[href="' + urlMenu + '"]').parent('li').addClass('active');
    var parentMenu = jQuery('a[href="' + urlMenu + '"]').parent('li').parent('ul').parent(".nav-parent");
    parentMenu.addClass('active');
}

//Ejem: showNoty('danger','<?= $lblCanceled ?>');
function showNoty(type, message) {//type = default, danger, success
    noty({
        text: '<div class="alert alert-' + type + '"><p><strong>' + message + '</p></div>',
        layout: 'topRight',
        theme: 'made',
        maxVisible: 10,
        animation: {open: 'animated bounceIn', close: 'animated bounceOut'},
        timeout: 3000
    });
}

function confirmNoty(type, message, buttons) {//
    /* Usage: type = default, danger, success, warning
     confirmNoty('warning', 'mensaje de pregunta?',[
     {
     button: 'btn-primary',
     label: 'OK',
     callfn: 'saveData(1,2,3);'
     },{
     button: 'btn-danger',
     label: 'Cancel',
     callfn: 'saveCancel(0);'
     }
     ]
     );*/

    buttons = buttons || {};
    var btn = [];
    jQuery.each(buttons, function (index, value) {
        btn.push({
            addClass: 'btn ' + value.button,
            text: value.label,
            onClick: function ($noty) {
                $noty.close();
                eval(value.callfn);
            }
        }
        );
    });

    var n = noty({
        text: '<div class="alert alert-' + type + '"><p><strong>' + message + '</p></div>',
        /*
         layout: 'center', //or left, right, bottom-right...
         theme: 'made',
         maxVisible: 10,
         dismissQueue: true,
         closeWith: ['click', 'backdrop'],
         modal: true,
         text        : type,
         */

        type: type,
        dismissQueue: true,
        closeWith: ['click', 'backdrop'],
        modal: true,
        layout: 'center',
        theme: 'defaultTheme',
        maxVisible: 10,
        animation: {
            open: 'animated bounceIn',
            close: 'animated bounceOut'
        },
        buttons: btn

    });
}
;

function validateForm(formId) {
    //No funciona 
    var elements = jQuery('#' + formId + ' input'),
            elementsVal = [],
            elementsId = [],
            dataForm = {};

    jQuery.each(elements, function (e) {
        elementsVal.push(elements[e].value);
        elementsId[e] = jQuery(elements[e]).attr('id');
    });

    console.log(elementsVal + ' \n ' + elementsId);

    jQuery.each(elementsVal, function (i) {
        window[elementsVal[i]] = elementsVal[i];
        dataForm.elementsId[i] = elementsVal[i];
    });
}

/*Context Menu function*/
(function ($, window) {
    $.fn.contextMenu = function (settings) {

        return this.each(function () {

            // Open context menu
            $(this).on("contextmenu", function (e) {
                $('.dropdown-menu').hide();
                // return native menu if pressing control
                if (e.ctrlKey)
                    return;

                //open menu
                var $menu = $(settings.menuSelector)
                        .data("invokedOn", $(e.target))
                        .show()
                        .css({
                            position: "absolute",
                            left: getMenuPosition(e.clientX, 'width', 'scrollLeft'),
                            top: getMenuPosition(e.clientY, 'height', 'scrollTop')
                        })
                        .off('click')
                        .on('click', 'a', function (e) {
                            $menu.hide();

                            var $invokedOn = $menu.data("invokedOn");
                            var $selectedMenu = $(e.target);

                            settings.menuSelected.call(this, $invokedOn, $selectedMenu);
                        });

                return false;
            });

            //make sure menu closes on any click
            $('body').click(function () {
                $(settings.menuSelector).hide();
            });
        });

        function getMenuPosition(mouse, direction, scrollDir) {
            var win = $(window)[direction](),
                    scroll = $(window)[scrollDir](),
                    menu = $(settings.menuSelector)[direction](),
                    position = mouse + scroll;

            // opening menu would pass the side of the page
            if (mouse + menu > win && menu < mouse)
                position -= menu;

            return position;
        }

    };
})(jQuery, window);
