package com.desk_sharing.demo;

import com.desk_sharing.entities.Booking;
import com.desk_sharing.entities.Desk;
import com.desk_sharing.entities.Room;
import com.desk_sharing.entities.User;
import com.desk_sharing.repositories.BookingRepository;
import com.desk_sharing.services.BookingService;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Mockito;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;

public class BookingServiceTest {

    @Mock
    BookingRepository bookingRepository;

    @InjectMocks
    BookingService bookingService;

    private Booking testBooking;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);

        testBooking = new Booking();
        User user = new User();
        Room room = new Room();
        Desk desk = new Desk();
        testBooking.setUser(user);
        testBooking.setRoom(room);
        testBooking.setDesk(desk);
    }

    @Test
    public void testAddBooking() {
        Booking booking = new Booking();
        Mockito.when(bookingRepository.save(any(Booking.class))).thenReturn(testBooking);

        Booking savedBooking = bookingService.addBooking(booking);

        Mockito.verify(bookingRepository, Mockito.times(1)).save(booking);
        assertEquals(savedBooking, testBooking);
    }
}
