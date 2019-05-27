using System;
using System.Collections.Generic;
using System.Text;

namespace Project.Client.Character.Lobby
{
    public class Service : RAGE.Events.Script
    {
        public static int Camera { get; set; }

        public static List<Shared.Schemes.LobbySelectCharacters> Characters;

        public static void Start(List<Shared.Schemes.LobbySelectCharacters> characters = null)
        {
            RAGE.Elements.Player localPlayer = RAGE.Elements.Player.LocalPlayer;

            localPlayer.Model = RAGE.Game.Misc.GetHashKey("mp_m_freemode_01");
            localPlayer.SetHeading(Resources.PLAYER_HEADING);
            localPlayer.Position = Resources.PLAYER_POSITION;

            RAGE.Game.Cam.DestroyAllCams(false);

            Camera = RAGE.Game.Cam.CreateCam(
                "DEFAULT_SCRIPTED_CAMERA", true);

            Utils.ToggleInterface(false);

            if (characters != null) Characters = characters;

            if (characters.Count > 0)
            {
                Selector.Service.Start();
            }
            else
            {
                Creator.Service.Start();
            }
        }

        public static void RenderFaceFeature(Shared.Schemes.FaceFeature faceFeature)
        {
            RAGE.Elements.Player.LocalPlayer.SetFaceFeature(faceFeature.Index, faceFeature.Value);
        }
    }
}
