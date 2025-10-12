using Backend.Interface;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Backend.Handlers;

namespace Backend.Endpoints;

internal static class Chats
{
    internal static void Register(WebApplication app)
    {
        var v1 = app.MapGroup("/api/v1")
            .WithTags("Events")
            //.RequireAuthorization()
            .WithOpenApi();

        v1.MapGet("/chats/messages", GetMessages);
        v1.Map("/chats/ws", async context =>
        {
            if (context.WebSockets.IsWebSocketRequest)
            {

                var userId = context.Request.Query["userId"].ToString();
                if (string.IsNullOrWhiteSpace(userId))
                {
                    context.Response.StatusCode = 400;
                    await context.Response.WriteAsync("Missing userId");
                    return;
                }

                var socket = await context.WebSockets.AcceptWebSocketAsync();
                await ChatsWebSocketHandler.HandleAsync(userId, socket);
            }
            else
            {
                context.Response.StatusCode = 400;
            }
        });
    }

    private static IResult GetMessages([FromQuery] string userId)
    {
        var messages = ChatService.GetMessages(userId);
        return Results.Json(messages);
    }

    //private static IResult GetMessages([FromServices] IEventService service) =>
    //Handlers.ChatsHandler.GetUserMessages(null, service);

}