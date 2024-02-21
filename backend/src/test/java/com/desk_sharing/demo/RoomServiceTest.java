package com.desk_sharing.demo;

import com.desk_sharing.entities.Room;
import com.desk_sharing.repositories.RoomRepository;
import com.desk_sharing.services.RoomService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.*;

@RunWith(PowerMockRunner.class)
public class RoomServiceTest {

    @Mock
    RoomRepository roomRepository;

    @InjectMocks
    RoomService roomService;

    private Room testRoom;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        testRoom = new Room();
        testRoom.setId(1L);
        testRoom.setType("TestType");
        testRoom.setPosition("TestPosition");
    }

    @Test
    public void testUpdateRoom() {
        when(roomRepository.save(any(Room.class))).thenReturn(testRoom);

        Room updatedRoom = roomService.updateRoom(1L, testRoom);

        assertEquals(testRoom, updatedRoom);
        assertEquals(1L, updatedRoom.getId().longValue());
        verify(roomRepository, times(1)).save(any(Room.class));
    }

    @Test
    public void testDeleteRoom() {
        roomService.deleteRoom(1L);

        verify(roomRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testGetRoomById() {
        when(roomRepository.findById(anyLong())).thenReturn(Optional.of(testRoom));

        Optional<Room> optionalRoom = roomService.getRoomById(1L);

        assertTrue(optionalRoom.isPresent());
        assertEquals(testRoom, optionalRoom.get());
        verify(roomRepository, times(1)).findById(1L);
    }

    @Test
    public void testSaveRoom() {
        when(roomRepository.save(any(Room.class))).thenReturn(testRoom);

        Room savedRoom = roomService.saveRoom(testRoom);

        assertEquals(testRoom, savedRoom);
        verify(roomRepository, times(1)).save(any(Room.class));
    }

    @Test
    public void testGetAllRooms() {
        List<Room> rooms = new ArrayList<>();
        rooms.add(testRoom);

        when(roomRepository.findAll()).thenReturn(rooms);

        List<Room> retrievedRooms = roomService.getAllRooms();

        assertEquals(1, retrievedRooms.size());
        assertEquals(testRoom, retrievedRooms.get(0));
        verify(roomRepository, times(1)).findAll();
    }

}
