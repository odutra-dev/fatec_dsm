package br.edu.fatecpg.appfatec

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.button.MaterialButton
import com.google.android.material.textfield.TextInputEditText
import com.google.firebase.FirebaseApp
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser

class MainActivity : AppCompatActivity() {

    private lateinit var auth: FirebaseAuth
    private lateinit var edtEmail: TextInputEditText
    private lateinit var edtSenha: TextInputEditText
    private lateinit var btnLogin: MaterialButton
    private lateinit var btnCadastro: MaterialButton
    private lateinit var btnRedefinirSenha: MaterialButton
    private lateinit var btnExcluirConta: MaterialButton

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        FirebaseApp.initializeApp(this)

        setContentView(R.layout.activity_main)

        auth = FirebaseAuth.getInstance()

        edtEmail = findViewById(R.id.edt_email)
        edtSenha = findViewById(R.id.edt_senha)
        btnLogin = findViewById(R.id.btnLogin)
        btnCadastro = findViewById(R.id.btnCadastro)
        btnRedefinirSenha = findViewById(R.id.btnRedefinirSenha)
        btnExcluirConta = findViewById(R.id.btnExcluirConta)

        btnCadastro.setOnClickListener { criarUsuario() }
        btnLogin.setOnClickListener { loginUsuario() }
        btnRedefinirSenha.setOnClickListener { redefinirSenha() }
        btnExcluirConta.setOnClickListener { excluirConta() }
    }

    private fun criarUsuario() {
        val email = edtEmail.text.toString()
        val senha = edtSenha.text.toString()

        auth.createUserWithEmailAndPassword(email, senha)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    Toast.makeText(this, "Cadastro bem-sucedido!", Toast.LENGTH_SHORT).show()
                } else {
                    Toast.makeText(this, "Erro, conta já existe!", Toast.LENGTH_SHORT).show()
                }
            }
    }

    private fun loginUsuario() {
        val email = edtEmail.text.toString()
        val senha = edtSenha.text.toString()

        auth.signInWithEmailAndPassword(email, senha)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    Toast.makeText(this, "Login bem-sucedido!", Toast.LENGTH_SHORT).show()
                    // Navegue para a próxima atividade aqui
                } else {
                    Toast.makeText(this, "Erro, você já está logado na conta!", Toast.LENGTH_SHORT).show()
                }
            }
    }

    private fun redefinirSenha() {
        val email = edtEmail.text.toString()
        auth.sendPasswordResetEmail(email)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    Toast.makeText(this, "E-mail de redefinição enviado!", Toast.LENGTH_SHORT).show()
                } else {
                    Toast.makeText(this, "Erro: ${task.exception?.message}", Toast.LENGTH_SHORT).show()
                }
            }
    }

    private fun excluirConta() {
        val user: FirebaseUser? = auth.currentUser
        user?.delete()?.addOnCompleteListener { task ->
            if (task.isSuccessful) {
                Toast.makeText(this, "Conta excluída com sucesso!", Toast.LENGTH_SHORT).show()
                // Navegue para a tela de login aqui
            } else {
                Toast.makeText(this, "Erro, está conta não existe!", Toast.LENGTH_SHORT).show()
            }
        }
    }
}