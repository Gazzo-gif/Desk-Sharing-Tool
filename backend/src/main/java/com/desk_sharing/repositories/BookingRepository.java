package com.desk_sharing.repositories;

import com.desk_sharing.entities.Booking;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long user_id);
    List<Booking> findByRoomId(Long room_id);
    List<Booking> findByDeskId(Long desk_id);
}
