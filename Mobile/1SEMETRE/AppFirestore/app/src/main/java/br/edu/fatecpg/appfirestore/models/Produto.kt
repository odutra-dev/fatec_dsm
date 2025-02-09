package br.edu.fatecpg.appfirestore.models

import java.io.Serializable

data class Produto(
    val nome:String,
    val categoria:String,
    val preco:Double
): Serializable
