import React, { useState, useEffect } from "react";
import Layout from "layout/Layout";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";


moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function BigCalendar() {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // <-- Nowy state
  const navigate = useNavigate();

  // Mock events data - initialized immediately
  const mockEvents = [
    {
      title: "Festiwal Równości 2025",
      description: "Największe wydarzenie równościowe w Krakowie. Organizujemy warsztaty, prezentacje i koncerty.",
      start: new Date(2025, 9, 15, 10, 0), // October 15, 2025, 10:00 AM
      end: new Date(2025, 9, 15, 18, 0), // October 15, 2025, 6:00 PM
      allDay: false,
      latitude: 50.0647,
      longitude: 19.9450,
      guid: "mock-guid-1",
      color: "#3174ad"
    },
    {
      title: "Garden of Kindness - Warsztaty",
      description: "Warsztaty edukacyjne dotyczące ekologii i zrównoważonego rozwoju dla młodzieży.",
      start: new Date(2025, 9, 8, 14, 0), // October 8, 2025, 2:00 PM
      end: new Date(2025, 9, 8, 17, 0), // October 8, 2025, 5:00 PM
      allDay: false,
      latitude: 50.0614,
      longitude: 19.9366,
      guid: "mock-guid-2",
      color: "#28a745"
    },
    {
      title: "Akademia Samorządności",
      description: "Szkolenie z zakresu samorządności studentckiej i organizacji społecznych.",
      start: new Date(2025, 9, 12, 9, 0), // October 12, 2025, 9:00 AM
      end: new Date(2025, 9, 12, 16, 0), // October 12, 2025, 4:00 PM
      allDay: false,
      latitude: 50.0755,
      longitude: 19.9198,
      guid: "mock-guid-3",
      color: "#fd7e14"
    },
    {
      title: "Spotkanie Koordynatorów",
      description: "Miesięczne spotkanie wszystkich koordynatorów projektów Młodego Krakowa.",
      start: new Date(2025, 9, 7, 18, 0), // October 7, 2025, 6:00 PM
      end: new Date(2025, 9, 7, 20, 0), // October 7, 2025, 8:00 PM
      allDay: false,
      latitude: 50.0647,
      longitude: 19.9450,
      guid: "mock-guid-4",
      color: "#6f42c1"
    },
    {
      title: "Wolontariat w Schronisku",
      description: "Akcja wolontariacka w lokalnym schronisku dla zwierząt.",
      start: new Date(2025, 9, 10, 8, 0), // October 10, 2025, 8:00 AM
      end: new Date(2025, 9, 10, 14, 0), // October 10, 2025, 2:00 PM
      allDay: false,
      latitude: 50.0500,
      longitude: 19.9500,
      guid: "mock-guid-5",
      color: "#dc3545"
    },
    {
      title: "Prezentacja Projektów",
      description: "Finalna prezentacja projektów realizowanych przez młodzież w ramach programu.",
      start: new Date(2025, 9, 20, 11, 0), // October 20, 2025, 11:00 AM
      end: new Date(2025, 9, 20, 15, 0), // October 20, 2025, 3:00 PM
      allDay: false,
      latitude: 50.0647,
      longitude: 19.9450,
      guid: "mock-guid-6",
      color: "#17a2b8"
    },
    {
      title: "Dzień Otwarty Młody Kraków",
      description: "Całodniowe wydarzenie promujące działalność organizacji i nabór nowych wolontariuszy.",
      start: new Date(2025, 9, 25, 10, 0), // October 25, 2025, 10:00 AM
      end: new Date(2025, 9, 25, 18, 0), // October 25, 2025, 6:00 PM
      allDay: false,
      latitude: 50.0647,
      longitude: 19.9450,
      guid: "mock-guid-7",
      color: "#ffc107"
    },
    {
      title: "Warsztaty Fotograficzne",
      description: "Nauka podstaw fotografii reportażowej i dokumentacyjnej dla młodych aktywistów.",
      start: new Date(2025, 9, 14, 16, 0), // October 14, 2025, 4:00 PM
      end: new Date(2025, 9, 14, 19, 0), // October 14, 2025, 7:00 PM
      allDay: false,
      latitude: 50.0600,
      longitude: 19.9400,
      guid: "mock-guid-8",
      color: "#6c757d"
    },
    {
      title: "Sprzątanie Parku",
      description: "Akcja ekologiczna - sprzątanie i pielęgnacja lokalnego parku.",
      start: new Date(2025, 9, 6, 9, 0), // October 6, 2025, 9:00 AM
      end: new Date(2025, 9, 6, 13, 0), // October 6, 2025, 1:00 PM
      allDay: false,
      latitude: 50.0700,
      longitude: 19.9300,
      guid: "mock-guid-9",
      color: "#20c997"
    },
    {
      title: "Koncert Charytatywny",
      description: "Koncert lokalnych zespołów na rzecz wsparcia młodzieży z domów dziecka.",
      start: new Date(2025, 9, 18, 19, 0), // October 18, 2025, 7:00 PM
      end: new Date(2025, 9, 18, 23, 0), // October 18, 2025, 11:00 PM
      allDay: false,
      latitude: 50.0647,
      longitude: 19.9450,
      guid: "mock-guid-10",
      color: "#e83e8c"
    }
  ];

  const [eventsData, setEventsData] = useState(mockEvents); // Initialize with mock data

  useEffect(() => {
    // Optionally try to fetch from API and merge with mock data
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
          // Merge API events with mock events
          setEventsData([...mockEvents, ...formattedEvents]);
        }
      } catch (err) {
        console.log("API not available, using mock data only");
        // Keep using mock data if API fails
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
            // Navigate to event page using the event's guid
            navigate(`/event/${event.guid}`);
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
