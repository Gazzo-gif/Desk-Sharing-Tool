import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/de";
import "./HomeCalendar.scss";
import "./Booking.css";
import SidebarComponent from "./SidebarComponent"
import { useNavigate } from 'react-router-dom';


moment.locale("de");
const localizer = momentLocalizer(moment);

const Booking = () => {

  const navigate = useNavigate();
  const roomId = localStorage.getItem("roomId");
  const [desks, setDesks] = useState([]);
  // const [eventList, setEventList] = useState([]);
  const [init, setInit] = useState(2);
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(localStorage.getItem('event'));
  let tempArray = events;

  useEffect(() => {
    const fetchDesks = async () => {
      try {
        const response = await fetch(`http://188.34.162.76:8080/desks/room/${roomId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

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

  const gg = (data) => {
   
    setEvent({
      ...event,
      start: data.start,
      end: data.end,
      title: "Insert Title",
      id: init,
    });
    localStorage.setItem('event', event);
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

  function back() {
    navigate(-1);
  }

  return (
    <div className="desk-page">
      <div className="sidebar">
        <SidebarComponent />
      </div>
      <div className="backButtonDiv">
        <button className="backButton" onClick={back}>Back</button>
      </div>
      <div className="container">
        <div className="choose-date">
          <h1>Available Desks</h1>
        </div>

        <div className="info-container">
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
          <div className="calendar-containe">
            <div className="calendar-container">
              <Calendar
                localizer={localizer}
                events={tempArray}
                startAccessor="start"
                endAccessor="end"
                defaultView="day"
                style={{ height: 500 }}
                onSelectSlot={(data) => {
                  gg(data);
                }}
                selectable={true}
              />
            </div>
            <button className="submit-btn" onClick={() => submit()}>
              [Add a title to event]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
