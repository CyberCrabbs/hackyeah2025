import React, { useState } from "react";
import Navbar from "./Navbar";
import Drawer from "./Drawer";
import { MessageCircle, X, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const [showChatPopup, setShowChatPopup] = useState(false);
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate('/chat');
    setShowChatPopup(false);
  };

  const toggleChatPopup = () => {
    setShowChatPopup(!showChatPopup);
  };

  return (
    <main className="relative w-full">
      <Navbar />
      <Drawer />
      <section style={{ top: "7rem", zIndex: 0 }} className="absolute left-24 overflow-hidden w-[90%]">
        {children}
      </section>

      {/* Chat Popup Container */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Expanded Chat Popup */}
        {showChatPopup && (
          <div className="mb-4 max-w-sm animate-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 relative">
              {/* Close button */}
              <button
                onClick={toggleChatPopup}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* AI Avatar */}
              <div className="flex items-start space-x-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 mb-3">
                    <p className="text-sm text-gray-800 leading-relaxed">
                      Cześć! 👋 Jestem asystentem AI Młodego Krakowa. 
                      <br />
                      <span className="font-medium text-blue-600">Potrzebujesz pomocy z wolontariatem?</span>
                      <br />
                      Mogę Ci pomóc znaleźć idealne wydarzenia lub odpowiedzieć na pytania!
                    </p>
                  </div>
                  
                  <button
                    onClick={handleChatClick}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Rozpocznij rozmowę
                  </button>
                </div>
              </div>

              {/* Speech bubble tail */}
              <div className="absolute bottom-0 right-8 transform translate-y-full">
                <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>
              </div>
            </div>
          </div>
        )}

        {/* Floating Chat Button (Always visible) */}
        <button
          onClick={toggleChatPopup}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white p-4 rounded-full shadow-2xl transition-all duration-200 hover:scale-110 group relative"
          title={showChatPopup ? "Zwiń chat" : "Otwórz chat z AI"}
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full animate-pulse"></div>
          
          {/* Hover tooltip */}
          {!showChatPopup && (
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Porozmawiaj z AI
              </div>
            </div>
          )}
        </button>
      </div>
    </main>
  );
};

export default Layout;
