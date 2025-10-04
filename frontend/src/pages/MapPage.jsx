import { useState, useEffect } from "react";
import Layout from "layout/Layout";
import MapComponent from "../components/MapComponent";

const MapPage = () => {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    fetch(" http://localhost:5079/api/v1/event/map/get")
      .then((res) => res.json())
      .then((data) => {
        const mappedData = data.map((e) => ({
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
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <Layout>
      <MapComponent marks={marks} />
    </Layout>
  );
};

export default MapPage;
