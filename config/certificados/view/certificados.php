<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);


/*Load values from .ini*/
define('APPROOT', $_SERVER['DOCUMENT_ROOT']);
$ini_array = parse_ini_file(APPROOT . '/.config.ini', true);
define('APPBASE', $ini_array["general"]["appbase"]);

require_once APPROOT . '/view/pageheader.php';
require_once APPROOT . '/config/users/model/clsUsers.php';
require_once APPROOT . '/model/language/clsLangs.php';
require_once APPROOT . '/config/users/model/clsUsers.php';

$id = 0;
//Get Labels 
$objLabel = New Labels;
$lblUsers = $objLabel->get_Label('lblUsers', $SelLang);
$lblName = $objLabel->get_Label('lblName', $SelLang);
$lblAddNewUser = $objLabel->get_Label('lblAddNewUser', $SelLang);

$lblCredentials = $objLabel->get_Label('lblCredentials', $SelLang);
$lblCertificate = $objLabel->get_Label('lblCertificate', $SelLang);

$lblForm = $objLabel->get_Label('lblForm', $SelLang);
$lblEmisor = $objLabel->get_Label('lblEmisor', $SelLang);






$objUsers = New Users;
$objUsers->set_ID(-1);
$objUsers->execute();
$usersoption = "<option value ='0'></option>";
for ($i = 0; $i < $objUsers->get_Count(); $i++) {
    $usersoption .= "<option value =\"" . $objUsers->get_ID($i) . "\">" . $objUsers->get_First($i) . " " . $objUsers->get_Last($i) . "</option>";
}

//Get Labels
//$lblName = $objLabel->get_Label("lblName", $SelLang);*/
?>
            <link href="/<?= APPBASE ?>assets/plugins/colorpicker/spectrum.css" rel="stylesheet" type="text/css" />
            
            <link href="/assets/plugins/upload/css/uploadfile.css" rel="stylesheet" type="text/css"/>
            <link href="/assets/plugins/chosen/chosen.min.css" rel="stylesheet" type="text/css"/>
            
        
            <!-- BEGIN PAGE CONTENT -->
            <!-- Button trigger modal -->
            <input type="hidden" id="UserId" value="<?=$UserId?>">
            <div class="page-content">
                <div class="row">
                    <div class="col-md-6 m-b-20">
                        <label class="tam" for="Users"><?=$lblUsers?></label>
                        <select title = "" tabindex="-1" id="dwnUsers" class="form-control form-white" data-search="true"  ><?=$usersoption?></select>
                    </div>
                    <div class="col-md-6 m-b-20">
                        <label class="tam" for="Users"><?=$lblForm?></label>
                        <select title = "" tabindex="-1" id="dwnTypeData" class="form-control form-white" data-search="true">
                            <option value=""></option>
                            <option value="1"><?=$lblCertificate?></option>
                            <option value="2"><?=$lblCredentials?></option>
                            <option value="3"><?=$lblEmisor?></option>
                        </select>
                    </div>                    
                    <div class="col-md-12" id="certiForm">
                        
                    </div>                    
                </div>
            </div>
            <!-- END PAGE CONTENT -->
<?php
require_once APPROOT . '/view/pagefooter.php';
?>
        <!-- BEGIN PAGE SPECIFIC SCRIPTS -->
        <script type="text/javascript" src="/<?=APPBASE?>assets/plugins/colorpicker/spectrum.min.js"></script>        
        <script type="text/javascript">
            jQuery(document).on('click', 'button.btn', function(){
               jQuery('.modal-body').html('<label class="form-label">Basic Color Picker</label><input style="display: inline-block;" class="color-picker form-control" data-color="#18A689" type="text">'); 
            });
            colorPicker();
        </script>
        
        <script src="/assets/plugins/upload/js/jquery.uploadfile.min.js" type="text/javascript"></script>
        <script src="/assets/plugins/chosen/chosen.jquery.min.js" type="text/javascript"></script>
        <script src="/config/certificados/assets/certificados.js" type="text/javascript"></script>
    </body>
</html>

