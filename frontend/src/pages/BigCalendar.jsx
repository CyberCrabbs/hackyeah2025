import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentView, setCurrentView] = useState("month"); // Add view state management
  const [currentDate, setCurrentDate] = useState(new Date()); // Add date state management
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
        start: new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), 10, 0),
        end: new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), 10 + durationHours, 0),
        allDay: false,
        latitude: event.latitude,
        longitude: event.longitude,
        guid: event.guid || `event-${event.id}`,
        color: colors[index % colors.length]
      };
    });
  };

  const [eventsData, setEventsData] = useState(convertEventsToCalendarFormat(events));

  useEffect(() => {
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
          setEventsData([...convertEventsToCalendarFormat(events), ...formattedEvents]);
        }
      } catch (err) {
        console.log("API not available, using events.js data only");
      }
    };

    fetchEvents();
  }, []);

  const handleSelect = ({ start, end }) => {
    console.log(start, end);
    navigate(`/create-event/${start}/${end}`);
  };

  // Simplified event styling - less complex to avoid interference
  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = event.color || '#3174ad';
    return {
      style: {
        backgroundColor: backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: 'none',
        fontSize: '12px'
      }
    };
  };

  // Handle view changes
  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  // Handle date navigation
  const handleNavigate = (date) => {
    setCurrentDate(date);
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Kalendarz Wydarzeń</h2>
          <p className="text-gray-600">Przeglądaj i zarządzaj wydarzeniami Młodego Krakowa</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <Calendar
            views={["month", "week", "work_week", "day", "agenda"]}
            selectable
            localizer={localizer}
            date={currentDate}
            view={currentView}
            events={eventsData}
            style={{ height: "70vh" }}
            eventPropGetter={eventStyleGetter}
            onView={handleViewChange}
            onNavigate={handleNavigate}
            onSelectEvent={(event) => {
              navigate(`/event/${event.id || event.guid}`);
            }}
            onSelectSlot={handleSelect}
            popup={true}
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
      </div>
    </Layout>
  );
}
