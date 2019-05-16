using System;
using System.Collections.Generic;
using System.Text;
using GTANetworkAPI;

namespace Project.Server.Account.Login
{
    class Events : Script
    {
        [RemoteEvent(Shared.Events.LOGIN_ACCOUNT)]
        public void OnLoginAccount(Client player)
        {
            // TODO
        }
    }
}
