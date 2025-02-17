<?php

session_start();

if (isset($_SESSION["name"])) {

    if (!isset($_COOKIE["cookie"])) {
        session_destroy();
        session_unset();
        header("location:../entrar");
    }


    include("../../connection.php");

    $sql = $conn->prepare("SELECT * FROM produto");
    $sql->execute();

    $products = $sql->fetchAll(PDO::FETCH_ASSOC);

    ?>

    <head>
        <link rel="stylesheet" href="../../css/style.css">
    </head>

    <header>
        <div class="container">
            <div class="logo">
                <a href="../../home">
                    <img src="../../images/logo.svg" alt="Logo">
                </a>
            </div>

            <div id="divBusca">
                <input type="text" id="txtBusca" placeholder="Faça uma pesquisa">
                <button id="btnBusca">
                    <img src="../../images/icons/search.svg" alt="Botão Buscar">
                </button>
            </div>

            <nav id="user-menu">
                <ul>
                    <li>
                        <a href="./cadastro">Cadastra Produto</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>


    <main>
        <h2>Produtos</h2>

        <div class="produtos-container">


            <?php

            if ($products != null) {

                foreach ($products as $product) {

                    $pathOriginal = $product["nm_path"];
                    $path = str_replace("../../../", "../../", $pathOriginal);

                    echo "<div class='card'>";
                    echo "<div class='card-img'>";
                    echo "<img src='" . $path . "' alt='" . $product['nm_produto'] . "'>";
                    echo "</div>";
                    echo "<h3>" . $product['nm_produto'] . "</h3>";
                    echo "<div class='comprar-preco'>";
                    echo "<button class='btn-comprar'><a href='editar?id=" . $product["cd_produto"] . "'>Editar</a></button>";
                    echo "<a href='deletar.php?id=" . $product["cd_produto"] . "' class='preco'>Deletar</a>";
                    echo "</div>";
                    echo "</div>";
                }
            }
            ?>

        </div>
    </main>





    <?php

} else {
    session_destroy();
    session_unset();
    header("location:../../entrar");
}
?>