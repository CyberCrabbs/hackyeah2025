// Migration runner for AuthServer
// This can be used when EF CLI tools are not available

using MetaCloud.Auth.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var host = Host.CreateDefaultBuilder(args)
    .ConfigureServices((context, services) =>
    {
        // Configure DbContext for migrations
        services.AddDbContext<ApplicationDbContext>(options =>
        {
#if DEBUG
            options.UseNpgsql("Host=localhost;Port=5532;Database=auth;Username=kindworks-user;Password=superC00lp@$$word;Trust Server Certificate=true");
#else
            options.UseNpgsql("Host=auth-db;Port=5432;Database=auth;Username=kindworks-user;Password=superC00lp@$$word;Trust Server Certificate=true");
#endif
        });
    })
    .Build();

using var scope = host.Services.CreateScope();
var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

Console.WriteLine("Applying database migrations...");

try
{
    await dbContext.Database.MigrateAsync();
    Console.WriteLine("✅ Migrations applied successfully!");
}
catch (Exception ex)
{
    Console.WriteLine($"❌ Migration failed: {ex.Message}");
    return 1;
}

return 0;