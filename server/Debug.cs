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
    }
}
