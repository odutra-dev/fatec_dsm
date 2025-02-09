public class Filme {
    String diretor;
    String elenco;
    String titulo;

    
    void exibir(){
        
        if(diretor != null && elenco != null && titulo != null){
            System.out.println("Diretor: " + diretor);
            System.out.println("Elenco: " + elenco);
            System.out.println("Tiulo: " + titulo);     
        }     
    }
}
