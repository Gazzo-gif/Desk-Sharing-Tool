import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./HomeCalendar.scss";
import "./Example.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
// import CalendarEvents from "./CalendarEvents";
// import axios from "axios";
import CalendarEvents from "./CalendarEvents";
const localizer = momentLocalizer(moment);

const Example = () => {
  const eventList = [];
  const [init, setInit] = useState(2);
  const [events, setEvents] = useState([]); // Use your existing events here
  const [event, setEvent] = useState({
    start: "",
    end: "",
    title: "",
    id: init,
  }); // Use your existing events here
  let tempArray = events;
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

  return (
    <div className="desk-page">
      <div className="choose-date">
        <h1>Available Desks</h1>
      </div>
      <div className="info-container">
        <div className="desk-container">
          <div className="desk-component">
            <div>08 Dec</div>
            <div className="desk-description">
              <p className="item-id">04 item</p>
              <p className="item-name">Weekend list</p>
              <p className="item-taken">Sarah H</p>
            </div>
          </div>
          <div className="desk-component">
            <div>09 Dec</div>
            <div className="desk-description">
              <p className="item-id">05 item</p>
              <p className="item-name">Weekend list</p>
              <p className="item-taken">John T</p>
            </div>
          </div>
          <div className="desk-component">
            <div>09 Dec</div>
            <div className="desk-description">
              <p className="item-id">06 item</p>
              <p className="item-name">Weekend list</p>
              <p className="item-taken">Maggie</p>
            </div>
          </div>
          <div className="desk-component">
            <div>09 Dec</div>
            <div className="desk-description">
              <p className="item-id">07 item</p>
              <p className="item-name">Weekend list</p>
              <p className="item-taken">Robnie</p>
            </div>
          </div>
          <div className="desk-component">
            <div>10 Dec</div>
            <div className="desk-description">
              <p className="item-id">08 item</p>
              <p className="item-name">Weekend list</p>
              <p className="item-taken">Thomas</p>
            </div>
          </div>
          <div className="desk-component">
            <div>11 Dec</div>
            <div className="desk-description">
              <p className="item-id">09 item</p>
              <p className="item-name">Weekend list</p>
              <p className="item-taken">Robert T</p>
            </div>
          </div>
        </div>
        <div className="calendar-containe">
          <div className="calendar-container">
            <Calendar
              //   onSelectEvent={(data) => console.log(data)}
              localizer={localizer}
              events={tempArray}
              startAccessor="start"
              endAccessor="end"
              defaultView="day"
              style={{ height: 500 }}
              onSelectSlot={(data) => {
                // console.log(data?.start);
                gg(data);
              }}
              selectable={true}
              // onKeyPressEvent={(data) => console.log(data)}
            />
          </div>
          <button className="submit-btn" onClick={() => submit()}>
            [Add a title to event]
          </button>
        </div>
      </div>
    </div>
  );
};

export default Example;
