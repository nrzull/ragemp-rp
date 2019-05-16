using System;
using System.Collections.Generic;
using System.Text;
using GTANetworkAPI;

namespace Project.Server.Account.Register
{
    class Events : Script
    {
        // TODO: probably need refactoring!
        [RemoteEvent(Shared.Events.REGISTER_ACCOUNT)]
        public void OnRegisterAccount(
            Client player,
            string email,
            string login,
            string password,
            string repeatPassword,
            string promoCode)
        {
            NAPI.Task.Run(() =>
            {
                Service.RegisterAccount(player, email, login, password, repeatPassword, promoCode);
            });
        }

        //[Command("register")]
        //public void Register(Client player, string email, string login, string password, string repeatPassword, string promoCode)
        //{
        //    Service.RegisterAccount(player, email, login, password, repeatPassword, promoCode);
        //}
    }
}
