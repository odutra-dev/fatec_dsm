package br.edu.fatecpg.clinica.views

import android.os.Bundle
import android.util.Log
import android.widget.RadioButton
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import br.edu.fatecpg.clinica.databinding.ActivityRegisterBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore

class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding
    private lateinit var auth: FirebaseAuth
    private lateinit var db: FirebaseFirestore

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        auth = FirebaseAuth.getInstance()
        db = FirebaseFirestore.getInstance()

        binding.cadastroReg.setOnClickListener {
            val cpfCnpj = binding.cpfCnpjReg.text.toString().trim()
            val nome = binding.nomeReg.text.toString().trim()
            val password = binding.senhaReg.text.toString().trim()
            val selectedUserTypeId = binding.radGrupo.checkedRadioButtonId

            // Validação dos campos
            if (cpfCnpj.isEmpty() || nome.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "Por favor, preencha todos os campos", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            if (!isCpfCnpjValid(cpfCnpj)) {
                Toast.makeText(this, "Formato de CPF/CNPJ inválido", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            if (selectedUserTypeId == -1) {
                Toast.makeText(this, "Selecione Paciente ou Médico", Toast.LENGTH_SHORT).show()
            } else {
                val userType = findViewById<RadioButton>(selectedUserTypeId).text.toString()
                registerUser(cpfCnpj, nome, password, userType)
            }
        }
    }

    private fun registerUser(cpfCnpj: String, nome: String, password: String, userType: String) {
        auth.createUserWithEmailAndPassword("$cpfCnpj@clinica.com", password) // Usa CPF/CNPJ como parte do email fictício
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    val userId = auth.currentUser?.uid
                    if (userId != null) {
                        saveUserToFirestore(userId, cpfCnpj, nome, userType)
                    } else {
                        Toast.makeText(this, "Erro ao obter UID do usuário.", Toast.LENGTH_SHORT).show()
                    }
                } else {
                    Log.e("RegisterActivity", "Erro ao criar usuário: ${task.exception?.message}")
                    Toast.makeText(this, "Erro ao criar usuário: ${task.exception?.message}", Toast.LENGTH_SHORT).show()
                }
            }
    }

    private fun saveUserToFirestore(userId: String, cpfCnpj: String, nome: String, userType: String) {
        val user = hashMapOf(
            "cpfCnpj" to cpfCnpj,
            "nome" to nome,
            "userType" to userType
        )

        db.collection("usuarios").document(userId)
            .set(user)
            .addOnSuccessListener {
                Log.d("RegisterActivity", "Usuário salvo com sucesso no Firestore com ID: $userId")
                Toast.makeText(this, "Usuário cadastrado com sucesso", Toast.LENGTH_SHORT).show()
                finish()
            }
            .addOnFailureListener { e ->
                Log.e("RegisterActivity", "Erro ao salvar dados no Firestore: ${e.message}")
                Toast.makeText(this, "Erro ao salvar dados do usuário", Toast.LENGTH_SHORT).show()
            }
    }

    private fun isCpfCnpjValid(cpfCnpj: String): Boolean {
        // Remove qualquer caractere não numérico
        val cleanCpfCnpj = cpfCnpj.replace("[^0-9]".toRegex(), "")

        // Verifica se o número tem 11 (CPF) ou 14 (CNPJ) dígitos
        return cleanCpfCnpj.length == 11 || cleanCpfCnpj.length == 14
    }

}
