import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import firstFloorImage from '../../images/firstfloor.png';
import './Floor.css'; // Adjust the path as needed
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { CgProfile } from "react-icons/cg";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { CgDisplayFullwidth } from "react-icons/cg";
import { RiAdminFill } from "react-icons/ri";


const Floor = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { date } = location.state || {};
  const formattedDate = date ? new Date(date).toLocaleDateString() : '';

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <div className="sidebar">
        <Sidebar
          collapsed={collapsed}
          backgroundColor="#008444"
          style={{
            height: "100%",
          }}
        >
          <Menu>
            <MenuItem icon={<CgProfile />}>Profile</MenuItem>
            <MenuItem icon={<RiAdminFill />}>Admin Panel</MenuItem>
            <MenuItem icon={<IoCalendarNumberOutline />}>Calender</MenuItem>
            <SubMenu icon={<CgDisplayFullwidth />} label="Display Bookings">
              <MenuItem>Booking 1</MenuItem>
              <MenuItem>Booking 2</MenuItem>
            </SubMenu>
            <div>
              <button
                className="collapse-button"
                onClick={() => setCollapsed(!collapsed)}
              >
                Collapse
              </button>
            </div>
          </Menu>
        </Sidebar>
      </div>
      <div className="floor-content" style={{ flex: 1, overflowY: 'auto' }}>
        <h1>Floor Page *Ground</h1>
        {date && <p>Chosen Date: {formattedDate}</p>}
        <div className="image-wrapper">
          <img src={firstFloorImage} alt="First Floor" />
        </div>
      </div>
    </div>
  );
};

export default Floor;
