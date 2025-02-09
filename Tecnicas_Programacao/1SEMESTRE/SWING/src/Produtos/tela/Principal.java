package Produtos.tela;

import java.awt.EventQueue;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.border.EmptyBorder;
import java.util.ArrayList;
import Produtos.Produto;

public class Principal extends JFrame {

    private static final long serialVersionUID = 1L;
    private JPanel contentPane;
    private JTextField inputName;
    private JTextField inputDesc;
    private JTextField inputPrice;
    private JTextField inputQtd;
    private JLabel txtName;
    private JLabel txtDesc;
    private JLabel txtPrice;
    private JLabel txtQtd;
    private JLabel txtResult;

    
    private ArrayList<Produto> produtos = new ArrayList<Produto>();


	

    /**
     * Launch the application.
     */
    public static void main(String[] args) {
        EventQueue.invokeLater(new Runnable() {
            public void run() {
                try {
                    Principal frame = new Principal();
                    frame.setVisible(true);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Create the frame.
     */
    public Principal() {
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setBounds(400, 100, 500, 480);
        contentPane = new JPanel();
        contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));

        setContentPane(contentPane);
        contentPane.setLayout(null);

        txtName = new JLabel("Nome: ");
        txtName.setBounds(10, 10, 100, 23);
        contentPane.add(txtName);

        inputName = new JTextField();
        inputName.setBounds(70, 10, 300, 23);
        contentPane.add(inputName);

        txtDesc = new JLabel("Desc.: ");
        txtDesc.setBounds(10, 50, 100, 23);
        contentPane.add(txtDesc);

        inputDesc = new JTextField();
        inputDesc.setBounds(70, 50, 300, 23);
        contentPane.add(inputDesc);

        txtPrice = new JLabel("Preço: ");
        txtPrice.setBounds(10, 90, 100, 23);
        contentPane.add(txtPrice);

        inputPrice = new JTextField();
        inputPrice.setBounds(70, 90, 300, 23);
        contentPane.add(inputPrice);

        txtQtd = new JLabel("Quant.: ");
        txtQtd.setBounds(10, 130, 100, 23);
        contentPane.add(txtQtd);

        inputQtd = new JTextField();
        inputQtd.setBounds(70, 130, 300, 23);
        contentPane.add(inputQtd);

        txtResult = new JLabel("");
        txtResult.setBounds(10, 200, 360, 80);
        contentPane.add(txtResult);


        

        JButton btnNewButton = new JButton("Cadastrar");
        btnNewButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String nome = inputName.getText();
                String desc = inputDesc.getText();
                String price = inputPrice.getText();
                String qtd = inputQtd.getText();

                String val = txtResult.getText();
                produtos.add(new Produto(nome, desc, Double.parseDouble(price), Integer.parseInt(qtd)));

                for(Produto produto : produtos) {
                    txtResult.setText(val + " Nome: " + produto.nome + " Desc.: " + produto.desc + " Preço: " + produto.price + " Quant.: " + produto.qtd);
                }
            }
        });

        btnNewButton.setBounds(10, 170, 360, 23);
        contentPane.add(btnNewButton);
    }
}
