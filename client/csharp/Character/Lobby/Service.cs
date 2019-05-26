using System;
using System.Collections.Generic;
using System.Text;

namespace Project.Client.Character.Lobby
{
    public class Service : RAGE.Events.Script
    {
        public static int Camera { get; set; }

        public static void Start(List<Shared.Schemes.LobbySelectCharacters> characters)
        {
            RAGE.Elements.Player localPlayer = RAGE.Elements.Player.LocalPlayer;

            localPlayer.Model = RAGE.Game.Misc.GetHashKey("mp_m_freemode_01");
            localPlayer.SetHeading(Resources.PLAYER_HEADING);
            localPlayer.Position = Resources.PLAYER_POSITION;

            RAGE.Game.Cam.DestroyAllCams(false);

            Camera = RAGE.Game.Cam.CreateCam(
                "DEFAULT_SCRIPTED_CAMERA", true);

            Utils.ToggleInterface(false);

            if (characters.Count > 0)
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
