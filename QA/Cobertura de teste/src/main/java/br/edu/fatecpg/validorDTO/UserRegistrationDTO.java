package br.edu.fatecpg.validorDTO;

public record UserRegistrationDTO(
        String username,
        String email,
        String password,
        String birthday
) {
}
