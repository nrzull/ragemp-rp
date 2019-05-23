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

        public static void SendInitialDataToUi()
        {
            var payload = new Schemes.SendInitialDataToUiPayload
            {
                FaceFeatures = new Schemes.FaceFeatures { },
                Sex = new Schemes.Sex { },
                FirstName = new Schemes.Name { },
                LastName = new Schemes.Name { }
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
    }
}
