package br.edu.fatecpg.appfilmes.Adapter

import android.graphics.Typeface
import android.text.Spannable
import android.text.SpannableString
import android.text.style.StyleSpan
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import br.edu.fatecpg.appfilmes.Models.Filme
import br.edu.fatecpg.appfilmes.R

class FilmeAdapter(private val filmes:List<Filme>): RecyclerView.Adapter<FilmeAdapter.ViewHolder>() {

    class ViewHolder(itemView: View): RecyclerView.ViewHolder(itemView){
        val txtFilmeTitulo = itemView.findViewById<TextView>(R.id.txt_filme_titulo)
        val txtFilmeDiretor = itemView.findViewById<TextView>(R.id.txt_filme_diretor)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val  view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_filme,parent,false)
            return ViewHolder(view)
    }

    override fun getItemCount(): Int {
        return filmes.size
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val filme = filmes[position]

        // Criar o texto completo
        val titulo = "Título: ${filme.Titulo}"
        val diretor = "Nome do Diretor: ${filme.Diretor}"
        val tituloSpannable = SpannableString(titulo)
        val diretorSpannable = SpannableString(diretor)

        // Indicar a parte do texto que deve ficar em negrito
        val startIndex = 0 // Início da substring
        val endIndexTitulo = "Título: ".length // Final da substring
        val endIndexDiretor = "Nome do Diretor: ".length // Final da substring

        // Aplicar negrito apenas à substring
        tituloSpannable.setSpan(
            StyleSpan(Typeface.BOLD),
            startIndex,
            endIndexTitulo,
            Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
        )
        diretorSpannable.setSpan(
            StyleSpan(Typeface.BOLD),
            startIndex,
            endIndexDiretor,
            Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
        )

        holder.txtFilmeTitulo.text = tituloSpannable
        holder.txtFilmeDiretor.text = diretorSpannable
    }
}