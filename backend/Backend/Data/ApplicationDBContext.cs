using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext()
            : base()
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            if (!optionsBuilder.IsConfigured)
            {
#if DEBUG
                var connectionString = "Host=localhost;Port=5632;Database=apidb;Username=postgres;Password=postgres;Trust Server Certificate=true";
                optionsBuilder.UseNpgsql(connectionString);
#else
                var connectionString = "Host=api-db;Port=5432;Database=apidb;Username=postgres;Password=postgres;Trust Server Certificate=true";
                optionsBuilder.UseNpgsql(connectionString);
#endif
            }
        }

        public virtual DbSet<Models.Event> Events { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            ConfigureEvents(modelBuilder);
        }

        public static void ConfigureEvents(ModelBuilder modelBuilder)
        {
            // Configure the primary key for CloudFile
            modelBuilder.Entity<Models.Event>()
                .HasKey(chat => chat.Guid);
        }
    }
}