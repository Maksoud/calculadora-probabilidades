<?php
    ob_start();
    session_start();

    include("conexao/conexao.php");

	if (!isset($_SESSION['aRoulette_mail'])) {

		header("Location: login?acao=negado");
		exit;

	}// if (!isset($_SESSION['aRoulette_mail']))

	$emailLogado = $_SESSION['aRoulette_mail'];
	$senhaLogado = $_SESSION['aRoulette_pass'];

	// seleciona a usuario logado
	try {

		$separaUsuario = $conexao->prepare("SELECT * from clientes WHERE email = '$emailLogado' AND senha = '$senhaLogado'");
		$separaUsuario->execute();
		$contar 	   = $separaUsuario->rowCount();	
		$loop 		   = $separaUsuario->fetchAll();

		foreach ($loop as $show){
			$id 			  = $show['id'];
			$nome 			  = $show['nome'];
			$status_pagamento = $show['status_pagamento'];
			$metodo_pagamento = $show['metodo_pagamento'];
			$data_compra   	  = $show['data_compra'];
			$expiracao 		  = $show['expiracao'];
			$ssid 			  = $show['ssid'];
		}
	} catch (PDOWException $erro) {

		echo $erro;

	}

	$hoje 	   = date('Y-m-d');
	$timestamp = strtotime($hoje);
	$nome 	   = explode(" ", $nome);
?>