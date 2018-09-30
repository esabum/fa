<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

/*Load values from .ini*/
define('APPROOT', $_SERVER['DOCUMENT_ROOT']);
$ini_array = parse_ini_file(APPROOT . '/.config.ini', true);
define('APPBASE', $ini_array["general"]["appbase"]);

foreach ($_POST as $key => $val) {
    $$key = trim($val);
}

if (isset($username) && $username <> '') {
    require_once APPROOT . '/model/dbconnector/clsMyDBConn.php';
    $obj_bconn = new MyConn();
    $dbh = $obj_bconn->get_conn();

    $flag = 'SEND_MAIL_FROM';
    $HTML_FLAG = 'ENT_SUBSTITUTE';

//get the user data
    $SQL = "SELECT first, last, email, language_id FROM iusers 
	WHERE email = '" . mysqli_real_escape_string($dbh, mb_convert_encoding(trim($username), 'WINDOWS-1252', 'UTF-8')) . "';";
    $result = mysqli_query($dbh, $SQL);
    if ($row = mysqli_fetch_row($result)) {
        $user = htmlentities($row[2], (int) $HTML_FLAG, "Windows-1252", true);
        $name = htmlentities($row[0], (int) $HTML_FLAG, "Windows-1252", true);
        $last = htmlentities($row[1], (int) $HTML_FLAG, "Windows-1252", true);
        $lang = $row[3];
    } else {
        die('0');
    }
    mysqli_free_result($result);

    require_once APPROOT . '/config/labels/model/clsLabel.php';
    $objLabel = New Labels;
    $lblEmailHeader = $objLabel->get_Label('lblEmailHeader', $lang);
    $lblEmailBody = $objLabel->get_Label('lblEmailBody', $lang);
    $lblUser = $objLabel->get_Label('lblUser', $lang);
    $lblPassword = $objLabel->get_Label('lblPassword', $lang);
    $lblWelcome = $objLabel->get_Label('lblWelcome', $lang);

//generation the new password
    $characters = 'BbCcDdFfGgHhJjKkLlMmNnPpQqRrSsTtUuVvWwXxYyZz123456789';

    $password = '';
    for ($i = 0; $i < 10; $i++) {
        $password .= $characters[rand(0, strlen($characters) - 1)];
    }

//update the user with the new password
    $SQL = "UPDATE iusers set pass = '" . md5($password) . "'
	WHERE (email = '" . mysqli_real_escape_string($dbh, mb_convert_encoding(trim($username), 'WINDOWS-1252', 'UTF-8')) . "');";
    $result = mysqli_query($dbh, $SQL);

	require_once APPROOT . '/mailer/assets/PHPMailer/PHPMailerAutoload.php';

	$mail = new phpmailer();
	$mail->isSMTP();
	$mail->Host = "latinconnect.com ";
	$mail->SMTPAuth = true;
	$mail->Username = "esaco02@gmail.com";
	$mail->Password = "ctph2874";
	$mail->SMTPSecure = 'tls';
	$mail->Port = 587;

	$mail->setFrom("autogestion@latinconnect.com", "User manager");
	$mail->addAddress($user, $name . ' ' . $last);
	$mail->addReplyTo('it@aratours.com', 'IT - Ara Tours');
//$mail->addCC('it@aratours.com', 'IT - Ara Tours');
    $mail->addBCC('it@aratours.com', 'IT - Ara Tours');

    $mail->Subject = $lblWelcome;

    $message = $lblEmailHeader . " " . $name . " " . $last . ":\r\n";
    $message .= $lblEmailBody . "\r\n";
    $message .= $lblUser . ": " . $user . "\r\n";
    $message .= $lblPassword . ": " . trim($password) . "\r\n";
    echo $message;
    $mail->Body = nl2br($message); //Si el que recibe no admite texto HTML, utiliza texto plano.
    $mail->AltBody = $message;

    $result = $mail->Send();

    if ($result){
        echo '1';
    } else {
        echo '2';
    }
}


?>

