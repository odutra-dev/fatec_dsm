<!DOCTYPE html>
<html lang="pt-br">

<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <main>
        <div class="title">
            <h1>Fatec Pizza</h1>
        </div>
        
        <form action="cad.php" method="post">
            <label for="person">Quantas Pessoas</label>
            <input type="number" name="person" id="person">
            <label for="pizza">Quantas Pizzas</label>
            <input type="number" name="pizza" id="pizza">
            <label for="soda">Quantos refris</label>
            <input type="number" name="soda" id="soda">
            <label for="border">Borda:</label>
            <div class="radio">
                <input type="radio" name="border" id="border" value="Sim">
                <label for="border">Sim</label>
                <input type="radio" name="border" id="border" value="Nao">
                <label for="border">Não</label>
            </div>
            <input type="submit" value="Enviar">
        </form>
    </main>

</body>

</html>