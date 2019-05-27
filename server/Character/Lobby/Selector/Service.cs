using System;
using GTANetworkAPI;

namespace Project.Server.Character.Lobby.Selector
{
    public static class Service
    {
        public static void Play(Client player, Character.Entity character)
        {
            var attachment = new Character.Attachment
            {
                Entity = character
            };

            Character.Service.SetAttachment(player, attachment);

            // TODO continue logic
            Console.WriteLine("Selector Service Play: im here");
        }
    }
}
