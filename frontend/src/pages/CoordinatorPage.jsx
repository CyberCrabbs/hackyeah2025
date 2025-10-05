import Layout from "layout/Layout";
import { Users, Calendar, FolderOpen, TrendingUp, Clock, CheckCircle, AlertCircle, Plus, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CoordinatorPage = () => {
  const navigate = useNavigate();
  // Mock data for dashboard stats
  const dashboardStats = {
    studentsInvolved: 127,
    currentProjects: 8,
    upcomingEvents: 5,
    completedProjects: 15
  };

  // Mock data for volunteer projects - mapped to events.js
  const projects = [
    {
      id: 4, // Maps to Festiwal Równości 2025 in events.js
      name: "FESTIWAL RÓWNOŚCI 2025",
      description: "Organizacja i wsparcie festiwalu równości",
      status: "in-progress",
      studentsAssigned: 15,
      maxStudents: 20,
      startDate: "2025-10-15",
      endDate: "2025-10-15",
      coordinator: "Anna Kowalska"
    },
    {
      id: 6, // Maps to Akademia Samorządności in events.js
      name: "Akademia Samorządności",
      description: "Szkolenie z zakresu samorządności studentckiej i organizacji społecznych",
      status: "open",
      studentsAssigned: 8,
      maxStudents: 25,
      startDate: "2025-10-12",
      endDate: "2025-10-12",
      coordinator: "Piotr Nowak"
    },
    {
      id: 5, // Maps to Garden of Kindness in events.js
      name: "Garden of Kindness - Warsztaty",
      description: "Warsztaty edukacyjne dotyczące ekologii i zrównoważonego rozwoju dla młodzieży",
      status: "finished",
      studentsAssigned: 12,
      maxStudents: 12,
      startDate: "2025-10-08",
      endDate: "2025-10-08",
      coordinator: "Maria Wiśniewska"
    },
    {
      id: 8, // Maps to Wolontariat w Schronisku in events.js
      name: "Wolontariat w Schronisku",
      description: "Akcja wolontariacka w lokalnym schronisku dla zwierząt",
      status: "open",
      studentsAssigned: 5,
      maxStudents: 30,
      startDate: "2025-10-10",
      endDate: "2025-10-10",
      coordinator: "Jan Kowalczyk"
    },
    {
      id: 11, // Maps to Warsztaty Fotograficzne in events.js
      name: "Warsztaty Fotograficzne",
      description: "Nauka podstaw fotografii reportażowej i dokumentacyjnej dla młodych aktywistów",
      status: "in-progress",
      studentsAssigned: 10,
      maxStudents: 15,
      startDate: "2025-10-14",
      endDate: "2025-10-14",
      coordinator: "Katarzyna Zielińska"
    }
  ];

  // Mock data for available students
  const availableStudents = [
    { id: 1, name: "Alec Thompson", experience: "2 lata", skills: "Komunikacja, Organizacja" },
    { id: 2, name: "Maria Kowalska", experience: "1 rok", skills: "Pierwsza pomoc, Tłumaczenia" },
    { id: 3, name: "Jakub Nowak", experience: "3 lata", skills: "Technologia, Grafika" },
    { id: 4, name: "Anna Wiśniewska", experience: "1.5 roku", skills: "Edukacja, Praca z dziećmi" },
    { id: 5, name: "Tomasz Kowalczyk", experience: "2.5 roku", skills: "Logistyka, Koordynacja" }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "open":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "finished":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <FolderOpen className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "finished":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "open":
        return "Otwarte";
      case "in-progress":
        return "W trakcie";
      case "finished":
        return "Zakończone";
      default:
        return "Nieznany";
    }
  };

  return (
    <Layout>
      <div className="max-h-screen">
        {/* Header */}
        <div className="w-full h-64 bg-gradient-to-r from-[#2968AB] via-[#66A140] to-[#9B174A] flex items-end p-6 rounded-lg">
          <div className="bg-white bg-opacity-70 p-4 rounded-lg flex items-center w-full">
            <div className="w-20 h-20 rounded-full overflow-hidden mr-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fHww"
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Marek Kowalski</h1>
              <p className="text-gray-700">Koordynator Wolontariatu</p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-white px-4 py-2 rounded shadow flex justify-center items-center hover:bg-gray-50 transition-colors">
                <Plus className="w-5 h-5 text-gray-700 mr-2" />
                Nowy Projekt
              </button>
              <button className="bg-white px-4 py-2 rounded shadow flex justify-center items-center hover:bg-gray-50 transition-colors">
                <UserPlus className="w-5 h-5 text-gray-700 mr-2" />
                Przypisz Wolontariusza
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Zaangażowani Studenci</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.studentsInvolved}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 mr-4">
                  <FolderOpen className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Aktywne Projekty</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.currentProjects}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 mr-4">
                  <Calendar className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nadchodzące Wydarzenia</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.upcomingEvents}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-red-100 mr-4">
                  <TrendingUp className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ukończone Projekty</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.completedProjects}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Projects List */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Projekty Wolontariackie</h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div 
                    key={project.id} 
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigate(`/event/${project.id}`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(project.status)}
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {getStatusText(project.status)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Koordynator:</span> {project.coordinator}
                      </div>
                      <div>
                        <span className="font-medium">Termin:</span> {project.startDate} - {project.endDate}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-sm">
                          <span className="font-medium">Wolontariusze:</span> 
                          <span className={project.studentsAssigned === project.maxStudents ? "text-red-600" : "text-green-600"}>
                            {" "}{project.studentsAssigned}/{project.maxStudents}
                          </span>
                        </div>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(project.studentsAssigned / project.maxStudents) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {project.status === "open" && (
                        <button 
                          className="bg-[#2968AB] text-white px-4 py-2 rounded-md text-sm hover:bg-[#1e4d78] transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle volunteer assignment logic here
                          }}
                        >
                          Przypisz Wolontariusza
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Students */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Dostępni Wolontariusze</h2>
              <div className="space-y-4">
                {availableStudents.map((student) => (
                  <div key={student.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{student.name}</h3>
                      <button className="text-[#66A140] hover:text-[#4a7030] font-medium text-sm">
                        Przypisz
                      </button>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div><span className="font-medium">Doświadczenie:</span> {student.experience}</div>
                      <div><span className="font-medium">Umiejętności:</span> {student.skills}</div>
                    </div>
                  </div>
                ))}
                
                <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors">
                  + Zobacz wszystkich wolontariuszy
                </button>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-3">Szybkie Akcje</h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-2 rounded hover:bg-gray-50 transition-colors text-sm">
                    📊 Generuj raport miesięczny
                  </button>
                  <button className="w-full text-left p-2 rounded hover:bg-gray-50 transition-colors text-sm">
                    📧 Wyślij przypomnienia
                  </button>
                  <button className="w-full text-left p-2 rounded hover:bg-gray-50 transition-colors text-sm">
                    📅 Zaplanuj spotkanie
                  </button>
                  <button className="w-full text-left p-2 rounded hover:bg-gray-50 transition-colors text-sm">
                    📋 Eksportuj dane
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoordinatorPage;