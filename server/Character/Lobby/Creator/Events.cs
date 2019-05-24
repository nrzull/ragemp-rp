using GTANetworkAPI;
using System;
using Newtonsoft.Json;

namespace Project.Server.Character.Lobby.Creator
{
    public class Events : Script
    {
        [RemoteEvent(Shared.Events.LOBBY_CREATOR_SUBMIT)]
        public void OnLobbyCreatorSubmit(Client player, string data)
        {
            try
            {
                var payload = JsonConvert.DeserializeObject<Shared.Schemes.UiLobbyCreatorSubmit>(data);

                Service.CreateCharacter(player, payload);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
