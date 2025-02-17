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
    <h1>RESULTADO</h1>

    <div class="top">
        <?php

        $refris = $_POST['soda'];
        $pizzas = $_POST['pizza'];
        $pessoas = $_POST['person'];
        $borda = $_POST['border'];

        $value_pizza = 40.00;
        $value_borda = 5.00;
        $value_refri = 12.00;

        $total = 0;

        echo "O valor total das pizzas foi: " . ($pizzas * $value_pizza);
        echo '<br>';
        echo "O valor total dos refris foi: " . ($refris * $value_refri);
        echo '<br>';

        if ($borda == 'Sim') {
            echo "O valor total das pizzas com a bordas recheadas foi: " . ($pizzas * $value_borda);
            echo '<br>';

            $total = ((($pizzas * $value_pizza) + ($refris * $value_refri) + ($pizzas * $value_borda)));

            echo "O valor total de cada pessoa foi: " . $total;
            echo '<br>';
        } else {

            $total = (($pizzas * $value_pizza) + ($refris * $value_refri));
            echo "O valor total de cada pessoa foi: " . $total;
            echo '<br>';
        }

        echo "O valor total com os 10% foi: " . ($total + ($total * 0.1));
        echo '<br>';
        echo "O valor total de cada pessoa foi sem os 10% foi: " . ($total / $pessoas);
        echo '<br>';
        echo "O valor total de cada pessoa foi com os 10% foi: " . (($total + ($total * 0.1)) / $pessoas);
        echo '<br>';

        ?>
    </div>
</body>

</html>