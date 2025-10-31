package br.edu.fatecpg.frete;

public class CalculadoraFrete {

    public double calcular(double pesoKg, String regiao) {
        if (pesoKg <= 0) {
            throw new IllegalArgumentException("O peso deve ser maior que zero.");
        }
        if (regiao == null || regiao.isEmpty()) {
            throw new IllegalArgumentException("A região não pode ser nula ou vazia.");
        }

        double valorFrete;

        switch (regiao) {
            case "Sudeste":
                valorFrete = 10.0;
                if (pesoKg > 1) {
                    valorFrete += (pesoKg - 1) * 2.0;
                }
                break;

            case "Sul":
                valorFrete = 15.0;
                if (pesoKg > 1) {
                    valorFrete += (pesoKg - 1) * 2.5;
                }
                break;

            case "Centro-Oeste":
                valorFrete = 20.0;
                if (pesoKg > 1) {
                    valorFrete += (pesoKg - 1) * 3.0;
                }
                break;

            default:
                valorFrete = 30.0;
                if (pesoKg > 1) {
                    valorFrete += (pesoKg - 1) * 5.0;
                }
                break;
        }

        return valorFrete;
    }
}