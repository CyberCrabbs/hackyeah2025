import { useEffect, useState, useRef } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import Layout from "layout/Layout";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const wsRef = useRef(null);

  const userId = "123123";

  const users = [
    {
      name: "Młody Kraków | Organizacja",
      avatar:
        "https://mlodziez.krakow.pl/wp-content/themes/simple-bootstrap/images/mk20.svg",
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
    },
  ];

  useEffect(() => {
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
      <div className="flex h-[80%]">
        <div className="w-58 border-r border-gray-300 p-4">
          <h4 className="text-lg font-semibold mb-4">Twoje Rozmowy</h4>
          <ul className="space-y-4">
            {users.map((user, index) => (
              <li
                key={index}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium">{user.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <MainContainer>
            <ChatContainer className="h-full">
              <MessageList>
                {messages.map((msg, idx) => (
                  <Message
                    key={idx}
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
      </div>
    </Layout>
  );
}
