package br.edu.fatecpg.clinica.views

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import br.edu.fatecpg.clinica.adapter.AgendamentosAdapter
import br.edu.fatecpg.clinica.dao.Consulta
import br.edu.fatecpg.clinica.databinding.ActivityVerAgendamentosBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore

class VerAgendamentosActivity : AppCompatActivity() {

    private lateinit var binding: ActivityVerAgendamentosBinding
    private lateinit var auth: FirebaseAuth
    private lateinit var db: FirebaseFirestore
    private lateinit var adapter: AgendamentosAdapter
    private var userType: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityVerAgendamentosBinding.inflate(layoutInflater)
        setContentView(binding.root)

        auth = FirebaseAuth.getInstance()
        db = FirebaseFirestore.getInstance()

        // Configurando o RecyclerView com o Adapter
        binding.recConsultas.layoutManager = LinearLayoutManager(this)
        adapter = AgendamentosAdapter(mutableListOf()) // Inicializa o Adapter com uma lista vazia
        binding.recConsultas.adapter = adapter

        val userId = auth.currentUser?.uid ?: return
        loadUserType(userId)

        // Configurando o FAB para voltar à tela de login
        binding.fabBackToLogin.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP // Limpa a pilha de atividades
            startActivity(intent)
            finish() // Finaliza a activity atual
        }
    }

    private fun loadUserType(userId: String) {
        // Carrega o tipo de usuário para decidir qual consulta exibir
        db.collection("usuarios").document(userId).get()
            .addOnSuccessListener { document ->
                if (document != null && document.exists()) {
                    userType = document.getString("userType")
                    loadAppointments()  // Carregar agendamentos com base no tipo de usuário
                } else {
                    Toast.makeText(this, "Erro ao carregar tipo de usuário", Toast.LENGTH_SHORT).show()
                }
            }
            .addOnFailureListener {
                Toast.makeText(this, "Erro ao acessar Firestore", Toast.LENGTH_SHORT).show()
            }
    }

    private fun loadAppointments() {
        // Carrega os agendamentos dependendo do tipo de usuário
        val query = if (userType == "Paciente") {
            db.collection("consultas").whereEqualTo("userId", auth.currentUser?.uid)
        } else {
            db.collection("consultas") // Para médicos, mostra todos os agendamentos
        }

        query.get()
            .addOnSuccessListener { documents ->
                val appointments = mutableListOf<Consulta>()
                for (document in documents) {
                    val appointment = document.toObject(Consulta::class.java)

                    // Se o nome do usuário não estiver armazenado diretamente, carregue a partir da coleção de usuários
                    if (appointment.userId.isNotEmpty()) {
                        db.collection("usuarios").document(appointment.userId).get()
                            .addOnSuccessListener { userDocument ->
                                if (userDocument.exists()) {
                                    // Atualize o nome do usuário na consulta
                                    appointment.userName = userDocument.getString("nome") ?: "Desconhecido"
                                }
                                appointments.add(appointment) // Adiciona o agendamento à lista
                                adapter.updateAppointments(appointments)  // Atualiza o adapter
                            }
                            .addOnFailureListener {
                                Toast.makeText(this, "Erro ao carregar dados do usuário", Toast.LENGTH_SHORT).show()
                            }
                    }
                }
            }
            .addOnFailureListener {
                Toast.makeText(this, "Erro ao carregar consultas", Toast.LENGTH_SHORT).show()
            }
    }
}