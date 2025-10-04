import React, { useState, useEffect } from "react";
import Layout from "layout/Layout";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function BigCalendar() {
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
	fetch("https://localhost:32769/api/v1/event/get")
	  .then(res => res.json())
	  .then(data => {
		setEventsData(
		  data.map(e => ({
			title: e.name,
			start: new Date(e.start),
			end: new Date(e.end),
			allDay: false
		  }))
		);
	  });
  }, []);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title)
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title
        }
      ]);
  };

  return (
    <Layout>
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh", width: "90vw" }}
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    </Layout>
  );
}