package br.edu.fatecpg.estoque;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class EstoqueProdutoTeste {

    @Test
    void criaProduto(){

        EstoqueProduto estoqueProduto = new EstoqueProduto("Produto", 10);

        assertEquals("Produto", estoqueProduto.getNome());
        assertEquals(10, estoqueProduto.getQuantidadeAtual());
    }
    @Test
    void criaProdutoNegativa(){

        assertThrows(IllegalArgumentException.class, () -> {
            EstoqueProduto estoqueProduto = new EstoqueProduto("Produto", -1);
        });
    }

    @Test
    void adicionaProduto(){

        EstoqueProduto estoqueProduto = new EstoqueProduto("Produto", 10);

        estoqueProduto.adicionar(5);

        assertEquals(15, estoqueProduto.getQuantidadeAtual());
    }

    @Test
    void adicionaProdutoNegativa(){

        EstoqueProduto estoqueProduto = new EstoqueProduto("Produto", 10);

        assertThrows(IllegalArgumentException.class, () -> {
            estoqueProduto.adicionar(-1);
        });
    }

    @Test
    void removeProduto(){

        EstoqueProduto estoqueProduto = new EstoqueProduto("Produto", 10);

        estoqueProduto.remover(5);

        assertEquals(5, estoqueProduto.getQuantidadeAtual());
    }

    @Test
    void removeProdutoNegativa(){

        EstoqueProduto estoqueProduto = new EstoqueProduto("Produto", 10);

        assertThrows(IllegalArgumentException.class, () -> {
            estoqueProduto.remover(-1);
        });
    }

    @Test
    void removeProdutoInsuficiente(){

        EstoqueProduto estoqueProduto = new EstoqueProduto("Produto", 10);

        assertThrows(EstoqueInsuficienteException.class, () -> {
            estoqueProduto.remover(11);
        });
    }
}
