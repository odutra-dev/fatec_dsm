package br.edu.fatecpg.school.views

import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import br.edu.fatecpg.school.R
import kotlin.random.Random

class AlunoActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_aluno)

        val aluno = findViewById<TextView>(R.id.aluno)
        val ra = findViewById<TextView>(R.id.ra)
        val btn = findViewById<Button>(R.id.btngerar)

         aluno.text = "Aluno: ${intent.getStringExtra("name")}"

        btn.setOnClickListener(){

            val RArandom = Random(10000).nextInt()

            ra.text = "RA: ${RArandom}"
        }
    }
}