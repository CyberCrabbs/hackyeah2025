import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const defaultPosition = [50.0647, 19.945];

const initialMarks = [
  {
    guid: "1",
    title: "Marker One",
    description: "Please create desc",
    latitude: 50.06319412697496,
    longitude: 19.941270022574482,
  },
  {
    guid: "2",
    title: "Marker Two",
    description: "Please create desc",
    latitude: 50.06685405204043,
    longitude: 19.91297527098808,
  },
  {
    guid: "3",
    title: "Marker Three",
    description: "Please create desc",
    latitude: 50.05498895426328,
    longitude: 19.966595348287616,
  },
  {
    guid: "4",
    title: "Marker Four",
    description: "Please create desc",
    latitude: 50.03209099253454,
    longitude: 19.948549002645453,
  },
];

const STORAGE_KEY = "marks";

const MapComponent = () => {
  const [marks, setMarks] = useState(() => {
    try {
      if (typeof window === "undefined") return initialMarks;
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : initialMarks;
    } catch (e) {
      console.error("Failed to read marks from localStorage:", e);
      return initialMarks;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(marks));
    } catch (e) {
      console.error("Failed to save marks to localStorage:", e);
    }
  }, [marks]);

  const [newMarker, setNewMarker] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "" });

  const MapClickHandler = () => {
    useMapEvents({
      contextmenu(e) {
        setNewMarker(e.latlng);
      },
    });
    return null;
  };
  const handleCancel = () => {
    setNewMarker(null);
    setFormData({ title: "", description: "" });
  };
  const handleSubmit = () => {
    if (!newMarker) return;

    const guid = Date.now().toString();

    setMarks((prev) => [
      ...prev,
      {
        guid,
        title: formData.title || "Untitled",
        description: formData.description || "",
        latitude: newMarker.lat,
        longitude: newMarker.lng,
      },
    ]);

    setNewMarker(null);
    setFormData({ title: "", description: "" });
  };

const removeMarker = (guid) => {
  setMarks((prev) => prev.filter((m) => m.guid !== guid));
};
  return (
    <div style={{ position: "relative", height: "70vh" }}>
      <MapContainer
        center={defaultPosition}
        zoom={13}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler />

        {marks.map((mark) => (
          <Marker
            key={mark.guid}
            position={[mark.latitude, mark.longitude]}
            icon={markerIcon}
          >
            <Popup>
              <strong>{mark.title}</strong>
              <br />
              {mark.description}
              <br />
              <button onClick={() => removeMarker(mark.guid)}>Remove</button>
            </Popup>
          </Marker>
        ))}

        {newMarker && (
          <>
            <Marker position={[newMarker.lat, newMarker.lng]} icon={markerIcon}>
              <Popup>
                <strong>New Marker</strong>
                <br />
                No description yet
              </Popup>
            </Marker>

            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                background: "white",
                padding: "10px",
                borderRadius: "4px",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
                zIndex: 1000,
              }}
            >
              <input
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <br />
              <input
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <br />
              <button onClick={handleSubmit} style={{marginRight: "10px"}}>Submit</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
