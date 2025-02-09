package br.edu.fatecpg.appfirestore.views

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import br.edu.fatecpg.appfirestore.databinding.ActivityMainBinding
import br.edu.fatecpg.appfirestore.models.Produto
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private val db = Firebase.firestore

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnSalvar.setOnClickListener {
            val nome = binding.edtNome.text.toString()
            val preco = binding.edtPreco.text.toString().toDoubleOrNull() ?: 0.0
            val categoria = binding.edtCategoria.text.toString()

            val produto = hashMapOf(
                "nome" to nome,
                "preco" to preco,
                "categoria" to categoria
            )

            db.collection("produtos")
                .add(produto)
                .addOnSuccessListener {
                    Toast.makeText(this, "Sucesso!", Toast.LENGTH_SHORT).show()
                    binding.edtNome.text.clear()
                    binding.edtPreco.text.clear()
                    binding.edtCategoria.text.clear()
                }
                .addOnFailureListener {
                    Toast.makeText(this, "Erro!", Toast.LENGTH_SHORT).show()
                }
        }

        binding.floatingActionButton.setOnClickListener {
            carregarProdutosEIniciarListActivity()
        }
    }

    private fun carregarProdutosEIniciarListActivity() {
        db.collection("produtos").get()
            .addOnSuccessListener { result ->
                val produtos = ArrayList<Produto>()
                for (document in result) {
                    val nome = document.getString("nome") ?: ""
                    val preco = document.getDouble("preco") ?: 0.0
                    val categoria = document.getString("categoria") ?: ""
                    produtos.add(Produto(nome, categoria, preco))
                }

                // Passa a lista de produtos como Serializable
                val intent = Intent(this, ListActivity::class.java)
                intent.putExtra("produtos", produtos) // Passa a lista de produtos como Serializable
                startActivity(intent)
            }
            .addOnFailureListener {
                Toast.makeText(this, "Erro ao carregar produtos", Toast.LENGTH_SHORT).show()
            }
    }
}
