public class Genetica {

    String dna;
    String tipoGenes;
    String cromossomo;

    public void definirCaracteristicas() {
        if (cromossomo != null) {
            System.out.println("DNA: " + dna);
            System.out.println("Cromossomo: " + cromossomo);
        }
    }

    public void herdar() {

        System.out.println("DNA do Pai e da mãe!");
    }

}
