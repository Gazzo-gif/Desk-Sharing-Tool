import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import firstFloorImage from '../../images/firstfloor.png';
import secondFloorImage from '../../images/secondfloor.png'; // Make sure this path is correct
import './Floor.css'; // Ensure this path is correct
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { CgProfile, CgDisplayFullwidth } from "react-icons/cg";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";

const Floor = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedDesk, setSelectedDesk] = useState('');
  const [currentFloor, setCurrentFloor] = useState('first');
  const location = useLocation();
  const { date } = location.state || {};
  const formattedDate = date ? new Date(date).toLocaleDateString() : '';

  // Rooms for the first floor
  const firstFloorRooms = [
    { id: 'room1', label: 'Room 007-Silence', position: { top: 175, left: 90 }, desks: ['Desk 1', 'Desk 2', 'Desk 3'] },
    { id: 'room2', label: 'Room 023-Silence', position: { top: 415, left: 400 }, desks: ['Desk A', 'Desk B', 'Desk C'] },
    { id: 'room3', label: 'Room 027-Normal', position: { top: 415, left: 535 }, desks: ['Desk 1', 'Desk 2', 'Desk 3, Desk 4'] },
    { id: 'room4', label: 'Room 048-Normal', position: { top: 510, left: 405 }, desks: ['Desk 1'] },
    { id: 'room5', label: 'Room 028-Normal', position: { top: 415, left: 640 }, desks: ['Desk 1'] },
    { id: 'room6', label: 'Room 028, 1/2-Normal', position: { top: 415, left: 740 }, desks: ['Desk 1'] },
    { id: 'room7', label: 'Room 043-Silence', position: { top: 515, left: 905 }, desks: ['Desk 1', 'Desk 2', 'Desk 3', 'Desk 4'] }
  ];

  // Define rooms for the second floor
  const secondFloorRooms = [
    { id: 'sroom1', label: 'Room 119-Normal', position: { top: 400, left: 490 }, desks: ['Desk A', 'Desk B'] },
    { id: 'sroom2', label: 'Room 120-Normal', position: { top: 400, left: 560 }, desks: ['Desk A', 'Desk B'] },
    { id: 'sroom3', label: 'Room 124-Silence', position: { top: 400, left: 750 }, desks: ['Desk A', 'Desk B'] },
    { id: 'sroom4', label: 'Room 139-Normal', position: { top: 500, left: 375 }, desks: ['Desk A', 'Desk B'] },
    { id: 'sroom5', label: 'Room 134-Normal', position: { top: 500, left: 670 }, desks: ['Desk A', 'Desk B'] },
    { id: 'sroom6', label: 'Room 133-Normal', position: { top: 500, left: 740 }, desks: ['Desk A', 'Desk B'] },
    { id: 'sroom7', label: 'Room 131-Normal', position: { top: 500, left: 860 }, desks: ['Desk A', 'Desk B'] },





  ];

  const handleRoomClick = (roomId) => {
    setSelectedRoom(roomId === selectedRoom ? null : roomId);
    setSelectedDesk('');
  };

  const handleDeskClick = (deskId, event) => {
    event.stopPropagation();
    setSelectedDesk(deskId);
  };

  // Function to switch floors
  const toggleFloor = () => {
    setCurrentFloor(currentFloor === 'first' ? 'second' : 'first');
    setSelectedRoom(null); // Reset selected room when changing floors
  };

  // Determine which set of rooms and image to display based on the current floor
  const rooms = currentFloor === 'first' ? firstFloorRooms : secondFloorRooms;
  const floorImage = currentFloor === 'first' ? firstFloorImage : secondFloorImage;


  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <div className="sidebar">
        <Sidebar collapsed={collapsed} backgroundColor="#008444" style={{ height: "100%" }}>
          <Menu>
            
            <MenuItem icon={<CgProfile />}>Profile</MenuItem>
            <MenuItem icon={<RiAdminFill />} >Admin Panel</MenuItem>
            <MenuItem icon={<IoCalendarNumberOutline />} >Calendar</MenuItem>
            <MenuItem icon={<CgDisplayFullwidth />} 
            >Display Bookings
              
            </MenuItem>
            <div className="collapse-button-container">
              <button className="collapse-button" onClick={() => setCollapsed(!collapsed)}>Collapse</button>
            </div>
          </Menu>
        </Sidebar>
      </div>
      <div className="floor-content">
        <h1>Floor Page {currentFloor === 'first' ? '*Ground' : '*Second'}</h1>
        {date && <p>Chosen Date: {formattedDate}</p>}
        <button onClick={toggleFloor}>Switch Floor</button> {/* Button to switch floors */}
        <div className="image-wrapper">
          <img src={floorImage} alt={`${currentFloor === 'first' ? 'First' : 'Second'} Floor`} />
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`clickable-area ${selectedRoom === room.id ? 'selected' : ''}`}
              style={{ top: `${room.position.top}px`, left: `${room.position.left}px` }}
              onClick={() => handleRoomClick(room.id)}
            ></div>
          ))}
        </div>
        {selectedRoom && (
          <div className="desks-list">
            <h3>{rooms.find(room => room.id === selectedRoom)?.label} Desks</h3>
            <ul>
              {rooms.find(room => room.id === selectedRoom)?.desks.map(desk => (
                <li key={desk}
                    className={selectedDesk === desk ? 'selected-desk' : ''}
                    onClick={(e) => handleDeskClick(desk, e)}>
                  {desk}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Floor;