import { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import MapComponent from "../components/MapComponent";
import eventsData from "../data/events";

const MapPage = () => {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7057/api/v1/event/map/get")
      .then(res => res.json())
      .then(data => {
        const mappedData = data.map(e => ({
          id: e.Id || e.id, // Include event ID
          title: e.Name,
          description: e.Description,
          start: new Date(e.Start),
          end: new Date(e.End),
          allDay: false,
          latitude: e.latitude,
          longitude: e.Longnitude,
          guid: e.Guid,
        }));
        setMarks(mappedData);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        // Fallback to events.js data if API fails
        const fallbackData = eventsData.map(event => ({
          id: event.id,
          title: event.name,
          description: event.description,
          latitude: event.latitude,
          longitude: event.longitude,
          guid: event.guid || `event-${event.id}`
        }));
        setMarks(fallbackData);
      });
  }, []);

  return (
    <Layout>
      <MapComponent marks={marks} />
    </Layout>
  );
};

export default MapPage;
