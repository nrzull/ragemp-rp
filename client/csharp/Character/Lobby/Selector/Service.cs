using RAGE;
using System.Collections.Generic;

namespace Project.Client.Character.Lobby.Selector
{
    public static class Service
    {
        static List<Shared.Schemes.LobbySelectCharacters> Characters;

        public static void Start(List<Shared.Schemes.LobbySelectCharacters> characters = null)
        {
            if (characters != null) Characters = characters;

            var headPosition = RAGE.Elements.Player.LocalPlayer.GetBoneCoords(12844, 0, 0, 0);

            float positionXOffset = 0.15f;
            float positionYOffset = 0.7f;

            RAGE.Game.Cam.SetCamCoord(Lobby.Service.Camera, headPosition.X - positionXOffset, headPosition.Y - positionYOffset, headPosition.Z);

            RAGE.Game.Cam.SetCamFov(Lobby.Service.Camera, 40);
            RAGE.Game.Cam.SetCamActive(Lobby.Service.Camera, true);
            RAGE.Game.Cam.RenderScriptCams(true, false, 0, true, false, 0);

            Bus.TriggerUi(Shared.Events.LOBBY_SELECTOR_SHOW, true);
        }
    }
}
