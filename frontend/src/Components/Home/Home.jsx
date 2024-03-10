import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/de";
import "./Home.css";
import "./HomeCalendar.scss";
import SidebarComponent from "./SidebarComponent";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    async function fetchBookings(userId) {
      const response = await fetch(`/bookings/user/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const bookings = await response.json();
      return bookings;
    }

    async function populateCalendarEvents(userId) {
      try {
        const bookings = await fetchBookings(userId);
        const calendarEvents = bookings.map((booking) => ({
          id: booking.id,
          title: `${t('desk')} ${booking.desk.id}`,
          start: new Date(booking.day + "T" + booking.begin),
          end: new Date(booking.day + "T" + booking.end),
        }));
        setEvents(calendarEvents);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }

    populateCalendarEvents(userId);
  }, [t]);

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
            views={["month", "agenda"]}
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
