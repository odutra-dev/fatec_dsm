package br.edu.fatecpg.mytask.views

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import br.edu.fatecpg.mytask.R
import br.edu.fatecpg.mytask.dao.TaskDao
import br.edu.fatecpg.mytask.models.Task
import com.google.android.material.floatingactionbutton.FloatingActionButton

class AddActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_add)

        val dao = TaskDao()

        val fabClose = findViewById<FloatingActionButton>(R.id.fab_close)
        val btnAdd = findViewById<Button>(R.id.btn_add)
        val edtTitulo = findViewById<EditText>(R.id.edt_titulo)
        val edtDesc = findViewById<EditText>(R.id.edt_desc)

        btnAdd.setOnClickListener(){
            val titulo = edtTitulo.text.toString()
            val desc = edtDesc.text.toString()
            val task = Task(titulo, desc, false)

            dao.addTask(task)

            edtTitulo.text.clear()
            edtDesc.text.clear()
        }

        fabClose.setOnClickListener(){
            finish()
        }
    }
}