<?php 
    if($_SESSION['SSID'] !== $SSID){
		header("Location: ../?acao=negado");
		session_unset();
		session_destroy();
	}
?>