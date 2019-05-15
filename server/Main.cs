using GTANetworkAPI;
using System;
using System.Collections.Generic;
using System.Text;

namespace Aquamarine.Server
{
    public class Main : Script
    {
        public Main()
        {
            using (var database = new Database())
            {
                Console.WriteLine($"Connected to database: {database.Database.EnsureCreated()}");
            }
        }
    }
}
