using Microsoft.AspNetCore.Hosting;

namespace AuthServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Task.Delay(10);
            CreateHostBuilder(args)
                .Build()
                .Run();
        }


        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(options => options.UseStartup<Startup>());
    }
}
