package com.desk_sharing.services;

import com.desk_sharing.entities.Booking;
import com.desk_sharing.entities.Desk;
import com.desk_sharing.entities.Room;
import com.desk_sharing.model.BookingEditDTO;
import com.desk_sharing.repositories.BookingRepository;
import com.desk_sharing.repositories.DeskRepository;
import com.desk_sharing.repositories.RoomRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    BookingRepository bookingRepository;
    
    @Autowired
    RoomRepository roomRepository;
    
    @Autowired
    DeskRepository deskRepository;

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
			List<Booking> alreadyBookingList = bookingRepository.getAllBookings(
                bookingById.get().getId(), bookingById.get().getRoom().getId(), 
                bookingById.get().getDesk().getId(), bookingById.get().getDay(), 
                booking.getBegin(), booking.getEnd());
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

    public Dictionary<Date, Integer> getAvailableDays(List<Date> days) {
        Dictionary<Date, Integer> slots= new Hashtable<>();
        List<Room> rooms = roomRepository.findAllByStatus("enable");
        // Every day of a month
        for (Date day : days) {
            slots.put(day, 0);
            // Ever enabled room
            for (Room room : rooms) {
                List<Desk> desks = deskRepository.findByRoomId(room.getId());
                // Every desk in a room
                for (Desk desk : desks) {
                    LocalTime time = LocalTime.of(6, 0, 0);
                    LocalTime end = LocalTime.of(22, 0, 0);
                    List<Booking> bookings = findByDeskIdAndDay(desk.getId(), day);
                    if (!bookings.isEmpty()) {
                        // Order list depending on the starting hour
                        Collections.sort(bookings, new Comparator<Booking>() {
                            @Override
                            public int compare(Booking b1, Booking b2) {
                                return b1.getBegin().compareTo(b2.getBegin());
                            }
                        });
                        // Check free slots
                        for (int i = 0; i < bookings.size(); i++) {
                            LocalTime time2 = bookings.get(i).getBegin().toLocalTime();
                            long minutesDifference = time.until(time2, java.time.temporal.ChronoUnit.MINUTES);
                            
                            if (minutesDifference >= 120) {
                                slots.put(day, slots.get(day) + 1);
                            }
                            time = bookings.get(i).getEnd().toLocalTime();
                        }

                        long minutesDifference = time.until(end, java.time.temporal.ChronoUnit.MINUTES);
                        
                        if (minutesDifference >= 120) {
                            slots.put(day, slots.get(day) + 1);
                        }
                    } else {
                        slots.put(day, slots.get(day) + 1);
                    }
                }
            }
        }
        return slots;
    }
}
