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
        public void OnLoginAccount(Client player, string data)
        {
            var payload = JsonConvert.DeserializeObject<Misc.SubmitPayload>(data);

            Task.Run(() => Service.LogIn(player, payload));
        }
    }
}
