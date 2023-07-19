package com.ncg.backend.controller;

import com.ncg.backend.entities.View;
import com.ncg.backend.services.ViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ViewController {

    @Autowired
    private ViewService ViewService;

    @GetMapping("/home")
    public String home() {
        return "This is home page";
    }

    //get the Views
    @GetMapping("/view")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<View> getViews() {
        return this.ViewService.getViews();
    }

    @GetMapping("/view/{viewId}")
    @CrossOrigin(origins = "http://localhost:3000")
    public View getView(@PathVariable String viewId) {
        return ViewService.getView(Long.parseLong(viewId));
    }

    @PostMapping(value = "/view",consumes = "application/json")
    @CrossOrigin(origins = "http://localhost:3000")
    public View addView(@RequestBody View View) {
        return this.ViewService.addView(View);
    }

    @PutMapping("/view")
    @CrossOrigin(origins = "http://localhost:3000")
    public View updateView(@RequestBody View View) {
        return this.ViewService.updateView(View);
    }

    @DeleteMapping("/view/{viewId}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<HttpStatus> deleteView(@PathVariable String viewId) {
        try {
            this.ViewService.deleteView(Long.parseLong(viewId));
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
