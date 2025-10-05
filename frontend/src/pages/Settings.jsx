import Layout from "layout/Layout";
import { 
  User, Bell, Shield, Globe, Palette, Database, 
  Activity, TrendingUp, Users, Calendar, Award, 
  Clock, Mail, Phone, MapPin, Camera, Edit3, 
  Save, RotateCcw, Eye, EyeOff 
} from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: true
  });
  const [showPassword, setShowPassword] = useState(false);

  // Mock user data
  const userData = {
    name: "Alec Thompson",
    email: "alec.thompson@example.com",
    phone: "+48 123 456 789",
    address: "ul. Przykładowa 10, 00-001 Warszawa",
    bio: "Passionate volunteer with 2+ years of experience in community service and social impact projects.",
    joinDate: "2023-03-15",
    avatar: "https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFufGVufDB8fDB8fHww"
  };

  // Mock analytics data
  const analytics = {
    totalHours: 126,
    eventsCompleted: 18,
    upcomingEvents: 4,
    rating: 4.8,
    badgesEarned: 12,
    connections: 45,
    monthlyHours: [8, 12, 15, 10, 20, 18],
    recentActivity: [
      { type: "event", name: "Festiwal Równości", date: "2025-10-01", hours: 8 },
      { type: "training", name: "Warsztat fotograficzny", date: "2025-09-28", hours: 3 },
      { type: "meeting", name: "Spotkanie koordynatorów", date: "2025-09-25", hours: 2 },
      { type: "event", name: "Sprzątanie parku", date: "2025-09-20", hours: 4 }
    ]
  };

  const tabs = [
    { id: "profile", label: "Profil", icon: User },
    { id: "notifications", label: "Powiadomienia", icon: Bell },
    { id: "privacy", label: "Prywatność", icon: Shield },
    { id: "analytics", label: "Statystyki", icon: Activity }
  ];

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img 
              src={userData.avatar} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg"
            />
            <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
            <p className="text-gray-600">{userData.email}</p>
            <p className="text-sm text-gray-500 mt-1">Dołączył {userData.joinDate}</p>
          </div>
          <button className="bg-white text-gray-700 px-4 py-2 rounded-xl shadow hover:shadow-md transition-all flex items-center gap-2">
            <Edit3 className="w-4 h-4" />
            Edytuj Profil
          </button>
        </div>
      </div>

      {/* Profile Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-500" />
            Informacje Osobiste
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Imię i Nazwisko</label>
              <input 
                type="text" 
                defaultValue={userData.name}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                defaultValue={userData.email}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
              <input 
                type="tel" 
                defaultValue={userData.phone}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-green-500" />
            Lokalizacja
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
              <textarea 
                defaultValue={userData.address}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">O mnie</label>
              <textarea 
                defaultValue={userData.bio}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-2">
          <Save className="w-4 h-4" />
          Zapisz Zmiany
        </button>
        <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          Anuluj
        </button>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2 text-yellow-500" />
          Ustawienia Powiadomień
        </h3>
        
        <div className="space-y-4">
          {[
            { key: "email", label: "Powiadomienia Email", desc: "Otrzymuj powiadomienia o nowych wydarzeniach przez email" },
            { key: "push", label: "Powiadomienia Push", desc: "Otrzymuj powiadomienia push w przeglądarce" },
            { key: "sms", label: "Powiadomienia SMS", desc: "Otrzymuj ważne powiadomienia przez SMS" },
            { key: "marketing", label: "Newsletter", desc: "Otrzymuj newsletter z nowościami i ofertami" }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h4 className="font-medium text-gray-800">{item.label}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
              <button
                onClick={() => handleNotificationChange(item.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications[item.key] ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-red-500" />
          Bezpieczeństwo Konta
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Obecne Hasło</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                placeholder="••••••••"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nowe Hasło</label>
            <input 
              type="password"
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Potwierdź Nowe Hasło</label>
            <input 
              type="password"
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Prywatność Profilu</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-800">Publiczny Profil</h4>
              <p className="text-sm text-gray-600">Pozwól innym zobaczyć Twój profil</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-800">Pokaż Statystyki</h4>
              <p className="text-sm text-gray-600">Wyświetlaj swoje osiągnięcia publicznie</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Łączne Godziny</p>
              <p className="text-3xl font-bold">{analytics.totalHours}</p>
            </div>
            <Clock className="w-10 h-10 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Wydarzenia</p>
              <p className="text-3xl font-bold">{analytics.eventsCompleted}</p>
            </div>
            <Calendar className="w-10 h-10 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Ocena</p>
              <p className="text-3xl font-bold">{analytics.rating}</p>
            </div>
            <Award className="w-10 h-10 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Połączenia</p>
              <p className="text-3xl font-bold">{analytics.connections}</p>
            </div>
            <Users className="w-10 h-10 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-indigo-500" />
          Ostatnia Aktywność
        </h3>
        
        <div className="space-y-4">
          {analytics.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  activity.type === 'event' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'training' ? 'bg-green-100 text-green-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {activity.type === 'event' && <Calendar className="w-4 h-4" />}
                  {activity.type === 'training' && <Award className="w-4 h-4" />}
                  {activity.type === 'meeting' && <Users className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{activity.name}</h4>
                  <p className="text-sm text-gray-600">{activity.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">{activity.hours}h</p>
                <p className="text-xs text-gray-500">czas</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
          Miesięczny Trend Godzin
        </h3>
        
        <div className="flex items-end space-x-4 h-40">
          {analytics.monthlyHours.map((hours, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg w-full transition-all hover:from-blue-600 hover:to-blue-500"
                style={{ height: `${(hours / Math.max(...analytics.monthlyHours)) * 100}%` }}
              ></div>
              <p className="text-xs text-gray-600 mt-2">
                {['Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź'][index]}
              </p>
              <p className="text-sm font-semibold text-gray-800">{hours}h</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile": return renderProfileTab();
      case "notifications": return renderNotificationsTab();
      case "privacy": return renderPrivacyTab();
      case "analytics": return renderAnalyticsTab();
      default: return renderProfileTab();
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-bold text-gray-800">Ustawienia</h1>
            <p className="text-gray-600 mt-1">Zarządzaj swoim kontem i preferencjami</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64">
              <div className="bg-white rounded-2xl shadow-sm p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all ${
                          activeTab === tab.id
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;