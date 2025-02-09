package br.edu.fatecpg.viacep.adapater

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.appcompat.view.menu.MenuView.ItemView
import androidx.recyclerview.widget.RecyclerView
import br.edu.fatecpg.viacep.R
import br.edu.fatecpg.viacep.models.Endereco

class EnderecoAdapter(private val enderecos: List<Endereco>): RecyclerView.Adapter<EnderecoAdapter.ViewHolder>() {

    class ViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
        val txtCep = itemView.findViewById<TextView>(R.id.txt_cep)
        val txtLogadouro = itemView.findViewById<TextView>(R.id.txt_long)
        val txtBairro = itemView.findViewById<TextView>(R.id.txt_bairro)
        val txtLocalidade = itemView.findViewById<TextView>(R.id.txt_local)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.endereco_item, parent,false)
        return ViewHolder(view)


    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val endereco = enderecos[position]

        holder.txtCep.text = "CEP: ${endereco.cep}"
        holder.txtLogadouro.text = "Rua: ${endereco.logradouro}"
        holder.txtBairro.text = "Bairro: ${endereco.bairro}"
        holder.txtLocalidade.text = "Cidade: ${endereco.localidade}"
    }

    override fun getItemCount(): Int {
        return enderecos.size
    }


}