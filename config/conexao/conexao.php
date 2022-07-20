<?php
	setlocale(LC_TIME, 'pt_BR', 'pt_BR.utf-8', 'pt_BR.utf-8', 'portuguese');
	date_default_timezone_set('America/Sao_Paulo');

	/**********/

	if (in_array($_SERVER['REMOTE_ADDR'], ['127.0.0.1', 'localhost', '::1'])) {

		$sqlHost = "localhost";
		$sqlUser = "root";
		$sqlPass = "";
		$sqlDb   = "anonymous_roulette";

	} else {

		$sqlHost = "localhost";
		$sqlUser = "maksoud";
		$sqlPass = "@2r8425hwer";
		$sqlDb   = "anonymous_roulette";

	}// else if (in_array($_SERVER['REMOTE_ADDR'], ['127.0.0.1', 'localhost', '::1']))

	/**********/
	
	try {

		$conexao = new PDO('mysql:host='.$sqlHost.';dbname='.$sqlDb, $sqlUser, $sqlPass);
		$conexao ->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	} catch(PDOException $e){

		echo 'ERROR: ' . $e->getMessage();

	}

?>