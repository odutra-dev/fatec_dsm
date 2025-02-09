package br.edu.fatecpg.school.views

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import br.edu.fatecpg.school.R

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)

        val name = findViewById<EditText>(R.id.edtname)
        val btn = findViewById<Button>(R.id.btnEntrar)

        btn.setOnClickListener() {
            val intent = Intent(this, AlunoActivity::class.java)
            intent.putExtra("name", name.text.toString())

            startActivity(intent)
        }
    }
}