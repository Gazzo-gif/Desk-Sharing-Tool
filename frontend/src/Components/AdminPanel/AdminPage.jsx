import React, { useState } from 'react';
import SidebarComponent from '../Home/SidebarComponent';
import { FaAddressBook, FaPlusMinus } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import './AdminPage.css'; // Import the CSS file for AdminPage
import { MdDownload } from "react-icons/md";
import styled from '@emotion/styled';
import EditRoom from './Room/EditRoom';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import AddWorkstation from './Workstation/AddWorkstation';
import EditWorkstation from './Workstation/EditWorkstation';
import DeleteWorkstation from './Workstation/DeleteWorkstation';

const AdminPage = ({ collapsed, onCollapse }) => {
  const [showEmployeeButtons, setShowEmployeeButtons] = useState(false);
  const [showWorkstationButtons, setShowWorkstationButtons] = useState(false);
  const [showBookingButtons, setShowBookingButtons] = useState(false);
  const [isEditRoomOpen, setIsEditRoomOpen] = useState(false);
  const [isAddWorkstationOpen, setIsAddWorkstationOpen] = useState(false);
  const [isEditWorkstationOpen, setIsEditWorkstationOpen] = useState(false);
  const [isDeleteWorkstationOpen, setIsDeleteWorkstationOpen] = useState(false);

  const toggleEmployeeButtons = () => {
    setShowEmployeeButtons(!showEmployeeButtons);
    if (showEmployeeButtons === false) {
      setShowWorkstationButtons(false);
      setShowBookingButtons(false);
    }
  };

  const toggleWorkstationButtons = () => {
    setShowWorkstationButtons(!showWorkstationButtons);
    if (showWorkstationButtons === false) {
      setShowEmployeeButtons(false);
      setShowBookingButtons(false);
    }
  };

  const toggleBookingButtons = () => {
    setShowBookingButtons(!showBookingButtons);
    if (showBookingButtons === false) {
      setShowEmployeeButtons(false);
      setShowWorkstationButtons(false);
    }
  };

  const toggleEditRoomModal = () => setIsEditRoomOpen(!isEditRoomOpen);
  const toggleAddWorkstationModal = () => setIsAddWorkstationOpen(!isAddWorkstationOpen);
  const toggleEditWorkstationModal = () => setIsEditWorkstationOpen(!isEditWorkstationOpen);
  const toggleDeleteWorkstationModal = () => setIsDeleteWorkstationOpen(!isDeleteWorkstationOpen);

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
      minWidth: '800px !important',
      height: 'auto'
    },
  }));

  const BootstrapWorkstationDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
      minWidth: '500px !important',
      height: 'auto'
    },
  }));

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
    return (
      <DialogTitle sx={{ alignItems: "center", justifyContent: "center", alignContent: "space-between" }} {...other}>
        {children}
        {onClose ? (
          <IconButton aria-label="close" onClick={onClose}></IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  return (
    <div className="adminhome-page">
      <SidebarComponent />
      <div className="adminpage-content">
        <div className="admin-content">
          <h1>Admin Page Content</h1>
          <div className="admin-controls-container">
            <div className="user-management-container">
              <button className="user-management-button" onClick={toggleEmployeeButtons}>
                User Management
              </button>
              <FaAddressBook className="logo" />
            </div>
            <div className="edit-rooms-container">
              <button className="edit-rooms-button" onClick={toggleWorkstationButtons}>
                Edit Rooms
              </button>
              <FaPlusMinus className="logo" style={{ cursor: 'pointer' }} onClick={toggleEditRoomModal} />
            </div>
            <div className="manage-bookings-container">
              <button className="manage-bookings-button" onClick={toggleBookingButtons}>
                Manage Bookings
              </button>
              <FaBook className="logo" />
            </div>
            <div className="download-statistics-container">
              <button className="download-statistics-button" onClick={() => console.log("Download Statistics clicked")}>
                Download Statistics
              </button>
              <MdDownload className="logo" />
            </div>
          </div>
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
          <div className={`workstation-button-wrapper ${showWorkstationButtons ? 'visible' : ''}`}>
            <button className="workstation-button" onClick={toggleAddWorkstationModal}>
              Add Workstation
            </button>
            <button className="workstation-button" onClick={toggleDeleteWorkstationModal}>
              Delete Workstation
            </button>
            <button className="workstation-button" onClick={toggleEditWorkstationModal}>
              Edit Workstation
            </button>
          </div>
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

      <BootstrapDialog onClose={toggleEditRoomModal} aria-labelledby="customized-dialog-title" open={isEditRoomOpen}>
        <EditRoom editRoomModal={toggleEditRoomModal} />
      </BootstrapDialog>

      <BootstrapWorkstationDialog onClose={toggleAddWorkstationModal} aria-labelledby="customized-dialog-title" open={isAddWorkstationOpen}>
        <BootstrapDialogTitle id="customized-dialog-title" className="toolHeader" style={{ textAlign: 'center', backgroundColor: 'green', color: 'white' }}>
          ADD WORKSTATION
        </BootstrapDialogTitle>
        <AddWorkstation addWorkstationModal={toggleAddWorkstationModal} />
      </BootstrapWorkstationDialog>

      <BootstrapWorkstationDialog onClose={toggleEditWorkstationModal} aria-labelledby="customized-dialog-title" open={isEditWorkstationOpen}>
        <BootstrapDialogTitle id="customized-dialog-title" className="toolHeader" style={{ textAlign: 'center', backgroundColor: 'green', color: 'white' }}>
          EDIT WORKSTATION
        </BootstrapDialogTitle>
        <EditWorkstation editWorkstationModal={toggleEditWorkstationModal} />
      </BootstrapWorkstationDialog>

      <BootstrapWorkstationDialog onClose={toggleDeleteWorkstationModal} aria-labelledby="customized-dialog-title" open={isDeleteWorkstationOpen}>
        <BootstrapDialogTitle id="customized-dialog-title" className="toolHeader" style={{ textAlign: 'center', backgroundColor: 'green', color: 'white' }}>
          DELETE WORKSTATION
        </BootstrapDialogTitle>
        <DeleteWorkstation deleteWorkstationModal={toggleDeleteWorkstationModal} />
      </BootstrapWorkstationDialog>
    </div>
  );
};

export default AdminPage;