import React, { useState, useEffect } from "react";
import Layout from "layout/Layout";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "../components/Modal";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function BigCalendar() {
  const [isOpen, setIsOpen] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // <-- Nowy state

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5079/api/v1/event/get");
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();

        const formattedEvents = data.map((e) => ({
          id: e.Id, // ważne: dodaj ID, żeby można było odwołać się do eventu
          title: e.Name,
          start: new Date(e.Start),
          end: new Date(e.End),
          allDay: false,
          description: e.Description || "", // dodatkowe dane
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
        style={{ height: "100vh", width: "90vw", }}
        onSelectEvent={(event) => {
          setSelectedEvent(event); // <-- zapisujemy event do state
          setIsOpen(true);
        }}
        onSelectSlot={handleSelect}
      />

      {/* Modal dostaje event jako props */}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} event={selectedEvent} />
    </Layout>
  );
}
