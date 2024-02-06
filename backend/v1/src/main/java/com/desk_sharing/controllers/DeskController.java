package com.desk_sharing.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.desk_sharing.entities.Desk;
import com.desk_sharing.services.DeskService;

@RestController
@RequestMapping("/desks")
public class DeskController {

    @Autowired
    private DeskService deskService;

    @PostMapping("/add")
    public ResponseEntity<Desk> addDesk(@RequestBody Desk desk) {
        Desk savedDesk = deskService.saveDesk(desk);
        return new ResponseEntity<>(savedDesk, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Desk>> getAllDesks() {
        List<Desk> desks = deskService.getAllDesks();
        return new ResponseEntity<>(desks, HttpStatus.OK);
    }
}
