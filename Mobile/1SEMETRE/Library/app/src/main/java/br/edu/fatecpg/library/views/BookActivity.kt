package br.edu.fatecpg.library.views

import android.os.Bundle
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import br.edu.fatecpg.library.R
import com.google.android.material.floatingactionbutton.FloatingActionButton

class BookActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_book)

        val close = findViewById<FloatingActionButton>(R.id.btnClose)
        val bookA = findViewById<TextView>(R.id.bookAuthor)
        val bookT = findViewById<TextView>(R.id.bookTitle)

        val author = intent.getStringExtra("author")
        val title = intent.getStringExtra("title")

        bookA.text = "Autor: ${author}"
        bookT.text = "Título: ${title}"


        close.setOnClickListener(){
            finish()
        }


    }
}