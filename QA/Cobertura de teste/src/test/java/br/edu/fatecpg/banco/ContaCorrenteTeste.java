package br.edu.fatecpg.banco;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ContaCorrenteTeste {

    @Test
    void saqueSemChequeEspecial(){
        ContaCorrente contaCorrente = new ContaCorrente(50.0, 0);

        contaCorrente.depositar(50);

        assertEquals(true, contaCorrente.sacar(50));
    };

    @Test
    void saqueComChequeEspecial(){
        ContaCorrente contaCorrente = new ContaCorrente(25.0, -75.0);
        assertEquals(true, contaCorrente.sacar(50.0));
    };

    @Test
    void saqueComChequeEspecialLimite(){
        ContaCorrente contaCorrente = new ContaCorrente(25.0, -75.0);
        assertEquals(true, contaCorrente.sacar(100.0));
    };

    @Test
    void saqueComChequeEspecialEstouraLimite(){
        ContaCorrente contaCorrente = new ContaCorrente(25.0, -75.0);
        assertEquals(false, contaCorrente.sacar(200.0));
        assertEquals(25.0, contaCorrente.getSaldo());
    };

    @Test
    void contaChequeEspecialPositivo(){

        assertThrows(IllegalArgumentException.class, () -> new ContaCorrente(50.0, 75.0));
    };

    @Test
    void depositoNegativo(){
        ContaCorrente contaCorrente = new ContaCorrente(25.0, -75.0);

        assertThrows(IllegalArgumentException.class, () -> contaCorrente.depositar(-50.0));
    };

    @Test
    void saqueNegativo(){
        ContaCorrente contaCorrente = new ContaCorrente(25.0, -75.0);

        assertThrows(IllegalArgumentException.class, () -> contaCorrente.sacar(-50.0));
    };

}
