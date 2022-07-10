<?php
    ob_start();
    session_start();
    include("conexao/conexao.php");
    header("Location: ../?acao=multipla");
    session_unset();
    session_destroy();
?>