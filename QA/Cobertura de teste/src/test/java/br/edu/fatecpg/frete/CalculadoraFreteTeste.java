package br.edu.fatecpg.frete;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;



public class CalculadoraFreteTeste {

    // Testes de Exceção

    @Test
    void pesoIgual0(){
        CalculadoraFrete calculadoraFrete = new CalculadoraFrete();

        assertThrows(IllegalArgumentException.class, () -> {
            calculadoraFrete.calcular(0, "");
        });
    }

    @Test
    void pesoMenorQue0(){
        CalculadoraFrete calculadoraFrete = new CalculadoraFrete();

        assertThrows(IllegalArgumentException.class, () -> {
            calculadoraFrete.calcular(-1, "");
        });
    }

    @Test
    void regiaoNula(){
        CalculadoraFrete calculadoraFrete = new CalculadoraFrete();

        assertThrows(IllegalArgumentException.class, () -> {
            calculadoraFrete.calcular(1, null);
        });
    }

    // Testes de Sudeste

    @Test
    void sudestePeso1(){
        CalculadoraFrete calculadoraFrete = new CalculadoraFrete();

        assertEquals(10.0, calculadoraFrete.calcular(1.0, "Sudeste"));

    }

    @Test
    void sudestePeso2(){
        CalculadoraFrete calculadoraFrete = new CalculadoraFrete();

        assertEquals(12.0, calculadoraFrete.calcular(2.0, "Sudeste"));

    }

    @Test
    void sulPeso1(){
        CalculadoraFrete calculadoraFrete = new CalculadoraFrete();

        assertEquals(15.0, calculadoraFrete.calcular(1.0, "Sul"));

    }

    @Test
    void sulPeso2(){
        CalculadoraFrete calculadoraFrete = new CalculadoraFrete();

        assertEquals(17.5, calculadoraFrete.calcular(2.0, "Sul"));

    }

    @Test
    void centroOestePeso1(){
        CalculadoraFrete calculadoraFrete = new CalculadoraFrete();

        assertEquals(20.0, calculadoraFrete.calcular(1.0, "Centro-Oeste"));

    }

    @Test
    void centroOestePeso2(){
        CalculadoraFrete calculadoraFrete = new CalculadoraFrete();

        assertEquals(23.0, calculadoraFrete.calcular(2.0, "Centro-Oeste"));

    }
    @Test
    void outraRegiaoPeso1(){
        CalculadoraFrete calculadoraFrete = new CalculadoraFrete();

        assertEquals(30.0, calculadoraFrete.calcular(1.0, "Norte"));

    }

    @Test
    void outraRegiaoPeso2(){
        CalculadoraFrete calculadoraFrete = new CalculadoraFrete();

        assertEquals(35.0, calculadoraFrete.calcular(2.0, "Norte"));

    }
}
