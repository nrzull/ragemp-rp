using System.Linq;
using RAGE;

namespace Project.Client.Character.Creator
{
    public class Service
    {
        static Schemes.FaceFeatures FaceFeatures = new Schemes.FaceFeatures { };
        static Schemes.Sex Sex = new Schemes.Sex { };
        static Schemes.Name FirstName = new Schemes.Name { };
        static Schemes.Name LastName = new Schemes.Name { };
        static Schemes.HeadOverlays HeadOverlays = new Schemes.HeadOverlays { };

        public static void SendInitialDataToUi()
        {
            var payload = new Schemes.SendInitialDataToUiPayload
            {
                FaceFeatures = new Schemes.FaceFeatures { },
                Sex = new Schemes.Sex { },
                FirstName = new Schemes.Name { },
                LastName = new Schemes.Name { },
                HeadOverlays = new Schemes.HeadOverlays { }
            };

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
            }
        }

        static void CustomizeFaceFeature(string key, float value)
        {
            foreach (var field in FaceFeatures.GetType().GetFields())
            {
                if (field.Name.ToLower() != key.ToLower()) continue;

                var faceFeature = (Schemes.FaceFeature)field.GetValue(FaceFeatures);

                faceFeature.Current = value;

                RAGE.Elements.Player.LocalPlayer.SetFaceFeature(faceFeature.Index, faceFeature.Current);

                break;
            }
        }

        static void CustomizeHeadOverlay(string key, int value)
        {
            foreach (var field in HeadOverlays.GetType().GetFields())
            {
                if (field.Name.ToLower() != key.ToLower()) continue;

                var headOverlay = (Schemes.HeadOverlay)field.GetValue(HeadOverlays);

                headOverlay.Current = value;

                RAGE.Elements.Player.LocalPlayer.SetHeadOverlay(headOverlay.Index, headOverlay.Values.ElementAt(headOverlay.Current), 1);
            }
        }
    }
}
