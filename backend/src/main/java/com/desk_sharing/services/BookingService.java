package com.desk_sharing.services;

import com.desk_sharing.entities.Booking;
import com.desk_sharing.model.BookingEditDTO;
import com.desk_sharing.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    BookingRepository bookingRepository;

    public Booking addBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> findByUserId(Long user_id) {
        return bookingRepository.findByUserId(user_id);
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public Booking editBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    public List<Booking> findByRoomId(Long room_id) {
        return bookingRepository.findByRoomId(room_id);
    }

    public List<Booking> findByDeskId(Long desk_id) {
        return bookingRepository.findByDeskId(desk_id);
    }

    public List<Booking> findByDeskIdAndDay(Long deskId, Date day) {
        List<Booking> bookings = bookingRepository.findByDeskIdAndDay(deskId, day);
        return bookings;
    }
    
    public List<Booking> findByRoomIdAndDay(Long roomId, Date day) {
        List<Booking> bookings = bookingRepository.findByRoomIdAndDay(roomId, day);
        return bookings;
    }

	public Booking editBookingTimings(BookingEditDTO booking) {
		Optional<Booking> bookingById = getBookingById(booking.getId());
		if(bookingById.isPresent()) {
			List<Booking> alreadyBookingList = bookingRepository.getAllBookings(bookingById.get().getId(), bookingById.get().getRoom().getId(), bookingById.get().getDesk().getId(), bookingById.get().getDay(), booking.getBegin(), booking.getEnd());
			List<Long> ids = alreadyBookingList.stream().map(e -> e.getId()).collect(Collectors.toList());
			System.out.println("--->"+ids);
			if(alreadyBookingList != null && !alreadyBookingList.isEmpty()) {
				throw new RuntimeException("Already some bookings exist with same time");
			}
			Booking booking2 = bookingById.get();
			booking2.setBegin(booking.getBegin());
			booking2.setEnd(booking.getEnd());
			bookingRepository.save(booking2);
		}
		return null;
	}
}
