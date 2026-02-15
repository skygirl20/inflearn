package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;import org.springframework.web.bind.annotation.RequestMapping;import org.springframework.web.bind.annotation.RequestMethod;import org.springframework.web.bind.annotation.ResponseBody;import org.springframework.web.bind.annotation.RestController;

@Controller
@ResponseBody
public class ProductController {
    @Autowired
    private ProductService productService;

    ProductController() {
        System.out.println("진짜 스프링이 알아서 객체 생성을 하나...?");
    }

    @RequestMapping(value=" ", method = RequestMethod.GET)
    public String getProduct() {
        return productService.getProduct();
    }
}
