using RAGE;
using System.Collections.Generic;

namespace Project.Client.Character.Lobby.Selector
{
    public static class Service
    {
        static List<Shared.Schemes.LobbySelectCharacters> Characters;

        public static void Start(List<Shared.Schemes.LobbySelectCharacters> characters)
        {
            Characters = characters;
        }
    }
}
