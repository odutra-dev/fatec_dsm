<?php

session_start();

if (isset($_SESSION["name"])) {

    if (!isset($_COOKIE["cookie"])) {
        session_destroy();
        session_unset();
        header("location:../entrar");
    }

    include "../../connection.php";
    $id = $_GET["id"];

    try {
        $sql = $conn->prepare("DELETE FROM produto WHERE cd_produto = '$id'");
        $sql->execute();
        $conn = null;
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    header("location:index.php");
} else {
    header("location:../../index.php");
}
?>