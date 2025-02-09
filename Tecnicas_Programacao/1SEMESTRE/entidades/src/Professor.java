public class Professor {
    String nome;
    float altura;
    String formacao;

    private boolean formando;

    void ensinar() {
        if(formacao != null) {
            formando = true;
            System.out.println("Ensinando...");
        }
        else{
            System.out.println("Formando...");
        }
    }

    float avaliar(float nota1, float nota2, float nota3) {
        if(formando) {
            return (nota1 + nota2 + nota3) /3;
        }
        formando = false;
        return -1;
    }

}
