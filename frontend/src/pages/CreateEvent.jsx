import Layout from "layout/Layout";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const CreateEvent = () => {
  const { start: startParam, end: endParam } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start: startParam
      ? new Date(startParam).toISOString().slice(0, 16)
      : undefined,
    end: endParam
      ? new Date(endParam).toISOString().slice(0, 16)
      : undefined,

  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      <form
        id="createEventForm"
        className="m-auto"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label className="block mb-1 font-medium">Nazwa wydarzenia</label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-medium">Opis</label>
          <textarea
            name="description"
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows="2"
            required
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-medium">Data rozpoczęcia</label>
          <input
            type="datetime-local"
            name="start"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
            value={formData.start}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-medium">Data zakończenia</label>
          <input
            type="datetime-local"
            name="end"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
            value={formData.end}
            onChange={handleChange}
          />
        </div>

        

        {message && <p className="mb-3 text-red-600">{message}</p>}

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Dodawanie..." : "Dodaj"}
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
