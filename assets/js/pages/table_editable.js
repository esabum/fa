jQuery(function () {

    function editableTable() {

        function restoreRow(oTable, nRow) {
            var aData = oTable.fnGetData(nRow);
            var jqTds = jQuery('>td', nRow);

            for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                oTable.fnUpdate(aData[i], nRow, i, false);
            }
            //oTable.fnDraw();
        }
        
        
        function editRow(oTable, nRow) {
            var aData = oTable.fnGetData(nRow);
            var jqTds = jQuery('>td', nRow);
            for (var i = 0, iLen = jqTds.length-1; i < iLen; i++) {
                jqTds[i].innerHTML = '<input type="text" class="form-control small" value="' + aData[i] + '">';
            }
            jqTds[jqTds.length-1].innerHTML = '<div class=""><a class="edit btn btn-sm btn-success" href="">Save</a> <a class="delete btn btn-sm btn-danger" href=""><i class="icons-office-52"></i></a></div>';
        }

        /*function saveRow(oTable, nRow) { //modificado. Revisión pendiente
            var jqInputs = jQuery('input', nRow);
            var jqTds = jQuery('>td', nRow);
            for (var i = 0, iLen = jqInputs.length-1; i < iLen; i++) {
                oTable.fnUpdate(jqInputs[i].value, nRow, i, false);
            }    
            jqTds[jqTds.length-1].innerHTML = '<div class=""><a class="edit btn btn-sm btn-default" href=""><i class="icon-note"></i></a> <a class="delete btn btn-sm btn-danger" href=""><i class="icons-office-52"></i></a></div>';
            
            oTable.fnDraw();
        }*/
        
        function saveRow(oTable, nRow) {
            var newLine = 0;
            var nEditing = null;
            var jqInputs = jQuery('input', nRow);
            jQuery.ajax({
                type: 'POST',
                url: '../currencies/sendCurrencies.php',
                data: "id=" + encodeURIComponent(jqInputs[0].value) + "&name=" + encodeURIComponent(jqInputs[1].value) + "&number=" + encodeURIComponent(jqInputs[2].value) + "&minor=" + encodeURIComponent(jqInputs[3].value) + "&symbol=" + encodeURIComponent(jqInputs[4].value),
                success: function (server_response) {
                    if (server_response) {
                        nRow.id = jqInputs[0].value;//update the row with the new text in the name
                        oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                        oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                        oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                        oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                        oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
                        oTable.fnUpdate("<a class='edit btn btn-sm btn-default' href='javascript:;'><i class='icon-note'></i></a><a class='edit btn btn-sm btn-danger' href='javascript:;'><i class='icons-office-52'></i></a>", nRow, 5, false);

                        if (newLine != 0) {
                            newLine = 0;
                            jQuery('#new').attr('disabled', false);
                            nEditing_new = null;
                        }
                        noty({
                            text: '<div class="alert alert-success"><p><strong><?= $lblSaveComplete ?></strong></p></div>',
                            layout: 'topRight', //or left, right, bottom-right...
                            theme: 'made',
                            maxVisible: 10,
                            animation: {
                                open: 'animated bounceIn',
                                close: 'animated bounceOut'
                            },
                            timeout: 3000
                        });

                    } else
                    {
                        var n = noty({
                            text: '<div class="alert alert-error"><p><strong><?= $lblErrorSave ?></strong></p></div>',
                            layout: 'topRight', //or left, right, bottom-right...
                            theme: 'made',
                            maxVisible: 10,
                            animation: {
                                open: 'animated bounceIn',
                                close: 'animated bounceOut'
                            },
                            timeout: 3000
                        });
                    }
                }//end success		
            });
            //document.getElementById('new').disabled = false;
            nEditing = null
            oTable.fnDraw();
        }
        
        function cancelEditRow(oTable, nRow) {
            var jqInputs = jQuery('input', nRow);
            var jqTds = jQuery('>td', nRow); //
            for (var i = 0, iLen = jqTds.length-1; i < iLen; i++) {
               oTable.fnUpdate(jqInputs[i].value, nRow, i, false);
            }
            oTable.fnUpdate('<a class="edit btn btn-sm btn-default" href=""><i class="icon-note"></i></a>', nRow, jqTds.length, false);
            oTable.fnDraw();
            /*oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
            oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
            oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
            oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
            oTable.fnUpdate('<a class="edit btn btn-sm btn-default" href=""><i class="icon-note"></i></a>', nRow, 4, false);
            oTable.fnDraw();*/
        }

        var oTable = jQuery('#table-editable').dataTable({
            "aLengthMenu": [
                [10, 15, 20, -1],
                [10, 15, 20, "All"] // change per page values here
            ],
            "sDom" : "<'row'<'col-md-6 filter-left'l><'col-md-6'T>r>t<'row'<'col-md-6'i><'col-md-6'p>>",
            "oTableTools" : {
                "sSwfPath": "assets/plugins/datatables/swf/copy_csv_xls_pdf.swf",
                "aButtons":[
                    {
                        "sExtends":"pdf",
                        "mColumns":[0, 1, 2, 3],
                        "sPdfOrientation":"landscape"
                    },
                    {
                        "sExtends":"print",
                        "mColumns":[0, 1, 2, 3],
                        "sPdfOrientation":"landscape"
                    },{
                        "sExtends":"xls",
                        "mColumns":[0, 1, 2, 3],
                        "sPdfOrientation":"landscape"
                    },{
                        "sExtends":"csv",
                        "mColumns":[0, 1, 2, 3],
                        "sPdfOrientation":"landscape"
                    }
                ]
            }
        });

        jQuery('#table-edit_wrapper .dataTables_filter input').addClass("form-control medium"); // modify table search input
        jQuery('#table-edit_wrapper .dataTables_length select').addClass("form-control xsmall"); // modify table per page dropdown

        var nEditing = null;

        jQuery('#table-edit_new').click(function (e) {
            e.preventDefault();
            var aiNew = oTable.fnAddData(['', '', '', '', '',
                    '<p class="text-center"><a class="edit btn btn-dark" href=""><i class="far fa-edit"></i>Edit</a> <a class="delete btn btn-danger" href=""><i class="fas fa-times-circle"></i> Remove</a></p>'
            ]);
            var nRow = oTable.fnGetNodes(aiNew[0]);
            editRow(oTable, nRow);
            nEditing = nRow;
        });

        jQuery('#table-editable a.delete').live('click', function (e) {
            var newLine;
            var nEditing =  null;
            nEditing_new = null;
            e.preventDefault();
            if (confirm("Are you sure to delete this row ?") == false) {
                return;
            }
            else {
                var nRow = jQuery(this).parents('tr')[0];
                oTable.fnDeleteRow(nRow);
                // alert("Deleted! Do not forget to do some ajax to sync with backend :)");

                //oTable.fnDeleteRow(nRow);
                if (nEditing_new == null)
                    jQuery.ajax({
                        type: 'POST',
                        url: '../currencies/currencies_Del.php',
                        data: "id=" + nRow.id,
                        success: function () {
                            noty({
                                text        : '<div class="alert alert-success"><p><strong><?= $lblSaveComplete ?></strong></p></div>',
                                layout      : 'topRight', //or left, right, bottom-right...
                                theme       : 'made',
                                maxVisible  : 10,
                                animation   : {
                                    open  : 'animated bounceIn',
                                    close : 'animated bounceOut'
                                },
                                timeout: 3000
                            });
                        }//end success		
                    })//end ajax
                if (newLine != 0){
                    newLine = 0;
                    jQuery('#new').attr('disabled', false);
                    nEditing_new = null;
                }
                nEditing = null;
            }
        });

        jQuery('#table-editable a.cancel').live('click', function (e) {
            e.preventDefault();
            if (jQuery(this).attr("data-mode") == "new") {
                var nRow = jQuery(this).parents('tr')[0];
                oTable.fnDeleteRow(nRow);
            } else {
                restoreRow(oTable, nEditing);
                nEditing = null;
            }
        });

        jQuery('#table-editable a.edit').live('click', function (e) {
            e.preventDefault();
            /* Get the row as a parent of the link that was clicked on */
            var nRow = jQuery(this).parents('tr')[0];

            if (nEditing !== null && nEditing != nRow) {
                restoreRow(oTable, nEditing);
                editRow(oTable, nRow);
                nEditing = nRow;
            }    else if (nEditing == nRow && this.innerHTML == "Save") {
                 /* This row is being edited and should be saved */
                saveRow(oTable, nEditing);
                nEditing = null;
                // alert("Updated! Do not forget to do some ajax to sync with backend :)");
            } else {
                 /* No row currently being edited */
                editRow(oTable, nRow);
                nEditing = nRow;
            }
        });

        jQuery('.dataTables_filter input').attr("placeholder", "Search a user...");

    };

    editableTable();

});