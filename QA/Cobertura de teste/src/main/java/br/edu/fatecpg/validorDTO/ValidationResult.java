package br.edu.fatecpg.validorDTO;

import  java.util.List;
import  java.util.ArrayList;

public class ValidationResult {
    private boolean isValid;
    private List<String> errors;

    public ValidationResult() {
        this.isValid = true;
        this.errors = new ArrayList<String>();
    }



    public boolean isValid() {
        return isValid;
    }

    public List<String> getErrors() {
        return errors;
    }

    public void addError(String errorMessage) {
        this.isValid = false;
        this.errors.add(errorMessage);
    }
}
