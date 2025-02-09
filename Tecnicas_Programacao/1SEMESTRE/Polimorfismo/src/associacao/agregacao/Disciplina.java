package associacao.agregacao;

public class Disciplina {
    
    String nome;
    Aluno[] alunos;



    public Disciplina(String nome) {
        this.nome = nome;
    }

    public void adicionarAluno(Aluno a) {
        if (alunos == null) {
            alunos = new Aluno[1];
            alunos[0] = a;
        } else {
            Aluno[] aux = new Aluno[alunos.length + 1];
            for (int i = 0; i < alunos.length; i++) {
                aux[i] = alunos[i];
            }
            aux[alunos.length] = a;
            alunos = aux;
        }
    }

    public void mostrarAlunos() {
        if (alunos == null) {
            System.out.println("Não há alunos cadastrados");
        } else {
            
            for (int i = 0; i < alunos.length; i++) {
            System.out.println("Disciplina: " + nome + " Aluno: " + alunos[i].nome);
        }
        }
    }
    
}
