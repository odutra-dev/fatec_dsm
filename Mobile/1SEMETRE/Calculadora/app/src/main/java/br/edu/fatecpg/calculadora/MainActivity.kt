package br.edu.fatecpg.calculadora

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        val edtNum1 = findViewById<EditText>(R.id.edtNum1)
        val edtNum2 = findViewById<EditText>(R.id.edtNum2)
        val btnAdd = findViewById<Button>(R.id.adicao)
        val btnSub = findViewById<Button>(R.id.subtracao)
        val btnMult = findViewById<Button>(R.id.multiplicacao)
        val btnDiv = findViewById<Button>(R.id.divisao)

        btnAdd.setOnClickListener(){
            val num1 = edtNum1.text.toString().toDouble()
            val num2 = edtNum2.text.toString().toDouble()
            val res = num1 + num2

            Toast.makeText(this, "A adição é $res", Toast.LENGTH_SHORT).show()
        }

        btnSub.setOnClickListener(){
            val num1 = edtNum1.text.toString().toDouble()
            val num2 = edtNum2.text.toString().toDouble()
            val res = num1 - num2

            Toast.makeText(this, "A subtração é $res", Toast.LENGTH_SHORT).show()
        }

        btnMult.setOnClickListener(){
            val num1 = edtNum1.text.toString().toDouble()
            val num2 = edtNum2.text.toString().toDouble()
            val res = num1 * num2

            Toast.makeText(this, "A multiplicação é $res", Toast.LENGTH_SHORT).show()
        }

        btnDiv.setOnClickListener(){
            val num1 = edtNum1.text.toString().toDouble()
            val num2 = edtNum2.text.toString().toDouble()
            val res = num1 / num2

            if(num2 == 0.0) {
                Toast.makeText(this, "Não é pssível dividir por 0", Toast.LENGTH_SHORT).show()

                return@setOnClickListener
            }

            Toast.makeText(this, "A divisão é $res", Toast.LENGTH_SHORT).show()
        }
    }
}