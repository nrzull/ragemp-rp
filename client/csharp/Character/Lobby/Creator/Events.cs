using RAGE;
using Newtonsoft.Json;

namespace Project.Client.Character.Lobby.Creator
{
    public class Events : RAGE.Events.Script
    {
        public Events()
        {
            RAGE.Events.Add(Shared.Events.LOBBY_CREATOR_INIT, OnUiLobbyCreatorInit);

            RAGE.Events.Add(Shared.Events.LOBBY_CREATOR_CUSTOMIZE, OnUiLobbyCreatorCustomize);

            RAGE.Events.Add(Shared.Events.LOBBY_CREATOR_SUBMIT, OnLobbyCreatorSubmit);
        }

        public void OnUiLobbyCreatorInit(object[] args)
        {
            Service.Init();
        }

        public void OnUiLobbyCreatorCustomize(object[] args)
        {
            var payload = JsonConvert.DeserializeObject<Schemes.CustomizePayload>((string)args[0]);

            Service.Customize(payload);
        }

        public void OnLobbyCreatorSubmit(object[] args)
        {
            var payload = JsonConvert.DeserializeObject<Schemes.SubmitPayload>((string)args[0]);

            Service.Submit(payload);
        }
    }
}
