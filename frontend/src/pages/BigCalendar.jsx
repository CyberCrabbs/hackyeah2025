import React, { useState, useEffect } from "react";
import Layout from "layout/Layout";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import events from "../data/events";


moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function BigCalendar() {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // <-- Nowy state
  const navigate = useNavigate();

  // Convert events.js data to calendar format
  const convertEventsToCalendarFormat = (eventsData) => {
    const colors = ["#3174ad", "#28a745", "#fd7e14", "#6f42c1", "#dc3545", "#17a2b8", "#ffc107", "#6c757d", "#20c997", "#e83e8c"];
    
    return eventsData.map((event, index) => {
      const eventDate = new Date(event.date);
      const durationHours = parseInt(event.duration) || 2;
      
      return {
        id: event.id,
        title: event.name,
        description: event.description,
        start: new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), 10, 0), // Default 10:00 AM
        end: new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), 10 + durationHours, 0),
        allDay: false,
        latitude: event.latitude,
        longitude: event.longitude,
        guid: event.guid || `event-${event.id}`,
        color: colors[index % colors.length]
      };
    });
  };

  const [eventsData, setEventsData] = useState(convertEventsToCalendarFormat(events)); // Initialize with events.js data

  useEffect(() => {
    // Optionally try to fetch from API and merge with events.js data
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5079/api/v1/event/get");
        if (res.ok) {
          const data = await res.json();
          const formattedEvents = data.map((e) => ({
            title: e.Name,
            description: e.Description,
            start: new Date(e.Start),
            end: new Date(e.End),
            allDay: false,
            latitude: e.latitude,
            longitude: e.Longnitude,
            guid: e.Guid,
          }));
          // Merge API events with events.js data
          setEventsData([...convertEventsToCalendarFormat(events), ...formattedEvents]);
        }
      } catch (err) {
        console.log("API not available, using events.js data only");
        // Keep using events.js data if API fails
      }
    };

    fetchEvents();
  }, []);

  const handleSelect = ({ start, end }) => {
    console.log(start, end);
    navigate(`/create-event/${start}/${end}`);
  };

  // Custom event styling
  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = event.color || '#3174ad';
    const style = {
      backgroundColor: backgroundColor,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
      fontSize: '12px',
      fontWeight: 'bold'
    };
    return {
      style: style
    };
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Kalendarz Wydarzeń</h2>
          <p className="text-gray-600">Przeglądaj i zarządzaj wydarzeniami Młodego Krakowa</p>
        </div>
        <Calendar
          views={["day", "agenda", "work_week", "month"]}
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={eventsData}
          style={{ height: "70vh", backgroundColor: "white", borderRadius: "8px", padding: "10px" }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={(event) => {
            // Navigate to event page using the event's id or guid
            navigate(`/event/${event.id || event.guid}`);
          }}
          onSelectSlot={handleSelect}
          messages={{
            next: "Następny",
            previous: "Poprzedni",
            today: "Dzisiaj",
            month: "Miesiąc",
            week: "Tydzień",
            day: "Dzień",
            agenda: "Agenda",
            work_week: "Tydzień roboczy",
            date: "Data",
            time: "Czas",
            event: "Wydarzenie",
            noEventsInRange: "Brak wydarzeń w tym okresie",
            allDay: "Cały dzień"
          }}
        />
      </div>
    </Layout>
  );
}
