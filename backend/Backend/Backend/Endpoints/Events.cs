using Backend.Interface;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Endpoints;

internal static class Events
{
    internal static void Register(WebApplication app)
    {
        var v1 = app.MapGroup("/api/v1")
            .WithTags("Events")
            //.RequireAuthorization()
            .WithOpenApi();

        v1.MapGet("/event/get", GetEvents);
    }

    private static IResult GetEvents([FromServices] IEventService service) =>
        Handlers.EventsHandler.GetUserChats(null, service);
}