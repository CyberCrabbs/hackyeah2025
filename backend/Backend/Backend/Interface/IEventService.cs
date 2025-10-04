using Backend.Models;
using Microsoft.AspNetCore.SignalR;

namespace Backend.Interface
{
    public interface IEventService
    {
        public List<Events> Get();
    }
}