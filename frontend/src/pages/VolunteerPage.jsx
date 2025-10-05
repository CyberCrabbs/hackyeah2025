import IdentityCard from "components/IdentityCardComponent";
import Layout from "layout/Layout";
import { Facebook, Instagram, Settings, MapPin, Clock, Star, MessageCircle, Calendar, Award, User, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VolunteerPage = () => {
<<<<<<< HEAD
  const users = [1,2,3,4];
=======
  const navigate = useNavigate();

  const users = [
    {
      name: "Młody Kraków | Organizacja",
      avatar: "https://mlodziez.krakow.pl/wp-content/themes/simple-bootstrap/images/mk20.svg",
      lastMessage: "Dziękujemy za udział w ostatnim wydarzeniu!",
      time: "2 godz. temu",
      unread: 2
    },
    {
      name: "Joe | Koordynator",
      avatar: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFufGVufDB8fDB8fHww",
      lastMessage: "Czy możesz jutro o 18:00?",
      time: "1 dzień temu",
      unread: 0
    },
    {
      name: "Alice | Koordynator",
      avatar: "https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tYW58ZW58MHx8MHx8fDA%3D",
      lastMessage: "Świetna robota na warsztatach!",
      time: "3 dni temu",
      unread: 1
    },
    {
      name: "Bob | Koordynator",
      avatar: "https://images.unsplash.com/photo-1615109398623-88346a601842?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fHww",
      lastMessage: "Mamy nowe zadanie dla Ciebie",
      time: "1 tydzień temu",
      unread: 0
    },
  ];

  const completedEvents = [
    {
      id: 1,
      title: "Festiwal Równości",
      date: "20-21.09.2025",
      hours: 16,
      rating: 4.8,
      participants: 156,
      role: "Asystent organizacyjny"
    },
    {
      id: 2,
      title: "Garden of Kindness",
      date: "15-21.08.2025",
      hours: 48,
      rating: 4.9,
      participants: 24,
      role: "Tłumacz"
    },
    {
      id: 3,
      title: "Akademia Samorządności XX",
      date: "20-21.09.2024",
      hours: 12,
      rating: 4.7,
      participants: 89,
      role: "Mentor warsztatów"
    }
  ];

  const appliedEvents = [
    {
      id: 4,
      title: "Akademia Samorządności XXI",
      date: "20-21.09.2025",
      status: "Oczekuje",
      applicants: 45,
      spots: 20
    }
  ];

  const volunteerInfo = {
    address: "ul. Przykładowa 10, 00-001 Warszawa",
    availability: "Poniedziałek–Piątek, 9:00–17:00",
    interests: ["Pomoc dzieciom", "Organizacja wydarzeń", "Edukacja"],
    experience: "2 lata",
    skills: ["Komunikacja", "Pierwsza pomoc", "Języki obce", "Fotografia"],
    totalHours: 76,
    eventsCompleted: 12,
    rating: 4.8
  };

>>>>>>> 4d63050cacd336159d9135426a3918555041340a
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Modern Header */}
        <div className="relative w-full h-80 bg-gradient-to-br from-blue-600 via-green-500 to-pink-600 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative z-10 flex items-end h-full p-8">
            <div className="bg-white bg-opacity-95 backdrop-blur-sm p-6 rounded-2xl shadow-xl flex items-center w-full max-w-4xl hover:bg-opacity-100 transition-all duration-300">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFufGVufDB8fDB8fHww"
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
              </div>
              
              <div className="flex-1 ml-6">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-800">Alec Thompson</h1>
                  <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    {volunteerInfo.rating}
                  </div>
                </div>
                <p className="text-gray-600 flex items-center mb-2">
                  <User className="w-4 h-4 mr-2" />
                  Wolontariusz • {volunteerInfo.totalHours} godzin • {volunteerInfo.eventsCompleted} wydarzeń
                </p>
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  Kraków, Polska
                </div>
              </div>

              <div className="flex gap-3">
                <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105">
                  <Instagram className="w-5 h-5" />
                </button>
                <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  <span className="hidden sm:block">Ustawienia</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 -mt-20 relative z-20" style={{marginTop: "1rem"}}>
          
          {/* Completed Events */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <Award className="w-6 h-6 mr-3 text-green-500" />
                  Ukończone Wydarzenia
                </h2>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {completedEvents.length} ukończone
                </span>
              </div>
              
              <div className="space-y-4">
                {completedEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-100 hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                    onClick={() => navigate(`/event/${event.id}`)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-800">{event.title}</h3>
                      <div className="flex items-center text-yellow-600 text-sm">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        {event.rating}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {event.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {event.hours}h
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                        {event.role}
                      </span>
                      <span className="text-sm text-gray-500">
                        {event.participants} uczestników
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Applied Events */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-orange-500" />
                Aplikacje w toku
              </h3>
              
              {appliedEvents.map((event) => (
                <div 
                  key={event.id}
                  className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-100 hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => navigate(`/event/${event.id}`)}
                >
                  <h4 className="font-medium text-gray-800 mb-2">{event.title}</h4>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{event.date}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-orange-600 font-medium">{event.status}</span>
                      <span className="text-gray-500">{event.applicants}/{event.spots + event.applicants}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Volunteer Info */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <User className="w-6 h-6 mr-3 text-blue-500" />
                Profil Wolontariusza
              </h2>
              
              <div className="space-y-6">
                {/* Contact Info */}
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                    Kontakt
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {volunteerInfo.address}
                    </p>
                    <p className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {volunteerInfo.availability}
                    </p>
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Zainteresowania</h3>
                  <div className="flex flex-wrap gap-2">
                    {volunteerInfo.interests.map((interest, index) => (
                      <span 
                        key={index}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm hover:bg-green-200 transition-colors cursor-pointer"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Umiejętności</h3>
                  <div className="flex flex-wrap gap-2">
                    {volunteerInfo.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm hover:bg-purple-200 transition-colors cursor-pointer"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-2">Doświadczenie</h3>
                  <p className="text-gray-600 text-sm">{volunteerInfo.experience} w wolontariacie</p>
                </div>
              </div>
            </div>
          </div>

          {/* Conversations */}
<<<<<<< HEAD
          <div className="bg-white p-4 rounded shadow md:col-span-1">
            <h2 className="font-bold mb-2">Rozmowy</h2>
            <div className="space-y-4">
              {users.map(( id ) => (
                <IdentityCard id={id} details={false} message={true}></IdentityCard>
              ))}
=======
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <MessageCircle className="w-6 h-6 mr-3 text-purple-500" />
                Rozmowy
              </h2>
              
              <div className="space-y-4">
                {users.map((user, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-xl border border-gray-100 hover:bg-gray-50 hover:shadow-md transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-100 group-hover:ring-purple-200 transition-all">
                            <img
                              src={user.avatar}
                              alt="Profile"
                              className="object-cover w-full h-full"
                            />
                          </div>
                          {user.unread > 0 && (
                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                              {user.unread}
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800 text-sm">{user.name}</h3>
                          <p className="text-gray-500 text-xs truncate">{user.lastMessage}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">{user.time}</span>
                      <button 
                        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 shadow-md"
                        onClick={() => navigate('/chat')}
                      >
                        Odpowiedz
                      </button>
                    </div>
                  </div>
                ))}
              </div>
>>>>>>> 4d63050cacd336159d9135426a3918555041340a
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VolunteerPage;