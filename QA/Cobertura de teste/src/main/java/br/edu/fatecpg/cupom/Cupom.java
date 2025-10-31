package br.edu.fatecpg.cupom;

import java.util.Date;

public class Cupom {
    private String codigo;
    private Date dataDeValidade;
    private double valorMinimoCompra;
    private boolean usado;

    public Cupom(String codigo, Date dataDeValidade, double valorMinimoCompra, boolean usado) {
        this.codigo = codigo;
        this.dataDeValidade = dataDeValidade;
        this.valorMinimoCompra = valorMinimoCompra;
        this.usado = usado;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Date getDataDeValidade() {
        return dataDeValidade;
    }

    public void setDataDeValidade(Date dataDeValidade) {
        this.dataDeValidade = dataDeValidade;
    }

    public double getValorMinimoCompra() {
        return valorMinimoCompra;
    }

    public void setValorMinimoCompra(double valorMinimoCompra) {
        this.valorMinimoCompra = valorMinimoCompra;
    }

    public boolean isUsado() {
        return usado;
    }

    public void setUsado(boolean usado) {
        this.usado = usado;
    }
}
