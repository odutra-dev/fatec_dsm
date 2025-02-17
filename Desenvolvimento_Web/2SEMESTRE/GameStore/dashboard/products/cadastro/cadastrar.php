<?php

session_start();

if (isset($_SESSION["name"])) {

    if (!isset($_COOKIE["cookie"])) {
        session_destroy();
        session_unset();
        header("location:../entrar");
    }

    include '../../../connection.php';

    if (!empty($_POST["btnCadastro"])) {
        $nome = $_POST["name"];
        $amount = $_POST["amount"];
        $price = $_POST["price"];

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

            if ($fileName != "") {
                $path = $pasta . $newname . "." . $extension;
                move_uploaded_file($file['tmp_name'], $path);
            }


        }

        try {
            $insert = $conn->prepare("INSERT INTO produto (nm_produto, qt_produto, vl_produto, nm_image, nm_path) 
                    VALUES ('$nome', '$amount', '$price', '$fileName', '$path')");
            $insert->execute();

            $conn = null;

            header("location:../");

        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

} else {
    header("location:../../../entrar");
}
?>