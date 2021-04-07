using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models.Data
{
    public class AnimalContext : DbContext
    {
        
            public AnimalContext(DbContextOptions<AnimalContext> options)
                : base(options)
            {
            }
            public DbSet<Animal> Animals { get; set; }
    }
}