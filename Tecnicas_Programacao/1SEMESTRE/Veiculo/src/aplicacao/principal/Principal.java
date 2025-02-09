package aplicacao.principal;

import automovel.carro.Carro;
import java.util.Scanner;

public class Principal {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        float valorGasolina = 4.89f;

        System.out.println("Seja bem vindo ao sistema de automóvel!");

        System.out.print("Qual a marca do veiculo que deseja? ");
        String marca = scanner.next();

        System.out.print("Qual o modelo do veiculo que deseja? ");
        String modelo = scanner.next();

        System.out.print("Qual o ano do veiculo que deseja? ");
        int ano = scanner.nextInt();

        System.out.print("Qual a potencia do motor do veiculo que deseja? ");
        double motor = scanner.nextDouble();

        System.out.print("Quantos litros de gasolina cabem no tangue do veiculo que deseja? ");
        double quantidadeTangue = scanner.nextDouble();

        Carro car = new Carro(marca, modelo, ano, motor, quantidadeTangue);

        System.out.print("Deseja abastecer? (s/n) ");
        String abastecer = scanner.next();

        if (abastecer.equals("n")) {
            return;
        }

        if (abastecer.equals("s")) {
            System.out.print("Quantos litros de gasolina deseja adicionar? ");
            double gasolina = scanner.nextDouble();
            car.adicionarGasolina(gasolina, valorGasolina);

            System.out.print("Deseja Ligar o Carro? (s/n) ");
            String ligar = scanner.next();

            if (ligar.equals("n")) {
                return;
            }

            if (ligar.equals("s")) {

                car.girarChave();

                System.out.print("Deseja acelerar o Carro? (s/n) ");
                String acelerar = scanner.next();

                if (acelerar.equals("n")) {
                    return;
                }

                if (acelerar.equals("s")) {
                    car.acelerar();

                    System.out.println("O carro acelerou. " + car.getVelocidade());

                    while (car.getVelocidade() > 0) {
                        System.out.println("1- Frear");
                        System.out.println("2- Acelerar");
                        System.out.println("3- Desligar");
                        System.out.print("O que deseja fazer? ");

                        int opcao = scanner.nextInt();

                        switch (opcao) {
                            case 1:
                                car.frear();
                                if (car.getVelocidade() <= 0) {
                                    System.out.println("O carro está parado..");
                                    break;
                                } else {
                                    System.out.println("O carro freou. " + car.getVelocidade());
                                    break;
                                }
                            case 2:
                                car.acelerar();
                                System.out.println("O carro acelerou. " + car.getVelocidade());
                                break;
                            case 3:
                                car.girarChave();
                                break;
                        }

                    }
                }
            }
        }
    }
}
