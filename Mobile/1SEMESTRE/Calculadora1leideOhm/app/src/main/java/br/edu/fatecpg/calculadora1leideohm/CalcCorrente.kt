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

class CalcCorrente : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_calc_corrente)

        val edtTen = findViewById<EditText>(R.id.edtTesC)
        val edtRes = findViewById<EditText>(R.id.edtResC)
        val btnCal = findViewById<Button>(R.id.calcCor)
        val close = findViewById<ImageView>(R.id.closeCor)

        btnCal.setOnClickListener(){
            val ten = edtTen.text.toString().toDouble()
            val res = edtRes.text.toString().toDouble()
            val cor = ten / res

            Toast.makeText(this, "A Corrente é $cor A", Toast.LENGTH_SHORT).show()
        }

        close.setOnClickListener(){
            finish()
        }

        }
    }