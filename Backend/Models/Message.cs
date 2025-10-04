public class Message
{
    public required string sender { get; set; }
    public required string content { get; set; }
    public string timestamp { get; set; }

    public Message()
    {
        timestamp = DateTime.UtcNow.ToString("HH:mm");
    }
}
