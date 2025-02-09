package br.edu.fatecpg.viacep.views

import android.os.Bundle
import android.util.Log
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import br.edu.fatecpg.viacep.R
import br.edu.fatecpg.viacep.adapater.EnderecoAdapter
import br.edu.fatecpg.viacep.dao.EnderecoDao
import br.edu.fatecpg.viacep.models.Endereco
import com.google.android.material.floatingactionbutton.FloatingActionButton

class ResultadoActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_resultado)

        val enderecoDao = EnderecoDao()
        val rvLista = findViewById<RecyclerView>(R.id.rv_lista)

        val enderecos = enderecoDao.DevolverEndereco()

        rvLista.adapter = EnderecoAdapter(enderecos)
        rvLista.layoutManager = LinearLayoutManager(this)


        val fabClose = findViewById<FloatingActionButton>(R.id.fab_close)


        fabClose.setOnClickListener(){
            finish()
        }

    }
}