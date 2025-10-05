import React, { useState } from "react";
import Navbar from "./Navbar";
import Drawer from "./Drawer";
import { MessageCircle, X, Bot, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate('/chat');
    setShowChatPopup(false);
  };

  const toggleChatPopup = () => {
    setShowChatPopup(!showChatPopup);
  };

  const toggleMobileDrawer = () => {
    setIsMobileDrawerOpen(!isMobileDrawerOpen);
  };

  const closeMobileDrawer = () => {
    setIsMobileDrawerOpen(false);
  };

  return (
    <main className="relative w-full">
      <Navbar onMobileMenuToggle={toggleMobileDrawer} />
      
      {/* Desktop Drawer - Hidden on mobile */}
      <div className="hidden md:block">
        <Drawer />
      </div>
      
      {/* Mobile Drawer Overlay */}
      {isMobileDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileDrawer}
        ></div>
      )}
      
      {/* Mobile Drawer */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-50 md:hidden ${
        isMobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            <button 
              onClick={closeMobileDrawer}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <Drawer isMobile={true} onItemClick={closeMobileDrawer} />
        </div>
      </div>
      
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={toggleMobileDrawer}
        className="fixed top-20 left-4 z-30 bg-white shadow-lg rounded-lg p-3 md:hidden hover:bg-gray-50 transition-colors"
        aria-label="Toggle mobile menu"
      >
        <Menu className="w-5 h-5 text-gray-700" />
      </button>
      
      {/* Main Content - Responsive margins */}
      <section 
        style={{ top: "7rem", zIndex: 0 }} 
        className="absolute overflow-hidden transition-all duration-300
                   left-4 w-[calc(100%-2rem)] 
                   md:left-24 md:w-[calc(100%-7rem)] 
                   lg:w-[90%]"
      >
        {children}
      </section>

      {/* Chat Popup Container */}
      <div className="fixed bottom-6 right-4 md:right-6 z-50">
        {/* Expanded Chat Popup */}
        {showChatPopup && (
          <div className="mb-4 max-w-xs md:max-w-sm animate-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 md:p-4 relative">
              {/* Close button */}
              <button
                onClick={toggleChatPopup}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* AI Avatar */}
              <div className="flex items-start space-x-2 md:space-x-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full flex-shrink-0">
                  <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-2 md:p-3 mb-3">
                    <p className="text-xs md:text-sm text-gray-800 leading-relaxed">
                      Cześć! 👋 Jestem asystentem AI Młodego Krakowa. 
                      <br />
                      <span className="font-medium text-blue-600">Potrzebujesz pomocy z wolontariatem?</span>
                      <br />
                      <span className="hidden md:inline">Mogę Ci pomóc znaleźć idealne wydarzenia lub odpowiedzieć na pytania!</span>
                      <span className="md:hidden">Mogę Ci pomóc!</span>
                    </p>
                  </div>
                  
                  <button
                    onClick={handleChatClick}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="hidden md:inline">Rozpocznij rozmowę</span>
                    <span className="md:hidden">Chat</span>
                  </button>
                </div>
              </div>

              {/* Speech bubble tail */}
              <div className="absolute bottom-0 right-6 md:right-8 transform translate-y-full">
                <div className="w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-6 border-t-white md:border-l-8 md:border-r-8 md:border-t-8"></div>
              </div>
            </div>
          </div>
        )}

        {/* Floating Chat Button (Always visible) */}
        <button
          onClick={toggleChatPopup}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white p-3 md:p-4 rounded-full shadow-2xl transition-all duration-200 hover:scale-110 group relative"
          title={showChatPopup ? "Zwiń chat" : "Otwórz chat z AI"}
        >
          <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
          <div className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 md:w-3 md:h-3 rounded-full animate-pulse"></div>
          
          {/* Hover tooltip - Hidden on mobile */}
          {!showChatPopup && (
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:block">
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
