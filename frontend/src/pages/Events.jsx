import Layout from "layout/Layout";

const EventPage = () => {

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Wydarzenia</h2>

          <a href="/create-event" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"  >

            Dodaj wydarzenie
          </a>

        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 border-b">Wydarzenie</th>
                <th className="text-left px-4 py-2 border-b">Lokalizacja</th>
                <th className="text-left px-4 py-2 border-b">
                  Lista Wolontariuszy
                </th>
                <th className="text-left px-4 py-2 border-b">Data Wydarzenia</th>
                <th className="text-left px-4 py-2 border-b">Akcje</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">Festyn Rodzinny</td>
                <td className="px-4 py-2 border-b">Park Miejski</td>
                <td className="px-4 py-2 border-b">Anna, Piotr, Kasia</td>
                <td className="px-4 py-2 border-b">12-10-2025</td>
                <td className="px-4 py-2 border-b text-blue-600 hover:underline cursor-pointer">
                  Edytuj
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">Maraton Charytatywny</td>
                <td className="px-4 py-2 border-b">Stadion Miejski</td>
                <td className="px-4 py-2 border-b">Jan, Ola, Michał</td>
                <td className="px-4 py-2 border-b">20-10-2025</td>
                <td className="px-4 py-2 border-b text-blue-600 hover:underline cursor-pointer">
                  Edytuj
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">Warsztaty Ekologiczne</td>
                <td className="px-4 py-2 border-b">Szkoła Podstawowa</td>
                <td className="px-4 py-2 border-b">Marta, Tomek, Lena</td>
                <td className="px-4 py-2 border-b">25-10-2025</td>
                <td className="px-4 py-2 border-b text-blue-600 hover:underline cursor-pointer">
                  Edytuj
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default EventPage;
