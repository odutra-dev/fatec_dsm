package loja;

public class Faxineiro extends Funcionario {
    
    public Faxineiro(String nome, int cpf, double salario) {
        super(nome, cpf, salario);
    }

    public void solicitarMaterial(String material){
        System.out.println("Favor comprar o material " + material);
    }

}
