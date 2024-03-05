import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/de";
import "./Home.css";
import "./HomeCalendar.scss";
import SidebarComponent from "./SidebarComponent";
import CalendarEvents from "./CalendarEvents";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const Home = () => {
  const { t } = useTranslation(); // Initialize translation hook
  const [events, setEvents] = useState(CalendarEvents);
  const navigate = useNavigate();

  const browserLocale = navigator.language || navigator.userLanguage;
  moment.locale(browserLocale);
  const localizer = momentLocalizer(moment);
  
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

  return (
    <div className="home-page">
      <div className="sidebar">
        <SidebarComponent />
      </div>
      <div className="home-content">
        <div className="choose-date">
          <h1>{t("chooseDate")}</h1> {/* Use translation for title */}
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
  );
};

export default Home;
