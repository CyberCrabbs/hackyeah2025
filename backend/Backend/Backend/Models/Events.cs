namespace Backend.Models
{
    public class Events
    {
        public Guid Guid { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Start {  get; set; }
        public DateTime End { get; set; }
        public float Longnitude { get; set; }
        public float latitude { get; set; }
    }
}