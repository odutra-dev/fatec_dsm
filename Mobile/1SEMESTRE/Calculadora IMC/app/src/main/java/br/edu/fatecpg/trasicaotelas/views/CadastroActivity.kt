package br.edu.fatecpg.trasicaotelas.views

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import br.edu.fatecpg.trasicaotelas.R
import br.edu.fatecpg.trasicaotelas.dao.IMCDao
import br.edu.fatecpg.trasicaotelas.model.IMC
import com.google.android.material.floatingactionbutton.FloatingActionButton

class CadastroActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_cadastro)
        val dao = IMCDao()
        val edtAltura = findViewById<EditText>(R.id.edt_altura)
        val edtPeso = findViewById<EditText>(R.id.edt_peso)
        val btnSalvar = findViewById<Button>(R.id.btn_salvar)
        val fabLista = findViewById<FloatingActionButton>(R.id.fab_lista)
        btnSalvar.setOnClickListener{
            val altura = edtAltura.text.toString().toDouble()
            val peso = edtPeso.text.toString().toDouble()
            val IMC = IMC(altura,peso)
            dao.cadastroIMC(IMC)
            Toast.makeText(this, "IMC Realizado Com Successo",Toast.LENGTH_LONG)
                .show()
            edtAltura.text.clear()
            edtPeso.text.clear()
        }
        fabLista.setOnClickListener {
            val intent = Intent(this, ListaActivity::class.java)

            startActivity(intent)
        }
    }
}