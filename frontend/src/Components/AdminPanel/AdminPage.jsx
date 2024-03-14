import React, { useState } from 'react';
import SidebarComponent from '../Home/SidebarComponent';
import { FaAddressBook, FaPlusMinus } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import './AdminPage.css'; // Import the CSS file for AdminPage
import { MdDownload } from "react-icons/md";

const AdminPage = ({ collapsed, onCollapse }) => {
  const [activeButton, setActiveButton] = useState(null);

  const toggleButtons = (button) => {
    if (activeButton === button) {
      setActiveButton(null); // Toggle off if the same button is clicked
    } else {
      setActiveButton(button);
    }
  };

  return (
    <div className="adminhome-page">
      <SidebarComponent collapsed={collapsed} onCollapse={onCollapse} />
      <div className="adminpage-content">
        <div className="admin-content">
          <h1>Admin Page Content</h1>
          <div className="admin-controls-container">
            {/* User Management button and logo */}
            <div className="user-management-container">
              <button className="user-management-button" onClick={() => toggleButtons('user-management')}>
                User Management
              </button>
              <FaAddressBook className="logo" />
            </div>
            {/* Edit Rooms button and logo */}
            <div className="edit-rooms-container">
              <button className="edit-rooms-button" onClick={() => toggleButtons('edit-rooms')}>
                Edit Rooms
              </button>
              <FaPlusMinus className="logo" />
            </div>
            {/* Manage Bookings button and logo */}
            <div className="manage-bookings-container">
              <button className="manage-bookings-button" onClick={() => toggleButtons('manage-bookings')}>
                Manage Bookings
              </button>
              <FaBook className="logo" />
            </div>
            {/* Download Statistics button and logo */}
            <div className="download-statistics-container">
              <button className="download-statistics-button" onClick={() => toggleButtons('download-statistics')}>
                Download Statistics
              </button>
              <MdDownload className="logo" />
            </div>
          </div>
          {/* Wrapper for employee, workstation, and booking buttons */}
          <div className="button-wrapper">
            <div className={`employee-button-wrapper ${activeButton === 'user-management' ? 'visible' : ''}`}>
              <button className="employee-button" onClick={() => console.log("Add Employee clicked")}>
                Add Employee
              </button>
              <button className="employee-button" onClick={() => console.log("Delete Employee clicked")}>
                Delete Employee
              </button>
              <button className="employee-button" onClick={() => console.log("Edit Employee clicked")}>
                Edit Employee
              </button>
            </div>
            <div className={`workstation-button-wrapper ${activeButton === 'edit-rooms' ? 'visible' : ''}`}>
              <button className="workstation-button" onClick={() => console.log("Add Workstation clicked")}>
                Add Workstation
              </button>
              <button className="workstation-button" onClick={() => console.log("Delete Workstation clicked")}>
                Delete Workstation
              </button>
              <button className="workstation-button" onClick={() => console.log("Edit Workstation clicked")}>
                Edit Workstation
              </button>
            </div>
            <div className={`booking-button-wrapper ${activeButton === 'manage-bookings' ? 'visible' : ''}`}>
              <button className="booking-button" onClick={() => console.log("Delete Booking clicked")}>
                Delete Booking
              </button>
              <button className="booking-button" onClick={() => console.log("Edit Booking clicked")}>
                Edit Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
