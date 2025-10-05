import { MessageCircle, MapPin, Calendar, Sheet } from "lucide-react";

export default function Sidebar({ isMobile = false, onItemClick }) {
  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  // Mobile layout
  if (isMobile) {
    return (
      <div className="flex flex-col space-y-2">
        <a
          href="/chat"
          onClick={handleItemClick}
          className="flex items-center w-full p-3 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <MessageCircle className="w-5 h-5 text-gray-700 mr-3" />
          <span className="text-gray-700 font-medium">Wiadomości</span>
        </a>

        <a
          href="/events"
          onClick={handleItemClick}
          className="flex items-center w-full p-3 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Sheet className="w-5 h-5 text-gray-700 mr-3" />
          <span className="text-gray-700 font-medium">Wydarzenia</span>
        </a>

        <a
          href="/map"
          onClick={handleItemClick}
          className="flex items-center w-full p-3 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <MapPin className="w-5 h-5 text-gray-700 mr-3" />
          <span className="text-gray-700 font-medium">Mapa</span>
        </a>

        <a
          href="/calendar"
          onClick={handleItemClick}
          className="flex items-center w-full p-3 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Calendar className="w-5 h-5 text-gray-700 mr-3" />
          <span className="text-gray-700 font-medium">Kalendarz</span>
        </a>
      </div>
    );
  }

  // Desktop layout (existing)
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
