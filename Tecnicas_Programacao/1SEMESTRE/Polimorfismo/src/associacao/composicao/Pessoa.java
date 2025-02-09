package associacao.composicao;

public class Pessoa {
    Endereco end;
    String nome;
    int idade;

    public Pessoa(Endereco end, String nome, int idade) {
        this.end = end;
        this.nome = nome;
        this.idade = idade;
    }

    public void mostrarEnd() {
        System.out.println("Cep: " + end.cep);
        System.out.println("Rua: " + end.rua);
        System.out.println("Numero: " + end.numero);
        System.out.println("Complemento: " + end.complemento);
        System.out.println("Estado: " + end.estado);
        System.out.println("Cidade: " + end.cidade);
        System.out.println("Bairro: " + end.bairro);
    }

}
