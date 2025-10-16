package br.edu.fatecpg;

import org.junit.jupiter.api.Test;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

public class LeilaoTest {

    @Test
    void deveAceitarUmUnicoLance() {
        Leilao leilao = new Leilao("Notebook");
        Usuario joao = new Usuario("João");
        leilao.propoe(new Lance(joao, 2000.0));
        List<Lance> lances = leilao.getLances();
        assertEquals(1, lances.size());
        assertEquals(2000.0, lances.get(0).getValor());
        assertEquals("João", lances.get(0).getUsuario().getNome());
    }
    @Test
    void naoDeveAceitarDoisLancesSeguidosDoMesmoUsuario() {
        Leilao leilao = new Leilao("Smart TV");
        Usuario maria = new Usuario("Maria");
        leilao.propoe(new Lance(maria, 1000.0));
        leilao.propoe(new Lance(maria, 1100.0)); // deve ser ignorado
        List<Lance> lances = leilao.getLances();
        assertEquals(1, lances.size());
        assertEquals(1000.0, lances.get(0).getValor());
    }
    @Test
    void deveAceitarDoisLancesDeUsuariosDiferentes() {
        Leilao leilao = new Leilao("Console");
        Usuario ana = new Usuario("Ana");
        Usuario bruno = new Usuario("Bruno");
        leilao.propoe(new Lance(ana, 500.0));
        leilao.propoe(new Lance(bruno, 550.0));
        List<Lance> lances = leilao.getLances();
        assertEquals(2, lances.size());
    }

    @Test
    void naoDeveAceitarMaisDeCincoLancesDoMesmoUsuario() {
        Leilao leilao = new Leilao("Carro");
        Usuario joao = new Usuario("João");
        Usuario maria = new Usuario("Maria");

        leilao.propoe(new Lance(joao, 1000.0));
        leilao.propoe(new Lance(maria, 1100.0));
        leilao.propoe(new Lance(joao, 1200.0));
        leilao.propoe(new Lance(maria, 1300.0));
        leilao.propoe(new Lance(joao, 1400.0));
        leilao.propoe(new Lance(maria, 1500.0));
        leilao.propoe(new Lance(joao, 1600.0));
        leilao.propoe(new Lance(maria, 1700.0));
        leilao.propoe(new Lance(joao, 1800.0));
        leilao.propoe(new Lance(maria, 1900.0));

        leilao.propoe(new Lance(joao, 2000.0));

        long lancesDoJoao = leilao.getLances().stream()
                .filter(l -> l.getUsuario().equals(joao)).count();
        assertEquals(5, lancesDoJoao);
    }

    @Test
    void naoDeveAceitarLanceComValorMenorQueAnterior() {
        Leilao leilao = new Leilao("Bicicleta");
        Usuario lucas = new Usuario("Lucas");
        Usuario pedro = new Usuario("Pedro");

        leilao.propoe(new Lance(lucas, 800.0));
        leilao.propoe(new Lance(pedro, 700.0)); // Deve ser ignorado

        List<Lance> lances = leilao.getLances();
        assertEquals(1, lances.size());
        assertEquals(800.0, lances.get(0).getValor());
    }

    @Test
    void deveRetornarListaVaziaQuandoNenhumLanceForFeito() {
        Leilao leilao = new Leilao("Tablet");
        assertTrue(leilao.getLances().isEmpty());
    }

    @Test
    void naoDeveAdicionarLanceNulo() {
        Leilao leilao = new Leilao("Monitor");
        leilao.propoe(null); // Deve ser ignorado ou lançar exceção, dependendo da regra
        assertTrue(leilao.getLances().isEmpty());
    }


}
