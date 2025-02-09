import java.util.Scanner;
import java.util.Random;

public class App {
    public static void main(String[] args) throws Exception {

                /*		ex1 

  		Random rand = new Random();
		int[] arrInts = new int[10];

		for(int i = 0; i < 10; i++){
			arrInts[i] = rand.nextInt(100);
		}

		for(int i = 0; i < 10; i++){
			if(arrInts[i] % 2 == 0){
				System.out.println(arrInts[i]);
			}
		}
*/

/*		ex2

		Scanner input = new Scanner(System.in);
		Random rand = new Random();
		int num = rand.nextInt(100);
		int numUser = -1;

		while(numUser != num){

			System.out.print("Digite um número de 0 a 100: ");
			numUser = input.nextInt();

			if(numUser > num){
				System.out.println("O número digitado é maior que o sorteado!");
			}
			else{
				System.out.println("O número digitado é menor que o sorteado!");
			}
		}

		System.out.print("Parabéns!!");
		*/

		/*ex3

		Random rand = new Random();
		int media = 0;
		int soma = 0;
		int[] arrIntRand = new int[20];

		for(int i = 0; i < 20; i++){
			arrIntRand[i] = rand.nextInt(100);
			soma += arrIntRand[i];
		}

		media = soma/20;

		System.out.print("A média do array de 20 numeros é: " + media);
		*/

        // ex4

		/*Random rand = new Random();
		int maior = 0;
		int menor = 101;
		int[] arrIntRand = new int[15];

		for(int i = 0; i < 15; i++){
			arrIntRand[i] = rand.nextInt(100);
			if(maior < arrIntRand[i]){
				maior = arrIntRand[i];
			}

			if(menor > arrIntRand[i]){
				menor = arrIntRand[i];
			}

		}


		System.out.println("O maior número do array de 15 numeros é: " + maior);
		System.out.println("O menor número do array de 15 numeros é: " + menor);

 

		*/

        /*
         * // ex5
         * 
         * Random rand = new Random();
         * int inpares = 0;
         * int[] arrIntRand = new int[30];
         * 
         * for (int i = 0; i < 30; i++) {
         * arrIntRand[i] = rand.nextInt(100);
         * if (arrIntRand[i] % 2 != 0) {
         * inpares++;
         * }
         * }
         * 
         * System.out.println("Quantidade de números ímpares: " + inpares);
         */

        /*
         * // ex6
         * 
         * Random rand = new Random();
         * int[] arrIntRand = new int[10];
         * 
         * for (int i = 0; i < 30; i++) {
         * arrIntRand[i] = rand.nextInt(100);
         * }
         * 
         * System.out.println("Arry reverso:");
         * for (int i = arrIntRand.length - 1; i >= 0; i--) {
         * System.out.println(arrIntRand[i]);
         * }
         */

        /*
         * // ex7
         * 
         * Random rand = new Random();
         * int[] arrIntRand = new int[50];
         * 
         * for (int i = 0; i < 30; i++) {
         * arrIntRand[i] = rand.nextInt(10);
         * }
         * 
         * for (int i = 0; i < arrIntRand.length; i++) {
         * int cont = 0;
         * for (int j = 0; j < arrIntRand.length; j++) {
         * if (arrIntRand[i] == arrIntRand[j]) {
         * cont++;
         * }
         * }
         * 
         * System.out.println("O número " + arrIntRand[i] + " apareece " + cont +
         * " vezes.");
         * }
         */

/*         // ex8

        int[] lista = new int[10];

        int num = 0;
        int maxCount = -1;
        Scanner ler = new Scanner(System.in);

        for (int i = 0; i < 10; i++) {
            System.out.print("digite o " + (i + 1) + "º numero: ");
            lista[i] = ler.nextInt();
        }

        for (int i = 0; i < 10; i++) {

            int count = 0;

            for (int j = 0; j < 10; j++) {

                if (lista[i] == lista[j]) {

                    count++;
                }
            }

            if (count > maxCount) {
                maxCount = count;
                num = lista[i];
            }
        }

        System.out.println("o numero com maior fequencia é: " + num + " e ele aparece " + maxCount + "vezes");
 */

/*         // ex9
        int num = 0;
        boolean naoEncontrou = false;
        int[] lista = new int[25];
        Scanner ler = new Scanner(System.in);
        Random rand = new Random();

        for (int i = 0; i < lista.length; i++) {
            lista[i] = rand.nextInt(100);
        }

        System.out.print("Digite um numero: ");
        num = ler.nextInt();

        for (int i = 0; i < lista.length; i++) {
            if (num == lista[i]) {
                System.out.println("O numero " + num + " esta na posição " + i);
                naoEncontrou = false;
                break;
            }

            naoEncontrou = true;

        }

        if (naoEncontrou) {
            System.out.println("O numero não foi encontrado");
        } */

        // ex10

        Random rand = new Random();
        int count = 0;
        
        for (int i = 0; i < 100; i++) {
            int soma = 0;
            int dado1 = rand.nextInt(6);
            int dado2 = rand.nextInt(6);

            soma = dado1 + dado2;

            if(soma == 7) {
                count++;
            }
        }

        System.out.println("A quantidade de 7 é: " + count);

    }
}
