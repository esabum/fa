jQuery(document).ready(function () {
    //selectMethod
    jQuery('#selectMethod').on('change', function () {
        //Select mothed type
        var dataType = ['Id','String','Array','Integer','Boolean','Float'];
        var dataPar = ['Array','String','Integer','Boolean'];
        jQuery('#parametersSelect').html('');
        jQuery('#typeReturn').html('');
        jQuery.each(dataType, function (i) {
            jQuery('#parametersSelect').append('<option>' + dataType[i] + '</option>');
        });
        jQuery.each(dataPar, function (i) {
            jQuery('#typeReturn').append('<option>' + dataPar[i] + '</option>');
        });
        
        if (jQuery('#selectMethod').val() == "get") {
            jQuery('#typeReturn').removeAttr('disabled');
            jQuery('#parametersSelect').removeAttr('disabled');
            jQuery('#typeReturn').val('Array');
            jQuery('#typeReturn').select2();
            jQuery('#parametersSelect').select2();
        } else if (jQuery('#selectMethod').val() == "set") {
            jQuery('#typeReturn').attr('disabled','disabled');
            jQuery('#parametersSelect').removeAttr('disabled');
            jQuery('#typeReturn').val('');
            jQuery('#typeReturn, #parametersSelect').select2();
        } else {
            jQuery('#typeReturn').attr('disabled','disabled');
            jQuery('#parametersSelect').html('');
            jQuery('#typeReturn').val('');
            jQuery('#typeReturn, #parametersSelect').select2();
        }
    });
    
    jQuery('#dataBase').on('ifChecked', function(e){
        jQuery('#count').iCheck('check');
    });
    
    /*Copy code*/
    jQuery("#btnCopyCode").click(function() {
        area = document.getElementById("areaCode");
        copyToClipboard(area);
        showNoty('success','Copied to clipboard');
    });
});

/*Object*/
var clsBuilder = {};

var clearR ='';
clsBuilder.name = jQuery('#className').val();
clsBuilder.var = {
    bconn: 'protected $obj_bconn;\n',
    dbh: 'protected $dbh;\n',
    sql: 'protected $SQL;\n',
    count: 'protected $count = 0;\n',
    flag: 'protected $flag = "ENT_SUBSTITUTE";\n'
};
clsBuilder.const = '    function __construct() {\n        require_once APPROOT . "/include-php/dbconn/clsMyDBConn.php";\n        $this->obj_bconn = new MyConn(); \n        $this->dbh = $this->obj_bconn->get_conn();\n    }';
clsBuilder.execute= '';
clsBuilder.count = '    public function get_Count() {\n        return $this->count;\n    }';
clsBuilder.clear = '    private function Clear_Results() {}';
clsBuilder.fnGet = {};
clsBuilder.fnSet = {};
clsBuilder.varExc = {};
clsBuilder.varCl = {};
        
/*Add new Method event*/
jQuery('#addNewMethod').click(function () {
    var imethodName = jQuery('#methodName').val(),
        methodName = imethodName.replace(/\s+/g,"_"),
        methodType = jQuery('#selectMethod').val(),
        methodParameter = jQuery('#parametersSelect').val(),
        idType = jQuery('#typeReturn').val(),
        typeReturn = jQuery('#typeReturn').val();
        
    if(methodParameter == '' || methodParameter == '..'){
        showNoty('danger', 'Select a method type');
    }else if(imethodName == ''){
        showNoty('danger', 'Method name is empty');        
    }else if(methodParameter != '' && imethodName != ''){
        if (methodType == 'get') {
            var varFn = methodName;
            methodName = methodName.toLowerCase();
            /* Parameter ID */
            if (methodParameter == 'Id' && typeReturn == 'String') {
                fn_get  = '    public function get_' + varFn + '($id, $FORMAT = "NORMAL") {\n';
                fn_get += '        if (is_numeric($id) && $id < $this->count) {\n';
                fn_get += '            switch ($FORMAT) {\n';
                fn_get += '                case "HTML" :\n';
                fn_get += '                    return htmlentities($this->' + methodName + '[$id], (int) $this->flag, "Windows-1252", true);\n';
                fn_get += '                case "INPUT" :\n';
                fn_get += '                    return htmlspecialchars_decode(htmlspecialchars(htmlentities($this->' + methodName + '[$id], (int) $this->flag, "Windows-1252", true)), ENT_NOQUOTES);\n';
                fn_get += '                default :\n';
                fn_get += '                    return $this->' + methodName + '[$id];\n';
                fn_get += '            }\n';
                fn_get += '        } else {\n';
                fn_get += '            return "";\n';
                fn_get += '        }\n';
                fn_get += '    }\n';
            }else if(methodParameter == 'Id' && typeReturn == 'Boolean'){
                fn_get  ='    public function get_' + varFn + '($id) {\n';
                fn_get +='        if (is_numeric($id) && $id < $this->count) {\n';
                fn_get +='            return $this->' + methodName + '[$id];\n';
                fn_get +='        } else {\n';
                fn_get +='            return FALSE;\n';
                fn_get +='        }\n';
                fn_get +='    }\n';
            }else if(methodParameter == 'Id' && typeReturn == 'Array'){
                fn_get  ='    public function get_' + varFn + '($id) {\n';
                fn_get +='        if (is_numeric($id)  && $id < $this->count) {\n';
                fn_get +='            return $this->' + methodName + ';\n';
                fn_get +='        } else {\n';
                fn_get +='            return array();\n';
                fn_get +='        }\n';
                fn_get +='    }\n';
            }else if(methodParameter == 'Id' && typeReturn == 'Integer'){
                fn_get  ='    public function get_' + varFn + '($id) { \n';
                fn_get +='        if (is_numeric($id) && $id < $this->count) { \n';
                fn_get +='            return $this->' + methodName + '[$id]; \n';
                fn_get +='        } else { \n';
                fn_get +='            return 0; \n';
                fn_get +='        } \n';
                fn_get +='    } \n';
            }
            /* END Parameter ID */
            /* Parameter String */            
            if (methodParameter == 'String' && typeReturn == 'Array') {
                fn_get  ='    public function get_' + varFn + '($str) {\n';
                fn_get +='        if (is_string($str)) {\n';
                fn_get +='            return $this->' + methodName + ';\n';
                fn_get +='        } else {\n';
                fn_get +='            return array();\n';
                fn_get +='        }\n';
                fn_get +='    }\n';
            }else if (methodParameter == 'String' && typeReturn == 'Integer') {
                fn_get  ='    public function get_' + varFn + '($str) {\n';
                fn_get +='        if (is_string($str)) {\n';
                fn_get +='            return $this->' + methodName + '[$str];\n';
                fn_get +='        } else {\n';
                fn_get +='            return 0;\n';
                fn_get +='        }\n';
                fn_get +='    }\n';
            }else if (methodParameter == 'String' && typeReturn == 'String') {
                fn_get  = '    public function get_' + varFn + '($str, $FORMAT = "NORMAL") {\n';
                fn_get += '        if (is_string($str)) {\n';
                fn_get += '            switch ($FORMAT) {\n';
                fn_get += '                case "HTML" :\n';
                fn_get += '                    return htmlentities($this->' + methodName + '[$str], (int) $this->flag, "Windows-1252", true);\n';
                fn_get += '                case "INPUT" :\n';
                fn_get += '                    return htmlspecialchars_decode(htmlspecialchars(htmlentities($this->' + methodName + '[$str], (int) $this->flag, "Windows-1252", true)), ENT_NOQUOTES);\n';
                fn_get += '                default :\n';
                fn_get += '                    return $this->' + methodName + '[$str];\n';
                fn_get += '            }\n';
                fn_get += '        } else {\n';
                fn_get += '            return "";\n';
                fn_get += '        }\n';
                fn_get += '    }\n';
            }else if (methodParameter == 'String' && typeReturn == 'Boolean') {
                fn_get  ='    public function get_' + varFn + '($str) {\n';
                fn_get +='        if (is_string($str)) {\n';
                fn_get +='            return $this->' + methodName + '[$str];\n';
                fn_get +='        } else {\n';
                fn_get +='            return FALSE;\n';
                fn_get +='        }\n';
                fn_get +='    }\n';
            }
            /* END Parameter String */
            /* Parameter Integer */            
            if (methodParameter == 'Integer' && typeReturn == 'Array') {
                fn_get  ='    public function get_' + varFn + '($int) {\n';
                fn_get +='        if (is_numeric($int)) {\n';
                fn_get +='            return $this->' + methodName + ';\n';
                fn_get +='        } else {\n';
                fn_get +='            return array();\n';
                fn_get +='        }\n';
                fn_get +='    }\n';
            }else if (methodParameter == 'Integer' && typeReturn == 'Integer') {
                fn_get = '    public function get_' + varFn + '($int) {\n';
                fn_get +='        if (is_numeric($int)) {\n';
                fn_get +='            return $this->' + methodName + '[$int];\n';
                fn_get +='        } else {\n';
                fn_get +='            return 0;\n';
                fn_get +='        }\n';
                fn_get +='    }\n';
            }else if (methodParameter == 'Integer' && typeReturn == 'String') {
                fn_get  = '    public function get_' + varFn + '($int, $FORMAT = "NORMAL") {\n';
                fn_get += '        if (is_numeric($int)) {\n';
                fn_get += '            switch ($FORMAT) {\n';
                fn_get += '                case "HTML" :\n';
                fn_get += '                    return htmlentities($this->' + methodName + '[$int], (int) $this->flag, "Windows-1252", true);\n';
                fn_get += '                case "INPUT" :\n';
                fn_get += '                    return htmlspecialchars_decode(htmlspecialchars(htmlentities($this->' + methodName + '[$int], (int) $this->flag, "Windows-1252", true)), ENT_NOQUOTES);\n';
                fn_get += '                default :\n';
                fn_get += '                    return $this->' + methodName + '[$int];\n';
                fn_get += '            }\n';
                fn_get += '        } else {\n';
                fn_get += '            return "";\n';
                fn_get += '        }\n';
                fn_get += '    }\n';
            }else if (methodParameter == 'Integer' && typeReturn == 'Boolean') {
                fn_get  ='    public function get_' + varFn + '($int) {\n';
                fn_get +='        if (is_numeric($int)) {\n';
                fn_get +='            return $this->' + methodName + '[$int];\n';
                fn_get +='        } else {\n';
                fn_get +='            return FALSE;\n';
                fn_get +='        }\n';
                fn_get +='    }\n';
            }
            /* END Integer String */
            /* Parameter Boolean */   
            if (methodParameter == 'Boolean' && typeReturn == 'Array') {
                fn_get  ='    public function get_' + varFn + '($bln) {\n';
                fn_get +='        if (is_bool($bln)) {\n';
                fn_get +='            return $this->' + methodName + ';\n';
                fn_get +='        } else {\n';
                fn_get +='            return array();\n';
                fn_get +='        }\n';
                fn_get +='    }\n';
            }else if (methodParameter == 'Boolean' && typeReturn == 'Integer') {
                fn_get  ='    public function get_' + varFn + '($bln) {\n';
                fn_get +='        if (is_bool($bln)) {\n';
                fn_get +='            return $this->' + methodName + ';\n';
                fn_get +='        } else {\n';
                fn_get +='            return 0;\n';
                fn_get +='        }\n';
                fn_get +='    }\n';
            }else if (methodParameter == 'Boolean' && typeReturn == 'String') {
                fn_get  ='    public function get_' + varFn + '($bln, $FORMAT = "NORMAL") {\n';
                fn_get +='        if (is_bool($bln)) {\n';
                fn_get +='            switch ($FORMAT) {\n';
                fn_get +='                case "HTML" :\n';
                fn_get +='                    return htmlentities($this->' + methodName + '[$bln], (int) $this->flag, "Windows-1252", true);\n';
                fn_get +='                case "INPUT" :\n';
                fn_get +='                    return htmlspecialchars_decode(htmlspecialchars(htmlentities($this->' + methodName + '[$bln], (int) $this->flag, "Windows-1252", true)), ENT_NOQUOTES);\n';
                fn_get +='                default :\n';
                fn_get +='                    return $this->' + methodName + '[$bln];\n';
                fn_get +='            }\n';
                fn_get += '        } else {\n';
                fn_get += '            return "";\n';
                fn_get += '        }\n';
                fn_get += '    }\n';
            }else if (methodParameter == 'Boolean' && typeReturn == 'Boolean') {
                fn_get  ='    public function get_' + varFn + '($bln) {\n';
                fn_get +='        if (is_bool($bln)) {\n';
                fn_get +='            return $this->' + methodName + '[$bln];\n';
                fn_get +='        } else {\n';
                fn_get +='            return FALSE;\n';
                fn_get +='        }\n';
                fn_get +='    }\n';
            }
            /* END Parameter boolean */
            /* Parameter Array */   
            if (methodParameter == 'Array' && typeReturn == 'Array') {
                fn_get  ='    public function get_' + varFn + '($arr) {\n';
                fn_get +='        if (is_array($arr) && !empty($arr)) {\n';
                fn_get +='            return $this->' + methodName + ';\n';
                fn_get +='        } else {\n';
                fn_get +='            return array();\n';
                fn_get +='        }\n';
                fn_get +='    }\n';
            }else if (methodParameter == 'Array' && typeReturn == 'Integer') {
                fn_get +='    public function get_' + varFn + '($arr) {\n';
                fn_get +='        if (is_array($arr) && !empty($arr)) {\n';
                fn_get +='            return $this->' + methodName + '[$arr];\n';
                fn_get +='        } else {\n';
                fn_get +='            return 0;\n';
                fn_get +='        }\n';
                fn_get +='    }\n';
            }else if (methodParameter == 'Array' && typeReturn == 'String') {
                fn_get  = '    public function get_' + varFn + '($arr, $FORMAT = "NORMAL") {\n';
                fn_get += '        if (is_array($arr) && !empty($arr)) {\n';
                fn_get += '            switch ($FORMAT) {\n';
                fn_get += '                case "HTML" :\n';
                fn_get += '                    return htmlentities($this->' + methodName + '[$arr], (int) $this->flag, "Windows-1252", true);\n';
                fn_get += '                case "INPUT" :\n';
                fn_get += '                    return htmlspecialchars_decode(htmlspecialchars(htmlentities($this->' + methodName + '[$arr], (int) $this->flag, "Windows-1252", true)), ENT_NOQUOTES);\n';
                fn_get += '                default :\n';
                fn_get += '                    return $this->' + methodName + '[$arr];\n';
                fn_get += '            }\n';
                fn_get += '        } else {\n';
                fn_get += '            return "";\n';
                fn_get += '        }\n';
                fn_get += '    }\n';
            }else if (methodParameter == 'Array' && typeReturn == 'Boolean') {
                fn_get  ='    public function get_' + varFn + '($arr) {\n';
                fn_get +='        if (is_array($arr) && !empty($arr) {\n';
                fn_get +='            return $this->' + methodName + '[$arr];\n';
                fn_get +='        } else {\n';
                fn_get +='            return FALSE;\n';
                fn_get +='        }\n';
                fn_get +='    }\n';
            }
            /* END Parameter Array */
            /* Parameter Float */
            if (methodParameter == 'Float' && typeReturn == 'Array') {
                fn_get  ='    public function get_' + varFn + '($flt) {\n';
                fn_get +='        if (is_numeric($flt)) {\n';
                fn_get +='            return $this->' + methodName + ';\n';
                fn_get +='        } else {\n';
                fn_get +='            return array();\n';
                fn_get +='        }\n';
                fn_get +='    }\n';
            }else  if (methodParameter == 'Float' && typeReturn == 'Integer') {
                fn_get  ='    public function get_' + varFn + '($flt) {\n';
                fn_get +='        if (is_numeric($flt)) {\n';
                fn_get +='            return $this->' + methodName + '[$flt];\n';
                fn_get +='        } else {\n';
                fn_get +='            return 0;\n';
                fn_get +='        }\n';
                fn_get +='    }\n';
            }else if (methodParameter == 'Float' && typeReturn == 'String') {
                fn_get  = '    public function get_' + varFn + '($flt, $FORMAT = "NORMAL") {\n';
                fn_get += '        if (is_numeric($flt)) {\n';
                fn_get += '            switch ($FORMAT) {\n';
                fn_get += '                case "HTML" :\n';
                fn_get += '                    return htmlentities($this->' + methodName + '[$flt], (int) $this->flag, "Windows-1252", true);\n';
                fn_get += '                case "INPUT" :\n';
                fn_get += '                    return htmlspecialchars_decode(htmlspecialchars(htmlentities($this->' + methodName + '[$flt], (int) $this->flag, "Windows-1252", true)), ENT_NOQUOTES);\n';
                fn_get += '                default :\n';
                fn_get += '                    return $this->' + methodName + '[$flt];\n';
                fn_get += '            }\n';
                fn_get += '        } else {\n';
                fn_get += '            return "";\n';
                fn_get += '        }\n';
                fn_get += '    }\n';
            }else if (methodParameter == 'Float' && typeReturn == 'Boolean') {
                fn_get  ='    public function get_' + varFn + '($flt) {\n';
                fn_get +='        if (is_numeric($flt)) {\n';
                fn_get +='            return $this->' + methodName + '[$flt];\n';
                fn_get +='        } else {\n';
                fn_get +='            return FALSE;\n';
                fn_get +='        }\n';
                fn_get +='    }\n';
            }
            /* END Parameter Float */
            clsBuilder.var[methodName] = 'protected $' + methodName.toLowerCase() + ' = array();\n';
            clsBuilder.varExc[methodName] = '$this->' + methodName.toLowerCase() + '[] = $row[0];\n';
            clsBuilder.varCl[methodName] = '$this->' + methodName.toLowerCase() + ' = array();\n';

            addTotable(methodType, methodName.toLowerCase(), methodParameter, idType, clsBuilder);
            clsBuilder.fnGet[varFn] = fn_get;
            fn_get = '';
            showNoty('success', 'Add Method type ' + methodType + ' name="' + methodName + '"');
            
            /**/
            if(typeof clsBuilder.execute == 'string'){
                exc ='    public function execute() {\n';
                exc+='        $SQL="";\n';
                exc+='        //echo $SQL;\n';
                exc+='        $this->Clear_Results();\n';
                exc+='        $result = mysqli_query($this->dbh, $SQL);\n';
                exc+='        while ($row = mysqli_fetch_row($result)) {\n';
                for (var key in clsBuilder.varExc){ 
                    exc+='            '+clsBuilder.varExc[key];
                }
                exc+='        }\n';
                exc+='        mysqli_free_result($result);\n';
                exc+='        //$this->count = count($this->);\n';
                exc+='    }';
                clsBuilder.execute = exc;
            }
            
        } else if (methodType == 'set') {
            var varFn = firstUpperCase(methodName);
            methodName = methodName.toUpperCase();
            if (methodParameter == 'Integer') {
                clsBuilder.var[methodName] = 'protected $' + methodName + ' = 0;\n';
                fn_set  ='    public function set_' + varFn + '($int) {\n';
                fn_set +='        if (is_numeric($int)) {\n';
                fn_set +='            $this->' + methodName + ' = $int;\n';
                fn_set +='        } else {\n';
                fn_set +='            $this->' + methodName + ' = 0;\n';
                fn_set +='        }\n';
                fn_set +='    }\n';
            }
            if (methodParameter == 'Id') {
                clsBuilder.var[methodName] = 'protected $' + methodName + ' = 0;\n';
                fn_set  ='    public function set_' + varFn + '($id) {\n';
                fn_set +='        if (is_numeric($id) ) {\n';
                fn_set +='            $this->' + methodName + ' = "= $id";\n';
                fn_set +='        } else {\n';
                fn_set +='            $this->' + methodName + ' = "> 0";\n';
                fn_set +='        }\n';
                fn_set +='    }\n';
            }else if (methodParameter == 'String') {
                clsBuilder.var[methodName] = 'protected $' + methodName + ' = "";\n';
                fn_set  ='    public function set_'+varFn+'($str) {\n';
                fn_set +='        if (is_string($str)) {\n';
                fn_set +='            $this->'+methodName+' = $str;\n';
                fn_set +='        } else {\n';
                fn_set +='            $this->'+methodName+' = "";\n';
                fn_set +='        }\n';
                fn_set +='    }\n';
            }else if (methodParameter == 'Boolean') {
                clsBuilder.var[methodName] = 'protected $' + methodName + ' = "";\n';
                fn_set  ='    public function set_'+varFn+'($bln) {\n';
                fn_set +='        if (is_bool($bln)) {\n';
                fn_set +='            $this->'+methodName+' = $bln;\n';
                fn_set +='        } else {\n';
                fn_set +='            $this->'+methodName+' = FALSE;\n';
                fn_set +='        }\n';
                fn_set +='    }\n';
            }else if (methodParameter == 'Float') {
                clsBuilder.var[methodName] = 'protected $' + methodName + ' = 0;\n';
                fn_set  ='    public function set_'+varFn+'($flt) {\n';
                fn_set +='        if (is_numeric($flt)) {\n';
                fn_set +='            $this->'+methodName+' = $flt;\n';
                fn_set +='        } else {\n';
                fn_set +='            $this->'+methodName+' = 0;\n';
                fn_set +='        }\n';
                fn_set +='    }\n';
            }else if (methodParameter == 'Array') {
                clsBuilder.var[methodName] = 'protected $' + methodName + ' = array();\n';
                fn_set  ='    public function set_'+varFn+'($arr) {\n';
                fn_set +='	  if (is_array($arr)) {\n';
                fn_set +='            $this->'+methodName+' = $arr;\n';
                fn_set +='        } else {\n';
                fn_set +='            $this->'+methodName+' = array();\n';
                fn_set +='        }\n';
                fn_set +='    }\n';
            }
            addTotable(methodType, varFn, methodParameter, '&nbsp;', clsBuilder);
            clsBuilder.fnSet[varFn] = fn_set;
            fn_set = '';
            showNoty('success', 'Add Method type ' + methodType + ' name="' + methodName + '"');
        } 
        /*Reset inputs & selects*/
        jQuery('#selectMethod').val('');
        jQuery('#selectMethod').select2();
        jQuery('#methodName').val('');
        jQuery('#parametersSelect').val(''); 
        jQuery('#parametersSelect').select2();
        jQuery('#typeReturn').val('');
        jQuery('#typeReturn').select2();
    }else{
        showNoty('danger', 'Error, "input name" and "method type" are empty');
    }
});

/*Generate console and code*/
jQuery('#btnCreateCode').click(function(){
    if(jQuery('#className').val() == ''){
        showNoty('danger', 'Input "Class name" is empty');
    }else{
        var code = constructCode(clsBuilder);
        createTxtArea(code);
        jQuery('.CodeMirror, #areaCode').css({'height':'auto'});
        jQuery('.CodeMirror').each(function(i, el){
            el.CodeMirror.refresh();
        });
    }
});

/*Functions*/
function createTxtArea(code){
    jQuery('#txtArea').html('');
    jQuery('.codeTitle').show();
    jQuery('#txtArea').append('<textarea id="areaCode" class="w-100" data-lang="text/php"></textarea>');
    jQuery('#areaCode').append(code);
    var textArea = document.getElementById('areaCode');
    var editor = CodeMirror.fromTextArea(textArea,{
        mode: 'text/x-php',
        lineNumbers: false,
        theme: 'lesser-dark',
        styleActiveLine: true,
        matchBrackets: true
    }); 
}

function constructCode(clsBuilder){
    /*validate*/
    if(jQuery('#dataBase:checked').val() != 'on'){
        delete clsBuilder.var['dbh'];
        delete clsBuilder.var['bconn'];
        delete clsBuilder.var['sql'];
        delete clsBuilder.const;
    }else if(!clsBuilder.var['dbh'] && jQuery('#dataBase:checked').val() == 'on'){
        clsBuilder.var = {
            bconn:'protected $obj_bconn;\n',
            dbh:  'protected $dbh;\n',
            sql:  'protected $SQL;\n',
            count:'protected $count = 0;\n'
        };
        
        iconst  ='    function __construct() {\n';
        iconst +='        require_once APPROOT . "/include-php/dbconn/clsMyDBConn.php";\n';
        iconst +='        $this->obj_bconn = new MyConn();\n';
        iconst +='        $this->dbh = $this->obj_bconn->get_conn();\n';
        iconst +='    }\n';
        clsBuilder.const = iconst;
    }
    
    if(jQuery.isEmptyObject(clsBuilder.fnGet)){
        iExc  ='    public function execute(){\n';
        iExc +='        $SQL="";\n';
        iExc +='        $result = mysqli_query($this->dbh, $SQL);\n';
        iExc +='        mysqli_free_result($result);\n';
        iExc +='    }';
        clsBuilder.execute = iExc;
    }
    if(jQuery('#count:checked').val() != 'on'){
        delete clsBuilder.var.count;
        delete clsBuilder.varCl.count;
    }else{
        clsBuilder.var['count'] = 'protected $count = 0;\n';
        clsBuilder.varCl['count'] = '$this->count = 0;\n';
    }
    
    /*Class Clear*/
    clearR = '    private function Clear_Results(){\n';
    for (var key in clsBuilder.varCl){ 
        clearR +='        '+ clsBuilder.varCl[key];
    }
    clearR +='    }';
    
    /*Construc code*/
    clsBuilder.name = jQuery('#className').val().replace(/\s+/g,"_");
    
    var code  = 'class '+clsBuilder.name+' {\n';
        code += '\n';
        //Bucle de variables
        for (var key in clsBuilder.var){ 
            code += '    '+clsBuilder.var[key];
        }
        code += '\n\n';
        if(typeof clsBuilder.const != 'undefined'){
            code += clsBuilder.const;
            code += '\n';
        }
        /**/
        if(jQuery('#dataBase:checked').val() =='on'){
            code += clsBuilder.execute+'\n';
        }
        if(typeof clsBuilder.count == 'string' && jQuery('#count:checked').val() == 'on'){
             code += clsBuilder.count+'\n';
        }
        for (var key in clsBuilder.fnGet){ 
            code += clsBuilder.fnGet[key];
        }
        code += '\n\n';
        for (var key in clsBuilder.fnSet){ 
            code += clsBuilder.fnSet[key];
        }
        if(clearR != '' && jQuery('#dataBase:checked').val() == "on"){
            code += clearR;
        }
        code += '\n';
        code += '}';
    // Return
    return code;
}

/*UpperCase*/
function firstUpperCase(str) {
    str = str.replace(str[0], str[0].toUpperCase());
    return str;
}
/*LowerCase*/
function firstLowerCase(str){
    str = str.replace(str[0], str[0].toLowerCase());
    return str;
}

function addTotable(mType, name, parameter, type, obj){
    var objt =obj;
    jQuery('#tableCont').append('<tr><td>'+mType+'</td> <td>'+name+'</td> <td>'+parameter+'</td><td>'+type+'</td><td><button onclick="delRow(jQuery(this),\''+mType+'\',\''+name+'\');" type="button" class="btn btn-danger pull-right btn-lesspad"><i class="far fa-trash-alt"></i></button></td></tr>');
}
/*delete element table*/
function delRow(elem, type, name){
    fnName = firstUpperCase(name);
    jQuery(elem).parent().parent().remove();
    
    if(type =='get'){
        delete clsBuilder.var[name];
        delete clsBuilder.varCl[name];
        delete clsBuilder.varExc[name];
        delete clsBuilder.fnGet[fnName];
    }else if(type =='set'){
        delete clsBuilder.var[name.toUpperCase()];
        delete clsBuilder.varCl[name.toUpperCase()];
        delete clsBuilder.fnSet[fnName];
    }
}
