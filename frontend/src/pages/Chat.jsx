import { useEffect, useState, useRef } from "react";
import  "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import Layout from "layout/Layout";
import { Image, Download, Calendar, Users, MapPin, Check, CheckCheck } from "lucide-react";
import ChatIdentityCard from "../components/ChatIdentityCard";
import identities from "../data/identities";
import conversations from "../data/conversations";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [activeConversation, setActiveConversation] = useState(1); // Default to first user
  const [sharedImages, setSharedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const wsRef = useRef(null);

  const userId = "123123";

  // Mock shared images data - using Unsplash API for demo
  const mockSharedImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
      alt: "Festiwal Równości - zdjęcie grupowe",
      date: "2025-09-21",
      event: "Festiwal Równości",
      sharedBy: "Joe | Koordynator"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
      alt: "Warsztat edukacyjny",
      date: "2025-08-18",
      event: "Garden of Kindness",
      sharedBy: "Alice | Koordynator"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=300&fit=crop",
      alt: "Przygotowania do wydarzenia",
      date: "2025-09-20",
      event: "Festiwal Równości",
      sharedBy: "Młody Kraków | Organizacja"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&h=300&fit=crop",
      alt: "Wolontariusze w akcji",
      date: "2025-08-20",
      event: "Garden of Kindness",
      sharedBy: "Bob | Koordynator"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop",
      alt: "Prezentacja projektów",
      date: "2025-09-15",
      event: "Akademia Samorządności",
      sharedBy: "Alice | Koordynator"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop",
      alt: "Zespół organizacyjny",
      date: "2025-08-15",
      event: "Garden of Kindness",
      sharedBy: "Joe | Koordynator"
    }
  ];

  // Use actual user IDs from identities data
  const userIds = [1, 2, 3, 4, 5]; // Select specific users for chat conversations

  // Load conversation when activeConversation changes
  useEffect(() => {
    if (conversations[activeConversation]) {
      setMessages(conversations[activeConversation].messages);
    } else {
      setMessages([]); // No conversation available
    }
  }, [activeConversation]);

  // Handle conversation switching
  const handleConversationClick = (userId) => {
    setActiveConversation(userId);
  };

  // Get current conversation partner name
  const getCurrentPartnerName = () => {
    const partner = identities.find(identity => identity.id === activeConversation);
    return partner ? partner.name : "Unknown";
  };

  // Generate message date (today for recent messages)
  const getMessageDate = (messageIndex, isToday = true) => {
    if (isToday) {
      return "dzisiaj";
    }
    const dates = ["wczoraj", "2 dni temu", "3 dni temu"];
    return dates[messageIndex % dates.length] || "dzisiaj";
  };

  // Determine if message is read (incoming messages are always read, outgoing have mixed status)
  const isMessageRead = (message, index) => {
    if (message.direction === "incoming") return true;
    // For outgoing messages, simulate some as read and some as unread
    return index % 3 !== 0; // Every 3rd message is unread
  };

  useEffect(() => {
    // Simulate loading shared images
    setLoading(true);
    setTimeout(() => {
      setSharedImages(mockSharedImages);
      setLoading(false);
    }, 1000);

    fetch(`https://localhost:7057/api/v1/chats/messages?userId=${userId}`)
  .then(res => res.json())
  .then(data => setMessages(data))
  .catch(console.error);



    wsRef.current = new WebSocket(
      `wss://localhost:7057/api/v1/chats/ws?userId=${userId}`
    );

    wsRef.current.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      setMessages((prev) => [...prev, messageData]);
    };

    wsRef.current.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      wsRef.current?.close();
    };
  }, []);

  const handleSend = (text) => {
    const newMessage = {
      id: Date.now(),
      sender: "me",
      content: text,
      direction: "outgoing",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
    };
    
    // Add message to current conversation
    setMessages((prev) => [...prev, newMessage]);
    
    // Update conversations data (in real app, this would be sent to server)
    if (conversations[activeConversation]) {
      conversations[activeConversation].messages.push(newMessage);
    }
    
    // Simulate WebSocket send (if available)
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify(newMessage));
    }
  };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row h-[calc(100vh-160px)] gap-4 p-4 max-h-screen overflow-hidden">
        {/* Left Sidebar - Conversations */}
        <div className="w-full lg:w-64 xl:w-80 bg-white rounded-lg shadow-thick flex-shrink-0 flex flex-col max-h-full">
          <div className="p-4 border-b">
            <h4 className="text-lg font-semibold">Twoje Rozmowy</h4>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {userIds.map((userId, index) => (
                <div
                  key={userId}
                  className={`cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition-colors ${
                    userId === activeConversation ? "bg-blue-50 border border-blue-200" : ""
                  }`}
                  onClick={() => handleConversationClick(userId)}
                >
                  <ChatIdentityCard id={userId} details={false} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Container */}
        <div className="flex-1 rounded-xl shadow-thick bg-white overflow-hidden flex flex-col max-h-full">
          {/* Chat Header */}
          <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={identities.find(id => id.id === activeConversation)?.photo || ""}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{getCurrentPartnerName()}</h3>
                <p className="text-sm text-gray-500">
                  {identities.find(id => id.id === activeConversation)?.type || "Użytkownik"}
                </p>
              </div>
            </div>
          </div>
          
          {/* Chat Messages Area */}
          <div className="flex-1 flex flex-col h-full">
            {/* Custom Message List with padding and status */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => {
                const isOutgoing = m.direction === "outgoing" || m.sender === "me";
                const isRead = isMessageRead(m, i);
                const messageDate = getMessageDate(i);
                
                return (
                  <div key={i} className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'} mb-4`}>
                    <div className={`max-w-xs lg:max-w-md ${
                      isOutgoing ? 'order-1' : 'order-2'
                    }`}>
                      {/* Message bubble */}
                      <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                        isOutgoing 
                          ? 'bg-blue-500 text-white rounded-br-md' 
                          : 'bg-gray-100 text-gray-800 rounded-bl-md'
                      }`}>
                        <p className="text-sm leading-relaxed">{m.content}</p>
                      </div>
                      
                      {/* Message info */}
                      <div className={`flex items-center mt-1 space-x-2 ${
                        isOutgoing ? 'justify-end' : 'justify-start'
                      }`}>
                        <span className="text-xs text-gray-500">
                          {messageDate} • {m.timestamp || "Just now"}
                        </span>
                        
                        {/* Read status for outgoing messages */}
                        {isOutgoing && (
                          <div className="flex items-center">
                            {isRead ? (
                              <CheckCheck className="w-4 h-4 text-blue-500" title="Przeczytane" />
                            ) : (
                              <Check className="w-4 h-4 text-gray-400" title="Dostarczone" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Message Input */}
            <div className="border-t p-4">
              <MessageInput placeholder="Wpisz wiadomość tutaj." onSend={handleSend} />
            </div>
          </div>
        </div>

        {/* Right Sidebar - Shared Images */}
        <div className="w-full lg:w-80 xl:w-96 bg-white rounded-lg  shadow-thick flex-shrink-0 flex flex-col max-h-full overflow-hidden">
          <div className="p-4 border-b flex items-center">
            <Image className="w-5 h-5 text-blue-600 mr-2" />
            <h4 className="text-lg font-semibold">Udostępnione Zdjęcia</h4>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {sharedImages.map((image) => (
                  <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative group">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                        <button className="opacity-0 group-hover:opacity-100 bg-white p-2 rounded-full hover:bg-gray-100 transition-all">
                          <Download className="w-4 h-4 text-gray-700" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-blue-600">{image.event}</span>
                        <span className="text-xs text-gray-500">{image.date}</span>
                      </div>
                      
                      <p className="text-sm text-gray-800 mb-2">{image.alt}</p>
                      
                      <div className="flex items-center text-xs text-gray-500">
                        <Users className="w-3 h-3 mr-1" />
                        <span>Udostępnił: {image.sharedBy}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {sharedImages.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Image className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Brak udostępnionych zdjęć</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Quick Stats */}
          <div className="p-4 border-t border-gray-200 flex-shrink-0">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-blue-50 p-2 rounded text-center">
                <div className="font-semibold text-blue-600">{sharedImages.length}</div>
                <div className="text-gray-600">Zdjęć</div>
              </div>
              <div className="bg-green-50 p-2 rounded text-center">
                <div className="font-semibold text-green-600">3</div>
                <div className="text-gray-600">Wydarzenia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
