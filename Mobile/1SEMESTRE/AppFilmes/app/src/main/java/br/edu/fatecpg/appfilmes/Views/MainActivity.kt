package br.edu.fatecpg.appfilmes.Views

import android.content.Intent
import android.os.Bundle
import android.provider.Telephony.Mms.Intents
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import br.edu.fatecpg.appfilmes.Dao.FilmesDao
import br.edu.fatecpg.appfilmes.Models.Filme
import br.edu.fatecpg.appfilmes.R
import com.google.android.material.floatingactionbutton.FloatingActionButton

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val dao = FilmesDao()

        setContentView(R.layout.activity_main)

        val edtTitulo = findViewById<EditText>(R.id.edt_titulo)
        val edtDiretor = findViewById<EditText>(R.id.edt_Diretor)
        val btnAdd = findViewById<Button>(R.id.btn_adicionar)
        val fab = findViewById<FloatingActionButton>(R.id.fab_Lista)

        btnAdd.setOnClickListener(){

            var titulo = edtTitulo.text.toString()
            var diretor = edtDiretor.text.toString()
            var filme:Filme = Filme(titulo,diretor)

            dao.adicionarFilme(filme)
            
            edtTitulo.text.clear()
            edtDiretor.text.clear()
            Toast.makeText(this, "Adicionado!", Toast.LENGTH_SHORT).show()
        }

        fab.setOnClickListener(){
            val intent = Intent(this, ListaFilmesActivity::class.java)

            startActivity(intent)
        }
    }
}