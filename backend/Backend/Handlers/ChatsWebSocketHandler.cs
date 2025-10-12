using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using Backend.Models;
using Backend.Services;

namespace Backend.Handlers;

public static class ChatsWebSocketHandler
{
    public static async Task HandleAsync(string userId, WebSocket socket)
    {
        ChatService.AddConnection(userId, socket);

        var buffer = new byte[1024 * 4];

        while (socket.State == WebSocketState.Open)
        {
            var result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

            if (result.MessageType == WebSocketMessageType.Close)
            {
                await socket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closed by client", CancellationToken.None);
                break;
            }

            var content = Encoding.UTF8.GetString(buffer, 0, result.Count);

            var message = JsonSerializer.Deserialize<Message>(content);
            if (message != null)
            {
                ChatService.AddMessage(userId, message);

                var aiResponseMessage = await ChatService.ProcessMessageAsync(message);

                await ChatService.SendMessageToUserAsync(userId, aiResponseMessage);
            }
        }
    }
}
