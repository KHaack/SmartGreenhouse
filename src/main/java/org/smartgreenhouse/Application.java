package org.smartgreenhouse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ComponentScan
@EnableAutoConfiguration
public class Application {
	@RequestMapping("/restTest")
	public String restTest() {
		return "Greetings from Spring Boot!";
	}
	
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}