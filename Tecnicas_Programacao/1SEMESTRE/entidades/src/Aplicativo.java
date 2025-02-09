public class Aplicativo {
    String nome;
    String interfaces;
    String linguagem;

    private boolean aberto;

    void abrir() {
        if(linguagem != null) {
            aberto = true;
            System.out.println("Abrindo aplicativo...");
        }
    }

    void armazenarDados() {
        if (aberto){
            System.out.println("Armazenando dados...");
        }
    }
}
