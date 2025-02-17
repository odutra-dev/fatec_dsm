<?php

if (!empty($_POST["btnEditar"])) {

    if (!isset($_COOKIE["cookie"])) {
        session_destroy();
        session_unset();
        header("location:../entrar");
    }

    include "../../../connection.php";

    $nome = $_POST["name"];
    $amount = $_POST["amount"];
    $price = $_POST["price"];

    $id = $_GET["id"];

    $price = str_replace(",", ".", $price);
    $price = floatval($price);
    $amount = intval($amount);

    if (isset($_FILES['file-input'])) {
        $file = $_FILES['file-input'];
        $fileName = $file['name'];
        $newname = uniqid();
        $extension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $pasta = "../../../public/";
        $path = "";

        if ($product['nm_image'] != null) {
            $fileName = $product['nm_image'];
            $path = $product['nm_path'];
            move_uploaded_file($file['tmp_name'], $path);
        } else if ($fileName != "") {
            $path = $pasta . $newname . "." . $extension;
            move_uploaded_file($file['tmp_name'], $path);
        }
    }

    try {
        $update = $conn->prepare("UPDATE produto SET nm_produto = '$nome', qt_produto = '$amount', vl_produto = '$price', nm_path = '$path' WHERE cd_produto = '$id'");
        $update->execute();

        $conn = null;

        header("location:../");

    } catch (Exception $e) {
        echo $e->getMessage();
    }
}

?>