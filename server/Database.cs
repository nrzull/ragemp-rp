using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Aquamarine.Server.Config;

namespace Aquamarine.Server
{
    class Database : DbContext
    {
        public DbSet<Account.Entity> Accounts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql($"Host=localhost;Port=5432;Database={Secret.Database.NAME};Username={Secret.Database.USERNAME};Password={Secret.Database.PASSWORD}");
        }
    }
}
