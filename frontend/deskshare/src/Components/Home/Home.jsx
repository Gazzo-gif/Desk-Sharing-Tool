import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./Home.css";
import "./HomeCalendar.scss";
import SidebarComponent from "./SidebarComponent";
import CalendarEvents from "./CalendarEvents";

const localizer = momentLocalizer(moment);

const Home = () => {
  const [events, setEvents] = useState(CalendarEvents);
  const navigate = useNavigate();

  const handleSelectSlot = ({ start }) => {
    const selectedDateEvent = {
      start,
      end: start,
      title: "Selected Date",
      allDay: true,
    };

    setEvents([...events, selectedDateEvent]);

    setTimeout(() => {
      navigate("/floor", { state: { date: start } });
    }, 500);
  };

  return (
    <div className="home-page">
      <div className="sidebar">
        <SidebarComponent />
      </div>
      <div className="home-content">
        <div className="home-content">
          <div className="choose-date">
            <h1>Choose a date for a desk</h1>
          </div>
          <hr className="gradient"></hr>
          <div>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              onSelectSlot={handleSelectSlot}
              selectable={true}
              onKeyPressEvent={(data) => console.log(data)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
