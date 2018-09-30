/*
 Bootstable
 @description  Javascript library to make HMTL tables editable, using Bootstrap
 @version 1.1
 @autor Tito Hinostroza
 */
"use strict";
//Global variables
var params = null;  		//Parameters
var colsEdi = null;
var conttbxunit = 0;
var newColHtml = '<div class="btn-group text-center">' +
        '<button id="bEdit" type="button" class="btn btn-sm btn-default" onclick="rowEdit(this);">' +
        '<span class="glyphicon glyphicon-pencil" > </span>' +
        '</button>' +
        '<button id="bElim" type="button" class="btn btn-sm btn-default" onclick="rowElim(this);">' +
        '<span class="glyphicon glyphicon-trash" > </span>' +
        '</button>' +
        '<button id="bAcep" type="button" class="btn btn-sm btn-default" style="display:none;" onclick="rowAcep(this);">' +
        '<span class="glyphicon glyphicon-ok" > </span>' +
        '</button>' +
        '<button id="bCanc" type="button" class="btn btn-sm btn-default" style="display:none;" onclick="rowCancel(this);">' +
        '<span class="glyphicon glyphicon-remove" > </span>' +
        '</button>' +
        '</div>';
var colEdicHtml = '<td name="buttons">' + newColHtml + '</td>';

$.fn.SetEditable = function (options) {
    var defaults = {
        columnsEd: null, //Index to editable columns. If null all td editables. Ex.: "1,2,3,4,5"
        $addButton: null, //Jquery object of "Add" button
        onEdit: function () {}, //Called after edition
        onBeforeDelete: function () {}, //Called before deletion
        onDelete: function () {}, //Called after deletion
        onAdd: function () {}     //Called when added a new row
    };
    var tabId = jQuery(this).attr("id");
    params = $.extend(defaults, options);

    this.find('thead tr').append('<th width="4%" style="text-align: center;"><button type="button" class="btn btn-sm btn-default" onclick="addNewRow();">' +
            '<span class="glyphicon glyphicon-plus" > </span>' +
            '</button></th>');  //encabezado vacío

    this.find('tbody tr').append(colEdicHtml);
    var $tabedi = this;   //Read reference to the current table, to resolve "this" here.
    //Process "addButton" parameter
    if (params.$addButton != null) {
        //Se proporcionó parámetro
        params.$addButton.click(function () {
            rowAddNew($tabedi.attr("id"));
        });
    }
    //Process "columnsEd" parameter
    if (params.columnsEd != null) {
        //Extract felds
        colsEdi = params.columnsEd.split(',');
    }
};

function addNewRow() {

}

function IterarCamposEdit($cols, tarea) {
//Itera por los campos editables de una fila
    var n = 0;
    $cols.each(function () {
        n++;
        if ($(this).attr('name') == 'buttons')
            return;  //excluye columna de botones
        if (!EsEditable(n - 1))
            return;   //noe s campo editable
        tarea($(this));
    });

    function EsEditable(idx) {
        //Indica si la columna pasada está configurada para ser editable
        if (colsEdi == null) {  //no se definió
            return true;  //todas son editable
        } else {  //hay filtro de campos
//alert('verificando: ' + idx);
            for (var i = 0; i < colsEdi.length; i++) {
                if (idx == colsEdi[i])
                    return true;
            }
            return false;  //no se encontró
        }
    }
}
function FijModoNormal(but) {
    $(but).parent().find('#bAcep').hide();
    $(but).parent().find('#bCanc').hide();
    $(but).parent().find('#bEdit').show();
    $(but).parent().find('#bElim').show();
    var $row = $(but).parents('tr');  //accede a la fila
    $row.attr('id', '');  //quita marca
}
function FijModoEdit(but) {
    $(but).parent().find('#bAcep').show();
    $(but).parent().find('#bCanc').show();
    $(but).parent().find('#bEdit').hide();
    $(but).parent().find('#bElim').hide();
    var $row = $(but).parents('tr');  //accede a la fila
    $row.attr('id', 'editing');  //indica que está en edición
}
function ModoEdicion($row) {
    if ($row.attr('id') == 'editing') {
        return true;
    } else {
        return false;
    }
}
function rowAcep(but) {
//Acepta los cambios de la edición
    var $row = $(but).parents('tr');  //accede a la fila
    var $cols = $row.find('td');  //lee campos
    //console.log($cols);

    var cantidad = (jQuery($cols[0]).find('input').val()) ? jQuery($cols[0]).find('input').val() : "";
    var unidMedida = jQuery($cols[1]).find('select').val();
    var detalle = jQuery($cols[2]).find('input').val() ? jQuery($cols[2]).find('input').val() : "";
    var preciounit = jQuery($cols[3]).find('input').val() ? jQuery($cols[3]).find('input').val() : "";
    var descuento = jQuery($cols[4]).find('input').val() ? jQuery($cols[4]).find('input').val() : "";
    var detalledescuento = jQuery($cols[5]).find('input').val();
    var impuesto = 0;
    //console.log(unidMedida);
    if (!isNaN(cantidad) && !isNaN(preciounit) && detalle != "" ) {
        var liSubTot = (cantidad * preciounit) - descuento;
        var liTot = cantidad * preciounit;
        jQuery($cols[6]).text(convertToPounds(liSubTot, 5));

        jQuery($cols[7]).text(convertToPounds(liTot, 5));
        if (unidMedida == 'Sp') {
            jQuery($cols[7]).addClass("serv_prof");
        }
        jQuery($cols[8]).text(convertToPounds(liSubTot + impuesto, 5));

        if (!ModoEdicion($row))
            return;  //Ya está en edición
        //Está en edición. Hay que finalizar la edición
        IterarCamposEdit($cols, function ($td) {  //itera por la columnas
            var cont = $td.find('input').val(); //lee contenido del input
            $td.html(cont);  //fija contenido y elimina controles
        });
        FijModoNormal(but);
        params.onEdit($row);
    } else {
        showNoty("warning","Favor llenar todos los campos");
        //console.log("Llenar todo los campos");
    }
}
function rowCancel(but) {
//Rechaza los cambios de la edición
    var $row = $(but).parents('tr');  //accede a la fila
    var $cols = $row.find('td');  //lee campos
    if (!ModoEdicion($row))
        return;  //Ya está en edición
    //Está en edición. Hay que finalizar la edición
    IterarCamposEdit($cols, function ($td) {  //itera por la columnas
        var cont = $td.find('div').html(); //lee contenido del div
        $td.html(cont);  //fija contenido y elimina controles
    });
    FijModoNormal(but);
}

function convertToPounds(str, decimales) {
    var n = Number.parseFloat(str);
    if (!str || isNaN(n) || n < 0)
        return 0;
    return n.toFixed(decimales);
}

function rowEdit(but) {  //Inicia la edición de una fila
    var $row = $(but).parents('tr');  //accede a la fila
    var $cols = $row.find('td');  //lee campos
    if (ModoEdicion($row))
        return;  //Ya está en edición
    //Pone en modo de edición
    IterarCamposEdit($cols, function ($td) {  //itera por la columnas
        var id = "tbxUnit" + conttbxunit;
        conttbxunit++;
//maxlength="16"
        var textInput = "";
        if ($td.hasClass("colUnit")) {
            textInput = 'id="' + id + '" onblur="ValidaFormatoNumero(this,13,3)"  data-flag="0" onkeyup="return SoloNumerosPunto(this,13,3)" onkeypress="return validaPunto(this,event,13,3)" ';
            //onblur="ValidaFormatoNumero()"
        }
        if ($td.hasClass("colPrecUnit")) {
            textInput = 'id="' + id + '" onblur="ValidaFormatoNumero(this,18,5)"  data-flag="0" onkeyup="return SoloNumerosPunto(this,18,5)" onkeypress="return validaPunto(this,event,18,5)" ';
            //onblur="ValidaFormatoNumero()"
        }
        if ($td.hasClass("colDescuento")) {
            textInput = 'id="' + id + '" onblur="ValidaFormatoNumero(this,18,5)"  data-flag="0" onkeyup="return SoloNumerosPunto(this,18,5)" onkeypress="return validaPunto(this,event,18,5)" disabled';
            //onblur="ValidaFormatoNumero()"
        }
        if ($td.hasClass("colNatDescuento")) {
            textInput = ' disabled';
            //onblur="ValidaFormatoNumero()"
        }        


        var cont = $td.html(); //lee contenido
        var div = '<div style="display: none;">' + cont + '</div>';  //guarda contenido
        var input = '<input class="form-control input-sm"  value="' + cont + '"  ' + textInput + '>';
        $td.html(div + input);  //fija contenido
    });
    FijModoEdit(but);
}
function rowElim(but) {  //Elimina la fila actual
    var $row = $(but).parents('tr');  //accede a la fila
    params.onBeforeDelete($row);
    $row.remove();
    params.onDelete();
}
function rowAddNew(tabId) {  //Agrega fila a la tabla indicada.
    var $tab_en_edic = $("#" + tabId);  //Table to edit
    var $filas = $tab_en_edic.find('tbody tr');
    if ($filas.length == 0) {
        //No hay filas de datos. Hay que crearlas completas
        var $row = $tab_en_edic.find('thead tr');  //encabezado
        var $cols = $row.find('th');  //lee campos
        //construye html
        var htmlDat = '';
        $cols.each(function () {
            if ($(this).attr('name') == 'buttons') {
                //Es columna de botones
                htmlDat = htmlDat + colEdicHtml;  //agrega botones
            } else {
                htmlDat = htmlDat + '<td></td>';
            }
        });
        $tab_en_edic.find('tbody').append('<tr>' + htmlDat + '</tr>');
    } else {
        //Hay otras filas, podemos clonar la última fila, para copiar los botones
        var $ultFila = $tab_en_edic.find('tr:last');
        $ultFila.clone().appendTo($ultFila.parent());
        $ultFila = $tab_en_edic.find('tr:last');
        var $cols = $ultFila.find('td');  //lee campos
        $cols.each(function () {
            if ($(this).attr('name') == 'buttons') {
                //Es columna de botones
            } else {
                $(this).html('');  //limpia contenido
            }
        });
    }
    params.onAdd();
}
function TableToCSV(tabId, separator) {  //Convierte tabla a CSV
    var datFil = '';
    var tmp = '';
    var $tab_en_edic = $("#" + tabId);  //Table source
    $tab_en_edic.find('tbody tr').each(function () {
        //Termina la edición si es que existe
        if (ModoEdicion($(this))) {
            $(this).find('#bAcep').click();  //acepta edición
        }
        var $cols = $(this).find('td');  //lee campos
        datFil = '';
        $cols.each(function () {
            if ($(this).attr('name') == 'buttons') {
                //Es columna de botones
            } else {
                datFil = datFil + $(this).html() + separator;
            }
        });
        if (datFil != '') {
            datFil = datFil.substr(0, datFil.length - separator.length);
        }
        tmp = tmp + datFil + '\n';
    });
    return tmp;
}
