using System;
using System.Collections.Generic;
using System.Text;
using GTANetworkAPI;

namespace Project.Server
{
    class Debug : Script
    {
        [ServerEvent(Event.PlayerSpawn)]
        public void OnPlayerSpawn(Client player)
        {
            if (Config.Secret.Core.DEBUG)
            {
            }
        }

        [RemoteEvent(Shared.Events.DEBUG_CONSOLE_MESSAGE)]
        public void OnDebug(Client player, string message)
        {
            if (Config.Secret.Core.DEBUG)
            {
                Console.WriteLine(message);
            }
        }

        [Command("weap")]
        public void CmdWeap(Client player)
        {
            if (Config.Secret.Core.DEBUG)
            {
                GiveWeaponToPlayer(player);
            }
        }

        [Command("info")]
        public void CmdInfo(Client player)
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

        [Command("veh")]
        public void CmdVeh(Client player, string model = "t20")
        {
            if (Config.Secret.Core.DEBUG)
            {
                if (player.IsInVehicle) return;

                VehicleHash hash = NAPI.Util.VehicleNameToModel(model);

                if (hash == 0)
                {
                    player.SendNotification("~r~Error! ~w~Input the correct car model name or use /veh without car model name!");
                    return;
                }
                Vehicle vehicle = NAPI.Vehicle.CreateVehicle(hash, player.Position, 0.0f, new Color(0, 0, 0), new Color(0, 0, 0), engine: true);
            }
        }

        [Command("tp")]
        public void CmdTp(Client player, float posX, float posY, float posZ)
        {
            if (Config.Secret.Core.DEBUG)
            {
                player.Position = new Vector3(posX, posY, posZ);

            }
        }

        public void GiveWeaponToPlayer(Client player)
        {
            player.GiveWeapon(WeaponHash.Machete, 5000);
            player.GiveWeapon(WeaponHash.Pistol50, 5000);
            player.GiveWeapon(WeaponHash.SMG, 5000);
            player.GiveWeapon(WeaponHash.AssaultRifle, 5000);
            player.GiveWeapon(WeaponHash.CombatMG, 5000);
            player.GiveWeapon(WeaponHash.HeavySniper, 5000);
            player.GiveWeapon(WeaponHash.Minigun, 5000);
            player.GiveWeapon(WeaponHash.Grenade, 5000);
            player.GiveWeapon(WeaponHash.Parachute, 5000);
        }
    }
}
