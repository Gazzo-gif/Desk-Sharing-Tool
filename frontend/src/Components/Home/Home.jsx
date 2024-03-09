import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/de"
import "./Home.css";
import "./HomeCalendar.scss";
import SidebarComponent from "./SidebarComponent";
import CalendarEvents from "./CalendarEvents";
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';

const Home = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [events, setEvents] = useState(CalendarEvents);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.booking) {
      const { booking } = location.state;
      const isBookingExist = events.some(event => event.id === booking.id);
      if (!isBookingExist) {
        setEvents(prevEvents => [...prevEvents, booking]);
      }
    }
  }, [location.state, events]); // Include events dependency here
  
  const handleSelectSlot = ({ start }) => {
    const selectedDateEvent = {
      start,
      end: start,
      title: t("selectedDate"),
      allDay: true,
    };
  
    setEvents([...events, selectedDateEvent]);
  
    setTimeout(() => {
      navigate("/floor", { state: { date: start } });
    }, 500);
  };
  
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    // Change moment locale whenever language changes
    moment.locale(i18n.language);
    // Force re-render
    setEvents([...events]);
  }, [i18n.language]);

  return (
    <div className="home-page">
      <div className="sidebar">
        <SidebarComponent />
      </div>
      <div className="home-content">
        <div className="choose-date">
          <h1>{t("chooseDate")}</h1>
        </div>
        <hr className="gradient" />
        <div>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            views={['month', "agenda"]}
            defaultView="month"
            style={{ height: 500 }}
            onSelectSlot={handleSelectSlot}
            selectable={true}
            onKeyPressEvent={(data) => console.log(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
