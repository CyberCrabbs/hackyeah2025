import Layout from "layout/Layout";
import { Facebook, Instagram, Settings } from "lucide-react";
const OrganizationPage = () => {
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
                src="https://fundacjanadzieja.com.pl/images/wyswig_images/image/Grafika%20Formularz%20zg%C5%82osze%C5%84%202.jpg"
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">
                Fundacja „Nadzieja” Osób Poszkodowanych w Wypadkach Drogowych
              </h1>
              <p className="text-gray-700">Organizacja</p>
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
            <h2 className="font-bold mb-2">Organizowane wydarzenia</h2>
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
            <h3 className="font-semibold mt-4 mb-2">Przeszłe</h3>
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
            <h2 className="font-bold mb-2">Informacje o Organizacji</h2>
            <p className="text-gray-700 mb-4">
              Celem Fundacji jest działanie na rzecz osób poszkodowanych w
              wypadkach drogowych i ich rodzin w zakresie wspierania leczenia w
              tym również sanatoryjnego, regeneracji sił i wypoczynku oraz
              organizowania pomocy prawnej psychologicznej i rzeczowej. W tym
              prowadzi działalność pożytku publicznego w zakresie nieodpłatnej
              pomocy społecznej. Tworzenia ośrodków rehabilitacyjnych,
              sanatoryjnych i wypoczynkowych oraz punktów pomocy prawnej i
              psychologicznej z pełnieniem zarządu nad tymi ośrodkami.
            </p>
          </div>

          {/* Conversations */}
          <div className="bg-white p-4 rounded shadow md:col-span-1">
            <h3 className="font-semibold mt-4 mb-2">Twoi Wolontariusze</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <span>Kasia Ktośtam | 20.09.2025 - teraz</span>
                <button className="px-4 py-2 bg-[#2968AB] text-white rounded-lg hover:bg-blue-700 w-full">
                  Zatwierdź udział w wydarzeniu
                </button>
              </label>
              <label className="flex items-center space-x-2">
                <span>Asia Jakaśtam | 13.03.2024 - teraz</span>
                <button className="px-4 py-2 bg-[#2968AB] text-white rounded-lg hover:bg-blue-700  w-full">
                  Zatwierdź udział w wydarzeniu
                </button>
              </label>
               <label className="flex items-center space-x-2">
                <span>Jola Lojalajna | 13.03.2024 - 13.03.2025</span>
                <button className="px-12 py-2 bg-gray-500 text-white rounded-lg w-full">
                  Zatwierdzono
                </button>
              </label>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrganizationPage;
