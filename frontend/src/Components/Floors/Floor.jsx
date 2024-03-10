import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import firstFloorImage from '../../images/firstfloor.png';
import secondFloorImage from '../../images/secondfloor.png'; 
import './Floor.css'; 
import { useNavigate } from "react-router-dom";
import SidebarComponent from "../Home/SidebarComponent"
import { useTranslation } from "react-i18next";

const Floor = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentFloor, setCurrentFloor] = useState('Ground');
  const [rooms, setRooms] = useState([]);
  const location = useLocation();
  const { date } = location.state || {};
  const formattedDate = date ? new Date(date).toLocaleDateString() : '';

  useEffect(() => {
    // Fetch room data from the backend
    fetch('/rooms')
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
    navigate("/desks", { state: { roomId, date } });
  };

  const toggleFloor = () => {
    setCurrentFloor(currentFloor === 'Ground' ? 'First' : 'Ground');
    setSelectedRoom(null); // Reset selected room when changing floors
  };

  function back() {
    navigate(-1);
  }

  const floorImage = currentFloor === 'Ground' ? firstFloorImage : secondFloorImage;

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <div className="sidebar">
        <SidebarComponent />
      </div>

      <div className="floor-content">
        <h1>{currentFloor === 'Ground' ? t("groundFloor") : t("firstFloor")}</h1>
        {date && <p>{t("chosenDate")}: {formattedDate}</p>}
        <button onClick={toggleFloor}>{t("switchFloor")}</button>
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
        <div className="backButtonDiv">
          <button className="backButton" onClick={back}>Back</button>
        </div>
      </div>

    </div>
  );
};

export default Floor;
