using System;
using System.Collections.Generic;
using System.Text;
using GTANetworkAPI;

namespace Project.Server
{
    class Debug : Script
    {
        [RemoteEvent(Shared.Events.SERVER_DEBUG)]
        public void OnDebug(Client player, string message)
        {
            if (Config.Secret.Core.DEBUG)
            {
                Console.WriteLine(message);
            }
        }

        [Command("info")]
        public void OnSave(Client player)
        {
            if (Config.Secret.Core.DEBUG)
            { 
                player.SendChatMessage("Info recorded. Check console!");

                Console.WriteLine($"Position: {player.Position}");
                Console.WriteLine($"Heading: {player.Heading}");
                Console.WriteLine($"Health: {player.Health}");
                Console.WriteLine($"Armor: {player.Armor}");
            }
        }
    }
}
