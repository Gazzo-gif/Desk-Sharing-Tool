import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import firstFloorImage from '../../images/firstfloor.png';
import secondFloorImage from '../../images/secondfloor.png'; 
import './Floor.css'; 
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { CgProfile, CgDisplayFullwidth } from "react-icons/cg";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Floor = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentFloor, setCurrentFloor] = useState('Ground');
  const [rooms, setRooms] = useState([]);
  const location = useLocation();
  const { date } = location.state || {};
  const formattedDate = date ? new Date(date).toLocaleDateString() : '';

  useEffect(() => {
    // Fetch room data from the backend
    fetch('http://188.34.162.76:8080/rooms')
      .then(response => response.json())
      .then(data => {
        // Filter rooms based on the current floor
        const filteredRooms = data.filter(room => room.floor === currentFloor);
        setRooms(filteredRooms);
      })
      .catch(error => {
        console.error('Error fetching room data:', error);
      });
  }, [currentFloor]);

  const handleRoomClick = (roomId) => {
    setSelectedRoom(roomId === selectedRoom ? null : roomId);
    navigate("/desks", { replace: true })
  };

  const toggleFloor = () => {
    setCurrentFloor(currentFloor === 'Ground' ? 'First' : 'Ground');
    setSelectedRoom(null); // Reset selected room when changing floors
  };

  const floorImage = currentFloor === 'Ground' ? firstFloorImage : secondFloorImage;

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <div className="sidebar">
        <Sidebar collapsed={collapsed} backgroundColor="#008444" style={{ height: "100%" }}>
          <Menu>
            <MenuItem icon={<CgProfile />}>Profile</MenuItem>
            <MenuItem icon={<RiAdminFill />} >Admin Panel</MenuItem>
            <MenuItem icon={<IoCalendarNumberOutline />} >Calendar</MenuItem>
            <MenuItem icon={<CgDisplayFullwidth />} >Display Bookings</MenuItem>
            <div className="collapse-button-container">
              <button className="collapse-button" onClick={() => setCollapsed(!collapsed)}>Collapse</button>
            </div>
          </Menu>
        </Sidebar>
      </div>
      <div className="floor-content">
        <h1>Floor Page {currentFloor === 'Ground' ? '*Ground' : '*First'}</h1>
        {date && <p>Chosen Date: {formattedDate}</p>}
        <button onClick={toggleFloor}>Switch Floor</button> {/* Button to switch floors */}
        <div className="image-wrapper">
          <img src={floorImage} alt={`${currentFloor === 'Ground' ? 'Ground' : 'First'} Floor`} />
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`clickable-area ${selectedRoom === room.id ? 'selected' : ''}`}
              style={{ top: `${room.x}px`, left: `${room.y}px` }}
              onClick={() => handleRoomClick(room.id)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Floor;
