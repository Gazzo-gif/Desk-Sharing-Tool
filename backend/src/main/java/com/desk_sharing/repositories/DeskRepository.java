package com.desk_sharing.repositories;

import com.desk_sharing.entities.Desk;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeskRepository extends JpaRepository<Desk, Long> {
}
