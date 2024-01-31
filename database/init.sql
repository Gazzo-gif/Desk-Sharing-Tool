CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    visibility BOOLEAN NOT NULL,
    admin BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS rooms (
    id INT NOT NULL PRIMARY KEY,
    type VARCHAR(10) NOT NULL,
    position VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS desks (
    id INT NOT NULL PRIMARY KEY,
    equipment VARCHAR(500),
    room_id INT NOT NULL,
    CONSTRAINT `fk_room`
        FOREIGN KEY (room_id) REFERENCES rooms (id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bookings (
    id INT NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    room_id INT NOT NULL,
    desk_id INT NOT NULL,
    day DATE NOT NULL,
    begin TIME NOT NULL,
    end TIME NOT NULL,
    CONSTRAINT `fk_user_book`
        FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE,
    CONSTRAINT `fk_room_book`
        FOREIGN KEY (room_id) REFERENCES rooms (id)
        ON DELETE CASCADE,
    CONSTRAINT `fk_desk_book`
        FOREIGN KEY (desk_id) REFERENCES desks (id)
        ON DELETE CASCADE,
);

