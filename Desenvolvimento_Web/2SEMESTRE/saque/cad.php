<?php
use Vtiful\Kernel\Format;

$money = $_POST["saque"];

    echo "<span>" . "Notas de R$ 200,00: " . number_format(intval($money/200), 0, "," , ".") . "</span> <br><br>";
    echo "<span>" . "Notas de R$ 100,00: " . number_format(intval($money/100), 0, "," , ".") . "</span> <br><br>";
    echo "<span>" . "Notas de R$ 50,00: " . number_format(intval($money/50), 0, "," , ".") . "</span> <br><br>";
    echo "<span>" . "Notas de R$ 20,00: " . number_format(intval($money/20), 0, "," , ".") . "</span> <br><br>";
    echo "<span>" . "Notas de R$ 10,00: " . number_format(intval($money/10), 0, "," , ".") . "</span> <br><br>";
    echo "<span>" . "Notas de R$ 5,00: " . number_format(intval($money/5), 0, "," , ".") . "</span> <br><br>";
    echo "<span>" . "Notas de R$ 2,00: " . number_format(intval($money/2), 0, "," , ".") . "</span> ";


?>