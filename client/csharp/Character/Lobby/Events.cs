using RAGE;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Project.Client.Character.Lobby
{
    class Events : RAGE.Events.Script
    {
        public Events()
        {
            RAGE.Events.Add(Shared.Events.LOBBY_START, OnStart);
        }

        public void OnStart(object[] args)
        {
            var characters = JsonConvert.DeserializeObject<List<Shared.Schemes.LobbySelectCharacters>>((string)args[0]);

            Service.Start(characters);
        }
    }
}
