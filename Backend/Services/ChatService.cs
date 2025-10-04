using Backend.Models;
using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Reflection;
using System.Text;

namespace Backend.Services
{
    public class ChatService
    {
        private static readonly ConcurrentDictionary<string, List<Message>> chats = new ConcurrentDictionary<string, List<Message>>();
        private static readonly ConcurrentDictionary<string, WebSocket> connections = new();

        public static void AddConnection(string userId, WebSocket socket)
        {
            connections[userId] = socket;
        }
        public static async Task SendMessageToUserAsync(string userId, Message message)
        {
            if (connections.TryGetValue(userId, out var socket) && socket.State == WebSocketState.Open)
            {
                var bytes = Encoding.UTF8.GetBytes(message.content);

                AddMessage(userId, message);

                await socket.SendAsync(new ArraySegment<byte>(bytes), WebSocketMessageType.Text, true, CancellationToken.None);
            }
        }
        public static WebSocket? GetSocket(string userId)
        {
            return connections.TryGetValue(userId, out var socket) ? socket : null;
        }
        public static void AddMessage(string userId, Message message)
        {
            var list = chats.GetOrAdd(userId, _ => new List<Message>());

            lock (list) {
                list.Add(message);
            }
        }

        public static List<Message> GetMessages(string userId)
        {
            return chats.TryGetValue(userId, out var list) ? list : new List<Message>();
        }
        public static async Task<Message> ProcessMessageAsync(Message message)
        {
            await Task.Delay(1);
            return new Message { sender = "bot", content = "123123" };
        }


    }
}
