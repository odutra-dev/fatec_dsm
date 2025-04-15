# main.py

from biblioteca import Biblioteca
from utils import menu

def main():
    sistema = Biblioteca()
    while True:
        opcao = menu()

        if opcao == "1":
            titulo = input("Título: ")
            autor = input("Autor: ")
            ano = input("Ano: ")
            sistema.adicionar_livro(titulo, autor, ano)

        elif opcao == "2":
            sistema.listar_livros()

        elif opcao == "3":
            titulo = input("Digite o título para buscar: ")
            sistema.buscar_por_titulo(titulo)

        elif opcao == "0":
            print("Saindo do sistema.")
            break

        else:
            print("Opção inválida!")

if __name__ == "__main__":
    main()
