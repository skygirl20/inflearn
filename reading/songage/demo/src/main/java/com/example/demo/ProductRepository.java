package com.example.demo;

import org.springframework.stereotype.Component;

@Component
public class ProductRepository {
    public String getProduct() {
        return "NoteBook!!";
    }
}
