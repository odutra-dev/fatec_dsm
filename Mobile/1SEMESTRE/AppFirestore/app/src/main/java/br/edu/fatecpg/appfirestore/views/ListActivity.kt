package br.edu.fatecpg.appfirestore.views

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import br.edu.fatecpg.appfirestore.adapters.ProdutoAdapter
import br.edu.fatecpg.appfirestore.databinding.ActivityListBinding
import br.edu.fatecpg.appfirestore.models.Produto

class ListActivity : AppCompatActivity() {

    private lateinit var binding: ActivityListBinding
    private lateinit var adapter: ProdutoAdapter
    private var produtos: List<Produto> = emptyList()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Usando o binding para o layout activity_list
        binding = ActivityListBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Recupera a lista de produtos passada da MainActivity
        produtos = intent.getSerializableExtra("produtos") as? List<Produto> ?: emptyList()

        // Inicializa o RecyclerView
        binding.recLista.layoutManager = LinearLayoutManager(this)

        // Configura o adaptador com a lista de produtos
        adapter = ProdutoAdapter(produtos)
        binding.recLista.adapter = adapter
    }
}
