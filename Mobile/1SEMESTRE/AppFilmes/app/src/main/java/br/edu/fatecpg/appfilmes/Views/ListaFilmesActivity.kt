package br.edu.fatecpg.appfilmes.Views

import android.os.Bundle
import android.util.Log
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import br.edu.fatecpg.appfilmes.Adapter.FilmeAdapter
import br.edu.fatecpg.appfilmes.Dao.FilmesDao
import br.edu.fatecpg.appfilmes.R
import kotlin.math.log

class ListaFilmesActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_lista_filmes)
        val dao = FilmesDao()

        val recyclerView = findViewById<RecyclerView>(R.id.rv_Lista)
        val filmes = dao.consultarFilme()
        recyclerView.adapter = FilmeAdapter(filmes)
        recyclerView.layoutManager = LinearLayoutManager(this)

    }
}