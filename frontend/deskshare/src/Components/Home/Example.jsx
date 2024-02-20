import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/de";
import "./HomeCalendar.scss";
import "./Example.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
// import CalendarEvents from "./CalendarEvents";
// import axios from "axios";
import CalendarEvents from "./CalendarEvents";
moment.locale("de");
const localizer = momentLocalizer(moment);

const Example = () => {
  const eventList = [];
  const [init, setInit] = useState(2);
  const [events, setEvents] = useState([]); // Use your existing events here
  const [event, setEvent] = useState({
    start: "",
    end: "",
    title: "",
    id: init,
  }); // Use your existing events here
  let tempArray = events;
  const gg = (data) => {
    setEvent({
      ...event,
      start: data.start,
      end: data.end,
      title: "Insert Title",
      id: init,
    });
    setInit(init + 1);
    tempArray.push(event);
    console.log(tempArray);
  };
  const submit = () => {
    confirmAlert({
      title: "Enter event title",
      message: "Are you sure",
      buttons: [
        {
          label: "Yes",
          onClick: () => alert("Click Yes"),
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const handleGetDesks = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://188.34.162.76:8080/desks/1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Error to fetch data");
      }

      const data = await response.json();
      if (data !== -1) {
        // Save user ID in local storage
        try {
          localStorage.setItem("userId", String(data));
        } catch (error) {
          console.error("Error storing userId in localStorage:", error);
          // Handle the error, such as displaying a message to the user or retrying later.
        }        
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="desk-page">
      <div className="choose-date">
        <h1>Available Desks</h1>
      </div>
      <div className="info-container">
        <div className="desk-container">
          <div className="desk-component">
            <div>013.</div>
            <div className="desk-description">
              <p className="item-name">Has a computer</p>
              <p className="item-taken">Booked</p>
            </div>
          </div>
          <div className="desk-component">
            <div>0.14</div>
            <div className="desk-description">
              <p className="item-name">Has a computer</p>
              <p className="item-taken">Some free slots</p>
            </div>
          </div>
          <div className="desk-component">
            <div>015.</div>
            <div className="desk-description">
              <p className="item-name">Without equipment</p>
              <p className="item-taken">Available</p>
            </div>
          </div>
          <div className="desk-component">
            <div>016.</div>
            <div className="desk-description">
              <p className="item-name">Without equipment</p>
              <p className="item-taken">Available</p>
            </div>
          </div>
        </div>
        <div className="calendar-containe">
          <div className="calendar-container">
            <Calendar
              //   onSelectEvent={(data) => console.log(data)}
              localizer={localizer}
              events={tempArray}
              startAccessor="start"
              endAccessor="end"
              defaultView="day"
              style={{ height: 500 }}
              onSelectSlot={(data) => {
                // console.log(data?.start);
                gg(data);
              }}
              selectable={true}
              // onKeyPressEvent={(data) => console.log(data)}
            />
          </div>
          <button className="submit-btn" onClick={() => submit()}>
            [Add a title to event]
          </button>
        </div>
      </div>
    </div>
  );
};

export default Example;
