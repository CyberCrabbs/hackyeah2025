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
            var connectionString = "Host=localhost;Port=55431;Database=auth;Username=postgres;Password=postgres;Trust Server Certificate=true";
            optionsBuilder.UseNpgsql(connectionString);
#else 
            var connectionString = "Host=auth-db;Port=5432;Database=auth;Username=postgres;Password=postgres;Trust Server Certificate=true";
            optionsBuilder.UseNpgsql(connectionString);
#endif

        }
    }
}