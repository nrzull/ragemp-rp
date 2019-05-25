using System;
using System.Collections.Generic;
using System.Text;

namespace Project.Client.Character.Lobby
{
    public class Service : RAGE.Events.Script
    {
        public Service()
        {
        }

        public static void ShowLobby(List<Shared.Schemes.LobbySelectCharacters> characters)
        {
            RAGE.Elements.Player localPlayer = RAGE.Elements.Player.LocalPlayer;

            localPlayer.SetHeading(Resources.PLAYER_HEADING);
            localPlayer.Position = Resources.PLAYER_POSITION;

            var headPosition = localPlayer.GetBoneCoords(12844, 0, 0, 0);

            RAGE.Game.Cam.DestroyAllCams(false);

            int camera = RAGE.Game.Cam.CreateCam(
                "DEFAULT_SCRIPTED_CAMERA", true);

            float positionXOffset = 0.15f;
            float positionYOffset = 0.7f;

            RAGE.Game.Cam.SetCamCoord(camera, headPosition.X - positionXOffset, headPosition.Y - positionYOffset, headPosition.Z);

            RAGE.Game.Cam.SetCamFov(camera, 40);
            RAGE.Game.Cam.SetCamActive(camera, true);
            RAGE.Game.Cam.RenderScriptCams(true, false, 0, true, false, 0);
            Utils.ToggleInterface(false);

            if (characters != null && characters.Count != 0)
            {
                Selector.Service.Start(characters);
            }
            else
            {
                Creator.Service.Start(characters);
            }
        }
    }
}
