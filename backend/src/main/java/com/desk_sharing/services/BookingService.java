package com.desk_sharing.services;

<<<<<<< HEAD
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
<<<<<<< HEAD
=======
import java.sql.Time;
import java.time.Duration;
import java.time.LocalDateTime;
>>>>>>> a598f45 (booking tests)
import java.time.LocalTime;
import java.util.*;
=======
import java.sql.Date;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
>>>>>>> 9973c73 (locking and tests)
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.desk_sharing.entities.Booking;
import com.desk_sharing.entities.Desk;
import com.desk_sharing.entities.Room;
import com.desk_sharing.entities.User;
import com.desk_sharing.model.BookingEditDTO;
import com.desk_sharing.repositories.BookingRepository;

@Service
public class BookingService {

    @Autowired
    BookingRepository bookingRepository;
    
    @Autowired
    RoomRepository roomRepository;
    
    @Autowired
    DeskRepository deskRepository;

    @Autowired
    UserService userService;

    @Autowired
    RoomService roomService;

    @Autowired
    DeskService deskService;
    
    public Booking createBooking(Map<String, Object> bookingData) {
    	Long user_id = Long.parseLong(bookingData.get("user_id").toString());
        Long room_id = Long.parseLong(bookingData.get("room_id").toString());
        Long desk_id = Long.parseLong(bookingData.get("desk_id").toString());
        Date day = Date.valueOf(bookingData.get("day").toString());
        Time begin = Time.valueOf(bookingData.get("begin").toString());
        Time end = Time.valueOf(bookingData.get("end").toString());

        User user = userService.getUser(user_id);
        Room room = roomService.getRoomById(room_id)
            .orElseThrow(() -> new IllegalArgumentException("Room not found with id: " + room_id));
        Desk desk = deskService.getDeskById(desk_id)
            .orElseThrow(() -> new IllegalArgumentException("Desk not found with id: " + desk_id));
        
        LocalDateTime now = LocalDateTime.now();
        List<Booking> existingBookings = bookingRepository.getAllBookingsForPreventDuplicates(room_id, desk_id, day, begin, end);
        
        boolean anyLockedBooking = existingBookings.stream()
                .anyMatch(booking -> booking.isBookingInProgress() && now.isBefore(booking.getLockExpiryTime()));

        if (existingBookings.isEmpty() || !anyLockedBooking) {
        	Booking newBooking = new Booking(user, room, desk, day, begin, end);
            newBooking.setLockExpiryTime(LocalDateTime.now().plusMinutes(5));
            newBooking.setBookingInProgress(true);
            return addBooking(newBooking);
        } else {
        	throw new RuntimeException("Already someone booked the desk");
        }
    }

    public Booking addBooking(Booking newBooking) {
    	return bookingRepository.save(newBooking);
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
<<<<<<< HEAD
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
<<<<<<< HEAD
=======
            if(alreadyBookingList != null && !alreadyBookingList.isEmpty()) {
                throw new RuntimeException("Already some bookings exist with same time");
            }
    
            // Convert java.sql.Time to LocalTime
            LocalTime beginTime = booking.getBegin().toLocalTime();
            LocalTime endTime = booking.getEnd().toLocalTime();
    
            // Calculate the duration of the booking
            long duration = Duration.between(beginTime, endTime).toHours();
    
            // Check if duration is between 2 and 9 hours
            if (duration < 2 || duration > 9) {
                throw new RuntimeException("Booking duration should be between 2 and 9 hours");
            }
    
            Booking booking2 = bookingById.get();
            booking2.setBegin(booking.getBegin());
            booking2.setEnd(booking.getEnd());
            bookingRepository.save(booking2);
        }
        return null;
    }    
	
	public Booking confirmBooking(long bookingId) {
		Optional<Booking> bookingById = getBookingById(bookingId);
		if(bookingById.isPresent()) {
			Booking booking = bookingById.get();
			booking.setBookingInProgress(false);
			booking.setLockExpiryTime(null);
			return bookingRepository.save(booking);
		}
		return null;
	}
	
	
	@Transactional
	@Scheduled(cron = "0 0/2 * * * *")
    public void releaseDeskLock() {
        List<Booking> booking = bookingRepository.findAllByBookingInProgress(true);
        if (booking != null && !booking.isEmpty()) {
        	List<Booking> collect = booking.stream()
        			.filter(e -> LocalDateTime.now().isAfter(e.getLockExpiryTime()))
        			.map(each -> {
        				each.setBookingInProgress(false);
        				each.setLockExpiryTime(null);
        				return each;
        			})
        			.collect(Collectors.toList());
        	System.out.println("Matched bookings without confirm, size="+collect.size());
            bookingRepository.deleteAll(collect);
        }
	}
>>>>>>> a598f45 (booking tests)

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
=======
	
	public Booking confirmBooking(long bookingId) {
		Optional<Booking> bookingById = getBookingById(bookingId);
		if(bookingById.isPresent()) {
			Booking booking = bookingById.get();
			booking.setBookingInProgress(false);
			booking.setLockExpiryTime(null);
			return bookingRepository.save(booking);
		}
		return null;
	}
	
	
	@Transactional
	@Scheduled(cron = "0 0/2 * * * *")
    public void releaseDeskLock() {
        List<Booking> booking = bookingRepository.findAllByBookingInProgress(true);
        if (booking != null && !booking.isEmpty()) {
        	List<Booking> collect = booking.stream()
        			.filter(e -> LocalDateTime.now().isAfter(e.getLockExpiryTime()))
        			.map(each -> {
        				each.setBookingInProgress(false);
        				each.setLockExpiryTime(null);
        				return each;
        			})
        			.collect(Collectors.toList());
        	System.out.println("Matched bookings without confirm, size="+collect.size());
            bookingRepository.deleteAll(collect);
        }
>>>>>>> 9973c73 (locking and tests)
    }
}
