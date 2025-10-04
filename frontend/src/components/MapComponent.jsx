import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";

const MapComponent = ({ marks }) => {
const defaultLatitude = marks[0]?.latitude ?? 50.0647
const defaultLongitude = marks[0]?.longitude ?? 19.945
  const defaultPosition = [defaultLatitude, defaultLongitude];
  return (
    <div style={{ height: "500px", width: "800px",  position: "relative" }}>
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
        {marks.map((mark) => (
          <Marker
            key={mark.guid}
            position={[mark.latitude, mark.longitude]}
            icon={L.icon({
              iconUrl:
                "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            })}
          >
            <Popup>
              <strong>{mark.title}</strong>
              <br />
              {mark.description}
              <br />
              {mark.start.toLocaleString()} — {mark.end.toLocaleString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
