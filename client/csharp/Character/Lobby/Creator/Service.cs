using System.Linq;
using RAGE;
using System.Collections.Generic;

// TODO добавить цвета для косметики
// TODO улучшить камеру (повороты и т.д.)
// TODO (?) добавить возможность поворачивать персонажа по своей оси
// TODO добавить картинки родителей
// TODO перевести интерфейс на русский
// TODO рефакторинг
namespace Project.Client.Character.Lobby.Creator
{
    public class Service
    {
        static Schemes.BlendData BlendData;
        static Schemes.FaceFeatures FaceFeatures;
        static Schemes.Sex Sex;
        static Schemes.HeadOverlays HeadOverlays;
        static Schemes.Color Color;
        static Schemes.Hair Hair;
        static Schemes.EyeColor EyeColor;

        public static void Start()
        {
            var headPosition = RAGE.Elements.Player.LocalPlayer.GetBoneCoords(12844, 0, 0, 0);

            float positionXOffset = 0.15f;
            float positionYOffset = 0.7f;

            RAGE.Game.Cam.SetCamCoord(Lobby.Service.Camera, headPosition.X - positionXOffset, headPosition.Y - positionYOffset, headPosition.Z);

            RAGE.Game.Cam.SetCamFov(Lobby.Service.Camera, 40);
            RAGE.Game.Cam.SetCamActive(Lobby.Service.Camera, true);
            RAGE.Game.Cam.RenderScriptCams(true, false, 0, true, false, 0);

            Bus.TriggerUi(Shared.Events.LOBBY_CREATOR_SHOW, true);
        }

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
                EyeColor = EyeColor,
                CharactersCount = Lobby.Service.Characters?.Count(),
                Fathers = new Schemes.ParentPayload("father"),
                Mothers = new Schemes.ParentPayload("mother"),
                SkinMix = new Schemes.Mix { Min = BlendData.MixMin, Max = BlendData.MixMax, Current = BlendData.MixDefault },
                ShapeMix = new Schemes.Mix { Min = BlendData.MixMin, Max = BlendData.MixMax, Current = BlendData.MixDefault }
            };

            if (sex) payload.Sex = Sex.Default;
            Bus.TriggerUi(Shared.Events.LOBBY_CREATOR_INIT_OK, payload);
        }

        public static void Submit(Schemes.SubmitPayload payload)
        {
            var data = new Shared.Schemes.UiLobbyCreatorSubmit
            {
                FirstName = payload.FirstName,
                LastName = payload.LastName,
                Sex = Sex.Current,
                BlendData = BlendData.Current,
                Hair = Hair.Values[Hair.Current],
                EyeColor = EyeColor.Values[EyeColor.Current],
                FaceFeatures = new List<Shared.Schemes.FaceFeature>(),
                HeadOverlays = new List<Shared.Schemes.HeadOverlay>(),
                Color = Color.Values[Color.Current]
            };

            foreach (var item in FaceFeatures.GetType().GetFields())
            {
                var faceFeature = (Schemes.FaceFeature)item.GetValue(FaceFeatures);

                data.FaceFeatures.Add(new Shared.Schemes.FaceFeature { Index = faceFeature.Index, Value = faceFeature.Current });
            }

            foreach (var item in HeadOverlays.GetType().GetFields())
            {
                var headOverlay = (Schemes.HeadOverlay)item.GetValue(HeadOverlays);

                data.HeadOverlays.Add(new Shared.Schemes.HeadOverlay { Index = headOverlay.Index, Value = headOverlay.Values.ElementAt(headOverlay.Current) });
            }

            Bus.TriggerServer(Shared.Events.LOBBY_CREATOR_SUBMIT, data);
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

                case "eye-color":
                    {
                        CustomizeEyeColor((int)payload.Value);
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

                Lobby.Service.RenderFaceFeature(new Shared.Schemes.FaceFeature
                {
                    Value = faceFeature.Current,
                    Index = faceFeature.Index
                });

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

                Lobby.Service.RenderHeadOverlay(new Shared.Schemes.HeadOverlay
                {
                    Index = headOverlay.Index,
                    Value = headOverlay.Values.ElementAt(headOverlay.Current)
                });

                break;
            }
        }

        static void CustomizeSex(string sex)
        {
            Sex.Current = sex;
            Lobby.Service.RenderSex(Sex.Current);
            Reset(sex: false);
            SendInitialDataToUi(sex: false);
        }

        static void CustomizeHair(int value)
        {
            Hair.Current = value;
            Lobby.Service.RenderHair(Hair.Values[Hair.Current]);
        }

        static void CustomizeColor(int value)
        {
            Color.Current = value;
            Lobby.Service.RenderColor(Color.Values[Color.Current]);
        }

        static void CustomizeEyeColor(int value)
        {
            EyeColor.Current = value;
            Lobby.Service.RenderEyeColor(EyeColor.Current);
        }

        static void CustomizeBlendData(string key, dynamic value)
        {
            if (key == "father") BlendData.SetFather((int)value);
            if (key == "mother") BlendData.SetMother((int)value);
            if (key == "shape-mix") BlendData.SetShapeMix((float)value);
            if (key == "skin-mix") BlendData.SetSkinMix((float)value);
            Lobby.Service.RenderBlendData(BlendData.Current);
        }

        static void Reset(bool sex = true)
        {
            BlendData = new Schemes.BlendData();
            FaceFeatures = new Schemes.FaceFeatures { };
            HeadOverlays = new Schemes.HeadOverlays { };
            Color = new Schemes.Color { };
            EyeColor = new Schemes.EyeColor { };

            if (sex)
            {
                Sex = new Schemes.Sex { };
                Lobby.Service.RenderSex(Sex.Current);
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

            Lobby.Service.RenderBlendData(BlendData.Current);

            foreach (var item in FaceFeatures.GetType().GetFields())
            {
                var faceFeature = (Schemes.FaceFeature)item.GetValue(FaceFeatures);

                Lobby.Service.RenderFaceFeature(new Shared.Schemes.FaceFeature
                {
                    Value = faceFeature.Current,
                    Index = faceFeature.Index
                });
            }

            foreach (var item in HeadOverlays.GetType().GetFields())
            {
                var headOverlay = (Schemes.HeadOverlay)item.GetValue(HeadOverlays);


                Lobby.Service.RenderHeadOverlay(new Shared.Schemes.HeadOverlay
                {
                    Index = headOverlay.Index,
                    Value = headOverlay.Values.ElementAt(headOverlay.Current)
                });
            }

            Lobby.Service.RenderHair(Hair.Values[Hair.Current]);
            Lobby.Service.RenderColor(Color.Values[Color.Current]);
            Lobby.Service.RenderEyeColor(EyeColor.Current);
        }
    }
}
