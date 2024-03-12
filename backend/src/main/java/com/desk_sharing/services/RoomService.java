<<<<<<< HEAD
package com.desk_sharing.services;

import com.desk_sharing.entities.Room;
import com.desk_sharing.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    RoomRepository roomRepository;

    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Room getRoom(Long id) {
        return roomRepository.getById(id);
    }

    public Room updateRoom(Long id, Room room) {
        room.setId(id);
        return roomRepository.save(room);
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}
=======
package com.desk_sharing.services;

import com.desk_sharing.entities.Room;
import com.desk_sharing.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    RoomRepository roomRepository;

    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }
    
    public List<Room> getAllRoomsByActiveStatus() {
        return roomRepository.findAllByStatus("enable");
    }

    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    public Room updateRoom(Long id, Room room) {
        room.setId(id);
        return roomRepository.save(room);
    }
    
    public Room updateRoomStatus(Long id, String status) {
    	Optional<Room> findById = roomRepository.findById(id);
    	if(findById.isPresent()) {
    		Room room = findById.get();
    		room.setStatus(status);
    		return roomRepository.save(room);
    	}
    	return null;
        
    }
    
    public Room updateRoomType(Long id, String type) {
    	Optional<Room> findById = roomRepository.findById(id);
    	if(findById.isPresent()) {
    		Room room = findById.get();
    		room.setType(type);
    		return roomRepository.save(room);
    	}
    	return null;
        
    }
    

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}
>>>>>>> b270e92 (admin panal rooms and desks)
