import { useEffect, useState, useRef } from "react";
import  "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import Layout from "layout/Layout";
import { Image, Download, Calendar, Users, MapPin } from "lucide-react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

export default function Chat() {
  const [messages, setMessages] = useState([{content: "Cześć, czy możesz przyjść jutro na 18:00? "}]);
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

  const users = [
    {
      name: "Młody Kraków | Organizacja",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIrI3jnLYZju_NsvbpNUOfWudrHqmW9oXj0Q&s",
    },
    {
      name: "Joe | Koordynator",
      avatar:
        "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFufGVufDB8fDB8fHww",
    },
    {
      name: "Alice | Koordynator",
      avatar:
        "https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tYW58ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Bob | Koordynator",
      avatar:
        "https://images.unsplash.com/photo-1615109398623-88346a601842?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fHww",
    }
  ];

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
      sender: "me",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
    };
    console.log(newMessage);
    setMessages((prev) => [...prev, newMessage]);
    wsRef.current.send(JSON.stringify(newMessage));
  };

  return (
    <Layout>
      <div className="flex h-[80%] items-center gap-4">
        {/* Left Sidebar - Conversations */}
        <div className="w-64 p-4 bg-white rounded-lg shadow-md">
          <h4 className="text-lg font-semibold mb-4">Twoje Rozmowy</h4>
          <ul className="space-y-4">
            {users.map((user, index) => (
              <li
                key={index}
                className={`w-full flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded ${index===0 && "bg-blue-200"}`}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium text-sm">{user.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Chat Container */}
        <div className="h-[700px] flex-1 max-w-2xl rounded-xl shadow-lg">
          <MainContainer>
            <ChatContainer className="">
              <MessageList>
                {messages.map((m, i) => (
                  <Message
                    key={i}
                    model={{
                      
                      message: msg.content,
                      sentTime: msg.timestamp || "Just now",
                      sender: msg.sender,
                      direction: msg.sender === "me" ? "outgoing" : "incoming",
                    }}
                  />
                ))}
              </MessageList>
              <MessageInput placeholder="Wpisz wiadomość tutaj." onSend={handleSend} />
            </ChatContainer>
          </MainContainer>
        </div>

        {/* Right Sidebar - Shared Images */}
        <div className="w-80 p-4 bg-white rounded-lg shadow-md h-[700px] overflow-hidden">
          <div className="flex items-center mb-4">
            <Image className="w-5 h-5 text-blue-600 mr-2" />
            <h4 className="text-lg font-semibold">Udostępnione Zdjęcia</h4>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-4 h-full overflow-y-auto">
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
          
          {/* Quick Stats */}
          <div className="mt-4 pt-4 border-t border-gray-200">
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
