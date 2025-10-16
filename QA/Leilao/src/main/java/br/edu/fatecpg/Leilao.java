package br.edu.fatecpg;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Leilao {

    private String descricao;
    private List<Lance> lances = new ArrayList<>();

    public Leilao(String descricao) {
        this.descricao = descricao;
    }

    public void propoe(Lance lance) {
        if (lance == null) return;

        if (!lances.isEmpty()) {
            Lance ultimoLance = lances.get(lances.size() - 1);
            if (ultimoLance.getUsuario().equals(lance.getUsuario())) return;
        }

        long quantidadeLancesUsuario = lances.stream()
                .filter(l -> l.getUsuario().equals(lance.getUsuario()))
                .count();
        if (quantidadeLancesUsuario >= 5) return;

        if (!lances.isEmpty()) {
            double ultimoValor = lances.get(lances.size() - 1).getValor();
            if (lance.getValor() <= ultimoValor) return;
        }

        lances.add(lance);
    }

    public List<Lance> getLances() {
        return Collections.unmodifiableList(lances);
    }
}
