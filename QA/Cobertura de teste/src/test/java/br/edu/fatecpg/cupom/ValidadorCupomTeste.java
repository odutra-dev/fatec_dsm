package br.edu.fatecpg.cupom;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

public class ValidadorCupomTeste {

    @Test
    void cupomNaoUsado(){
        ValidadorCupom validadorCupom = new ValidadorCupom();

        LocalDate localDate = LocalDate.parse("2025-11-26");
        Date data = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());

        Cupom cupom = new Cupom("123", data, 10.0, false);

        assertEquals(true, validadorCupom.validar(cupom, 15.0));
    }

    @Test
    void cupomUsado(){
        ValidadorCupom validadorCupom = new ValidadorCupom();

        LocalDate localDate = LocalDate.parse("2025-11-26");
        Date data = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());

        Cupom cupom = new Cupom("123", data, 10.0, false);

        cupom.setUsado(true);

        assertThrows(CupomExpiradoException.class, () -> {
            validadorCupom.validar(cupom, 15.0);
        });
    }

    @Test
    void cupomExpirado(){
        ValidadorCupom validadorCupom = new ValidadorCupom();

        LocalDate localDate = LocalDate.parse("2025-10-12");
        Date data = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());

        Cupom cupom = new Cupom("123", data, 10.0, false);

        cupom.setDataDeValidade(new Date());

        assertThrows(CupomExpiradoException.class, ()->{
            validadorCupom.validar(cupom, 15.0);
        });
    }

    @Test
    void valorCompraInvalido(){
        ValidadorCupom validadorCupom = new ValidadorCupom();

        LocalDate localDate = LocalDate.parse("2025-11-26");
        Date data = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());

        Cupom cupom = new Cupom("123", data, 10.0, false);

        cupom.setCodigo("1234");
        cupom.setValorMinimoCompra(20.0);

        assertThrows(ValorCompraInvalidoException.class, ()->{
            validadorCupom.validar(cupom, 5.0);
        });
    }
}
