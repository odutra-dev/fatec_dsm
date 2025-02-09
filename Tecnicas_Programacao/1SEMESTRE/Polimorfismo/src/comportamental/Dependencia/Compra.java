package comportamental.Dependencia;

public class Compra {
    
    Cliente cliente;
    
    public Compra(Cliente cliente) {
        this.cliente = cliente;
    }

    public void finalizar(Cupom cupom) {
        System.out.println("Compra finalizada com sucesso! \n Com o cupom: " + cupom.codigo);
    }
}
