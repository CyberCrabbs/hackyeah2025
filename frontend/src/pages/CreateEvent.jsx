import Layout from "layout/Layout";
import React, {useState} from "react";

const CreateEvent = () => {
      const [formData, setFormData] = useState({
    name: "Hackathon 2025",
    description: "Big coding event.",
    start: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0,16), // tomorrow
    end: new Date(Date.now() + 2*24*60*60*1000).toISOString().slice(0,16), // day after tomorrow
    longitude: 19.9450,
    latitude: 50.0647,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5079/api/post/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          start: new Date(formData.start).toISOString(),
          end: new Date(formData.end).toISOString(),
          longitude: parseFloat(formData.longitude),
          latitude: parseFloat(formData.latitude),
        }),
      });

      if (!res.ok) {
        throw new Error(`Błąd: ${res.status}`);
      }

      const data = await res.json();
      setMessage("Wydarzenie utworzone pomyślnie!");
      console.log("Response:", data);
    } catch (error) {
      setMessage(`Nie udało się utworzyć wydarzenia: ${error.message}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      

      <h3 className="text-lg font-semibold mb-2">Nowe wydarzenie</h3>
      <form id="createEventForm" className=" m-auto " handleSubmit={handleSubmit} >
        <div>
          <label class="block mb-1 font-medium">Nazwa wydarzenia</label>
          <input
            type="text"
            name="name"
            class="w-full border border-gray-300 rounded px-3 py-2"
            required
            />
        </div>
        <div>
          <label class="block mb-1 font-medium">Opis</label>
          <textarea
            name="description"
            class="w-full border border-gray-300 rounded px-3 py-2"
            rows="2"
            required
            ></textarea>
        </div>
        <div>
          <label class="block mb-1 font-medium">Data rozpoczęcia</label>
          <input
            type="datetime-local"
            name="start"
            class="w-full border border-gray-300 rounded px-3 py-2"
            required
            />
        </div>
        <div>
          <label class="block mb-1 font-medium">Data zakończenia</label>
          <input
            type="datetime-local"
            name="end"
            class="w-full border border-gray-300 rounded px-3 py-2"
            required
            />
        </div>
        <div>
          <label class="block mb-1 font-medium">
            Długość geograficzna (Longitude)
          </label>
          <input
     
     name="longitude"
     class="w-full border border-gray-300 rounded px-3 py-2"
     required
     />
        </div>
        <div>
          <label class="block mb-1 font-medium">
            Szerokość geograficzna (Latitude)
          </label>
          <input
            
            name="latitude"
            class="w-full border border-gray-300 rounded px-3 py-2"
            required
            />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
            Dodaj
          </button>
          <a
            href="/events"
            className="ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
            Anuluj
          </a>
        </div>
      </form>
     
            
    </Layout>
  );
};

export default CreateEvent;
