import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import firstFloorImage from '../../images/firstfloor.png';
import './Floor.css'; // Ensure this path is correct
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { CgProfile } from "react-icons/cg";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { CgDisplayFullwidth } from "react-icons/cg";
import { RiAdminFill } from "react-icons/ri";

const Floor = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedDesk, setSelectedDesk] = useState('');
  const location = useLocation();
  const { date } = location.state || {};
  const formattedDate = date ? new Date(date).toLocaleDateString() : '';

  const rooms = [
    { id: 'room1', label: 'Room 007-Silence', position: { top: 175, left: 90 }, desks: ['Desk 1', 'Desk 2', 'Desk 3'] },
    { id: 'room2', label: 'Room 023-Silence', position: { top: 415, left: 400 }, desks: ['Desk A', 'Desk B', 'Desk C'] },
    { id: 'room3', label: 'Room 027-Normal', position: { top: 415, left: 535 }, desks: ['Desk 1', 'Desk 2', 'Desk 3, Desk 4'] },
    { id: 'room4', label: 'Room 048-Normal', position: { top: 510, left: 405 }, desks: ['Desk 1'] },
    { id: 'room5', label: 'Room 028-Normal', position: { top: 415, left: 640 }, desks: ['Desk 1'] },
    { id: 'room6', label: 'Room 028, 1/2-Normal', position: { top: 415, left: 740 }, desks: ['Desk 1'] },
    { id: 'room7', label: 'Room 043-Silence', position: { top: 515, left: 905 }, desks: ['Desk 1', 'Desk 2', 'Desk 3', 'Desk 4'] },



  ];

  const handleRoomClick = (roomId) => {
    setSelectedRoom(roomId === selectedRoom ? null : roomId); // Toggle room selection
    setSelectedDesk(''); // Reset selected desk when changing rooms
  };

  const handleDeskClick = (deskId, event) => {
    event.stopPropagation(); // Prevent the room click event from being triggered
    setSelectedDesk(deskId);
  };

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
        <h1>Floor Page *Ground</h1>
        {date && <p>Chosen Date: {formattedDate}</p>}
        <div className="image-wrapper">
          <img src={firstFloorImage} alt="First Floor" />
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
