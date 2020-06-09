package com.bstirbat.supermarketsupplier.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class CreateProductModel {

    @NotBlank
    private String name;

    @NotNull
    private Integer quantity;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
