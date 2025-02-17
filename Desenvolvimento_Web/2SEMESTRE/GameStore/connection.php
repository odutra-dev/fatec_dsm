<?php
$server = 'localhost';
$username = 'root';
$password = 'dutra123';

try {
    $conn = new PDO("mysql:host=$server", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Conectado com sucesso";

    //Criando o banco de dados caso ele não exista
    $exists = $conn->prepare("CREATE DATABASE IF NOT EXISTS gamestore;");
    $exists->execute();

    //adicionando o banco de dados à conexão, para poder criar as tabelas e manipular os dados
    $conn = new PDO("mysql:host=$server;dbname=gamestore", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //criando as tabelas caso elas não existam
    if ($exists) {
        $createTableUsuario = $conn->prepare("CREATE TABLE IF NOT EXISTS USUARIO (
            cd_usuario integer primary key auto_increment,
            nm_usuario varchar(50) NOT NULL,
            nm_email varchar(100) NOT NULL,
            cd_senha varchar(255) NOT NULL,
            constraint un_email unique (nm_email)
        );");
        $createTableUsuario->execute();

        $createTableProduto = $conn->prepare("CREATE TABLE IF NOT EXISTS PRODUTO (
            cd_produto integer primary key auto_increment,
            nm_produto varchar(50) NOT NULL,
            qt_produto numeric(10) default 0,
            vl_produto numeric(10,2) default 0.00,
            nm_image varchar(100),
            nm_path varchar(100)
        );");
        $createTableProduto->execute();
        
    }
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

?>