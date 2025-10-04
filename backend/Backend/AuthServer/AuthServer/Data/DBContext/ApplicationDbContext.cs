using AuthServer.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MetaCloud.Auth.Infrastructure
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseOpenIddict();

#if DEBUG
            // Local development - connects to Docker PostgreSQL on host machine
            var connectionString = "Host=localhost;Port=5532;Database=kindworks_auth;Username=kindworks-user;Password=SuperSecurePassword123;Trust Server Certificate=true";
            optionsBuilder.UseNpgsql(connectionString);
#else 
            // Production - connects to PostgreSQL container within Docker network
            var connectionString = "Host=db;Port=5432;Database=kindworks_auth;Username=kindworks-user;Password=SuperSecurePassword123;Trust Server Certificate=true";
            optionsBuilder.UseNpgsql(connectionString);
#endif

        }
    }
}