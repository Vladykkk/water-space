<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception';
	require 'phpmailer/src/PHPMailer';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ua', 'phpmailer/language/');
	$mail->IsHTML(true);

	// Від кого письмо
	$mail->setFrom('water-space', 'water-space2');

	// Кому відправити
	$mail->addAdress('rubakvlad7@gmail.com');

	// Тема письма
	$mail->Subject = 'Привіт! це тест';

	// Тіло письма
	$body = '<h1>Заголовок</h1>';

	if(trim(!empty($_POST['name']))){
		$body.="<p><strong>Ім'я:</strong>".$_POST['name'].'</p>';
	}

	if(trim(!empty($_POST['email']))){
		$body.='<p><strong>E-mail:</strong>'.$_POST['email'].'</p>';
	}

	if(trim(!empty($_POST['number']))){
		$body.='<p><strong>Номер телефону:</strong>'.$_POST['number'].'</p>';
	}

	if(trim(!empty($_POST['area']))){
		$body.='<p><strong>Область:</strong>'.$_POST['area'].'</p>';
	}

	if(trim(!empty($_POST['city']))){
		$body.='<p><strong>Місто:</strong>'.$_POST['city'].'</p>';
	}

	if(trim(!empty($_POST['adress']))){
		$body.='<p><strong>Адреса:</strong>'.$_POST['adress'].'</p>';
	}

	$mail->Body = $body;

	// Sending
	if (!$mail->send()){
		$message = 'Помилка';
	} else {
		$message = 'Дані відправлені!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);

?>
	