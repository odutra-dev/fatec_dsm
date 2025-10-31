package br.edu.fatecpg.gerenciadorConfig;

import java.util.Map;

public class AppConfigService {
    private final Map<String, String> config;

    public AppConfigService(Map<String, String> config) {
        this.config = config;
    }

    public String getString(String key, String defaultValue) {
        return config.getOrDefault(key, defaultValue);
    }

    public int getInt(String key, int defaultValue) {
        String value = config.get(key);
        if (value == null) {
            return defaultValue;
        }

        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            throw new InvalidConfigurationException(
                    "Valor inválido para chave '" + key + "': " + value
            );
        }
    }

    public boolean getBoolean(String key, boolean defaultValue) {
        String value = config.get(key);
        if (value == null) {
            return defaultValue;
        }

        value = value.trim().toLowerCase();
        return value.equals("true") || value.equals("1") || value.equals("yes");
    }

    public String require(String key) {
        String value = config.get(key);
        if (value == null) {
            throw new MissingConfigurationException(
                    "Chave obrigatória não encontrada: " + key
            );
        }
        return value;
    }
}
