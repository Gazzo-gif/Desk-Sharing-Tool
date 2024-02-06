package com.desk_sharing.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.desk_sharing.entities.Desk;
import com.desk_sharing.repositories.DeskRepository;

@Service
public class DeskService {

    @Autowired
    private DeskRepository deskRepository;

    public Desk saveDesk(Desk desk) {
        return deskRepository.save(desk);
    }

    public List<Desk> getAllDesks() {
        return deskRepository.findAll();
    }
}
