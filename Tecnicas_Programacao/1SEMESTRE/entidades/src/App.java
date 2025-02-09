import java.util.Scanner;
import java.util.Random;

public class App {

    public static void main(String[] args) throws Exception {
        Scanner input = new Scanner(System.in);
        Random rand = new Random();

        // Professor
        /*
         * Professor professor = new Professor();
         * 
         * System.out.print("Nome: ");
         * professor.nome = input.next();
         * System.out.print("Altura: ");
         * professor.altura = input.nextFloat();
         * System.out.print("Formacao: ");
         * professor.formacao = input.next();
         * 
         * System.out.println("O professor " + professor.nome + " ira ensinar!");
         * professor.ensinar();
         * System.out.println("O professor " + professor.nome + " ira avaliar!");
         * int nota1 = rand.nextInt(10);
         * int nota2 = rand.nextInt(10);
         * int nota3 = rand.nextInt(10);
         * System.out.println("Sua media foi de: " + professor.avaliar(nota1, nota2,
         * nota3));
         */

        // Aplicativo
        /*
         * Aplicativo app = new Aplicativo();
         * 
         * System.out.print("Nome: ");
         * app.nome = input.next();
         * System.out.print("Interfaces: ");
         * app.interfaces = input.next();
         * System.out.print("Linguagem: ");
         * app.linguagem = input.next();
         * 
         * app.abrir();
         * System.out.println("O aplicativo " + app.nome + " foi aberto!");
         * 
         * app.armazenarDados();
         */

        // Thor
        /*
         * Thor thor = new Thor();
         * 
         * System.out.print("Ele é deus? (s/n) ");
         * String verdade = input.next();
         * 
         * if (verdade.equals("s")) {
         * thor.deus = true;
         * } else if (verdade.equals("n")) {
         * thor.deus = false;
         * }
         * 
         * System.out.print("Ele tem martelo? ");
         * verdade = input.next();
         * 
         * if (verdade.equals("s")) {
         * thor.martelo = true;
         * }
         * else if (verdade.equals("n")) {
         * thor.martelo = false;
         * }
         * 
         * System.out.print("Ele é forte? ");
         * verdade = input.next();
         * 
         * if (verdade.equals("s")) {
         * thor.forte = true;
         * }
         * else if (verdade.equals("n")) {
         * thor.forte = false;
         * }
         * 
         * thor.voar();
         * thor.invocarRaio();
         */

        // Genética

        /*
         * Genetica genes = new Genetica();
         * 
         * System.out.print("DNA: ");
         * genes.dna = input.next();
         * System.out.print("Cromossomo: ");
         * genes.cromossomo = input.next();
         * 
         * genes.herdar();
         * 
         * System.out.println("Após herdar, o bebe é: ");
         * 
         * genes.definirCaracteristicas();
         */

        // Pintura

        /*
         * Pintura pintura = new Pintura();
         * 
         * System.out.print("Autor: ");
         * pintura.autor = input.next();
         * System.out.print("Tipo de pintura: ");
         * pintura.tipoPintura = input.next();
         * System.out.print("Cor: ");
         * pintura.cor = input.next();
         * 
         * pintura.expressar();
         */

         // Celula

/*         Celula celula = new Celula();

        System.out.print("Nucleo? (s/n) ");
        String verdade = input.next();

        if (verdade.equals("s")) {
            celula.nucleo = true;
        } else if (verdade.equals("n")) {
            celula.nucleo = false;
        }

        System.out.print("Membrana? (s/n) ");
        verdade = input.next();

        if (verdade.equals("s")) {
            celula.membrana = true;
        } else if (verdade.equals("n")) {
            celula.membrana = false;
        }

        System.out.print("Cancerígena? (s/n) ");
        verdade = input.next();

        if (verdade.equals("s")) {
            celula.cancerigena = true;
        } else if (verdade.equals("n")) {
            celula.cancerigena = false;
        }

        celula.reproduzir(); */

        // Plamta

        /* Planta planta = new Planta();

        System.out.print("Cor: ");
        planta.cor = input.next();
        System.out.print("Especie: ");
        planta.especie = input.next();
        System.out.print("Regiao: ");
        planta.regiao = input.next();

        System.out.println(planta.gerarOxigenio());
        */

        //Idade Média

/*         IdadeMedia idadeMedia = new IdadeMedia();

        System.out.print("Duracao: ");
        idadeMedia.duracao = input.nextInt();
        System.out.print("Peste Negra: ");
        idadeMedia.pesteNegra = input.nextBoolean();
        System.out.print("Feudalismo: ");
        idadeMedia.feudalismo = input.nextBoolean();
 */

        // Arte Digital
        
/*         ArteDigital arteDigital = new ArteDigital();

        System.out.print("Autor: ");
        arteDigital.autor = input.next();
        System.out.print("Tamanho: ");
        arteDigital.tamanho = input.nextFloat();
        System.out.print("Formato: ");
        arteDigital.formato = input.next();

        arteDigital.expressar();

 */

        // Filme

        Filme filme = new Filme();

        System.out.print("Diretor: ");
        filme.diretor = input.next();
        System.out.print("Elenco: ");
        filme.elenco = input.next();
        System.out.print("Tiulo: ");
        filme.titulo = input.next();

        filme.exibir();
    }
}
