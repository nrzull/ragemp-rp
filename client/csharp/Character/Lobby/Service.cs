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

        public static void ShowLobby()
        {
            RAGE.Elements.Player localPlayer = RAGE.Elements.Player.LocalPlayer;

            localPlayer.SetHeading(Resources.PLAYER_HEADING);
            localPlayer.Position = Resources.PLAYER_POSITION;

            int camera = RAGE.Game.Cam.CreateCameraWithParams(
                RAGE.Game.Misc.GetHashKey("DEFAULT_SCRIPTED_CAMERA"),
                Resources.CAMERA_POSITION.X,
                Resources.CAMERA_POSITION.Y,
                Resources.CAMERA_POSITION.Z,
                Resources.CAMERA_ROTATION.X,
                Resources.CAMERA_ROTATION.Y,
                Resources.CAMERA_ROTATION.Z,
                Resources.CAMERA_FIELD_OF_VIEW,
                true,
                2);

            RAGE.Game.Cam.SetCamActive(camera, true);
            RAGE.Game.Cam.RenderScriptCams(true, false, 0, true, false, 0);
            Utils.ToggleInterface(false);
        }
    }
}
