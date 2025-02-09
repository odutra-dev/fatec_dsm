package br.edu.fatecpg.clinica.views

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import br.edu.fatecpg.clinica.databinding.ActivityMainBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var auth: FirebaseAuth
    private lateinit var db: FirebaseFirestore

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        auth = FirebaseAuth.getInstance()
        db = FirebaseFirestore.getInstance()

        binding.btnLogin.setOnClickListener {
            val cpfCnpj = binding.edtCpfCnpj.text.toString().trim()
            val password = binding.edtSenha.text.toString().trim()

            if (cpfCnpj.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "Por favor, preencha todos os campos", Toast.LENGTH_SHORT).show()
            } else {
                loginUser(cpfCnpj, password)
            }
        }

        binding.cadastroReg.setOnClickListener {
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent)
        }
    }

    private fun loginUser(cpfCnpj: String, password: String) {
        val emailFicticio = "$cpfCnpj@clinica.com" // Converte CPF/CNPJ em formato de email

        auth.signInWithEmailAndPassword(emailFicticio, password)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    val userId = auth.currentUser?.uid
                    if (userId != null) {
                        redirecionaUsuario(userId)
                    }
                } else {
                    Toast.makeText(this, "Erro de autenticação", Toast.LENGTH_SHORT).show()
                }
            }
    }

    private fun redirecionaUsuario(userId: String) {
        db.collection("usuarios").document(userId).get()
            .addOnSuccessListener { document ->
                if (document != null && document.exists()) {
                    val userType = document.getString("userType")
                    when (userType) {
                        "Paciente" -> {
                            startActivity(Intent(this, AgendarConsultasActivity::class.java))
                        }
                        "Médico" -> {
                            startActivity(Intent(this, VerAgendamentosActivity::class.java))
                        }
                        else -> {
                            Toast.makeText(this, "Tipo de usuário inválido", Toast.LENGTH_SHORT).show()
                        }
                    }
                    finish() // Fecha a MainActivity
                } else {
                    Toast.makeText(this, "Erro ao carregar tipo de usuário", Toast.LENGTH_SHORT).show()
                }
            }
            .addOnFailureListener {
                Toast.makeText(this, "Erro ao acessar Firestore", Toast.LENGTH_SHORT).show()
            }
    }
}
