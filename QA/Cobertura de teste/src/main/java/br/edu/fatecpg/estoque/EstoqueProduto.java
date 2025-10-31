package br.edu.fatecpg.estoque;

public class EstoqueProduto {
    String nome;
    int quantidade;


    public EstoqueProduto(String nome, int quantidade) {

        if(quantidade < 0) throw new IllegalArgumentException("Quantidade deve ser maior que zero");

        this.nome = nome;
        this.quantidade = quantidade;
    }

    public void adicionar(int quantidade) {

        if (quantidade <= 0) throw new IllegalArgumentException("Quantidade deve ser maior que zero");

        this.quantidade += quantidade;
    }
    public void remover(int quantidade) {

        if (quantidade <= 0) throw new IllegalArgumentException("Quantidade deve ser maior que zero");

        if(this.quantidade - quantidade < 0) throw new EstoqueInsuficienteException("Quantidade insuficiente");

        this.quantidade -= quantidade;
    }

    public String getNome() {
        return this.nome;
    }

    public int getQuantidadeAtual() {
        return this.quantidade;
    }
}
