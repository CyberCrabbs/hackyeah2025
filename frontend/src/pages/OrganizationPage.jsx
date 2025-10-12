import Layout from "../layout/Layout";
import { Facebook, Instagram, Settings, Users, Calendar, TrendingUp, Award, MapPin, Clock, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import IdentityCard from "../components/IdentityCardComponent";

const OrganizationPage = () => {
  const navigate = useNavigate();

  // Organization statistics
  const orgStats = {
    totalVolunteers: 127,
    activeEvents: 8,
    completedEvents: 45,
    totalHours: 2840
  };

  // Current events
  const currentEvents = [
    {
      id: 1,
      title: "FESTIWAL RÓWNOŚCI",
      date: "20.09.2025 - 21.09.2025",
      volunteers: 15,
      maxVolunteers: 25,
      status: "active"
    },
    {
      id: 2,
      title: "Garden of Kindness",
      date: "15.08.2025 - 21.08.2025",
      volunteers: 12,
      maxVolunteers: 15,
      status: "active"
    },
    {
      id: 3,
      title: "Akademia Samorządności",
      date: "20.09.2024 - 21.09.2024",
      volunteers: 20,
      maxVolunteers: 20,
      status: "completed"
    }
  ];

  // Volunteers needing approval
  const pendingVolunteers = [
    {
      id: 1,
      name: "Kasia Kowalska",
      joinDate: "20.09.2025",
      event: "Festiwal Równości",
      status: "pending"
    },
    {
      id: 2,
      name: "Asia Nowak",
      joinDate: "13.03.2024",
      event: "Garden of Kindness",
      status: "pending"
    },
    {
      id: 3,
      name: "Jola Wiśniewska",
      joinDate: "13.03.2024",
      event: "Akademia Samorządności",
      status: "approved"
    }
  ];

  // Team members (coordinators)
  const teamMembers = [1, 2, 3, 4]; // IDs from identities.js

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Modern Header */}
        {/* Separated Background Image - Left Side */}

        <div className="relative rounded-2xl w-full h-80 overflow-hidden" style={{ background: "linear-gradient(135deg, #efbcffff 0%, #84a1ffff 33%, #14ac00a4 65%, #ffee00ff 100%)" }}>
          <div className="absolute right-0 top-0 h-full"
            style={{
              width: "800px",
              backgroundImage: "url('https://i.imgur.com/hUkN5hD.png')",
              backgroundSize: "100% auto",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              maskImage: "linear-gradient(to right, transparent, black 50%)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 50%)",
            }}
          ></div>
          <div className="relative z-10 flex items-end h-full p-8">
            <div className="bg-white bg-opacity-95 backdrop-blur-sm p-6 rounded-2xl shadow-xl flex items-center w-full max-w-4xl hover:bg-opacity-100 transition-all duration-300">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                  <img
                    src="https://fundacjanadzieja.com.pl/images/wyswig_images/image/Grafika%20Formularz%20zg%C5%82osze%C5%84%202.jpg"
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
              </div>

              <div className="flex-1 ml-6">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-800">Fundacja „Nadzieja"</h1>
                  <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    <Award className="w-4 h-4 mr-1 fill-current" />
                    Zweryfikowana
                  </div>
                </div>
                <p className="text-gray-600 flex items-center mb-2">
                  <Users className="w-4 h-4 mr-2" />
                  Organizacja • {orgStats.totalVolunteers} wolontariuszy • {orgStats.completedEvents} wydarzeń
                </p>
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  Kraków, Polska
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
                  onClick={() => window.open('https://facebook.com', '_blank')}
                  title="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </button>
                <button
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
                  onClick={() => window.open('https://instagram.com', '_blank')}
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </button>
                <Link to="/settings" className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  <span className="hidden sm:block">Ustawienia</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="p-8 -mt-20 relative z-20" style={{ marginTop: "1rem" }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Wolontariusze</p>
                  <p className="text-2xl font-bold text-gray-900">{orgStats.totalVolunteers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 mr-4">
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Aktywne Wydarzenia</p>
                  <p className="text-2xl font-bold text-gray-900">{orgStats.activeEvents}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 mr-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ukończone Wydarzenia</p>
                  <p className="text-2xl font-bold text-gray-900">{orgStats.completedEvents}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-orange-100 mr-4">
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Godziny Wolontariatu</p>
                  <p className="text-2xl font-bold text-gray-900">{orgStats.totalHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Events Section */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-[#f2f5fc] via-[#f7f5ff] to-[#fff0f8]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <Calendar className="w-6 h-6 mr-3 text-blue-500" />
                    Wydarzenia
                  </h2>
                  <Link
                    to="/create-event"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                  >
                    Dodaj wydarzenie
                  </Link>
                </div>

                <div className="space-y-4">
                  {currentEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-100 hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                      onClick={() => navigate(`/event/${event.id}`)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-gray-800">{event.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${event.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                          {event.status === 'active' ? 'Aktywne' : 'Zakończone'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {event.date}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {event.volunteers}/{event.maxVolunteers} wolontariuszy
                        </span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(event.volunteers / event.maxVolunteers) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Organization Info */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-[#f2f5fc] via-[#f7f5ff] to-[#fff0f8]">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <Award className="w-6 h-6 mr-3 text-green-500" />
                  O Organizacji
                </h2>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl">
                    <h3 className="font-semibold text-gray-800 mb-3">Misja</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Celem Fundacji jest działanie na rzecz osób poszkodowanych w wypadkach drogowych i ich rodzin.
                      Wspieramy leczenie, regenerację sił oraz organizujemy pomoc prawną, psychologiczną i rzeczową.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl">
                    <h3 className="font-semibold text-gray-800 mb-3">Działalność</h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Award className="w-4 h-4 mr-2 text-blue-500" />
                        Ośrodki rehabilitacyjne
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Award className="w-4 h-4 mr-2 text-green-500" />
                        Pomoc psychologiczna
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Award className="w-4 h-4 mr-2 text-purple-500" />
                        Wsparcie prawne
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Volunteers & Team */}
            <div className="lg:col-span-4 space-y-6">
              {/* Pending Approvals */}
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-[#f2f5fc] via-[#f7f5ff] to-[#fff0f8]">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <Users className="w-6 h-6 mr-3 text-orange-500" />
                  Zatwierdzenia
                </h2>

                <div className="space-y-4">
                  {pendingVolunteers.map((volunteer) => (
                    <div key={volunteer.id} className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-100">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-800">{volunteer.name}</h4>
                          <p className="text-sm text-gray-600">{volunteer.event}</p>
                          <p className="text-xs text-gray-500">{volunteer.joinDate}</p>
                        </div>
                      </div>

                      {volunteer.status === 'pending' ? (
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200">
                          Zatwierdź udział
                        </button>
                      ) : (
                        <button className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg text-sm font-medium cursor-not-allowed">
                          Zatwierdzono
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Members */}
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-[#f2f5fc] via-[#f7f5ff] to-[#fff0f8]">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <MessageCircle className="w-6 h-6 mr-3 text-purple-500" />
                  Zespół
                </h2>

                <div className="space-y-3">
                  {teamMembers.map((id) => (
                    <IdentityCard key={id} id={id} details={false} message={true} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrganizationPage;