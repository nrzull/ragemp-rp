using RAGE;

namespace Project.Client.Character.Lobby
{
    class Events : RAGE.Events.Script
    {
        public Events()
        {
            RAGE.Events.Add(Shared.Events.CLIENT_LOBBY_SHOW, OnLobbyShow);
        }

        public void OnLobbyShow(object[] agrs)
        {
            Service.ShowLobby();
        }
    }
}
