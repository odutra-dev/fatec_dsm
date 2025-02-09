package automovel.carro;

public class Carro {
    private String marca;
    private String modelo;
    private int ano;
    private double motor;

    private double quantidadeTangue;

    private double velocidade = 0;
    private double gasolinaTanque = 0;
    private boolean ligado = false;

    public Carro(String marca, String modelo, int ano, double motor, double quantidadeTangue) {
        this.marca = marca;
        this.motor = motor;
        this.ano = ano;
        this.modelo = modelo;
        this.quantidadeTangue = quantidadeTangue;

    }

    public void girarChave() {
        if (this.motor > 0 && !this.ligado && this.gasolinaTanque > 0) {

            this.ligado = true;
            System.out.println("Carro ligou...");

        }

        else if (this.motor > 0 && this.ligado && this.gasolinaTanque > 0) {

            this.ligado = false;
            this.velocidade = 0;
            System.out.println("Carro desligou...");

        }

        else if (this.motor > 0 && !this.ligado && this.gasolinaTanque == 0) {

            System.out.println("Carro sem gasolina...");

        }

        else {

            System.out.println("Sem motor");

        }
    }

    public double acelerar() {
        if (this.ligado && this.gasolinaTanque > 0 && this.velocidade < 180) {

            this.velocidade += 20;
            this.removerGasolina();
            return this.velocidade;

        } else if (ligado) {
            this.velocidade = 0;
            this.ligado = false;
            this.gasolinaTanque = 0;
            System.out.println("Carro morreu...");
        } else if (ligado && this.velocidade >= 180) {
            this.velocidade = 180;
            System.out.println("Carro já está no limite de velocidade");
        }

        return 0;
    }

    public double frear() {
        if (this.ligado && this.velocidade > 0) {

            this.velocidade -= 20;
            return this.velocidade;

        }

        return 0;
    }

    public double adicionarGasolina(double gasosa, float valor) {

        if (gasosa <= this.quantidadeTangue && gasosa > 0) {
            if (this.gasolinaTanque < this.quantidadeTangue) {
                this.gasolinaTanque += gasosa;
            System.out.println("você gastou " + (valor * gasosa) + " reais");
                return this.gasolinaTanque;
            } else {
                System.out.println("Tangue ja esta cheio!");
                return this.gasolinaTanque;
            }
        }else{
            System.out.println("Quantidade de gasolina insuficiente!");
            return this.gasolinaTanque;
        }
    }

    public double removerGasolina() {
        if(this.gasolinaTanque > 0){
            this.gasolinaTanque -= 10;
        return this.gasolinaTanque;
        }else{
            return this.gasolinaTanque;
        }
    }

    public double getVelocidade() {
        return this.velocidade;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    public double getMotor() {
        return motor;
    }

    public void setMotor(double motor) {
        this.motor = motor;
    }

    public void setVelocidade(double velocidade) {
        this.velocidade = velocidade;
    }

    public double getQuantidadeTangue() {
        return quantidadeTangue;
    }

    public void setQuantidadeTangue(double quantidadeTangue) {
        this.quantidadeTangue = quantidadeTangue;
    }

    public double getGasolinaTanque() {
        return gasolinaTanque;
    }

}
