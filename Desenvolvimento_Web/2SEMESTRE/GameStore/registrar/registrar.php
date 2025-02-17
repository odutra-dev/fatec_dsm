<?php


if (!empty($_POST["btnRegister"])) {
    include '../connection.php';

    $username = $_POST["username"];
    $email = $_POST["useremail"];
    $password = $_POST["userpassword"];



    $select = $conn->prepare("SELECT * FROM USUARIO WHERE nm_email = '$email'");
    $select->execute();

    if ($select->rowCount() > 0) {
        echo "Email já cadastrado";
        die();
    }

    try {

        $password = password_hash($password, PASSWORD_DEFAULT);
        $username = strtolower($username);

        $insert = $conn->prepare("INSERT INTO USUARIO (nm_usuario, nm_email, cd_senha) VALUES ('$username', '$email', '$password')");
        $insert->execute();

        $select = $conn->prepare("SELECT * FROM USUARIO WHERE nm_email = '$email'");
        $select->execute();

        $usuario = $select->fetch();
        session_start();
        session_set_cookie_params(1800);
        $_SESSION["name"] = $usuario["nm_usuario"];
        
        header("location:../cookie.php");

    } catch (PDOException $e) {
        echo $e->getMessage();
    }
}
?>