package br.edu.fatecpg.appfirestore.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import br.edu.fatecpg.appfirestore.R
import br.edu.fatecpg.appfirestore.models.Produto

class ProdutoAdapter(private val produtos: List<Produto>):
    RecyclerView.Adapter<ProdutoAdapter.ViewHolder>() {


    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView){
        val edtNome: TextView = itemView.findViewById(R.id.edt_nome)
        val edtCategoria:TextView = itemView.findViewById(R.id.edt_categoria)
        val edtPreco:TextView = itemView.findViewById(R.id.edt_preco)

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProdutoAdapter.ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_lista,parent,false)
        return ViewHolder(view)
    }

    override fun getItemCount(): Int {
        return produtos.size
    }

    override fun onBindViewHolder(holder: ProdutoAdapter.ViewHolder, position: Int) {
        val produtos = produtos[position]
        holder.edtNome.text = produtos.nome
        holder.edtCategoria.text = produtos.categoria
        holder.edtPreco.text = produtos.preco.toString()
    }

}
