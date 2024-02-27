package com.desk_sharing.controllers;

import com.desk_sharing.entities.Desk;
import com.desk_sharing.services.DeskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://188.34.162.76:3000", "http://localhost:3000"})
@RequestMapping("/desks")
public class DeskController {

    @Autowired
    DeskService deskService;

    @PostMapping
    public ResponseEntity<Desk> createDesk(@RequestBody Desk desk) {
        Desk savedDesk = deskService.saveDesk(desk);
        return new ResponseEntity<>(savedDesk, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Desk>> getAllDesks() {
        List<Desk> desks = deskService.getAllDesks();
        return new ResponseEntity<>(desks, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Desk> getDeskById(@PathVariable("id") Long id) {
        Optional<Desk> desk = deskService.getDeskById(id);
        return desk.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/room/{id}")
    public ResponseEntity<List<Desk>> getDeskByRoomId(@PathVariable("id") Long roomId) {
        List<Desk> desks = deskService.getDeskByRoomId(roomId);
        return new ResponseEntity<>(desks, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Desk> updateDesk(@PathVariable("id") Long id, @RequestBody Desk desk) {
        Desk updatedDesk = deskService.updateDesk(id, desk);
        return new ResponseEntity<>(updatedDesk, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDesk(@PathVariable("id") Long id) {
        deskService.deleteDesk(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
