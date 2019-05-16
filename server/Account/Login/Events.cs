using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using GTANetworkAPI;

namespace Aquamarine.Server.Account.Login
{
    class Events : Script
    {
        [RemoteEvent(Shared.Events.LOGIN_ACCOUNT)]
        public void OnLoginAccount(Client player, string login, string password)
        {
            Task.Run(() => Service.LogIn(player, login, password));
        }
    }
}
