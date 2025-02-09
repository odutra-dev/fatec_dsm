package br.edu.fatecpg.clinica.dao

data class Consulta(
    val userId: String = "",
    var userName: String = "", // Nome do usuário que fez o agendamento
    val date: String = "",
    val time: String = "",
    val status: String = ""
)

