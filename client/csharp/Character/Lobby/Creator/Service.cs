using System.Linq;
using RAGE;

namespace Project.Client.Character.Creator
{
    public class Service
    {
        static Schemes.BlendData BlendData;
        static Schemes.FaceFeatures FaceFeatures;
        static Schemes.Sex Sex;
        static Schemes.HeadOverlays HeadOverlays;
        static Schemes.Color Color;
        static Schemes.Hair Hair;

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
                HeadOverlays = HeadOverlays,
                Hair = Hair,
                Color = Color,
                Fathers = new Schemes.ParentPayload("father"),
                Mothers = new Schemes.ParentPayload("mother")
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
                        CustomizeSex((string)payload.Value);
                        break;
                    }

                case "hair":
                    {
                        CustomizeHair((int)payload.Value);
                        break;
                    }

                case "color":
                    {
                        CustomizeColor((int)payload.Value);
                        break;
                    }

                case "father":
                case "mother":
                case "shape-mix":
                case "skin-mix":
                    {
                        CustomizeBlendData(payload.Type, payload.Value);
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
                break;
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

        static void CustomizeHair(int value)
        {
            Hair.Current = value;
            RenderHair();
        }

        static void RenderHair()
        {
            RAGE.Elements.Player.LocalPlayer.SetComponentVariation(Hair.Index, Hair.Values[Hair.Current], 0, 0);
        }

        static void CustomizeColor(int value)
        {
            Color.Current = value;
            RenderColor();
        }

        static void RenderColor()
        {
            RAGE.Elements.Player.LocalPlayer.SetHairColor(Color.Values[Color.Current], 0);

            RAGE.Elements.Player.LocalPlayer.SetHeadOverlayColor(HeadOverlays.FacialHair.Index, 1, Color.Values[Color.Current], 0);

            RAGE.Elements.Player.LocalPlayer.SetHeadOverlayColor(HeadOverlays.ChestHair.Index, 1, Color.Values[Color.Current], 0);

            RAGE.Elements.Player.LocalPlayer.SetHeadOverlayColor(HeadOverlays.Eyebrows.Index, 1, Color.Values[Color.Current], 0);
        }

        static void CustomizeBlendData(string key, dynamic value)
        {
            if (key == "father") BlendData.SetFather((int)value);
            if (key == "mother") BlendData.SetMother((int)value);
            if (key == "shape-mix") BlendData.SetShapeMix((float)value);
            if (key == "skin-mix") BlendData.SetSkinMix((float)value);
            RenderBlendData();
        }

        static void RenderBlendData()
        {
            RAGE.Elements.Player.LocalPlayer.SetHeadBlendData(BlendData.Current.Item1, BlendData.Current.Item2, BlendData.Current.Item3, BlendData.Current.Item4, BlendData.Current.Item5, BlendData.Current.Item6, BlendData.Current.Item7, BlendData.Current.Item8, BlendData.Current.Item9, BlendData.Current.Item10);
        }

        static void Reset(bool sex = true)
        {
            BlendData = new Schemes.BlendData();
            FaceFeatures = new Schemes.FaceFeatures { };
            HeadOverlays = new Schemes.HeadOverlays { };
            Color = new Schemes.Color { };

            if (sex)
            {
                Sex = new Schemes.Sex { };
                RenderSex();
            }

            Schemes.Hair TargetHair;
            if (Sex.Current == "male") TargetHair = Schemes.MaleHair;
            else TargetHair = Schemes.FemaleHair;

            Hair = new Schemes.Hair
            {
                Current = TargetHair.Current,
                Default = TargetHair.Default,
                Index = TargetHair.Index,
                Values = TargetHair.Values
            };

            RenderBlendData();

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

            RenderHair();
            RenderColor();
        }
    }
}
