using Newtonsoft.Json;

namespace Backend.Helpers
{
    internal static class SerializationHelper
    {
        private static readonly JsonSerializerSettings Settings = new()
        {
            PreserveReferencesHandling = PreserveReferencesHandling.None,
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            Formatting = Formatting.None,
            NullValueHandling = NullValueHandling.Ignore,
            DateTimeZoneHandling = DateTimeZoneHandling.Utc
        };

        internal static string Serialize(object obj)
        {
            return JsonConvert.SerializeObject(obj, Settings);
        }
    }
}