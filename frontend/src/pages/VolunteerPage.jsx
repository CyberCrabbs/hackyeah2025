import Layout from "layout/Layout";
import { Facebook, Instagram, Settings } from "lucide-react";
const VolunteerPage = () => {
  const users = [
    {
      name: "Młody Kraków | Organizacja",
      avatar:
        "https://mlodziez.krakow.pl/wp-content/themes/simple-bootstrap/images/mk20.svg",
    },
    {
      name: "Joe | Koordynator",
      avatar:
        "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFufGVufDB8fDB8fHww",
    },
    {
      name: "Alice | Koordynator",
      avatar:
        "https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tYW58ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Bob | Koordynator",
      avatar:
        "https://images.unsplash.com/photo-1615109398623-88346a601842?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fHww",
    },
  ];
  return (
    <Layout>
      <div className="max-h-screen ">
        {/* Header */}
        <div className="w-full h-64 bg-gradient-to-r from-[#2968AB] via-[#66A140] to-[#9B174A] flex items-end p-6  rounded-lg">
          <div className="bg-white bg-opacity-70 p-4 rounded-lg flex items-center w-full">
            <div class="w-20 h-20 rounded-full overflow-hidden mr-4">
              <img
                src="https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFufGVufDB8fDB8fHww"
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Alec Thompson</h1>
              <p className="text-gray-700">Wolontariusz</p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-white px-4 py-2 rounded shadow flex justify-center items-center">
                {" "}
                <Facebook className="w-6 h-6 text-gray-700" />{" "}
              </button>
              <button className="bg-white px-4 py-2 rounded shadow flex justify-center items-center">
                <Instagram className="w-6 h-6 text-gray-700" />
              </button>
              <button className="bg-white px-4 py-2 rounded shadow flex justify-center items-center">
                <Settings className="w-6 h-6 text-gray-700" /> Ustawienia
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Platform Settings */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-2">
              Wydarzenia w których wzięto udział
            </h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <span>FESTIWAL RÓWNOŚCI | 20.09.2025 - 21.09.2025 </span>
              </label>
              <label className="flex items-center space-x-2">
                <span>
                  „GARDEN OF KINDNESS” – Wymiany Młodzieży programu Erasmus+ – |
                  15.08.2025 - 21.08.2025{" "}
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <span>
                  XX Edycja Krakowskiej Akademii Samorządności | 20.09.2024 -
                  21.09.2024{" "}
                </span>
              </label>
            </div>
            <h3 className="font-semibold mt-4 mb-2">Zaaplikowano</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <span>
                  XXI Edycja Krakowskiej Akademii Samorządności | 20.09.2025 -
                  21.09.2025
                </span>
              </label>
            </div>
          </div>

          {/* Profile Information */}
          <div className="bg-white p-4 rounded shadow md:col-span-1">
            <h2 className="font-bold mb-2">Informacje o wolontariuszu</h2>
            <p className="text-gray-700 mb-4">
              Adres zamieszkania: ul. Przykładowa 10, 00-001 Warszawa
              <br />
              Dostępność: Poniedziałek–Piątek, 9:00–17:00
              <br />
              Obszar zainteresowań / rodzaj wolontariatu: Pomoc dzieciom,
              wsparcie w organizacji wydarzeń
              <br />
              Doświadczenie wolontariackie: 2 lata w lokalnym domu dziecka
              <br />
              Umiejętności / kwalifikacje: Komunikacja interpersonalna,
              organizacja wydarzeń, pierwsza pomoc
            </p>
          </div>

          {/* Conversations */}
          <div className="bg-white p-4 rounded shadow md:col-span-1">
            <h2 className="font-bold mb-2">Rozmowy</h2>
            <div className="space-y-4">
              {users.map(({ name, avatar }) => (
                <div key={name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div class="w-20 h-20 rounded-full overflow-hidden mr-4">
                      <img
                        src={avatar}
                        alt="Profile"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span>{name}</span>
                  </div>
                  <button className="text-[#9B174A] font-bold">Odpowiedz</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VolunteerPage;
