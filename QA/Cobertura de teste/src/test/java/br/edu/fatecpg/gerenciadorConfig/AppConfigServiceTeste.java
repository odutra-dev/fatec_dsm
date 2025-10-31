package br.edu.fatecpg.gerenciadorConfig;

import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

public class AppConfigServiceTeste {
    @Test
    void carregamentoConfiguracao(){

        Map<String, String> config = Map.of(
            "app.name", "MyApp",
            "app.version", "1.0.0",
            "app.debug", "true"
        );

        AppConfigService appConfigService = new AppConfigService(config);

        assertEquals("MyApp", appConfigService.getString("app.name", ""));
        assertEquals("1.0.0", appConfigService.getString("app.version", ""));
        assertEquals(true, appConfigService.getBoolean("app.debug", false));

    }

    @Test
    void chaveNaoExisteString(){

        Map<String, String> config = Map.of(
            "app.name", "MyApp",
            "app.version", "1.0.0",
            "app.debug", "true"
        );

        AppConfigService appConfigService = new AppConfigService(config);

        assertEquals("", appConfigService.getString("chave.inexistente", ""));
    }

    @Test
    void chaveNaoExisteInt(){

        Map<String, String> config = Map.of(
                "app.name", "MyApp",
                "app.version", "1.0.0",
                "app.debug", "true"
        );

        AppConfigService appConfigService = new AppConfigService(config);

        assertEquals(0, appConfigService.getInt("chave.inexistente", 0));

    }

    @Test
    void chaveNaoExisteBoolean(){

        Map<String, String> config = Map.of(
                "app.name", "MyApp",
                "app.version", "1.0.0",
                "app.debug", "true"
        );

        AppConfigService appConfigService = new AppConfigService(config);

        assertEquals(false, appConfigService.getBoolean("chave.inexistente", false));

    }

    @Test
    void valorIntInvalido(){

        Map<String, String> config = Map.of(
                "app.name", "MyApp",
                "app.version", "1.0.0",
                "app.debug", "true"
        );

        AppConfigService appConfigService = new AppConfigService(config);

       assertThrows(InvalidConfigurationException.class, () -> appConfigService.getInt("app.name", 0));
    }

    @Test
    void requisitarChaveExistente(){

        Map<String, String> config = Map.of(
                "app.name", "MyApp",
                "app.version", "1.0.0",
                "app.debug", "true"
        );

        AppConfigService appConfigService = new AppConfigService(config);

        assertEquals("MyApp", appConfigService.require("app.name"));
    }

    @Test
    void requisitarChaveNaoExistente(){

        Map<String, String> config = Map.of(
                "app.name", "MyApp",
                "app.version", "1.0.0",
                "app.debug", "true"
        );

        AppConfigService appConfigService = new AppConfigService(config);

        assertThrows(MissingConfigurationException.class, () -> appConfigService.require("chave.inexistente"));
    }
}
