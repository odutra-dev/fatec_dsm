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

class CalcTensao : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_calc_tensao)

        val edtCor = findViewById<EditText>(R.id.edtCorT)
        val edtRes = findViewById<EditText>(R.id.edtResT)
        val btnCal = findViewById<Button>(R.id.calcT)
        val close = findViewById<ImageView>(R.id.closeT)

        btnCal.setOnClickListener(){
            val cor = edtCor.text.toString().toDouble()
            val res = edtRes.text.toString().toDouble()
            val ten = res * cor

            Toast.makeText(this, "A Tensão é $ten V", Toast.LENGTH_SHORT).show()
        }

        close.setOnClickListener(){
            finish()
        }

        }
    }