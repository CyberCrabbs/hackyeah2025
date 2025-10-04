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
    { name: "Joe", avatar: "https://source.unsplash.com/40x40/?man" },
    { name: "Alice", avatar: "https://source.unsplash.com/40x40/?woman" },
    { name: "Bob", avatar: "https://source.unsplash.com/40x40/?person" },
    { name: "Mary", avatar: "https://source.unsplash.com/40x40/?girl" },
  ];
  return (
    <Layout>
      <div className="flex h-[80%]">
        {/* Users List */}
        <div className="w-48 border-r border-gray-300 p-4">
          <h4 className="text-lg font-semibold mb-4">Users</h4>
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
        <MainContainer>
          <ChatContainer>
            <MessageList>
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "just now",
                  sender: "Joe",
                }}
              />
            </MessageList>
            <MessageInput placeholder="Type message here" />
          </ChatContainer>
        </MainContainer>
      </div>
    </Layout>
  );
}
