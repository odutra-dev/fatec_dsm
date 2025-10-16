package br.edu.fatecpg;

public class Usuario {
    private String nome;
    public Usuario(String nome) {
        this.nome = nome;
    }
    public String getNome() {
        return nome;
    }
    // Igualdade baseada no nome (para comparar usuários nos testes)
    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Usuario outro) {
            return this.nome.equals(outro.nome);
        }
        return false;
    }
}
