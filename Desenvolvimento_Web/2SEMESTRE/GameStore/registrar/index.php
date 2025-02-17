<?php

session_start();

if (isset($_SESSION["name"])) {
    header("location:../dashboard");
} else {
    session_abort();
}
?>

<head>
    <link rel="stylesheet" href="../css/register.css">
</head>

<main class="main">

    <div class="left">
        <img src="../images/logo.svg" alt="Logo" class="logo">
        <img src="../images/controller.svg" alt="Logo">
    </div>

    <div class="right">

        <h1 class="title">Cadastrar-se</h1>

        <form action="registrar.php" method="post">
            <div>
                <label for="username" class="name">Nome:</label>
                <input type="text" name="username" id="username" placeholder="Seu nome" required>
            </div>
            <div>
                <label for="useremail" class="email">Email:</label>
                <input type="email" name="useremail" id="useremail" placeholder="Seu email" required>
            </div>
            <div>
                <label for="userpassword" class="password">Senha:</label>
                <input type="password" name="userpassword" id="userpassword" placeholder="Sua senha" required>
            </div>
            <a href="../entrar">Já tenho conta.</a>
            <input type="submit" value="Cadastre-se" name="btnRegister">
        </form>

    </div>
</main>