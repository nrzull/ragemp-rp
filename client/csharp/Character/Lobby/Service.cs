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

        public static void RenderHeadOverlay(Shared.Schemes.HeadOverlay headOverlay)
        {
            RAGE.Elements.Player.LocalPlayer.SetHeadOverlay(headOverlay.Index, headOverlay.Value, 1);
        }

        public static void RenderSex(string sex)
        {
            if (sex == "male")
            {
                RAGE.Elements.Player.LocalPlayer.Model = RAGE.Game.Misc.GetHashKey("mp_m_freemode_01");
            }
            else
            {
                RAGE.Elements.Player.LocalPlayer.Model = RAGE.Game.Misc.GetHashKey("mp_f_freemode_01");
            }
        }

        public static void RenderBlendData((int, int, int, int, int, int, float, float, float, bool) data)
        {
            RAGE.Elements.Player.LocalPlayer.SetHeadBlendData(data.Item1, data.Item2, data.Item3, data.Item4, data.Item5, data.Item6, data.Item7, data.Item8, data.Item9, data.Item10);
        }

        public static void RenderEyeColor(int color)
        {
            RAGE.Elements.Player.LocalPlayer.SetEyeColor(color);
        }

        public static void RenderHair(int value)
        {
            RAGE.Elements.Player.LocalPlayer.SetComponentVariation(2, value, 0, 0);
        }

        public static void RenderColor(int color)
        {
            var player = RAGE.Elements.Player.LocalPlayer;

            player.SetHairColor(color, 0);
            player.SetHeadOverlayColor(1, 1, color, 0);
            player.SetHeadOverlayColor(2, 1, color, 0);
            player.SetHeadOverlayColor(10, 1, color, 0);
        }
    }
}
