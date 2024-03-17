<<<<<<< HEAD
<<<<<<< HEAD
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

=======
import React, { useState } from 'react';
import SidebarComponent from '../Home/SidebarComponent';
=======
import React, { useState } from "react";
import SidebarComponent from "../Home/SidebarComponent";
>>>>>>> a514437 (Added desks to Admin panel)
import { FaAddressBook, FaPlusMinus } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import "./AdminPage.css"; // Import the CSS file for AdminPage
import { MdDownload } from "react-icons/md";
<<<<<<< HEAD
<<<<<<< HEAD
import styled from '@emotion/styled';
import EditRoom from './Room/EditRoom';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import AddWorkstation from './Workstation/AddWorkstation';
import EditWorkstation from './Workstation/EditWorkstation';
import DeleteWorkstation from './Workstation/DeleteWorkstation';
import AddEmployee from './UserManagement/AddEmployee';
import DeleteEmployee from './UserManagement/DeleteEmployee';
import EditEmployee from './UserManagement/EditEmployee';
import DeleteBookings from './Bookings/DeleteBookings';
import EditBookings from './Bookings/EditBookings';

const AdminPage = ({ collapsed, onCollapse }) => {
  const [showEmployeeButtons, setShowEmployeeButtons] = useState(false);
  const [showWorkstationButtons, setShowWorkstationButtons] = useState(false);
  const [showBookingButtons, setShowBookingButtons] = useState(false);
  const [isEditRoomOpen, setIsEditRoomOpen] = useState(false);
  const [isAddWorkstationOpen, setIsAddWorkstationOpen] = useState(false);
  const [isEditWorkstationOpen, setIsEditWorkstationOpen] = useState(false);
  const [isDeleteWorkstationOpen, setIsDeleteWorkstationOpen] = useState(false);
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isEditEmployeeOpen, setIsEditEmployeeOpen] = useState(false);
  const [isDeleteEmployeeOpen, setIsDeleteEmployeeOpen] = useState(false);

  const [isEditBookingsOpen, setIsEditBookingsOpen] = useState(false);
  const [isDeleteBookingsOpen, setIsDeleteBookingsOpen] = useState(false);
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
  const toggleAddEmployeeModal = () => setIsAddEmployeeOpen(!isAddEmployeeOpen);
  const toggleEditEmployeeModal = () => setIsEditEmployeeOpen(!isEditEmployeeOpen);
  const toggleDeleteEmployeeModal = () => setIsDeleteEmployeeOpen(!isDeleteEmployeeOpen);

  const toggleEditBookingsModal = () => setIsEditBookingsOpen(!isEditBookingsOpen);
  const toggleDeleteBookingsModal = () => setIsDeleteBookingsOpen(!isDeleteBookingsOpen);
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

  const BootstrapEmployeeDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
      minWidth: '1000px !important',
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
=======
=======
import { useEffect } from "react";
<<<<<<< HEAD
>>>>>>> a514437 (Added desks to Admin panel)
=======
import { ColumnGraph } from "./ColumnGraph";
import { HeatMap } from "./HeatMap";
import { UsageGraph } from "./UsageGraph";
>>>>>>> 624b4a1 (Added Heat, Column, Usage Graphs)

const AdminPage = ({ collapsed, onCollapse }) => {
  const roomId = localStorage.getItem("roomId");
  const [activeButton, setActiveButton] = useState(null);
  const [graph, setGraph] = useState("column-map");
  const [desks, setDesks] = useState([]);
  useEffect(() => {
    const fetchDesks = async () => {
      try {
        const response = await fetch(
          `http://188.34.162.76:8080/desks/room/${roomId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching desk data");
        }

        const data = await response.json();
        setDesks(data);
      } catch (error) {
        console.error("Error fetching desk data:", error);
      }
    };

    if (roomId) {
      fetchDesks();
    }
  }, [roomId]);
  const toggleButtons = (button) => {
    if (activeButton === button) {
      setActiveButton(null); // Toggle off if the same button is clicked
    } else {
      setActiveButton(button);
    }
>>>>>>> 0f71ca4 (Overlaping Solved)
  };

  return (
    <div className="adminhome-page">
      <SidebarComponent collapsed={collapsed} onCollapse={onCollapse} />
      <div className="adminpage-content">
<<<<<<< HEAD
        <div className="admin-content">
          <h1>Admin Page Content</h1>
          <div className="admin-controls-container">
            <div className="user-management-container">
              <button
                className="user-management-button"
                onClick={() => toggleButtons("user-management")}
              >
                User Management
              </button>
              <FaAddressBook className="logo" />
            </div>
            <div className="edit-rooms-container">
              <button
                className="edit-rooms-button"
                onClick={() => toggleButtons("edit-rooms")}
              >
                Edit Rooms
              </button>
              <FaPlusMinus className="logo" />
            </div>
            <div className="manage-bookings-container">
              <button
                className="manage-bookings-button"
                onClick={() => toggleButtons("manage-bookings")}
              >
                Manage Bookings
              </button>
              <FaBook className="logo" />
            </div>
            <div className="download-statistics-container">
              <button
                className="download-statistics-button"
                onClick={() => toggleButtons("download-statistics")}
=======
        {true ? (
          <></>
        ) : (
          <div className="admin-content">
            <h1>Admin Page Content</h1>
            <div className="admin-controls-container">
              {/* User Management button and logo */}
              <div className="user-management-container">
                <button
                  className="user-management-button"
                  onClick={() => toggleButtons("user-management")}
                >
                  User Management
                </button>
                <FaAddressBook className="logo" />
              </div>
              {/* Edit Rooms button and logo */}
              <div className="edit-rooms-container">
                <button
                  className="edit-rooms-button"
                  onClick={() => toggleButtons("edit-rooms")}
                >
                  Edit Rooms
                </button>
                <FaPlusMinus className="logo" />
              </div>
              {/* Manage Bookings button and logo */}
              <div className="manage-bookings-container">
                <button
                  className="manage-bookings-button"
                  onClick={() => toggleButtons("manage-bookings")}
                >
                  Manage Bookings
                </button>
                <FaBook className="logo" />
              </div>
              {/* Download Statistics button and logo */}
              <div className="download-statistics-container">
                <button
                  className="download-statistics-button"
                  onClick={() => toggleButtons("download-statistics")}
                >
                  Download Statistics
                </button>
                <MdDownload className="logo" />
              </div>
            </div>
            {/* Wrapper for employee, workstation, and booking buttons */}
            <div className="button-wrapper">
              <div
                className={`employee-button-wrapper ${
                  activeButton === "user-management" ? "visible" : ""
                }`}
              >
                <button
                  className="employee-button"
                  onClick={() => console.log("Add Employee clicked")}
                >
                  Add Employee
                </button>
                <button
                  className="employee-button"
                  onClick={() => console.log("Delete Employee clicked")}
                >
                  Delete Employee
                </button>
                <button
                  className="employee-button"
                  onClick={() => console.log("Edit Employee clicked")}
                >
                  Edit Employee
                </button>
              </div>
              <div
                className={`workstation-button-wrapper ${
                  activeButton === "edit-rooms" ? "visible" : ""
                }`}
              >
                <button
                  className="workstation-button"
                  onClick={() => console.log("Add Workstation clicked")}
                >
                  Add Workstation
                </button>
                <button
                  className="workstation-button"
                  onClick={() => console.log("Delete Workstation clicked")}
                >
                  Delete Workstation
                </button>
                <button
                  className="workstation-button"
                  onClick={() => console.log("Edit Workstation clicked")}
                >
                  Edit Workstation
                </button>
              </div>
              <div
                className={`booking-button-wrapper ${
                  activeButton === "manage-bookings" ? "visible" : ""
                }`}
>>>>>>> 624b4a1 (Added Heat, Column, Usage Graphs)
              >
                <button
                  className="booking-button"
                  onClick={() => console.log("Delete Booking clicked")}
                >
                  Delete Booking
                </button>
                <button
                  className="booking-button"
                  onClick={() => console.log("Edit Booking clicked")}
                >
                  Edit Booking
                </button>
              </div>
            </div>
          </div>
<<<<<<< HEAD
<<<<<<< HEAD
          <div className={`employee-button-wrapper ${showEmployeeButtons ? 'visible' : ''}`}>
            <button className="employee-button" onClick={toggleAddEmployeeModal}>
              Add Employee
            </button>
            <button className="employee-button" onClick={toggleDeleteEmployeeModal}>
              Delete Employee
            </button>
            <button className="employee-button" onClick={toggleEditEmployeeModal}>
              Edit Employee
            </button>
          </div>
          <div className={`workstation-button-wrapper ${showWorkstationButtons ? 'visible' : ''}`}>
            <button className="workstation-button" onClick={toggleEditRoomModal}>
              Edit Room
            </button>
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
            <button className="booking-button" onClick={toggleDeleteBookingsModal}>
              Delete Booking
            </button>
            <button className="booking-button" onClick={toggleEditBookingsModal}>
              Edit Booking
            </button>
=======
          {/* Wrapper for employee, workstation, and booking buttons */}
          <div className="button-wrapper">
            <div
              className={`employee-button-wrapper ${
                activeButton === "user-management" ? "visible" : ""
              }`}
            >
              <button
                className="employee-button"
                onClick={() => console.log("Add Employee clicked")}
              >
                Add Employee
              </button>
              <button
                className="employee-button"
                onClick={() => console.log("Delete Employee clicked")}
              >
                Delete Employee
              </button>
              <button
                className="employee-button"
                onClick={() => console.log("Edit Employee clicked")}
              >
                Edit Employee
              </button>
            </div>
            <div
              className={`workstation-button-wrapper ${
                activeButton === "edit-rooms" ? "visible" : ""
              }`}
            >
              <button
                className="workstation-button"
                onClick={() => console.log("Add Workstation clicked")}
              >
                Add Workstation
              </button>
              <button
                className="workstation-button"
                onClick={() => console.log("Delete Workstation clicked")}
              >
                Delete Workstation
              </button>
              <button
                className="workstation-button"
                onClick={() => console.log("Edit Workstation clicked")}
              >
                Edit Workstation
              </button>
            </div>
            <div
              className={`booking-button-wrapper ${
                activeButton === "manage-bookings" ? "visible" : ""
              }`}
            >
              <button
                className="booking-button"
                onClick={() => console.log("Delete Booking clicked")}
              >
                Delete Booking
              </button>
              <button
                className="booking-button"
                onClick={() => console.log("Edit Booking clicked")}
              >
                Edit Booking
              </button>
            </div>
>>>>>>> 0f71ca4 (Overlaping Solved)
          </div>
        </div>
=======
        )}
>>>>>>> 624b4a1 (Added Heat, Column, Usage Graphs)
        <div className="bottom-container">
          <div className="desk-container">
            {desks.map((desk, index) => (
              <div className="desk-component" key={index}>
                <div>{desk.id}.</div>
                <div className="desk-description">
                  <p className="item-name">{desk.equipment}</p>
                  <p className="item-taken">Some free slots</p>
                </div>
              </div>
            ))}
          </div>
          <div className="data-display">
            <div className="maps">
              <div onClick={() => setGraph("column-map")} className="map">
                Column Map
              </div>
              <div onClick={() => setGraph("heat-map")} className="map">
                Heat Map
              </div>
              <div onClick={() => setGraph("usage-map")} className="map">
                Usage
              </div>
            </div>

            {graph === "heat-map" ? (
              <div className="heat">
                <HeatMap />
              </div>
            ) : (
              ""
            )}
            {graph === "column-map" ? (
              <div className="column">
                <ColumnGraph />
              </div>
            ) : (
              ""
            )}
            {graph === "usage-map" ? (
              <div className="heat">
                <UsageGraph />
              </div>
            ) : (
              ""
            )}
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


      <BootstrapWorkstationDialog onClose={toggleAddEmployeeModal} aria-labelledby="customized-dialog-title" open={isAddEmployeeOpen}>
        <BootstrapDialogTitle id="customized-dialog-title" className="toolHeader" style={{ textAlign: 'center', backgroundColor: 'green', color: 'white' }}>
          ADD EMPLOYEE
        </BootstrapDialogTitle>
        <AddEmployee addEmployeeModal={toggleAddEmployeeModal} />
      </BootstrapWorkstationDialog>

      <BootstrapEmployeeDialog onClose={toggleEditEmployeeModal} aria-labelledby="customized-dialog-title" open={isEditEmployeeOpen}>
        {/* <BootstrapDialogTitle id="customized-dialog-title" className="toolHeader" style={{ textAlign: 'center', backgroundColor: 'green', color: 'white' }}>
          EDIT EMPLOYEE
        </BootstrapDialogTitle> */}
        <EditEmployee editEmployeeModal={toggleEditEmployeeModal} />
      </BootstrapEmployeeDialog>

      <BootstrapEmployeeDialog onClose={toggleDeleteEmployeeModal} aria-labelledby="customized-dialog-title" open={isDeleteEmployeeOpen}>
        <BootstrapDialogTitle id="customized-dialog-title" className="toolHeader" style={{ textAlign: 'center', backgroundColor: 'green', color: 'white' }}>
          DELETE EMPLOYEE
        </BootstrapDialogTitle>
        <DeleteEmployee deleteEmployeeModal={toggleDeleteEmployeeModal} />
      </BootstrapEmployeeDialog>

      <BootstrapEmployeeDialog onClose={toggleEditBookingsModal} aria-labelledby="customized-dialog-title" open={isEditBookingsOpen}>
        <BootstrapDialogTitle id="customized-dialog-title" className="toolHeader" style={{ textAlign: 'center', backgroundColor: 'green', color: 'white' }}>
          EDIT BOOKINGS
        </BootstrapDialogTitle>
        <EditBookings editBookingsModal={toggleEditBookingsModal} />
      </BootstrapEmployeeDialog>

      <BootstrapEmployeeDialog onClose={toggleDeleteBookingsModal} aria-labelledby="customized-dialog-title" open={isDeleteBookingsOpen}>
        <BootstrapDialogTitle id="customized-dialog-title" className="toolHeader" style={{ textAlign: 'center', backgroundColor: 'green', color: 'white' }}>
          DELETE BOOKINGsS
        </BootstrapDialogTitle>
        <DeleteBookings deleteBookingsModal={toggleDeleteBookingsModal} />
      </BootstrapEmployeeDialog>
    </div>
  );
};

<<<<<<< HEAD
>>>>>>> b270e92 (admin panal rooms and desks)
export default AdminPage;
=======
export default AdminPage;
>>>>>>> 0f71ca4 (Overlaping Solved)
