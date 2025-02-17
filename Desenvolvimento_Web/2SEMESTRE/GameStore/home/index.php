<?php

include("../connection.php");

$sql = $conn->prepare("SELECT * FROM produto");
$sql->execute();

$products = $sql->fetchAll(PDO::FETCH_ASSOC);

?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GameStore</title>

  <link rel="stylesheet" href="../css/style.css">
</head>

<body>
  <header>
    <div class="container">
      <div class="logo">
        <a href="#">
          <img src="../images/logo.svg" alt="Logo">
        </a>
      </div>

      <div id="divBusca">
        <input type="text" id="txtBusca" placeholder="Faça uma pesquisa">
        <button id="btnBusca">
          <img src="../images/icons/search.svg" alt="Botão Buscar">
        </button>
      </div>

      <nav id="user-menu">
        <ul>
          <li>
            <a href="../entrar">Login</a>
          </li>
          <li>
            <a href="../registrar">Cadastro</a>
          </li>
        </ul>
      </nav>

      <div class="cart-icon">
        <ul>
          <li>
            <a href="#">
              <img src="../images/icons/ShoppingCart.svg" alt="Carrinho">
            </a>
          </li>
        </ul>
      </div>

    </div>
  </header>

  <main class="intro">
    <div class="container">
      <h1>Loja Virtual para <span>Gamers Apaixonados</span></h1>
    </div>
  </main>

  <section class="produtos">
    <nav class="categorias">
      <div class="categoria-container">
        <ul>
          <li>
            <a href="#">Destaques</a>
          </li>
          <li>
            <a href="#">Consoles</a>
          </li>
          <li>
            <a href="#">Jogos</a>
          </li>
          <li>
            <a href="#">Acessórios</a>
          </li>
          <li>
            <a href="#">Mercadorias</a>
          </li>
          <li>
            <a href="#">Sobre nós</a>
          </li>
        </ul>
      </div>

    </nav>
    <div class="container">

      <h2>Destaques</h2>

      <div class="produtos-container">

        <?php

        foreach ($products as $product) {

          $pathOriginal = $product["nm_path"];
          $path = str_replace("../../../", "../", $pathOriginal);

          $preco = $product['vl_produto'];
          $preco = str_replace('.', ',', $preco);

          echo "<div class='card'>";
          echo "<div class='card-img'>";
          echo "<img src='" . $path . "' alt='" . $product['nm_produto'] . "'>";
          echo "</div>";
          echo "<h3>" . $product['nm_produto'] . "</h3>";
          echo "<div class='comprar-preco'>";
          echo "<button class='btn-comprar'>Comprar</button>";
          echo "<span class='preco'>R$ " . $preco . "</span>";
          echo "</div>";
          echo "</div>";

        }

        ?>

      </div>
      <button class="ver-mais">Ver mais</button>
    </div>
  </section>

  <footer class="footer">
    <div class="footer-titulo">
      <div class="container">
        <ul>
          <li>Nosso Contato</li>
          <li>Links Úteis</li>
          <li>Redes Sociais</li>
          <li>Newsletter</li>
        </ul>
      </div>
    </div>
    <div class="footer-conteudo">
      <div class="container">
        <div class="contato">
          <p><span>Endereço:</span><br>
            Rua dos Jogos, 1234 - Cidade dos Gamers, SP
          </p>
          <p><span>Telefone:</span><br>
            (11) 2211-0001
          </p>
          <p><span>E-mail:</span><br>
            contato@gamestore.com
          </p>
        </div>

        <div class="links-uteis">
          <a href="#">Política de Privacidade</a>
          <a href="#">Termos e Condições</a>
          <a href="#">Envio e Devoluções</a>
          <a href="#">FAQ</a>
        </div>

        <div class="redes-sociais">
          <p>Siga-nos nas redes sociais para atualizações e promoções:</p>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">Youtube</a>
        </div>

        <div class="newsletter">
          <p>Inscreva-se em nossa newsletter para receber ofertas exclusivas e notícias sobre jogos.</p>
          <form action="" method="post">
            <input type="email" name="email" placeholder="Insira seu e-mail">
            <button type="submit">Inscreva-se</button>
          </form>
        </div>
      </div>

      <div class="copy">
        <div class="container">
          <p>© 2023 GameStore. Todos os direitos reservados.</p>
          <p>Desenvolvido por: Bruno Santos e Gabriel Dutra - 2º DSM - FATEC PG</p>
        </div>

      </div>

  </footer>

</body>

</html>