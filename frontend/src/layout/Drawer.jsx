import { MessageCircle, MapPin, Calendar, Sheet } from "lucide-react";
// <Sheet />
export default function Sidebar() {
  return (
    <div className="fixed top-1/2 left-0 transform -translate-y-1/2 flex flex-col space-y-4 bg-white shadow-lg p-2 rounded-r-lg z-10">
      {/* Chat */}
      <a
        href="/chat"
        className="relative group flex items-center justify-center w-12 h-12 hover:bg-gray-100 rounded-lg"
      >
        <MessageCircle className="w-6 h-6 text-gray-700" />
        <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Wiadomości
        </span>
      </a>

      {/* Sheet */}
      <a
        href="/events"
        className="relative group flex items-center justify-center w-12 h-12 hover:bg-gray-100 rounded-lg"
      >
        <Sheet className="w-6 h-6 text-gray-700" />
        <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Wydarzenia
        </span>
      </a>

      {/* Map */}
      <a
        href="/map"
        className="relative group flex items-center justify-center w-12 h-12 hover:bg-gray-100 rounded-lg"
      >
        <MapPin className="w-6 h-6 text-gray-700" />
        <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Mapa
        </span>
      </a>

      {/* Calendar */}
      <a
        href="/calendar"
        className="relative group flex items-center justify-center w-12 h-12 hover:bg-gray-100 rounded-lg"
      >
        <Calendar className="w-6 h-6 text-gray-700" />
        <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Kalendarz
        </span>
      </a>
    </div>
  );
}
