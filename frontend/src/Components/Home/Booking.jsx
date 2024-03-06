import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./HomeCalendar.scss";
import "./Booking.css";
import SidebarComponent from "./SidebarComponent"
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation  } from 'react-router-dom';


moment.locale("de");
const localizer = momentLocalizer(moment);

const Booking = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { date } = location.state || {};
  const roomId = localStorage.getItem("roomId");
  const [desks, setDesks] = useState([]);
  const [init, setInit] = useState(2);
  const [deskEvents, setDeskEvents] = useState([]);
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
      id: init,

    });
    localStorage.setItem('event', event);
    setInit(init + 1);
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
          <h1>{t("availableDesks")}</h1>
        </div>

        <div className="info-container">
          <div>
            {desks.map((desk, index) => (
              <div className="desk-component" key={index} onClick={() => handleDeskClick(desk)}>
                <div>{desk.id}.</div>
                <div className="desk-description">
                  <p className="item-name">{desk.equipment}</p>
                  <p className="item-taken">Some free slots</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="calendar-container">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={['day', 'week']}
                defaultView="day"
                defaultDate={date}
                onSelectSlot={(data) => {
                  gg(data);
                }}
                selectable={true}
                min={new Date(0, 0, 0, 6, 0, 0)} // 6 am
                max={new Date(0, 0, 0, 22, 0, 0)} // 10 pm
                eventPropGetter={(event) => ({
                  style: {
                    backgroundColor: deskEvents.some((deskEvent) => deskEvent.id === event.id)
                      ? "grey" // Color for events from deskEvents
                      : "#008444", // Color for new events
                  },
                })}
              />
            </div>
            <button className="submit-btn" onClick={() => submit()}>
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
