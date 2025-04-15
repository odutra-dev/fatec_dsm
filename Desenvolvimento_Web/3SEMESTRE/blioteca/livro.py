# livro.py

class Livro:
    def __init__(self, titulo, autor, ano):
        self.titulo = titulo
        self.autor = autor
        self.ano = ano

    def __str__(self):
        return f"'{self.titulo}' por {self.autor} ({self.ano})"
