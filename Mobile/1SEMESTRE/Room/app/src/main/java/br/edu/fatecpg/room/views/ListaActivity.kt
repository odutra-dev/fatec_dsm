package br.edu.fatecpg.room.views

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import br.edu.fatecpg.room.R
import br.edu.fatecpg.room.adapter.UserAdapter
import br.edu.fatecpg.room.dao.UserDao
import br.edu.fatecpg.room.database.AppDatabase
import br.edu.fatecpg.room.table.User
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class ListaActivity : AppCompatActivity() {
    private lateinit var userDao: UserDao
    private lateinit var recyclerView: RecyclerView
    private lateinit var userAdapter: UserAdapter

    private companion object {
        const val EDIT_USER_REQUEST_CODE = 1
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_lista)

        val db = AppDatabase.getDatabase(this)
        userDao = db.userDao()

        recyclerView = findViewById(R.id.recycler_View)
        recyclerView.layoutManager = LinearLayoutManager(this)

        userAdapter = UserAdapter(userDao)
        recyclerView.adapter = userAdapter

        loadUsers()
    }

    private fun loadUsers() {
        CoroutineScope(Dispatchers.IO).launch {
            val userList = userDao.getAllUsers()
            withContext(Dispatchers.Main) {
                userAdapter.submitList(userList)
            }
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == EDIT_USER_REQUEST_CODE && resultCode == Activity.RESULT_OK) {
            val updatedUser = data?.getParcelableExtra<User>("updatedUser") // Use getParcelableExtra
            updatedUser?.let {
                userAdapter.updateUser(it) // Atualiza o adaptador
            }
        }
    }

    fun startEditUserActivity(user: User) {
        val intent = Intent(this, EditUserActivity::class.java).apply {
            putExtra("userId", user.id)
            putExtra("firstName", user.firstName)
            putExtra("lastName", user.lastName)
            putExtra("email", user.email)
            putExtra("profileImageUri", user.profileImageUri.toString()) // Convertendo para String
        }
        startActivityForResult(intent, EDIT_USER_REQUEST_CODE)
    }
}
