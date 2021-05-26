package com.identicum;

import java.io.IOException;
import java.util.List;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.identicum.service.UserRepository;
import com.identicum.models.Role;
import com.identicum.models.User;
import com.identicum.service.RoleRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class Application {

    @Autowired
    UserRepository userRepository;
    
    @Autowired
    RoleRepository roleRepository;

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void loader() throws JsonParseException, JsonMappingException, IOException {
    	ClassPathResource users = new ClassPathResource("users.json");
    	ClassPathResource roles = new ClassPathResource("roles.json");
    	
        if (userRepository.count() == 0 && users.exists()) {
            log.debug("Loading users from json file ...");
            List<User> elements = new ObjectMapper().readValue(users.getInputStream(), new TypeReference<List<User>>(){});
            elements.stream().forEach(element -> log.info("User {}", element));
            userRepository.saveAll(elements);
        }
        
        if (roleRepository.count() == 0 && roles.exists()) {
            log.debug("Loading roles from json file ...");
            List<Role> elements = new ObjectMapper().readValue(roles.getInputStream(), new TypeReference<List<Role>>(){});
            roleRepository.saveAll(elements);
        }
    }
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/graphql").allowedOrigins("*");
            }
        };
    }

}