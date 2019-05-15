using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Aquamarine.Server.Config;

namespace Aquamarine.Server
{
    class Database : DbContext
    {
        // Define models here
        // public DbSet<Account> Accounts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql($"Host=localhost;Port=5432;Database={Secret.Database};Username={Secret.Username};Password={Secret.Password}");
        }
    }
}
