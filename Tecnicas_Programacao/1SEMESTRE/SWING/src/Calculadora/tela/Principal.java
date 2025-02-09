package Calculadora.tela;

import java.awt.EventQueue;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.border.EmptyBorder;
import javax.swing.JOptionPane;
import java.util.ArrayList;

import Calculadora.Calculadora;

public class Principal extends JFrame {

    private static final long serialVersionUID = 1L;
    private JPanel contentPane;

    private JTextField inputNum;
    private JLabel txtNumLabel;

    private ArrayList<Integer> numeros = new ArrayList<Integer>();

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

        txtNumLabel = new JLabel("Numero:");
        txtNumLabel.setBounds(150, 10, 100, 23);
        contentPane.add(txtNumLabel);

        inputNum = new JTextField();
        inputNum.setBounds(10, 35, 360, 23);
        contentPane.add(inputNum);

        JButton adicionar = new JButton("Adicionar");
        adicionar.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                try{
                    int num = Integer.parseInt(inputNum.getText());
                numeros.add(num);
                }
                catch (Exception error) {
                    JOptionPane.showMessageDialog(null, error.getMessage());
                }
            }
        });

        JButton calcular = new JButton("Calcular");
        calcular.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                try {
                    double media = Calculadora.calcularMedia(numeros);
                    JOptionPane.showMessageDialog(null, "Media: " + media);
                } catch (ArithmeticException error) {
                    JOptionPane.showMessageDialog(null, error.getMessage());
                }
                catch (Exception error) {
                    JOptionPane.showMessageDialog(null, error.getMessage());
                }

            }
        });

        adicionar.setBounds(10, 70, 360, 23);
        contentPane.add(adicionar);

        calcular.setBounds(10, 100, 360, 23);
        contentPane.add(calcular);
    }
}
