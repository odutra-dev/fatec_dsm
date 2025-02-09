import java.util.Scanner;

public class App {

  public static void main(String[] args) throws Exception {
    //ex1
    /* 
        Scanner input = new Scanner(System.in);
        int idade;

        System.out.print("Digite sua idade: ");
        idade = input.nextInt();

        if (idade >= 18 && idade <= 60) {
            System.out.println("Voce e adulto");
        } else if (idade >= 60) {
            System.out.println("Voce e idoso");
        }
        else {
            System.out.println("Voce e menor de idade");
        } */

    //ex2
    /*         Scanner input = new Scanner(System.in);

        int n;
        int impares = 1;
        int soma = 0;

        System.out.print("Digite a quantidade de números impares: ");
        n = input.nextInt();

        for (int i = 0; i < n; i++) {
            soma += impares;
            System.out.print(impares + " + ");
            impares += 2;
        }

        System.out.println(" = " + soma); */

    //ex3
    /* Scanner input = new Scanner(System.in);

        String[] nomes = new String[5];

        for (int i = 0; i < nomes.length; i++) {
            System.out.print("Digite o " + (i + 1) + "o nome: ");
            nomes[i] = input.nextLine();
        }
        
        System.out.print("Digite o nome que deseja: ");
        String novoNome = input.nextLine();

        for (int i = 0; i < nomes.length; i++) {
            if (nomes[i].equals(novoNome)) {
                System.out.println("O nome " + novoNome + " está na lista.");
                break;
            }else {
                if (i == nomes.length - 1) System.out.println("O nome " + novoNome + " não está na lista.");
            }
        } */

    //ex4
    /*         Scanner input = new Scanner(System.in);

        String password = "javalog";

        System.out.print("Digite a senha: ");
        String userPassword = input.nextLine();

        while (!userPassword.equals(password)) {
            System.out.println("Senha incorreta! Tente novamente: ");
            System.out.print("Digite a senha: ");
            userPassword = input.nextLine();
        }

        System.out.println("Acesso permitido!"); */

    //ex5
    Scanner input = new Scanner(System.in);

    System.out.print("Digite a quantidade de materias do semestre: ");
    int materias = input.nextInt();

    System.out.print("Digite a nota minima para aprovação: ");
    int notaMinima = input.nextInt();

    String[][] materiasArray = new String[materias][6];

    for (int i = 0; i < materias; i++) {
      System.out.print("Digite a materia " + (i + 1) + ": ");
      materiasArray[i][0] = input.next();
    }

    for (int i = 0; i < materias; i++) {
      for (int j = 1; j < 4; j++) {
        System.out.print(
          "Digite a nota" + j + " da materia " + (materiasArray[i][0]) + ": "
        );
        materiasArray[i][j] = input.next();
      }
    }

    for (int i = 0; i < materias; i++) {
      double media = 0;
      for (int j = 1; j < 4; j++) {
        media += Double.parseDouble(materiasArray[i][j]);
      }
      media = media / 3;
      materiasArray[i][4] = String.valueOf(media);
      if (media >= notaMinima) {
        materiasArray[i][5] = "Aprovado";
      } else {
        materiasArray[i][5] = "Reprovado";
      }
    }

    System.out.println("DISIPLINA - NOTA1 - NOTA2 - NOTA3 - MÉDIA - APROVAÇAO");
    System.out.println("NOTA MÍNIMA: " + notaMinima);

    for (int i = 0; i < materias; i++) {
      System.out.println(
        materiasArray[i][0] +
        " - " +
        materiasArray[i][1] +
        " - " +
        materiasArray[i][2] +
        " - " +
        materiasArray[i][3] +
        " - " +
        materiasArray[i][4] +
        " - " +
        materiasArray[i][5]
      );
    }
  }
}
