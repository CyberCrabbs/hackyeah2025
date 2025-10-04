using Backend.Interface;
using Backend.Models;

namespace Backend.Services
{
    public class MockEventService : IEventService
    {

        public MockEventService() { }

        public List<Events> Get(Guid userId)
        {
            return new List<Events>
            {
                new Events
                {
                    Guid = Guid.NewGuid(),
                    Name = "Hackathon 2025",
                    Description = "Big coding event.",
                    Start = DateTime.UtcNow.AddDays(1),
                    End = DateTime.UtcNow.AddDays(2),
                    Longnitude = 50.0647F,
                    latitude = 19.9450F
                },
                new Events
                {
                    Guid = Guid.NewGuid(),
                    Name = "Tech Meetup",
                    Description = "Networking for developers.",
                    Start = DateTime.UtcNow.AddDays(10),
                    End = DateTime.UtcNow.AddDays(10).AddHours(5),
                    Longnitude = 50.0107F,
                    latitude = 19.9750F
                }
            };
        }
    }
}