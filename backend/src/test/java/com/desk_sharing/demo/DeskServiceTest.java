package com.desk_sharing.demo;

import com.desk_sharing.entities.Desk;
import com.desk_sharing.entities.Room;
import com.desk_sharing.model.CreateDeskDto;
import com.desk_sharing.repositories.DeskRepository;
import com.desk_sharing.services.DeskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;

class DeskServiceTest {

    @Mock
    DeskRepository deskRepository;

    @InjectMocks
    DeskService deskService;

    private Desk testDesk;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        testDesk = new Desk();
        Room room = new Room();
        testDesk.setId(1L);
        testDesk.setRoom(room);
        testDesk.setEquipment("test equipment");
    }

    @Test
    void testSaveDesk() {
        Desk desk = new Desk();
        CreateDeskDto deskDto = new CreateDeskDto();
        Mockito.when(deskRepository.save(any(Desk.class))).thenReturn(testDesk);
        Desk savedDesk = deskService.saveDesk(deskDto);
        Mockito.verify(deskRepository, Mockito.times(1)).save(desk);
        assertEquals(testDesk, savedDesk);
    }
}
