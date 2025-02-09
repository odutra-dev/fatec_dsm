package br.edu.fatecpg.clinica.views

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import br.edu.fatecpg.clinica.databinding.ActivityAgendarConsultasBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import java.text.SimpleDateFormat
import java.util.*

class AgendarConsultasActivity : AppCompatActivity() {

    private lateinit var binding: ActivityAgendarConsultasBinding
    private lateinit var auth: FirebaseAuth
    private lateinit var db: FirebaseFirestore

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAgendarConsultasBinding.inflate(layoutInflater)
        setContentView(binding.root)

        auth = FirebaseAuth.getInstance()
        db = FirebaseFirestore.getInstance()

        binding.btnConfirmarConsulta.setOnClickListener {
            val date = binding.data.text.toString()
            val time = binding.hora.text.toString()

            if (validateDateAndTime(date, time)) {
                scheduleAppointment(date, time)
            } else {
                Toast.makeText(this, "Por favor, insira a data e hora no formato correto", Toast.LENGTH_SHORT).show()
            }
        }

        // Ação do FAB para retornar à MainActivity
        binding.fabRetornar.setOnClickListener {
            navigateToMainActivity()  // Navega para a MainActivity
        }
    }

    private fun validateDateAndTime(date: String, time: String): Boolean {
        // Valida o formato da data (DD/MM/AAAA)
        val dateFormat = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
        dateFormat.isLenient = false
        val parsedDate = try {
            dateFormat.parse(date)
        } catch (e: Exception) {
            null
        }

        // Valida o formato da hora (HH:MM)
        val timeFormat = SimpleDateFormat("HH:mm", Locale.getDefault())
        timeFormat.isLenient = false
        val parsedTime = try {
            timeFormat.parse(time)
        } catch (e: Exception) {
            null
        }

        return parsedDate != null && parsedTime != null
    }

    private fun scheduleAppointment(date: String, time: String) {
        val userId = auth.currentUser?.uid ?: return
        val appointment = hashMapOf(
            "userId" to userId,
            "date" to date,
            "time" to time,
            "status" to "agendado"
        )

        db.collection("consultas").add(appointment)
            .addOnSuccessListener {
                Toast.makeText(this, "Consulta agendada com sucesso!", Toast.LENGTH_SHORT).show()
                clearFields()  // Limpa os campos após agendar a consulta
            }
            .addOnFailureListener {
                Toast.makeText(this, "Erro ao agendar consulta", Toast.LENGTH_SHORT).show()
            }
    }

    // Função para limpar os campos
    private fun clearFields() {
        binding.data.text.clear()
        binding.hora.text.clear()
    }

    // Função para navegar de volta para a MainActivity
    private fun navigateToMainActivity() {
        val intent = Intent(this, MainActivity::class.java)
        startActivity(intent)
        finish()  // Finaliza a AgendarConsultasActivity para não manter na pilha de atividades
    }
}
