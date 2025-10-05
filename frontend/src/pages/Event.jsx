import Layout from "layout/Layout";
import { useParams } from "react-router-dom";
import events from "../data/events";

export default function Event() {
  const { id } = useParams();
  
  // Try to find event by id (number) first, then by guid (string)
  let event = events.find((e) => e.id === Number(id));
  if (!event) {
    event = events.find((e) => e.guid === id);
  }

  if (!event) return <Layout><div>Event not found</div></Layout>;

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 m-4 rounded-lg text-white">
          <h1 className="text-3xl font-bold">{event.name}</h1>
          <p className="mt-2">{event.description}</p>
          <p className="mt-2">Date: {event.date}</p>
          <p className="mt-2">Duration: {event.duration}</p>
          <p className="mt-2">Organizer: {event.organizer}</p>
        </div>

       <div className="grid grid-cols-3 gap-4 m-4">
  <div className="bg-gray-100 rounded-lg h-48"></div>
  <div className="bg-gray-100 rounded-lg h-48"></div>
  <div className="bg-gray-100 rounded-lg h-96 row-span-2"></div>
  <div className="bg-gray-100 rounded-lg h-48"></div>
  <div className="bg-gray-100 rounded-lg h-48"></div>
</div>
      </div>
    </Layout>
  );
}
