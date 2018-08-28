using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartCity.Models
{
    public partial class SmartContext : DbContext
    {
        public SmartContext(DbContextOptions<SmartContext> options) : base(options)
        { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=smartcityapp.database.windows.net;Initial Catalog=smartcity_db;User ID=smartcity;Password=Pass1234;MultipleActiveResultSets=true");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.ID).IsRequired();
            });

            modelBuilder.Entity<Data>(entity =>
            {
                entity.Property(e => e.ID).IsRequired();
            });
            modelBuilder.Entity<Settings>(entity =>
            {
                entity.Property(e => e.ID).IsRequired();
            });
            modelBuilder.Entity<Widget>(entity =>
            {
                entity.Property(e => e.ID).IsRequired();
            });
            modelBuilder.Entity<Problem>(entity =>
            {
                entity.Property(e => e.ID).IsRequired();
            });
        }

        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Data> Data { get; set; }
        public virtual DbSet<Settings> Settings { get; set; }
        public virtual DbSet<Widget> Widget { get; set; }
        public virtual DbSet<Problem> Problem { get; set; }
    }
}
