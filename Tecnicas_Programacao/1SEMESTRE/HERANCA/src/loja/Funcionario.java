package loja;

public class Funcionario {
    
    public String nome;
    public int cpf;
    public double salario;

    public Funcionario(String nome, int cpf, double salario){
        this.nome = nome;
        this.cpf = cpf;
        this.salario = salario;
    }

    public void baterPonto(double entrada, double saida){
        System.out.println("Funcionario: " + nome);
        System.out.println("Entrada: " + entrada);
        System.out.println("Saida: " + saida);
        System.out.println("Horas Trabalhadas: " + (saida - entrada));
    }
}
