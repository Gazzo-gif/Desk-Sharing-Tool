import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./HomeCalendar.scss";
const localizer = momentLocalizer(moment);

const HomeCalendar = (props) => (
  <div className="home-content">
    <div className="choose-date">
      <h1>Choose a date for a desk</h1>
    </div>
    <hr className="gradient"></hr>
    <div>
      <Calendar
        localizer={localizer}
        events={""}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  </div>
);
export default HomeCalendar;
