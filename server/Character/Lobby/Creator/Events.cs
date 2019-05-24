using GTANetworkAPI;

namespace Project.Server.Character.Lobby.Creator
{
    public class Events : Script
    {
        [RemoteEvent(Shared.Events.LOBBY_CREATOR_SUBMIT)]
        public void OnLobbyCreatorSubmit(Client player, string data)
        {
            System.Console.WriteLine(data);
        }
    }
}
