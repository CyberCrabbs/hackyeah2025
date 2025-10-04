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
  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5079/api/v1/event/get");
      console.log("Raw response:", res.body);

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Parsed JSON data:", data);

      // Mapujemy dane na format react-big-calendar
      const formattedEvents = data.map(e => ({
        title: e.Name,
        start: new Date(e.Start),
        end: new Date(e.End),
        allDay: false
      }));

      setEventsData(formattedEvents);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  fetchEvents();
  }, []);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title)
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title,
        },
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
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    </Layout>
  );
}
