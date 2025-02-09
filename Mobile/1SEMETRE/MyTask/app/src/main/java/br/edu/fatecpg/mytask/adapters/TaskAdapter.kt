package br.edu.fatecpg.mytask.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import br.edu.fatecpg.mytask.R
import br.edu.fatecpg.mytask.models.Task

class TaskAdapter(private var tasks: MutableList<Task>) : RecyclerView.Adapter<TaskAdapter.ViewHolder>() {

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val txvTitle: TextView = itemView.findViewById(R.id.txv_title)
        val txvDesc: TextView = itemView.findViewById(R.id.txv_desc)
        val btnCheck: Button = itemView.findViewById(R.id.btn_check)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_task, parent, false)
        return ViewHolder(view)
    }

    override fun getItemCount(): Int {
        return tasks.size
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val task = tasks[position]

        holder.txvTitle.text = task.title
        holder.txvDesc.text = task.description

        holder.btnCheck.setOnClickListener {
            // Muda o valor de isChecked para true
            task.check = true

            // Remove a tarefa da lista e notifica a mudança
            tasks.removeAt(position)
            notifyItemRemoved(position)

            // Atualiza a lista (caso precise)
            refreshTasks(tasks)
        }
    }

    // Método para atualizar a lista de tarefas
    fun refreshTasks(newTasks: MutableList<Task>) {
        tasks = newTasks
        notifyDataSetChanged()
    }
}
