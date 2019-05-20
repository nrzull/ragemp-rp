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
        [RemoteEvent(Shared.Events.UI_LOGIN_SUBMIT)]
        public void OnUiLoginSubmit(Client player, string data = "json") // For data != null, because JsonConvert throw an error
        {
            Task.Run(() =>
            {
                if (Middlewares.EventsBlocker.Block(player, Shared.Events.UI_REGISTER_SUBMIT, 2000) > 1)
                {
                    Bus.TriggerUi(player, Shared.Events.UI_LOGIN_SUBMIT_ERROR); // Remove it
                    return;
                }
                // For data != invalid json, because JsonConvert throw an error
                try
                {
                    Shared.Payload.UiLoginSubmit payload = JsonConvert.DeserializeObject<Shared.Payload.UiLoginSubmit>(data);
                    Service.LogIn(player, payload);
                }
                catch (JsonException jex)
                {
                    Console.WriteLine(jex.Message);
                }
            });
        }
    }
}
