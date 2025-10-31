package br.edu.fatecpg.validorDTO;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class UserValidatorTeste {

    @Test
    void userValido(){
        UserValidator validator = new UserValidator();

        UserRegistrationDTO usuario = new UserRegistrationDTO(
                "Ale",
                "alessandro@fatec.sp.gov.br",
                "Alessandro2025",
                "1994-01-01");

        validator.validate(usuario);

        assertEquals(0, validator.validate(usuario).getErrors().size());
        assertEquals(true, validator.validate(usuario).isValid());

    }
    @Test
    void usernameNulo(){
        UserValidator validator = new UserValidator();

        UserRegistrationDTO usuario = new UserRegistrationDTO(
                "",
                "alessandro@fatec.sp.gov.br",
                "Alessandro2025",
                "1994-01-01");

        validator.validate(usuario);

        assertEquals("Username must be between 3 and 20 characters long.", validator.validate(usuario).getErrors().get(0));
        assertEquals(false, validator.validate(usuario).isValid());

    }
    @Test
    void usernameMenor3Caracteres(){
        UserValidator validator = new UserValidator();

        UserRegistrationDTO usuario = new UserRegistrationDTO(
                "al",
                "alessandro@fatec.sp.gov.br",
                "Alessandro2025",
                "1994-01-01");

        validator.validate(usuario);

        assertEquals("Username must be between 3 and 20 characters long.", validator.validate(usuario).getErrors().get(0));
        assertEquals(false, validator.validate(usuario).isValid());

    }
    @Test
    void usernameMaior20Caracteres(){
        UserValidator validator = new UserValidator();

        UserRegistrationDTO usuario = new UserRegistrationDTO(
                "alessandroferreirapazlima",
                "alessandro@fatec.sp.gov.br",
                "Alessandro2025",
                "1994-01-01");

        validator.validate(usuario);

        assertEquals("Username must be between 3 and 20 characters long.", validator.validate(usuario).getErrors().get(0));
        assertEquals(false, validator.validate(usuario).isValid());

    }
    @Test
    void emailInvalido(){
        UserValidator validator = new UserValidator();

        UserRegistrationDTO usuario = new UserRegistrationDTO(
                "alessandro",
                "alessandrofatec.sp.gov.br",
                "Alessandro2025",
                "1994-01-01");

        validator.validate(usuario);

        assertEquals("Email is invalid.", validator.validate(usuario).getErrors().get(0));
        assertEquals(false, validator.validate(usuario).isValid());

    }
    @Test
    void passwordMenor8Caracteres(){
        UserValidator validator = new UserValidator();

        UserRegistrationDTO usuario = new UserRegistrationDTO(
                "alessandro",
                "alessandro@fatec.sp.gov.br",
                "Ale",
                "1994-01-01");

        validator.validate(usuario);

        assertEquals("Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long.", validator.validate(usuario).getErrors().get(0));
        assertEquals(false, validator.validate(usuario).isValid());

    }

    @Test
    void passwordSemLetraMaiuscula(){
        UserValidator validator = new UserValidator();

        UserRegistrationDTO usuario = new UserRegistrationDTO(
                "alessandro",
                "alessandro@fatec.sp.gov.br",
                "ALESSANDRO2025",
                "1994-01-01");

        validator.validate(usuario);

        assertEquals("Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long.", validator.validate(usuario).getErrors().get(0));
        assertEquals(false, validator.validate(usuario).isValid());

    }
    @Test
    void passwordSemLetraMinuscula(){
        UserValidator validator = new UserValidator();

        UserRegistrationDTO usuario = new UserRegistrationDTO(
                "alessandro",
                "alessandro@fatec.sp.gov.br",
                "alessandro2025",
                "1994-01-01");

        validator.validate(usuario);

        assertEquals("Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long.", validator.validate(usuario).getErrors().get(0));
        assertEquals(false, validator.validate(usuario).isValid());

    }

    @Test
    void passwordSemNumero(){
        UserValidator validator = new UserValidator();

        UserRegistrationDTO usuario = new UserRegistrationDTO(
                "alessandro",
                "alessandro@fatec.sp.gov.br",
                "alessandro",
                "1994-01-01");

        validator.validate(usuario);

        assertEquals("Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long.", validator.validate(usuario).getErrors().get(0));
        assertEquals(false, validator.validate(usuario).isValid());

    }

    @Test
    void usuarioMenor18(){
        UserValidator validator = new UserValidator();

        UserRegistrationDTO usuario = new UserRegistrationDTO(
                "alessandro",
                "alessandro@fatec.sp.gov.br",
                "Alessandro2025",
                "2024-01-01");

        validator.validate(usuario);

        assertEquals("User must be at least 18 years old.", validator.validate(usuario).getErrors().get(0));
        assertEquals(false, validator.validate(usuario).isValid());

    }

    @Test
    void usuarioDataInvalida(){
        UserValidator validator = new UserValidator();

        UserRegistrationDTO usuario = new UserRegistrationDTO(
                "alessandro",
                "alessandro@fatec.sp.gov.br",
                "Alessandro2025",
                "01-01-1994");

        validator.validate(usuario);

        assertEquals("Birth date must be in the format yyyy-MM-dd.", validator.validate(usuario).getErrors().get(0));
        assertEquals(false, validator.validate(usuario).isValid());

    }

    @Test
    void userInalido(){
        UserValidator validator = new UserValidator();

        UserRegistrationDTO usuario = new UserRegistrationDTO(
                "",
                "alessandrofatec.sp.gov.br",
                "Alessandro",
                "2024-01-01");

        validator.validate(usuario);

        assertEquals(true, validator.validate(usuario).getErrors().contains("Username must be between 3 and 20 characters long."));
        assertEquals(true, validator.validate(usuario).getErrors().contains("Email is invalid."));
        assertEquals(true, validator.validate(usuario).getErrors().contains("Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long."));
        assertEquals(true, validator.validate(usuario).getErrors().contains("User must be at least 18 years old."));
        assertEquals(false, validator.validate(usuario).isValid());
    }

    @Test
    void userValidoLimite(){
        UserValidator validator = new UserValidator();

        UserRegistrationDTO usuario = new UserRegistrationDTO(
                "Ale",
                "alessandro@fatec.sp.gov.br",
                "Alessandro2025",
                "2007-10-24");

        validator.validate(usuario);

        assertEquals(0, validator.validate(usuario).getErrors().size());
        assertEquals(true, validator.validate(usuario).isValid());

    }
}
