import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
// import "./HomeCalendar.scss";
const localizer = momentLocalizer(moment);

const HomeCalendar = (props) => (
  <div>
    <Calendar
      localizer={localizer}
      events={""}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
);
export default HomeCalendar;
