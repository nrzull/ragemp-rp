using GTANetworkAPI;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace Aquamarine.Server
{
    public class Main : Script
    {
        public Main()
        {

        }

        [ServerEvent(Event.PlayerSpawn)]
        public void OnPlayerSpawn(Client player)
        {
            try
            {
                using (Database connection = new Database())
                {
                    connection.Accounts.Add(new Account { Name = player.Name + " TEST" });
                    connection.SaveChanges();

                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }
    }
}
