using Backend.Helpers;
using Backend.Interface;
using System.Text;

namespace Backend.Handlers
{
    public static class EventsHandler
    {
        public static IResult GetUserChats(Guid? userId, IEventService eventService)
        {
            if (userId == null)
                userId = Guid.Empty;

            var dto = eventService.Get(userId.Value);
            var json = SerializationHelper.Serialize(dto);
            return Results.Content(json, "application/json", Encoding.UTF8, 200);
        }
    }
}