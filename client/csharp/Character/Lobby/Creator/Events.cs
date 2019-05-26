using RAGE;
using Newtonsoft.Json;

namespace Project.Client.Character.Lobby.Creator
{
    public class Events : RAGE.Events.Script
    {
        public Events()
        {
            RAGE.Events.Add(Shared.Events.LOBBY_CREATOR_INIT, OnInit);
            RAGE.Events.Add(Shared.Events.LOBBY_CREATOR_CUSTOMIZE, OnCustomize);
            RAGE.Events.Add(Shared.Events.LOBBY_CREATOR_SUBMIT, OnSubmit);
            RAGE.Events.Add(Shared.Events.LOBBY_CREATOR_CANCEL, OnCancel);
        }

        public void OnInit(object[] args)
        {
            Service.Init();
        }

        public void OnCustomize(object[] args)
        {
            var payload = JsonConvert.DeserializeObject<Schemes.CustomizePayload>((string)args[0]);

            Service.Customize(payload);
        }

        public void OnSubmit(object[] args)
        {
            var payload = JsonConvert.DeserializeObject<Schemes.SubmitPayload>((string)args[0]);

            Service.Submit(payload);
        }

        public void OnCancel(object[] args)
        {
            Bus.TriggerUi(Shared.Events.LOBBY_CREATOR_SHOW, false);
            Lobby.Service.Start(Service.Characters);
        }
    }
}
