using System;
using System.Collections.Generic;
using System.Text;
using System.Timers;
using GTANetworkAPI;

namespace Project.Server.Account
{
    class Events : Script
    {
        [ServerEvent(Event.PlayerConnected)]
        public void OnPlayerConnected(Client player)
        {
            player.SetData(Resources.ATTACHMENT_KEY, new Account.Attachment { });
        }

        [ServerEvent(Event.PlayerDisconnected)]
        public void OnPlayerDisconnected(Client player, DisconnectionType type, string reason)
        {
            // Stop timers
        }
    }
}

