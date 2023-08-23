package com.wheel.WheelPlanet.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WheelPlanetController {
    @GetMapping("/explorer/{topic}")
    ResponseEntity<?> getExplorerTopic(@PathVariable String topic) {
        final String answer = String.format("Welcome to WheelPlanet. Let's discuss the topic %s.", topic);
        return ResponseEntity.ok().body(answer);
    }
}
