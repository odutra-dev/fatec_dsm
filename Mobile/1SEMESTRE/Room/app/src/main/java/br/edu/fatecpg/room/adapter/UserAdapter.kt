package br.edu.fatecpg.room.adapter

import android.app.Activity
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import br.edu.fatecpg.room.R
import br.edu.fatecpg.room.dao.UserDao
import br.edu.fatecpg.room.table.User
import br.edu.fatecpg.room.views.EditUserActivity
import br.edu.fatecpg.room.views.ListaActivity
import com.bumptech.glide.Glide
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class UserAdapter(private val userDao: UserDao) : RecyclerView.Adapter<UserAdapter.UserViewHolder>() {
    private var userList: MutableList<User> = mutableListOf()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): UserViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_usuario, parent, false)
        return UserViewHolder(view)
    }

    override fun onBindViewHolder(holder: UserViewHolder, position: Int) {
        val user = userList[position]
        holder.bind(user)

        holder.itemView.findViewById<Button>(R.id.btn_deletar).setOnClickListener {
            deleteUser(user)
        }

        holder.itemView.findViewById<Button>(R.id.btn_editar).setOnClickListener {
            (holder.itemView.context as? ListaActivity)?.startEditUserActivity(user)
        }


    }


    private fun deleteUser(user: User) {
        CoroutineScope(Dispatchers.IO).launch {
            userDao.deleteUser(user)
            userList.remove(user)
            withContext(Dispatchers.Main) {
                notifyDataSetChanged()
            }
        }
    }

    override fun getItemCount(): Int = userList.size

    fun submitList(users: List<User>) {
        userList.clear()
        userList.addAll(users)
        notifyDataSetChanged()
    }

    fun updateUser(updatedUser: User) {
        val index = userList.indexOfFirst { it.id == updatedUser.id } // Supondo que você tenha um campo 'id' na classe User
        if (index != -1) {
            userList[index] = updatedUser
            notifyItemChanged(index)
        }
    }


    class UserViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val firstNameTextView: TextView = itemView.findViewById(R.id.nome)
        private val lastNameTextView: TextView = itemView.findViewById(R.id.sobrenome)
        private val emailTextView: TextView = itemView.findViewById(R.id.email)
        private val profileImageView: ImageView = itemView.findViewById(R.id.imageView)

        fun bind(user: User) {
            firstNameTextView.text = user.firstName
            lastNameTextView.text = user.lastName
            emailTextView.text = user.email


            Glide.with(itemView.context)
                .load(user.profileImageUri)
                .into(profileImageView)
        }
    }
}
