import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Layout from "layout/Layout";
import L from "leaflet";

const MapPage = () => {
  const [events, setEvents] = useState([]);
  const defaultPosition = [50.0647, 19.945];

  useEffect(() => {
    fetch("https://localhost:7057/api/v1/event/map/get")
      .then(res => res.json())
      .then(data => {
        const mappedData = data.map(e => ({
          title: e.Name,
          description: e.Description,
          start: new Date(e.Start),
          end: new Date(e.End),
          allDay: false,
          latitude: e.latitude,
          longitude: e.Longnitude,
          guid: e.Guid
        }));
        setEvents(mappedData);
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <Layout>
      <div style={{ height: "500px", width: "800px" }}>
        <MapContainer
          center={defaultPosition}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {events.map(event => (
            <Marker
              key={event.guid}
              position={[event.latitude, event.longitude]}
              icon={L.icon({
                iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34]
              })}
            >
              <Popup>
                <strong>{event.title}</strong><br />
                {event.description}<br />
                {event.start.toLocaleString()} — {event.end.toLocaleString()}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </Layout>
  );
};

export default MapPage;
