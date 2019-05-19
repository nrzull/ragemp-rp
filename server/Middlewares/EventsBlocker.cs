using System;
using System.Collections.Generic;
using System.Text;
using GTANetworkAPI;

namespace Project.Server.Middlewares
{
    public class EventsBlocker
    {
       public static int Block(Client player, string eventName, int blockTime)
       {
            if (!player.HasData(eventName))
            {
                player.SetData(eventName, 0);
            }

            int times = player.GetData(eventName);
            player.SetData(eventName, times += 1);

            if (times == 7)
            {
                player.Kick();
                Console.WriteLine($"Player {player.SocialClubName} has been kicked!");
            }

            NAPI.Task.Run(() =>
            {
                var t = player.GetData(eventName);

                if (t == null) return;

                player.SetData(eventName, t - 1);
            }, delayTime: blockTime);

            return times;
       }
    }
}
