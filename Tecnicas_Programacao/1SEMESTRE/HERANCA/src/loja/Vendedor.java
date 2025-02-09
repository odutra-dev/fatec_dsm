package loja;

public class Vendedor extends Funcionario {

    public Vendedor(String nome, int cpf, double salario) {
        super(nome, cpf, salario);
    }
    
    public void realizarVenda(String produto){
        System.out.println("Venda de produto " + produto + " Realizada!");
    }
}
