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
                // For data != invalid json, because JsonConvert throw an error
                try
                {
                    Misc.SubmitPayload payload = JsonConvert.DeserializeObject<Misc.SubmitPayload>(data);
                    Service.LogIn(player, payload);
                }
                catch(JsonException jex)
                {
                    Console.WriteLine(jex.Message);
                }
            });
        }
    }
}
