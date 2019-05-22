using System;
using System.Collections.Generic;
using System.Text;
using GTANetworkAPI;
using Newtonsoft.Json;

namespace Project.Server.Account.Register
{
    class Events : Script
    {
        [RemoteEvent(Shared.Events.SERVER_REGISTER_SUBMIT)]
        public void OnUiRegisterSubmit(Client player, string data) // For data != null, because JsonConvert throw an error
        {
            NAPI.Task.Run(() =>
            {
                if (Middlewares.EventsBlocker.Block(player, Shared.Events.SERVER_REGISTER_SUBMIT, Middlewares.EventsBlocker.Receivers.CEF, 1000) > 1)
                {
                    Bus.TriggerUi(player, Shared.Events.UI_LOGIN_SUBMIT_ERROR); // Remove it
                    return;
                }
                // For data != invalid json, because JsonConvert throw an error
                try
                {
                    Schemes.SubmitPayload payload = JsonConvert.DeserializeObject<Schemes.SubmitPayload>(data);
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
