using RAGE;

namespace Project.Client.Character.Lobby.Selector
{
    public class Events : RAGE.Events.Script
    {
        public Events()
        {
            RAGE.Events.Add(Shared.Events.LOBBY_SELECTOR_INIT, OnInit);
            RAGE.Events.Add(Shared.Events.LOBBY_SELECTOR_CREATE, OnCreate);
        }

        public void OnInit(object[] args)
        {
            Service.Init();
        }

        public void OnCreate(object[] args)
        {
            Bus.TriggerUi(Shared.Events.LOBBY_SELECTOR_SHOW, false);
            Creator.Service.Start();
        }
    }
}
