using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using GTANetworkAPI;
using Newtonsoft.Json;

namespace Project.Server.Account.Login
{
    class Events : Script
    {
        [RemoteEvent(Shared.Events.LOGIN_SUBMIT)]
        public void OnUiLoginSubmit(Client player, string data)
        {
            Task.Run(() =>
            {
                if (Middlewares.EventsBlocker.Block(player, Shared.Events.LOGIN_SUBMIT, Middlewares.EventsBlocker.Receivers.CEF, 1000) > 1)
                {
                    // TODO уведомить о блокировке если такова имеется
                    return;
                }

                try
                {
                    Shared.Schemes.UiLoginSubmitPayload payload = JsonConvert.DeserializeObject<Shared.Schemes.UiLoginSubmitPayload>(data);
                    Service.LogIn(player, payload);
                }
                catch (Exception ex
                )
                {
                    Console.WriteLine(ex.Message);
                }
            });
        }
    }
}
