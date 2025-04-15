# biblioteca.py

from livro import Livro

class Biblioteca:
    def __init__(self):
        self.livros = []

    def adicionar_livro(self, titulo, autor, ano):
        livro = Livro(titulo, autor, ano)
        self.livros.append(livro)

    def listar_livros(self):
        if not self.livros:
            print("Nenhum livro na biblioteca.")
            return
        for livro in self.livros:
            print(livro)

    def buscar_por_titulo(self, titulo_busca):
        encontrados = [livro for livro in self.livros if titulo_busca.lower() in livro.titulo.lower()]
        if encontrados:
            print("Livros encontrados:")
            for livro in encontrados:
                print(livro)
        else:
            print("Nenhum livro encontrado com esse título.")
