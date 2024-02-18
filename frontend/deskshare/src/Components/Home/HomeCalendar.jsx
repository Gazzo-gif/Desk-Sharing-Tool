import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./HomeCalendar.scss";
import CalendarEvents from "./CalendarEvents";
import axios from "axios";

const localizer = momentLocalizer(moment);

const HomeCalendar = () => {
  const [events, setEvents] = useState(CalendarEvents); // Use your existing events here
  const navigate = useNavigate();
  const apiCall = () => {
    axios.get("http://localhost:8080").then(() => {
      console.log("done");
    });
    // axios
    //   .post("http://localhost:8080/home", {
    //     email: "email",
    //     password: "password",
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   });
  };
  const handleSelectSlot = ({ start }) => {
    const selectedDateEvent = {
      start,
      end: start,
      title: "Selected Date",
      allDay: true,
    };

    // Optionally, add the selected date as a temporary event for visual feedback
    setEvents([...events, selectedDateEvent]);

    // Use setTimeout to delay navigation, allowing the user to see the selected date
    setTimeout(() => {
      navigate("/floor", { state: { date: start } });
    }, 500); // Adjust delay as needed
  };

  return (
    <div className="home-content">
      <div className="choose-date">
        <h1>Choose a date for a desk</h1>
      </div>
      <div className="button-get" onClick={() => apiCall()}>
        Get data
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
        />
      </div>
    </div>
  );
};

export default HomeCalendar;
