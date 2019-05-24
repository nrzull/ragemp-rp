using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Project.Server.Config;

namespace Project.Server
{
    class Database : DbContext
    {
        public static JsonSerializerSettings JsonSettings = new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore };

        public DbSet<Account.Entity> Accounts { get; set; }
        public DbSet<Character.Entity> Characters { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql($"Host=localhost;Port=5432;Database={Secret.Database.NAME};Username={Secret.Database.USERNAME};Password={Secret.Database.PASSWORD}");
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new Character.EntityConfiguration());

            builder
                .Entity<Account.Entity>()
                .HasMany(v => v.Characters)
                .WithOne(v => v.Account);
        }
    }
}
