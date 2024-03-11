import React, { useState, useEffect } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./HomeCalendar.scss";
import "./Booking.css";
import SidebarComponent from "./SidebarComponent"
import { useTranslation } from "react-i18next";

const MyBookings = () => {
  const { t, i18n } = useTranslation();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    moment.locale(i18n.language);
    setEvents([...events]);
  }, [i18n.language]);

  const localizer = momentLocalizer(moment);

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

  return (
    <div className="desk-page">
      <div className="sidebar">
        <SidebarComponent />
      </div>
      <div className="container">
        <div className="choose-date">
          <h1>{t("myBookings")}</h1>
        </div>

        <div className="info-container">
          <div>
            <div className="calendar-container">
              <Calendar
                localizer={localizer}
                style={{ height: 480}}
                eventPropGetter={(event) => ({
                  style: {
                    backgroundColor: "#008444",
                  },
                })}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView="week"
                min={new Date(0, 0, 0, 6, 0, 0)} // 6 am
                max={new Date(0, 0, 0, 22, 0, 0)} // 10 pm
                popup={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
