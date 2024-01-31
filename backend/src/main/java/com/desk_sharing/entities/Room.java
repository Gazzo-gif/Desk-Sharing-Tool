package com.desk_sharing.entities;

import javax.persistence.*;

@Entity
@Table(name = "rooms")
public class Room {
    @Id
    @Column(name = "room_id", unique = true)
    private Long id;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "position", nullable = false, unique = true)
    private String position;

    public Room() {
    }

    public Room(String type, String position) {
        this.type = type;
        this.position = position;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }
}
