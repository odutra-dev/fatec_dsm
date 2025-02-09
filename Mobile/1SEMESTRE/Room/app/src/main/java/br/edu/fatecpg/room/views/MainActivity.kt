package br.edu.fatecpg.room.views

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import br.edu.fatecpg.room.R
import br.edu.fatecpg.room.dao.UserDao
import br.edu.fatecpg.room.table.User
import br.edu.fatecpg.room.database.AppDatabase
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import android.util.Patterns

class MainActivity : AppCompatActivity() {
    private lateinit var userDao: UserDao
    private var imageUri: Uri? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val db = AppDatabase.getDatabase(this)
        userDao = db.userDao()

        val btnSelecionarImagem = findViewById<Button>(R.id.btn_selecionar_imagem)
        val imgSelecionada = findViewById<ImageView>(R.id.img_selecionada)
        val btnSalvar = findViewById<Button>(R.id.btn_salvar) // Inicialize o botão

        btnSelecionarImagem.setOnClickListener {
            selectImageFromGallery()
        }

        btnSalvar.setOnClickListener {
            val nome = findViewById<EditText>(R.id.edt_nome).text.toString()
            val sobrenome = findViewById<EditText>(R.id.edt_sobrenome).text.toString()
            val email = findViewById<EditText>(R.id.edt_email).text.toString()

            if (nome.isNotEmpty() && sobrenome.isNotEmpty() && email.isNotEmpty()) {
                if (isValidEmail(email)) { // Chame a função de validação de e-mail
                    val user = User(
                        firstName = nome,
                        lastName = sobrenome,
                        email = email,
                        profileImageUri = imageUri?.toString() // Convertendo Uri para String
                    )
                    Log.d("MainActivity", "Saving user: $user") // Log para depuração
                    saveUser(user)
                } else {
                    Toast.makeText(this, "E-mail inválido", Toast.LENGTH_SHORT).show()
                }
            } else {
                Log.e("MainActivity", "Campo vazio!")
                Toast.makeText(this, "Preencha todos os campos", Toast.LENGTH_SHORT).show()
            }
        }

        // Adicionando o OnClickListener para o botão "Listar"
        val btnListar = findViewById<Button>(R.id.btn_listar)
        btnListar.setOnClickListener {
            val intent = Intent(this, ListaActivity::class.java)
            startActivity(intent)
        }
    }

    private fun saveUser(user: User) {
        CoroutineScope(Dispatchers.IO).launch {
            if (!isUserExists(user.email)) {
                userDao.insert(user)
                Log.d("MainActivity", "Usuário salvo com sucesso: $user") // Log de sucesso
                withContext(Dispatchers.Main) {
                    Toast.makeText(this@MainActivity, "Usuário salvo!", Toast.LENGTH_SHORT).show()
                    clearFields()
                }
            } else {
                Log.e("MainActivity", "Usuário já existe: $user") // Log de usuário existente
                withContext(Dispatchers.Main) {
                    Toast.makeText(this@MainActivity, "Usuário já existe!", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    private fun isValidEmail(email: String): Boolean {
        return Patterns.EMAIL_ADDRESS.matcher(email).matches()
    }

    private suspend fun isUserExists(email: String): Boolean {
        val users = userDao.getAllUsers()
        return users.any { it.email == email }
    }

    private fun clearFields() {
        findViewById<EditText>(R.id.edt_nome).text.clear()
        findViewById<EditText>(R.id.edt_sobrenome).text.clear()
        findViewById<EditText>(R.id.edt_email).text.clear()
        findViewById<ImageView>(R.id.img_selecionada).setImageURI(null)
    }

    private fun selectImageFromGallery() {
        val intent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
        startActivityForResult(intent, 100)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == 100 && resultCode == Activity.RESULT_OK && data != null) {
            imageUri = data.data
            findViewById<ImageView>(R.id.img_selecionada).setImageURI(imageUri)
        }
    }
}
