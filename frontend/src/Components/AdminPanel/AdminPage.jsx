import React, { useState } from "react";
import SidebarComponent from "../Home/SidebarComponent";
import { FaAddressBook, FaPlusMinus } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import "./AdminPage.css"; // Import the CSS file for AdminPage
import { MdDownload } from "react-icons/md";
import { useEffect } from "react";
import { ColumnGraph } from "./ColumnGraph";
import { HeatMap } from "./HeatMap";
import { UsageGraph } from "./UsageGraph";

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
  };

  return (
    <div className="adminhome-page">
      <SidebarComponent collapsed={collapsed} onCollapse={onCollapse} />
      <div className="adminpage-content">
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
        )}
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
    </div>
  );
};

export default AdminPage;
