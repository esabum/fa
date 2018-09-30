jQuery(document).ready(function(){
    //createSuppOrProp, createContract, selectSuppOrProp
    
    //Create contract
    jQuery(document).on('change', '#selectSuppProp', function(){
        jQuery('#createContract').show();
        jQuery('#btnCreateSuppProp').attr("disabled","disabled");
    });
    
    //Create Supplier or Property
    jQuery('#btnCreateSuppProp').click(function(){
        jQuery('#selectSupOrProp').hide();
        jQuery('#createSuppOrProp').show();
    });
    //
    jQuery('#btnCancelCreateSuppProp').click(function(){
        jQuery('#createSuppOrProp').hide();
        jQuery('#selectSupOrProp').show();
    });
    
    jQuery('#btnAddNewProduct').click(function(){
        jQuery('#modalNewProduct').modal();
    });
    
    //Add new policy
        //policyTb
    jQuery('#btnAddNewPol').click(function(){
        //recolectar data del formulario.
            var inputsElem = jQuery('#formAddPol input');

            if(typeof(inputsElem[0].value) === "string" && inputsElem[0].value !==''){
                var tr1 = '';
                jQuery('#polTable').append("");
                jQuery.each(inputsElem,function(i){
                    tr1 += '<td>'+inputsElem[i].value+'</td>';
                });
                jQuery('#polTable').append('<tr>'+tr1+'<td><button class="btn btn-danger pull-right btn-lesspad" onclick="removePol(jQuery(this))"><i class="far fa-trash-alt"></i></button></td></tr>');

                //reset inputs
                jQuery.each(inputsElem,function(i){
                    if(typeof(inputsElem[i].value) === "string"){
                        inputsElem[i].value = '';
                    }else{
                        jQuery(inputsElem[i]).attr('value',0);
                    }
                });
            }else{
                jQuery(inputsElem[0]).css({'border':'1px solid red'});
                setTimeout(function(){
                    jQuery(inputsElem[0]).css({'border':'0'});
                }, 4000);
            }
        
    });
    
});

function removePol(e){
    jQuery(e).parent().parent().remove();
}