package br.edu.fatecpg.mytask.models

data class Task(
    val title:String = "",
    val description:String = "",
    var check:Boolean = false
)
