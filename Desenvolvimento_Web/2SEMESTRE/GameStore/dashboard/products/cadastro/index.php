<?php

session_start();

if (isset($_SESSION["name"])) {

    if (!isset($_COOKIE["cookie"])) {
        session_destroy();
        session_unset();
        header("location:../entrar");
    }

    ?>

    <head>
        <link rel="stylesheet" href="../../../css/cadastro.css">
        <script src="../../../js/displayImage.js"></script>
    </head>

    <main class="main">

        <div class="left">
            <img src="../../../images/logo.svg" alt="Logo" class="logo">
            <img src="../../../images/controller.svg" alt="Logo">
        </div>

        <div class="right">

            <h1 class="title">Preencha os dados do produto</h1>

            <form id="form" action="cadastrar.php" method="post" enctype="multipart/form-data">
                <div class="file-input-container">
                    <label for="file-input" class="file-label">
                        <span class="plus-icon">+</span>
                    </label>
                    <input type="file" id="file-input" name="file-input" class="hidden" accept="image/*"
                        onchange="displayImage()">
                    <img id="selected-image" class="hidden" src="" alt="Imagem Selecionada">
                </div>
                <div>
                    <label for="name">Nome:</label>
                    <input type="text" name="name" id="name" placeholder="Mega Drive" required>
                </div>
                <div>
                    <label for="amount">Quantidade:</label>
                    <input type="number" name="amount" id="amount" placeholder="01" required>
                </div>
                <div>
                    <label for="price">Preço:</label>
                    <input type="number" name="price" id="price" step="0.01" placeholder="R$ 0,00" required>
                </div>
                <input type="submit" value="Cadastrar" name="btnCadastro">
            </form>
        </div>
    </main>


    <?php

} else {
    session_destroy();
    session_unset();
    header("location:../../../entrar");
}
?>