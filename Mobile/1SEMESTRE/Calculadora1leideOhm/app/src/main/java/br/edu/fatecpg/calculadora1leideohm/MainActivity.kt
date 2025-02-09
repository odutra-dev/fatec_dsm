package br.edu.fatecpg.calculadora1leideohm

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        val btnResistencia = findViewById<Button>(R.id.btnRes)
        val btnCorrente = findViewById<Button>(R.id.btnCor)
        val btnTensao = findViewById<Button>(R.id.btnTen)


        btnResistencia.setOnClickListener(){
            val resistencia = Intent(this, CalcResistencia::class.java)

            startActivity(resistencia)
        }

        btnCorrente.setOnClickListener(){
            val corrente = Intent(this, CalcCorrente::class.java)

            startActivity(corrente)
        }

        btnTensao.setOnClickListener(){
            val tensao = Intent(this, CalcTensao::class.java)

            startActivity(tensao)
        }
    }
}