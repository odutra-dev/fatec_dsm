package br.edu.fatecpg.gerenciadorConfig;

public class InvalidConfigurationException  extends   RuntimeException {
    InvalidConfigurationException(String message) {
        super(message);
    }
}
