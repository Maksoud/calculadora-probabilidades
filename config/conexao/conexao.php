<?php
	setlocale(LC_TIME, 'pt_BR', 'pt_BR.utf-8', 'pt_BR.utf-8', 'portuguese');
	date_default_timezone_set('America/Sao_Paulo');

	/**********/

	include('dotEnv.php');
	use DevCoder\DotEnv;

	(new DotEnv('.env'))->load();

	$sqlHost = getenv("SQLHOST");
	$sqlUser = getenv("SQLUSER");
	$sqlPass = getenv("SQLPASS");
	$sqlDb   = getenv("SQLDB");

	// echo $sqlHost;
	// echo $sqlUser;
	// echo $sqlPass;
	// echo $sqlDb;

	/**********/
	
	try {

		$conexao = new PDO("mysql:host={$sqlHost};dbname={$sqlDb}", $sqlUser, $sqlPass);
		$conexao ->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	} catch(PDOException $e) {

		echo $e;
		echo 'ERROR: ' . $e->getMessage();

	}

?>