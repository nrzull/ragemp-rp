using System;
using System.Collections.Generic;
using System.Text;
using GTANetworkAPI;
using Newtonsoft.Json;

namespace Project.Server.Account.Register
{
    class Events : Script
    {
        [RemoteEvent(Shared.Events.REGISTER_SUBMIT)]
        public void OnSubmit(Client player, string data)
        {

            NAPI.Task.Run(() =>
            {
                if (Middlewares.EventsBlocker.Block(player, Shared.Events.REGISTER_SUBMIT, Middlewares.EventsBlocker.Receivers.CEF, 1000))
                {
                    return;
                }

                if (Middlewares.Auth.Check(player))
                {
                    return;
                }

                try
                {
                    var payload = JsonConvert.DeserializeObject<Schemes.SubmitPayload>(data);
                    Service.RegisterAccount(player, payload);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            });
        }
    }
}
