package Produtos;

public class Produto {
    public String nome;
    public String desc;
    public double price;
    public int qtd;

    public Produto(String nome, String desc, double price, int qtd) {
        this.nome = nome;
        this.desc = desc;
        this.price = price;
        this.qtd = qtd;
    }
}
