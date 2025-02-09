class Celula {
    
    boolean nucleo;
    boolean membrana;
    boolean cancerigena;

    void reproduzir() {
        if (nucleo && membrana) {
            System.out.println("Reproduzindo!");
        }
    }


}