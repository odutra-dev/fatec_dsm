package br.edu.fatecpg.library.views

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import br.edu.fatecpg.library.R

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val bookA = findViewById<EditText>(R.id.edtAuthor)
        val bookT = findViewById<EditText>(R.id.edtBook)
        val add = findViewById<Button>(R.id.btnAdd)

        add.setOnClickListener(){
            val screen = Intent(this, BookActivity::class.java)
            screen.putExtra("author", bookA.text.toString())
            screen.putExtra("title", bookT.text.toString())

            startActivity(screen)
        }
    }
}