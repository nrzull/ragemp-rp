using System;
using System.Collections.Generic;
using System.Text;
using GTANetworkAPI;

namespace Project.Server.Middlewares
{
    public class EventsBlocker
    {
        public enum Receivers
        {
            CEF = 0,
            Client = 1
        }

        public static int Block(Client player, string eventName, Receivers eventReciver, int blockTime)
        {
            if (!player.HasData(eventName))
            {
                player.SetData(eventName, 0);
            }

            TriggerEvent(player, eventName + "_BLOCK", eventReciver);

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

                player.SetData(eventName, t -= 1);

                if (t == 0)
                {
                    TriggerEvent(player, eventName + "_UNBLOCK", eventReciver);
                }
            }, delayTime: blockTime);

            return times;
        }

        public static void TriggerEvent(Client player, string eventName, Receivers eventReciver)
        {
            if (eventReciver == Receivers.CEF)
            {
                Bus.TriggerUi(player, eventName);
            }
            else if (eventReciver == Receivers.Client)
            {
                Bus.TriggerClient(player, eventName);
            }
        }
    }
}
