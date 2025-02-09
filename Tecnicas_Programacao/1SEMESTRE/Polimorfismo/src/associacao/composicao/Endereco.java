package associacao.composicao;

public class Endereco {
    int cep;
    String rua;
    int numero;
    String complemento;
    String estado;
    String cidade;
    String bairro;

    public Endereco(int cep, int numero, String bairro, String estado, String cidade, String complemento, String rua) {
        this.cep = cep;
        this.numero = numero;
        this.bairro = bairro;
        this.estado = estado;
        this.cidade = cidade;
        this.complemento = complemento;
        this.rua = rua;

    }

}
