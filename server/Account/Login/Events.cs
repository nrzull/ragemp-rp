using System;
using System.Collections.Generic;
using System.Text;
using GTANetworkAPI;

namespace Aquamarine.Server.Account.Login
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
