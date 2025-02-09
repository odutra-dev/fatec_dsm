package br.edu.fatecpg.mytask.views

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import br.edu.fatecpg.mytask.R
import br.edu.fatecpg.mytask.adapters.TaskAdapter
import br.edu.fatecpg.mytask.dao.TaskDao
import com.google.android.material.floatingactionbutton.FloatingActionButton

class ListActivity : AppCompatActivity() {

    private lateinit var rvList: RecyclerView
    private lateinit var taskAdapter: TaskAdapter
    private lateinit var dao: TaskDao

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_list)

        dao = TaskDao()
        rvList = findViewById(R.id.rv_lista)

        val tasks = dao.getTasks().toMutableList()
        taskAdapter = TaskAdapter(tasks)
        rvList.adapter = taskAdapter
        rvList.layoutManager = LinearLayoutManager(this)

        val fabAdd = findViewById<FloatingActionButton>(R.id.fab_add)
        fabAdd.setOnClickListener(){
            val intent = Intent(this, AddActivity::class.java)
            startActivity(intent)
        }
    }

    override fun onResume() {
        super.onResume()
        updateData()
    }

    private fun updateData() {
        val tasks = dao.getTasks().toMutableList()
        taskAdapter.refreshTasks(tasks)
        Log.i("tarefas", "$tasks")
    }
}
