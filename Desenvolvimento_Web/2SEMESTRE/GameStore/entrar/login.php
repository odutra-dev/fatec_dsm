<?php
include '../connection.php';

if (!empty($_POST["btnLogin"])) {
    $email = $_POST["useremail"];
    $password = $_POST["userpassword"];

    try {
        $select = $conn->prepare("SELECT nm_usuario, nm_email, cd_senha FROM usuario WHERE nm_email = '$email'");
        $select->execute();

        if ($select->rowCount() > 0) {
            $usuario = $select->fetch();

            if (password_verify($password, $usuario["cd_senha"])) {
                
                if(!empty($_POST["remember"])){
                    setcookie("email", $email, time() + 60 * 60 * 24 * 30);
                }

                
                
                session_start();
                session_set_cookie_params(1800);
                $_SESSION["name"] = $usuario["nm_usuario"];
                
                header("location:../cookie.php");
            } else {

                header("location:./");
            }
        } else {

            header("location:./");
        }

        $conn = null;
    } catch (Exception $e) {
        echo $e->getMessage();
    }
}
?>