package br.edu.fatecpg.cupom;
import java.util.Date;

public class ValidadorCupom {

    public boolean validar(Cupom cupom, double valorCompra) throws CupomExpiradoException, ValorCompraInvalidoException {
        if(cupom.isUsado()){
            throw new CupomExpiradoException("Cupom ja foi usado");
        }
        if(cupom.getDataDeValidade().before(new Date())){
            throw new CupomExpiradoException("Cupom expirado");
        }
        if(valorCompra < cupom.getValorMinimoCompra()){
            throw new ValorCompraInvalidoException("Valor da compra abaixo do minimo");
        }

        return  true;

    }
}
