public class Thor {
    boolean deus;
    boolean martelo;
    boolean forte;

    void voar() {
        if (deus && martelo) {
            System.out.println("Voando");
        }
    }

    void invocarRaio() {
        if (deus && martelo) {
            System.out.println("Invocando raio");
        }
    }
}
