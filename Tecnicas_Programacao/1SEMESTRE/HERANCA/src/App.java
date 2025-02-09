import java.util.Scanner;
import loja.*;;
public class App {

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);
        
        System.out.println("Cadastro de Funcionário");
        System.out.println("---------------------");
        System.out.println("1 - Gerente");
        System.out.println("2 - Vendedor");
        System.out.println("3 - Faxineiro");
        System.out.println("-------------------");
        System.out.print("Escolha uma opção: ");
        int opcao = input.nextInt();

        switch (opcao) {
            case 1:
                System.out.println("Dados do Gerente");
                System.out.print("Nome: ");
                String nome = input.next();
                System.out.print("CPF: ");
                int cpf = input.nextInt();
                System.out.print("Salario: ");
                double salario = input.nextDouble();
                Gerente gerente = new Gerente(nome, cpf, salario);
                gerente.baterPonto(8,17);
                gerente.fecharCaixa(1000);
                break;

            case 2:
                System.out.println("Dados do Vendedor");
                System.out.print("Nome: ");
                String nomeVendedor = input.next();
                System.out.print("CPF: ");
                int cpfVendedor = input.nextInt();
                System.out.print("Salario: ");
                double salarioVendedor = input.nextDouble();
                Vendedor vendedor = new Vendedor(nomeVendedor, cpfVendedor, salarioVendedor);
                vendedor.baterPonto(8, 17);
                vendedor.realizarVenda("Arroz");
                break;

            case 3:
                System.out.println("dados do Faxineiro");
                System.out.print("Nome: ");
                String nomeFaxineiro = input.next();
                System.out.print("CPF: ");
                int cpfFaxineiro = input.nextInt();
                System.out.print("Salario: ");
                double salarioFaxineiro = input.nextDouble();
                Faxineiro faxineiro = new Faxineiro(nomeFaxineiro, cpfFaxineiro, salarioFaxineiro);
                faxineiro.baterPonto(8, 17);
                faxineiro.solicitarMaterial("Papel");
        
            default:
                break;
        }
    }
}
