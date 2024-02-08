import React from 'react';
import { useLocation } from 'react-router-dom';
import firstFloorImage from '../../images/firstfloor.png';
import './Floor.css'; // Make sure the path is correct

const Floor = () => {
  const location = useLocation();
  const { date } = location.state || {};
  const formattedDate = date ? new Date(date).toLocaleDateString() : '';

  return (
    <div>
      <h1>Floor Page *Ground</h1>
      {date && <p>Chosen Date: {formattedDate}</p>}
      <div className="image-wrapper">
        <img src={firstFloorImage} alt="First Floor" />
      </div>
    </div>
  );
};

export default Floor;
