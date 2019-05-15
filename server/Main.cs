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

        }

        [ServerEvent(Event.ResourceStart)]
        public void OnResourceStart()
        {
            using (var database = new Database())
            {
                Console.WriteLine($"Connected to database: {database.Database.CanConnect()}");
            }
        }
    }
}
