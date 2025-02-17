<?php

session_start();

if (isset($_SESSION["name"])) {

    if (!isset($_COOKIE["cookie"])) {
        session_destroy();
        session_unset();
        header("location:../entrar");
    }

    ?>

    <link rel="stylesheet" href="../css/style.css">

    <header>
        <div class="container">
            <div class="logo">
                <a href="../home">
                    <img src="../images/logo.svg" alt="Logo">
                </a>
            </div>

            <nav id="user-menu">
                <ul>
                    <li>
                        <a href="./Products">Ver Produto</a>
                    </li>
                    <li>
                        <a href="./Products/cadastro">Cadastra Produto</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <h2>Seja bem Vindo,
            <?php echo $_SESSION["name"]; ?>
        </h2>
    </main>

    <?php

} else {
    session_destroy();
    session_unset();
    header("location:../entrar");
}
?>