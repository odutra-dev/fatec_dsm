package br.edu.fatecpg.validorDTO;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeParseException;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class UserValidator {

    public ValidationResult validate(UserRegistrationDTO userRegistrationDTO) {
        ValidationResult result = new ValidationResult();

        String regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher passValid = pattern.matcher(userRegistrationDTO.password());

        if (userRegistrationDTO.username() == null ||
                userRegistrationDTO.username().trim().isEmpty() ||
                userRegistrationDTO.username().length() < 3 ||
                userRegistrationDTO.username().length() > 20) {
            result.addError("Username must be between 3 and 20 characters long.");
        }

        if (userRegistrationDTO.email() == null ||
                !userRegistrationDTO.email().contains("@")) {
            result.addError("Email is invalid.");
        }

        if (!passValid.matches()) {
            result.addError("Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long.");
        }

        try {
            LocalDate birthDate = LocalDate.parse(userRegistrationDTO.birthday());
            LocalDate today = LocalDate.now();

            int idade = Period.between(birthDate, today).getYears();

            LocalDate aniversarioEsteAno = birthDate.withYear(today.getYear());
            if (today.isBefore(aniversarioEsteAno)) {
                idade--;
            }

            if (idade < 18) {
                result.addError("User must be at least 18 years old.");
            }

        } catch (DateTimeParseException e) {
            result.addError("Birth date must be in the format yyyy-MM-dd.");
        }

        return result;
    }
}
