package com.desk_sharing.services;

import com.desk_sharing.entities.Desk;
import com.desk_sharing.repositories.DeskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeskService {

    @Autowired
    DeskRepository deskRepository;

    public Desk saveDesk(Desk desk) {
        return deskRepository.save(desk);
    }

    public List<Desk> getAllDesks() {
        return deskRepository.findAll();
    }

    public Desk getDesk(Long id) {
        return deskRepository.getById(id);
    }

    public List<Desk> getDeskByRoomId(Long roomId) {
        return deskRepository.findByRoomId(roomId);
    }

    public Desk updateDesk(Long id, Desk desk) {
        desk.setId(id); // Ensure the correct ID is set
        return deskRepository.save(desk);
    }

    public void deleteDesk(Long id) {
        deskRepository.deleteById(id);
    }
}
