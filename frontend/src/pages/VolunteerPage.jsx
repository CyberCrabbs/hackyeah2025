import Layout from "layout/Layout";
import { Facebook, Instagram, Settings, Calendar, MapPin, Clock, Award, MessageCircle, CheckCircle, Star, Users } from "lucide-react";
import { useNavigate } from 'react-router-dom';
const VolunteerPage = () => {
  const navigate = useNavigate();
  const users = [
    {
      name: "Młody Kraków | Organizacja",
      avatar:
        "https://mlodziez.krakow.pl/wp-content/themes/simple-bootstrap/images/mk20.svg",
      lastMessage: "Dziękujemy za udział w projekcie!",
      time: "2 godz. temu",
      unread: true
    },
    {
      name: "Joe | Koordynator",
      avatar:
        "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFufGVufDB8fDB8fHww",
      lastMessage: "Spotkanie organizacyjne jutro o 10:00",
      time: "1 dzień temu",
      unread: false
    },
    {
      name: "Alice | Koordynator",
      avatar:
        "https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tYW58ZW58MHx8MHx8fDA%3D",
      lastMessage: "Świetna robota na festiwalu!",
      time: "3 dni temu",
      unread: false
    },
    {
      name: "Bob | Koordynator",
      avatar:
        "https://images.unsplash.com/photo-1615109398623-88346a601842?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fHww",
      lastMessage: "Nowe zadanie do wykonania",
      time: "1 tydzień temu",
      unread: true
    },
  ];

  const completedEvents = [
    {
      name: "FESTIWAL RÓWNOŚCI",
      date: "20.09.2025 - 21.09.2025",
      role: "Asystent organizacyjny",
      rating: 5,
      participants: 150
    },
    {
      name: "GARDEN OF KINDNESS – Erasmus+",
      date: "15.08.2025 - 21.08.2025",
      role: "Tłumacz",
      rating: 4,
      participants: 45
    },
    {
      name: "XX Krakowska Akademia Samorządności",
      date: "20.09.2024 - 21.09.2024",
      role: "Koordynator logistyki",
      rating: 5,
      participants: 80
    }
  ];

  const appliedEvents = [
    {
      name: "XXI Krakowska Akademia Samorządności",
      date: "20.09.2025 - 21.09.2025",
      status: "Oczekuje na akceptację",
      priority: "high"
    }
  ];

  const volunteerStats = {
    totalHours: 120,
    eventsCompleted: 3,
    newConnections: 42,
    rank: "Doświadczony"
  };
  return (
    <Layout>
      <div className="max-h-screen ">
        {/* Header */}
        <div className="w-full h-64 bg-gradient-to-r from-[#2968AB] via-[#66A140] to-[#9B174A] flex items-end p-6  rounded-lg">
          <div className="bg-white bg-opacity-70 p-4 rounded-lg flex items-center w-full">
                                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <img
                src="https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFufGVufDB8fDB8fHww"
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Alec Thompson</h1>
              <p className="text-gray-700">Wolontariusz</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">{volunteerStats.newConnections} znajomości</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">{volunteerStats.rank}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">{volunteerStats.totalHours}h</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-white px-4 py-2 rounded shadow flex justify-center items-center hover:bg-gray-50 transition-colors">
                <Facebook className="w-6 h-6 text-gray-700" />
              </button>
              <button className="bg-white px-4 py-2 rounded shadow flex justify-center items-center hover:bg-gray-50 transition-colors">
                <Instagram className="w-6 h-6 text-gray-700" />
              </button>
              <button className="bg-white px-4 py-2 rounded shadow flex justify-center items-center hover:bg-gray-50 transition-colors">
                <Settings className="w-6 h-6 text-gray-700 mr-2" />
                Ustawienia
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-blue-100 mr-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Przepracowane godziny</p>
                  <p className="text-lg font-bold text-gray-900">{volunteerStats.totalHours}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-green-100 mr-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Ukończone wydarzenia</p>
                  <p className="text-lg font-bold text-gray-900">{volunteerStats.eventsCompleted}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-yellow-100 mr-3">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Nowe znajomości</p>
                  <p className="text-lg font-bold text-gray-900">{volunteerStats.newConnections}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-purple-100 mr-3">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Status</p>
                  <p className="text-lg font-bold text-gray-900">{volunteerStats.rank}</p>
                </div>
              </div>
            </div>
          </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold">Informacje o wolontariuszu</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Adres zamieszkania</p>
                  <p className="text-gray-600 text-sm">ul. Przykładowa 10, 00-001 Warszawa</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Dostępność</p>
                  <p className="text-gray-600 text-sm">Poniedziałek–Piątek, 9:00–17:00</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Award className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Obszar zainteresowań</p>
                  <p className="text-gray-600 text-sm">Pomoc dzieciom, wsparcie w organizacji wydarzeń</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Doświadczenie</p>
                  <p className="text-gray-600 text-sm">2 lata w lokalnym domu dziecka</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Star className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Umiejętności</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Komunikacja
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Organizacja wydarzeń
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Pierwsza pomoc
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Conversations */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <MessageCircle className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-bold">Rozmowy</h2>
            </div>
            <div className="space-y-4">
              {users.map(({ name, avatar, lastMessage, time, unread }) => (
                <div key={name} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={avatar}
                        alt="Profile"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
                        {unread && (
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate mb-2">{lastMessage}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{time}</span>
                        <button 
                          className="text-[#9B174A] hover:text-[#6b0f32] font-medium text-sm transition-colors"
                          onClick={() => navigate('/chat')}
                        >
                          Odpowiedz
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors">
              + Zobacz wszystkie rozmowy
            </button>
          </div>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default VolunteerPage;
