package br.edu.fatecpg.banco;

public class ContaCorrente {
    private double saldoInicial;
    private double limiteChequeEspecial;

    public ContaCorrente(double saldoInicial, double limiteChequeEspecial) {
        if (limiteChequeEspecial > 0) {
            throw new IllegalArgumentException("Limite de cheque especial deve ser menor ou igual a zero");
        }
        this.saldoInicial = saldoInicial;
        this.limiteChequeEspecial = limiteChequeEspecial;
    }

    public boolean sacar(double valor) {
        if (valor <= 0) {
            throw new IllegalArgumentException("Valor deve ser maior que zero");
        }

        if (this.saldoInicial - valor >= this.limiteChequeEspecial) {
            this.saldoInicial -= valor;
            return true;
        }

        return false;
    }

    public void depositar(double valor) {
        if (valor <= 0) {
            throw new IllegalArgumentException("Valor deve ser maior que zero");
        }
        this.saldoInicial += valor;
    }

    public double getSaldo() {
        return this.saldoInicial;
    }
}