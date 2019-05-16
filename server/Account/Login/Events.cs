using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using GTANetworkAPI;

namespace Project.Server.Account.Login
{
    class Events : Script
    {
        [RemoteEvent(Shared.Events.LOGIN_ACCOUNT)]
        public void OnLoginAccount(Client player, string login, string password)
        {
            Task.Run(() => Service.LogIn(player, login, password));
        }

        //[Command("login")]
        //public void Login(Client player, string login, string password)
        //{
        //    Service.LogIn(player, login, password);
        //}
    }
}
