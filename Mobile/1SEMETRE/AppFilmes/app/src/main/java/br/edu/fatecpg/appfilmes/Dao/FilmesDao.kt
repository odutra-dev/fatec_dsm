package br.edu.fatecpg.appfilmes.Dao

import br.edu.fatecpg.appfilmes.Models.Filme

class FilmesDao {
    companion object{
        private val filmes:MutableList<Filme> = mutableListOf()
    }

    fun adicionarFilme(filme: Filme){
        filmes.add(filme)
    }

    fun consultarFilme():List<Filme>{
        return filmes
    }
}