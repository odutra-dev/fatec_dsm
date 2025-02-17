<?php

session_start();

if (isset($_SESSION["name"])) {

    if (!isset($_COOKIE["cookie"])) {
        session_destroy();
        session_unset();
        header("location:../entrar");
    }

    include '../../../connection.php';
    $id = $_GET["id"];

    $sql = $conn->prepare("SELECT * FROM produto WHERE cd_produto = '$id'");
    $sql->execute();

    $product = $sql->fetch(PDO::FETCH_ASSOC);

    ?>

    <head>
        <link rel="stylesheet" href="../../../css/editar.css">
        <script src="../../../js/displayImage.js"></script>
    </head>

    <main class="main">

        <div class="left">
            <img src="../../../images/logo.svg" alt="Logo" class="logo">
            <img src="../../../images/controller.svg" alt="Logo">
        </div>

        <div class="right">

            <h1 class="title">Preencha os dados do produto</h1>

            <form id="form" action="editar.php?id=<?php echo $product['cd_produto']; ?>" method="post" enctype="multipart/form-data">
                <div class="file-input-container">
                    <label for="file-input" class="file-label">
                        <span class="plus-icon">+</span>
                    </label>
                    <input type="file" id="file-input" name="file-input" class="hidden" accept="image/*"
                        onchange="displayImage()" required>
                    <img id="selected-image" class="<?php
                    if ($product['nm_image'] != null) {
                        echo "show";
                    } else {
                        echo "hidden";
                    }

                    ?>" src="<?php
                    if ($product['nm_path'] != null) {
                        echo $product['nm_path'];
                    }
                    ?>" alt="Imagem Selecionada">
                </div>
                <div>
                    <label for="name">Nome:</label>
                    <input type="text" name="name" id="name" placeholder="Mega Drive"
                        value="<?php echo $product['nm_produto']; ?>" required>
                </div>
                <div>
                    <label for="amount">Quantidade:</label>
                    <input type="number" name="amount" id="amount" placeholder="01"
                        value="<?php echo $product['qt_produto']; ?>" required>
                </div>
                <div>
                    <label for="price">Preço:</label>
                    <input type="number" name="price" id="price" step="0.01" placeholder="R$ 0,00"
                        value="<?php echo $product['vl_produto']; ?>" required>
                </div>
                <input type="submit" value="Editar" name="btnEditar">
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