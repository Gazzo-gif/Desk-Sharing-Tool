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

const Booking = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const localizer = momentLocalizer(moment);
  const { date } = location.state || {};
  const roomId = localStorage.getItem("roomId");
  const [desks, setDesks] = useState([]);
  const [init, setInit] = useState(2);
  const [deskEvents, setDeskEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({});
  const [clickedDeskId, setClickedDeskId] = useState(null); // New state to track clicked desk ID

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
    const startTime = new Date(data.start);
    const endTime = new Date(data.end);
  
    // Calculate the duration in milliseconds
    const duration = endTime - startTime;
  
    // Check if the duration is within the allowed range
    if (duration < 2 * 60 * 60 * 1000) {
      alert("Minimum booking duration is 2 hours.");
      return;
    }
  
    if (duration > 9 * 60 * 60 * 1000) {
      alert("Maximum booking duration is 9 hours.");
      return;
    }
  
    // Remove the existing event being created if any
    const updatedEvents = events.filter(existingEvent => existingEvent.id !== event.id);
  
    // Check for overlapping events for the specific desk
    const isOverlap = updatedEvents.some((existingEvent) =>
      (existingEvent.start <= startTime && startTime < existingEvent.end) ||
      (existingEvent.start < endTime && endTime <= existingEvent.end) ||
      (startTime <= existingEvent.start && existingEvent.end <= endTime)
    );
  
    if (isOverlap) {
      alert("This slot overlaps with another booking for this desk. Please choose a different slot.");
      return;
    }
  
    const newEvent = {
      start: data.start,
      end: data.end,
      id: deskEvents.length,
    };
  
    // Update events state with existing events and the new event
    setEvents([...deskEvents, newEvent]);
    setEvent(newEvent);
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

  const handleDeskClick = async (desk) => {
    try {
      const response = await fetch(
        `http://188.34.162.76:8080/bookings/desk/${desk.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Error fetching desk booking data");
      }
  
      const bookingData = await response.json();
      console.log("Booking data for desk:", bookingData);
  
      // Parse the booking data and add events to tempArray
      const bookingEvents = bookingData.map((booking) => ({
        start: new Date(booking.day + 'T' + booking.begin),
        end: new Date(booking.day + 'T' + booking.end),
        title: booking.user.name,
        id: init,
      }));
      
      setDeskEvents(bookingEvents);
      setEvents(bookingEvents);
      setClickedDeskId(desk.id); // Set the clicked desk ID
    } catch (error) {
      console.error("Error fetching desk booking data:", error);
    }
  };

  useEffect(() => {
    moment.locale(i18n.language);
    setEvents([...events]);
  }, [i18n.language]);

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
              <div className="desk-component" key={index}>
                <div>{desk.id}.</div>
                <div className={`desk-description ${desk.id === clickedDeskId ? 'clicked' : ''}`} 
                  onClick={() => handleDeskClick(desk)}
                >
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
                  if (clickedDeskId !== null) {
                    gg(data);
                  }
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
