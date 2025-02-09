package Cliente.tela;

import java.awt.EventQueue;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JRadioButton;
import javax.swing.JTextField;
import javax.swing.border.EmptyBorder;
import javax.swing.ButtonGroup;

public class Principal extends JFrame {

    private static final long serialVersionUID = 1L;
    private JPanel contentPane;
    private JTextField inputName;
    private JTextField inputAge;
    private JTextField inputTel;
    private JTextField inputDateNasc;
    private JTextField inputEmal;
    private JTextField inputCpf;
    private JRadioButton masculino;
    private JRadioButton feminino;
    private ButtonGroup grupoSexo;
    private JLabel txtNome;
	private JLabel txtResultado;
	private JLabel txtTel;
	private JLabel txtDateNasc;
	private JLabel txtEmail;
	private JLabel txtCpf;
	

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

        txtNome = new JLabel("Nome: ");
        txtNome.setBounds(10, 10, 100, 23);
        contentPane.add(txtNome);

        inputName = new JTextField();
        inputName.setBounds(70, 10, 200, 20);
        contentPane.add(inputName);
        inputName.setColumns(10);

        JLabel txtage = new JLabel("Idade: ");
        txtage.setBounds(10, 40, 100, 23);
        contentPane.add(txtage);

        inputAge = new JTextField();
        inputAge.setBounds(70, 40, 200, 20);
        contentPane.add(inputAge);
        inputAge.setColumns(10);

        JLabel txtSexo = new JLabel("Sexo: ");
        txtSexo.setBounds(10, 70, 100, 23);
        contentPane.add(txtSexo);

        masculino = new JRadioButton("Masculino", true);
        masculino.setBounds(70, 70, 100, 23);
        contentPane.add(masculino);

        feminino = new JRadioButton("Feminino", false);
        feminino.setBounds(180, 70, 100, 23);
        contentPane.add(feminino);

        grupoSexo = new ButtonGroup();
        grupoSexo.add(masculino);
        grupoSexo.add(feminino);

		txtTel = new JLabel("Tel: ");
		txtTel.setBounds(10, 100, 100, 23);
		contentPane.add(txtTel);

		inputTel = new JTextField();
		inputTel.setBounds(70, 100, 200, 20);
		contentPane.add(inputTel);

		txtDateNasc = new JLabel("Nascimento: ");
		txtDateNasc.setBounds(10, 130, 150, 23);
		contentPane.add(txtDateNasc);

		inputDateNasc = new JTextField();
		inputDateNasc.setBounds(110, 130, 160, 20);
		contentPane.add(inputDateNasc);

		txtEmail = new JLabel("Email: ");
		txtEmail.setBounds(10, 160, 100, 23);
		contentPane.add(txtEmail);

		inputEmal = new JTextField();
		inputEmal.setBounds(70, 160, 200, 20);
		contentPane.add(inputEmal);

		txtCpf = new JLabel("CPF: ");
		txtCpf.setBounds(10, 190, 100, 23);
		contentPane.add(txtCpf);

		inputCpf = new JTextField();
		inputCpf.setBounds(70, 190, 200, 20);
		contentPane.add(inputCpf);



		txtResultado = new JLabel("");
		txtResultado.setBounds(50, 260, 340, 80);
		contentPane.add(txtResultado);

        JButton btnNewButton = new JButton("Enviar");
        btnNewButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String nome = inputName.getText();
				String idade = inputAge.getText();
				String sexo = "";
				String email = inputEmal.getText();
				String cpf = inputCpf.getText();
				String tel = inputTel.getText();
				String dataNasc = inputDateNasc.getText();


                if (masculino.isSelected()) {
                    sexo = "Masculino";
                } else if (feminino.isSelected()) {
					sexo = "Feminino";
                }

				txtResultado.setText("Nome: " + nome + " Sexo: " + sexo + " Idade: " + idade + " Email: " + email + " CPF: " + cpf + " Telefone: " + tel + " Data de Nascimento: " + dataNasc);

            }
        });

        btnNewButton.setBounds(50, 220, 300, 23);
        contentPane.add(btnNewButton);
    }
}
