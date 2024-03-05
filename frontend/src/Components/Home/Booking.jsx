import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./HomeCalendar.scss";
import "./Booking.css";
import SidebarComponent from "./SidebarComponent"
import { useTranslation } from "react-i18next";

const Booking = () => {
  const { t, i18n } = useTranslation();
  const roomId = localStorage.getItem("roomId");
  const [desks, setDesks] = useState([]);
  const [init, setInit] = useState(2);
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({
    start: "",
    end: "",
    title: "",
    id: init,
  });
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
      
      setEvents(bookingEvents);
    } catch (error) {
      console.error("Error fetching desk booking data:", error);
    }
  };
  
  // Use momentLocalizer with custom locale
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    moment.locale(i18n.language);
    setEvents([...events]);
  }, [i18n.language]);

  return (
    <div className="desk-page">
      <div className="sidebar">
        <SidebarComponent/>
      </div>
      <div className="container">
        <div className="choose-date">
          <h1>{t("availableDesks")}</h1>
        </div>
        <div className="info-container">
          <div className="desk-container">
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
          <div className="calendar-containe">
            <div className="calendar-container">
              <Calendar
                localizer={localizer}
                events={tempArray}
                startAccessor="start"
                endAccessor="end"
                views={['day', 'week']}
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
