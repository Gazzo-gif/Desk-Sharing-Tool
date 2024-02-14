package com.desk_sharing.repositories;

import com.desk_sharing.entities.Booking;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(Long id);
}
