package br.edu.fatecpg.viacep.models

data class Endereco(
    val cep:String = "",
    val logradouro:String = "",
    val bairro:String = "",
    val localidade:String = "",
)
