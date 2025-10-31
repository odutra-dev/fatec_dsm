package br.edu.fatecpg.gerenciadorConfig;

public class MissingConfigurationException extends  RuntimeException {
    MissingConfigurationException(String message) {
        super(message);
    }
}
