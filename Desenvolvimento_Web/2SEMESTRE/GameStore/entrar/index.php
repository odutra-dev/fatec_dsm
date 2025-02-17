<?php

session_start();

if (isset($_SESSION["name"])) {
    header("location:../dashboard");

    $userEmailSave = "";

    if($_COOKIE["email"]) {
        $userEmailSave = $_COOKIE["email"];
    }
} else {
    session_abort();
}
?>

<head>
    <link rel="stylesheet" href="../css/login.css">
</head>

<main class="main">

    <div class="left">
        <img src="../images/logo.svg" alt="Logo" class="logo">
        <img src="../images/controller.svg" alt="Logo">
    </div>

    <div class="right">

        <h1 class="title">Acessar</h1>

        <form action="login.php" method="post">
            <div>
                <label for="useremail" class="email">Email:</label>
                <input type="email" name="useremail" id="useremail" value="<?php echo $userEmailSave; ?>" placeholder="Seu email" required>
            </div>
            <div>
                <label for="userpassword" class="password">Senha:</label>
                <input type="password" name="userpassword" id="userpassword" placeholder="Sua senha" required>
            </div>
            <div>
                <input type="checkbox" name="remember" id="remember">
                <label for="remember">Lembre-me</label>
            </div>
            <a href="../registrar/">Não tenho conta.</a>
            <input type="submit" value="Entrar" name="btnLogin">
        </form>

    </div>
</main>