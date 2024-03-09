import React, { useState } from 'react';
import SidebarComponent from '../Home/SidebarComponent';
import { FaAddressBook, FaPlusMinus } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import './AdminPage.css'; // Import the CSS file for AdminPage
import { MdDownload } from "react-icons/md";



const AdminPage = ({ collapsed, onCollapse }) => {
  const [showEmployeeButtons, setShowEmployeeButtons] = useState(false);
  const [showWorkstationButtons, setShowWorkstationButtons] = useState(false);
  const [showBookingButtons, setShowBookingButtons] = useState(false);

  const toggleEmployeeButtons = () => {
    setShowEmployeeButtons(!showEmployeeButtons);
  };

  const toggleWorkstationButtons = () => {
    setShowWorkstationButtons(!showWorkstationButtons);
  };

  const toggleBookingButtons = () => {
    setShowBookingButtons(!showBookingButtons);
  };

  return (
    <div className="adminhome-page">
      <SidebarComponent />
      <div className="adminpage-content">
        <div className="admin-content">
          <h1>Admin Page Content</h1>
          <div className="admin-controls-container">
            {/* User Management button and logo */}
            <div className="user-management-container">
              <button className="user-management-button" onClick={toggleEmployeeButtons}>
                User Management
              </button>
              <FaAddressBook className="logo" />
            </div>
            {/* Edit Rooms button and logo */}
            <div className="edit-rooms-container">
              <button className="edit-rooms-button" onClick={toggleWorkstationButtons}>
                Edit Rooms
              </button>
              <FaPlusMinus className="logo" />
            </div>
            {/* Manage Bookings button and logo */}
            <div className="manage-bookings-container">
              <button className="manage-bookings-button" onClick={toggleBookingButtons}>
                Manage Bookings
              </button>
              <FaBook className="logo" />
            </div>
            {/* Download Statistics button and logo */}
            <div className="download-statistics-container">
              <button className="download-statistics-button" onClick={() => console.log("Download Statistics clicked")}>
                Download Statistics
              </button>
              <MdDownload className="logo" />
            </div>
          </div>
          {/* Wrapper for employee buttons */}
          <div className={`employee-button-wrapper ${showEmployeeButtons ? 'visible' : ''}`}>
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
          {/* Wrapper for workstation buttons */}
          <div className={`workstation-button-wrapper ${showWorkstationButtons ? 'visible' : ''}`}>
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
          {/* Wrapper for booking buttons */}
          <div className={`booking-button-wrapper ${showBookingButtons ? 'visible' : ''}`}>
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
  );
}

export default AdminPage;