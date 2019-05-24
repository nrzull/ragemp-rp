using System.Linq;
using RAGE;

namespace Project.Client.Character.Creator
{
    public class Service
    {
        static Schemes.FaceFeatures FaceFeatures;
        static Schemes.Sex Sex;
        static Schemes.HeadOverlays HeadOverlays;

        public static void Init()
        {
            Reset();
            SendInitialDataToUi();
        }

        static void SendInitialDataToUi(bool sex = true)
        {
            var payload = new Schemes.SendInitialDataToUiPayload
            {
                FaceFeatures = FaceFeatures,
                HeadOverlays = HeadOverlays
            };

            if (sex) payload.Sex = Sex.Default;

            Bus.TriggerUi(Shared.Events.UI_LOBBY_CREATOR_INIT_OK, payload);
        }

        public static void Customize(Schemes.CustomizePayload payload)
        {
            switch (payload.Type)
            {
                case "face-feature":
                    {
                        CustomizeFaceFeature(payload.Key, (float)payload.Value);
                        break;
                    }

                case "head-overlay":
                    {
                        CustomizeHeadOverlay(payload.Key, (int)payload.Value);
                        break;
                    }

                case "sex":
                    {
                        CustomizeSex(payload.Key);
                        break;
                    }
            }
        }

        static void CustomizeFaceFeature(string key, float value)
        {
            foreach (var field in FaceFeatures.GetType().GetFields())
            {
                if (field.Name.ToLower() != key.ToLower()) continue;

                var faceFeature = (Schemes.FaceFeature)field.GetValue(FaceFeatures);

                faceFeature.Current = value;
                RenderFaceFeature(faceFeature);
                break;
            }
        }

        static void RenderFaceFeature(Schemes.FaceFeature faceFeature)
        {
            RAGE.Elements.Player.LocalPlayer.SetFaceFeature(faceFeature.Index, faceFeature.Current);
        }

        static void CustomizeHeadOverlay(string key, int value)
        {
            foreach (var field in HeadOverlays.GetType().GetFields())
            {
                if (field.Name.ToLower() != key.ToLower()) continue;

                var headOverlay = (Schemes.HeadOverlay)field.GetValue(HeadOverlays);

                headOverlay.Current = value;

                RenderHeadOverlay(headOverlay);
            }
        }

        static void RenderHeadOverlay(Schemes.HeadOverlay headOverlay)
        {
            RAGE.Elements.Player.LocalPlayer.SetHeadOverlay(headOverlay.Index, headOverlay.Values.ElementAt(headOverlay.Current), 1);
        }

        static void CustomizeSex(string sex)
        {
            Sex.Current = sex;
            RenderSex();
            Reset(sex: false);
            SendInitialDataToUi(sex: false);
        }

        static void RenderSex()
        {
            if (Sex.Current == "male")
            {
                RAGE.Elements.Player.LocalPlayer.Model = RAGE.Game.Misc.GetHashKey("mp_m_freemode_01");
            }
            else
            {
                RAGE.Elements.Player.LocalPlayer.Model = RAGE.Game.Misc.GetHashKey("mp_f_freemode_01");
            }
        }

        static void Reset(bool sex = true)
        {
            FaceFeatures = new Schemes.FaceFeatures { };
            HeadOverlays = new Schemes.HeadOverlays { };

            if (sex)
            {
                Sex = new Schemes.Sex { };
                RenderSex();
            }

            foreach (var item in FaceFeatures.GetType().GetFields())
            {
                var faceFeature = (Schemes.FaceFeature)item.GetValue(FaceFeatures);

                RenderFaceFeature(faceFeature);
            }

            foreach (var item in HeadOverlays.GetType().GetFields())
            {
                var headOverlay = (Schemes.HeadOverlay)item.GetValue(HeadOverlays);

                RenderHeadOverlay(headOverlay);
            }
        }
    }
}
