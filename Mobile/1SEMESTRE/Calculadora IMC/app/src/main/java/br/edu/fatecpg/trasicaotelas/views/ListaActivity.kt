package br.edu.fatecpg.trasicaotelas.views

import android.media.AudioRecord.OnRecordPositionUpdateListener
import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import br.edu.fatecpg.trasicaotelas.R
import br.edu.fatecpg.trasicaotelas.dao.IMCDao
import br.edu.fatecpg.trasicaotelas.model.IMC
import com.google.android.material.floatingactionbutton.FloatingActionButton

class ListaActivity : AppCompatActivity() {
    val dao = IMCDao()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_lista)

        val txvNome = findViewById<TextView>(R.id.txv_nome)
        val txvWhats = findViewById<TextView>(R.id.txv_whats)
        val txvResultado = findViewById<TextView>(R.id.txv_resultado)
        val fabVolta = findViewById<FloatingActionButton>(R.id.fab_volta)
        val IMC: IMC = dao.exibirIMC();

        val seuIMC = IMC.peso / (IMC.altura * IMC.altura)
        txvNome.text = "Sua altura ${IMC.altura}"
        txvWhats.text = "Seu peso ${IMC.peso}"
        var situacao = ""

        if (seuIMC < 18.5){
            situacao = "Muito Magro"
        }

        if (seuIMC >= 18.5 && seuIMC <= 24.9){
            situacao = "Normal"
        }

        if (seuIMC >= 25.0 && seuIMC <= 29.9){
            situacao = "Gordo"
        }

        if (seuIMC >= 30.0 && seuIMC <= 34.9){
            situacao = "Muito Gordo"
        }

        if (seuIMC >= 35.0 && seuIMC <= 39.9){
            situacao = "Extremamente Gordo"
        }

        if (seuIMC > 40.0){
            situacao = "Thais Carla"
        }

        txvResultado.text = "Seu IMC é: %.2f\", você está: ${situacao}".format(seuIMC)

        fabVolta.setOnClickListener {
            finish()
        }
        }
    }