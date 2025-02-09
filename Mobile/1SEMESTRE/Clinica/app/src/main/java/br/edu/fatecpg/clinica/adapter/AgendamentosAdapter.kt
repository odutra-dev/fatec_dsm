package br.edu.fatecpg.clinica.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import br.edu.fatecpg.clinica.R
import br.edu.fatecpg.clinica.dao.Consulta

class AgendamentosAdapter(private var appointments: MutableList<Consulta>) :
    RecyclerView.Adapter<AgendamentosAdapter.AppointmentViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AppointmentViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_agendamento, parent, false)
        return AppointmentViewHolder(view)
    }

    override fun onBindViewHolder(holder: AppointmentViewHolder, position: Int) {
        val appointment = appointments[position]
        holder.bind(appointment)
    }

    override fun getItemCount(): Int = appointments.size

    fun updateAppointments(newAppointments: List<Consulta>) {
        appointments.clear()
        appointments.addAll(newAppointments)
        notifyDataSetChanged()
    }


    inner class AppointmentViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val txvNomeUsuario: TextView = itemView.findViewById(R.id.txv_nomeUsuario)
        private val dtData: TextView = itemView.findViewById(R.id.dt_data)
        private val dtHora: TextView = itemView.findViewById(R.id.dt_hora)
        private val status: TextView = itemView.findViewById(R.id.status)

        fun bind(appointment: Consulta) {
            txvNomeUsuario.text = "Nome do Usuário: ${appointment.userName}" // Exibe o nome do usuário
            dtData.text = "Data: ${appointment.date}"
            dtHora.text = "Hora: ${appointment.time}"
            status.text = "Status: ${appointment.status}"
        }
    }

}
