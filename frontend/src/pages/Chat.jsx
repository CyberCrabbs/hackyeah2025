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
  return (
    <Layout>
      <div className="flex h-[80%]">
        {/* Users List */}
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
                <Message
                  model={{
                    message:
                      "Cześć! Czy możesz przyjść jutro na nasze wydarzenie o 18:00?",
                    sentTime: "just now",
                    sender: "Joe | Koordynator",
                  }}
                />
              </MessageList>
              <MessageInput placeholder="Wpisz wiadomość tutaj." />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </Layout>
  );
}
