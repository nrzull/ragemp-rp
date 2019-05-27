using System;
using GTANetworkAPI;
using Newtonsoft.Json;

namespace Project.Server.Character.Lobby.Selector
{
    public class Events : Script
    {
        [RemoteEvent(Shared.Events.LOBBY_SELECTOR_PLAY)]
        public void OnPlay(Client player, string data)
        {
            try
            {
                var payload = JsonConvert.DeserializeObject<Shared.Schemes.LobbySelectorPlay>(data);

                var character = Character.Service.GetOwnCharacterByFullName(player, payload.FirstName, payload.LastName);

                if (character is Character.Entity)
                {
                    Service.Play(player, character);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
