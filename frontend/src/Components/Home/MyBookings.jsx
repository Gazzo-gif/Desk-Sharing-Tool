import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./HomeCalendar.scss";
import "./MyBookings.css";
import SidebarComponent from "./SidebarComponent";

const MyBookings = () => {
  const { t, i18n } = useTranslation();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [theEvent, setTheEvent] = useState(null);
  const userId = localStorage.getItem("userId");

  const localizer = momentLocalizer(moment);

  useEffect(() => {
    moment.locale(i18n.language);
    fetchBookings(userId);
      if (selectedEvent) {
        const updatedTitle = `${t('desk')} ${selectedEvent.desk.id}`;
        setSelectedEvent(prevEvent => ({ ...prevEvent, title: updatedTitle }));
      }
  }, [i18n.language]);

  const fetchBookings = async (userId) => {
    try {
      const response = await fetch(`/bookings/user/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const bookings = await response.json();
      const calendarEvents = bookings.map((booking) => ({
        id: booking.id,
        title: `${t('desk')} ${booking.desk.id}`,
        start: new Date(booking.day + "T" + booking.begin),
        end: new Date(booking.day + "T" + booking.end),
        desk: booking.desk
      }));
      setEvents(calendarEvents);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleEventSelect = async (event) => {
    if (event.id !== selectedEvent?.id) {
      setSelectedEvent(event);
  
      try {
        const response = await fetch(`/bookings/${event.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch booking details");
        }
  
        const bookingDetails = await response.json();
        setTheEvent(bookingDetails);
  
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    }
  };
  
  const handleEditEvent = () => {
    confirmAlert({
      title: "Edit Booking for " + selectedEvent.title,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            console.log("Edit event:", selectedEvent);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const deleteBooking = async () => {
    try {
      const response = await fetch(`/bookings/${theEvent.id}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete booking');
      }
  
      fetchBookings(userId);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };
  
  const handleDeleteEvent = () => {
    confirmAlert({
      title: 'Delete Booking for ' + selectedEvent.title,
      message:
        'For day ' +
        moment(selectedEvent.start).format('YYYY-MM-DD') +
        '\nFrom ' +
        moment(selectedEvent.start).format('HH:mm:ss') +
        ' to ' +
        moment(selectedEvent.end).format('HH:mm:ss'),
      buttons: [
        {
          label: 'Yes',
          onClick: deleteBooking // Call deleteBooking function when 'Yes' is clicked
        },
        {
          label: 'No'
        }
      ]
    });
  };
  
  const renderRoomInfo = (event) => {
    if (event && event.room) {
      return (
        <div>
          <p>{t("room")}: {event.room.id}</p>
          <p>{t("floor")}: {event.room.floor}</p>
          <p>{t("type")}: {event.room.type}</p>
        </div>
      );
    }
    return null;
  };
  
  const renderDeskInfo = (event) => {
    if (event && event.desk) {
      return <p>{t("equipment")}: {event.desk.equipment}</p>;
    }
    return null;
  };

  return (
    <div className="mb-container">
      <div>
        <SidebarComponent />
      </div>
      <div className="mb-content">
        <h1 className="mb-text">{t("myBookings")}</h1>
        <hr className="gradient" />
        
        <div className="mb-content-container">
          <div>
            <Calendar
              localizer={localizer}
              style={{ height: '100vh' }}
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
              onSelectEvent={handleEventSelect}
            />
          </div>
          <div className="mb-info-column">
            {selectedEvent && (
              <div>
                <h2>{selectedEvent.title}</h2>
                <div style={{ margin: "20px" }}>
                  <p>{t("day")}: {moment(selectedEvent.start).format("DD.MM.YYYY")}</p>
                  <p>{t("start")}: {moment(selectedEvent.start).format("HH:mm")}</p>
                  <p>{t("end")}: {moment(selectedEvent.end).format("HH:mm")}</p>
                  {renderRoomInfo(theEvent)}
                  {renderDeskInfo(theEvent)}

                  <div className="mb-buttons">
                    <button className="mb-submit-btn" onClick={handleEditEvent}>
                      {t("edit")}
                    </button>
                    <button className="mb-submit-btn" onClick={handleDeleteEvent}>
                      {t("delete")}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
