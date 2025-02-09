package Calculadora;
import java.util.ArrayList;

public class Calculadora {
    public static double calcularMedia(ArrayList<Integer> numeros) throws ArithmeticException {
        if (numeros.isEmpty()) {
            throw new ArithmeticException("A lista de números está vazia. Não é possível calcular a média.");
        }

        int soma = 0;
        for (int numero : numeros) {
            soma += numero;
        }

        return (double) soma / numeros.size();
    }
}
