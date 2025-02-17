<!DOCTYPE html>
<html lang="pt-br">
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@500&family=Roboto:wght@400;500&display=swap" rel="stylesheet">

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Saque - Fatec Bank</title>
    
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <header>
        <div class="container">
            <a href="index.php" class="logo">
                <img src="img/logo.svg" alt="logo">
            </a>
            <button class="btn-cancelar">
                <a href="#">Cancelar</a>
            </button>
        </div>
    </header>

    <main class="intro">
        <div class="container">
            <div class="left">
                <h1>Digite o valor para saque</h1>


                <form action="cad.php" method="post">

                    <input type="number" name="saque" id="saque">
                    <input type="submit" value="Sacar">

                </form>

                <div class="valores">
                    <h2>Valores Disponíveis</h2>
                    <ul>
                        <li>R$ 2,00</li>
                        <li>R$ 5,00</li>
                        <li>R$ 10,00</li>
                        <li>R$ 20,00</li>
                        <li>R$ 50,00</li>
                        <li>R$ 100,00</li>
                        <li>R$ 200,00</li>
                    </ul>
                </div>
            </div>
        </div>
        
    </main>

    <footer class="copy">
        <div class="container">
            <p>Fatec Bank &copy; 2023 - Todos os direitos reservados</p>
            <p>Atividade 2 de Desenvolvimento web II</p>
            <p>Desenvolvido por: Bruno Araujo; Renan Candido e Gabriel Dutra</p>
        </div>
    </footer>

    
</body>
</html>