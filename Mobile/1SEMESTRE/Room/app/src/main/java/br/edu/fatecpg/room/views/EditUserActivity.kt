package br.edu.fatecpg.room.views

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Patterns
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import br.edu.fatecpg.room.R
import br.edu.fatecpg.room.dao.UserDao
import br.edu.fatecpg.room.database.AppDatabase
import br.edu.fatecpg.room.table.User
import com.bumptech.glide.Glide
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class EditUserActivity : AppCompatActivity() {
    private lateinit var userDao: UserDao
    private var user: User? = null // Agora pode ser null
    private var imageUri: Uri? = null // Mudei para ser null inicialmente
    private val PICK_IMAGE_REQUEST = 1 // Adicione esta linha

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_edit_user)

        val db = AppDatabase.getDatabase(this)
        userDao = db.userDao()

        // Receber dados do Intent
        val userId = intent.getLongExtra("userId", -1)

        // Carregar o usuário do banco de dados
        loadUser(userId)

        findViewById<Button>(R.id.buttonSave).setOnClickListener {
            saveUser()
        }

        // Adicionando o listener para selecionar a imagem
        findViewById<Button>(R.id.buttonChangeImage).setOnClickListener {
            selectImage()
        }
    }

    private fun initializeFields() {
        // Inicializar campos de entrada com os dados do usuário
        val editTextFirstName = findViewById<EditText>(R.id.editTextFirstName)
        val editTextLastName = findViewById<EditText>(R.id.editTextLastName)
        val editTextEmail = findViewById<EditText>(R.id.editTextEmail)
        val imageViewProfile = findViewById<ImageView>(R.id.imageViewProfile)

        user?.let {
            editTextFirstName.setText(it.firstName)
            editTextLastName.setText(it.lastName)
            editTextEmail.setText(it.email)
            Glide.with(this).load(it.profileImageUri).into(imageViewProfile)
        }
    }

    private fun selectImage() {
        val intent = Intent()
        intent.type = "image/*"
        intent.action = Intent.ACTION_GET_CONTENT
        startActivityForResult(Intent.createChooser(intent, "Selecione uma imagem"), PICK_IMAGE_REQUEST)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == PICK_IMAGE_REQUEST && resultCode == Activity.RESULT_OK && data != null) {
            imageUri = data.data // Captura a URI da imagem selecionada
            val imageViewProfile = findViewById<ImageView>(R.id.imageViewProfile)
            Glide.with(this).load(imageUri).into(imageViewProfile) // Carrega a imagem selecionada na ImageView
        }
    }

    private fun saveUser() {
        val firstName = findViewById<EditText>(R.id.editTextFirstName).text.toString()
        val lastName = findViewById<EditText>(R.id.editTextLastName).text.toString()
        val email = findViewById<EditText>(R.id.editTextEmail).text.toString()

        if (firstName.isNotEmpty() && lastName.isNotEmpty() && email.isNotEmpty()) {
            if (isValidEmail(email)) { // Verifique se o e-mail é válido
                user?.let { currentUser ->
                    // Atualiza o usuário com novos dados
                    val updatedUser = currentUser.copy(
                        firstName = firstName,
                        lastName = lastName,
                        email = email,
                        profileImageUri = imageUri?.toString() ?: currentUser.profileImageUri // Convertendo URI para String
                    )

                    CoroutineScope(Dispatchers.IO).launch {
                        userDao.updateUser(updatedUser)
                        withContext(Dispatchers.Main) {
                            val resultIntent = Intent().apply {
                                putExtra("updatedUser", updatedUser)
                            }
                            setResult(Activity.RESULT_OK, resultIntent)
                            Toast.makeText(this@EditUserActivity, "Usuário atualizado!", Toast.LENGTH_SHORT).show()
                            finish()
                        }
                    }
                } ?: run {
                    Toast.makeText(this, "Erro ao atualizar o usuário", Toast.LENGTH_SHORT).show()
                }
            } else {
                Toast.makeText(this, "E-mail inválido", Toast.LENGTH_SHORT).show() // Mensagem de erro para e-mail inválido
            }
        } else {
            Toast.makeText(this, "Todos os campos devem estar preenchidos", Toast.LENGTH_SHORT).show()
        }
    }

    // Função para validar e-mail
    private fun isValidEmail(email: String): Boolean {
        return Patterns.EMAIL_ADDRESS.matcher(email).matches()
    }


    private fun loadUser(userId: Long) {
        CoroutineScope(Dispatchers.IO).launch {
            val fetchedUser = userDao.getUserById(userId) // Método para buscar o usuário pelo ID
            withContext(Dispatchers.Main) {
                if (fetchedUser != null) {
                    user = fetchedUser // Atribui o usuário encontrado
                    initializeFields() // Inicializa os campos com os dados do usuário
                } else {
                    Toast.makeText(this@EditUserActivity, "Usuário não encontrado", Toast.LENGTH_SHORT).show()
                    finish() // Ou faça outra ação apropriada
                }
            }
        }
    }
}
