package br.edu.fatecpg.calculadora1leideohm

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class CalcResistencia : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_calc_resistencia)

        val edtTen = findViewById<EditText>(R.id.edtTensaoR)
        val edtCor = findViewById<EditText>(R.id.edtCorrenteR)
        val btnCal = findViewById<Button>(R.id.calcRes)
        val close = findViewById<ImageView>(R.id.closeR)

        btnCal.setOnClickListener(){
            val ten = edtTen.text.toString().toDouble()
            val cor = edtCor.text.toString().toDouble()
            val res = ten / cor

            Toast.makeText(this, "A Resistência é $res", Toast.LENGTH_SHORT).show()
        }

        close.setOnClickListener(){
            finish()
        }
    }
}