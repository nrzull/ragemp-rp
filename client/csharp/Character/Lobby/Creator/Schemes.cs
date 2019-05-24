using System.Collections.Generic;
using System.Linq;

namespace Project.Client.Character.Creator
{
    public static class Schemes
    {
        public static readonly Schemes.Hair MaleHair = new Schemes.Hair
        {
            Values = new List<int> { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 72, 73 }
        };

        public static readonly Schemes.Hair FemaleHair = new Schemes.Hair
        {
            Values = new List<int> {
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 76, 77
            }
        };

        public class FaceFeature
        {
            public int Index { get; set; }
            public float Min { get; set; } = -1f;
            public float Max { get; set; } = 1f;
            public float Current { get; set; } = 0f;
            public float Default { get; set; } = 0f;
        }

        public class HeadOverlay
        {
            public int Index { get; set; }
            public IEnumerable<int> Values { get; set; }
            public int Current { get; set; } = 0;
            public int Default { get; set; } = 0;
        }

        public class Sex
        {
            public string Current { get; set; } = "male";
            public string Default { get; set; } = "male";
        }

        public class Hair
        {
            public int Index { get; set; } = 2;
            public List<int> Values { get; set; }
            public int Current { get; set; } = 0;
            public int Default { get; set; } = 0;
        }


        public class FaceFeatures
        {
            public FaceFeature NoseWidth = new FaceFeature { Index = 0 };
            public FaceFeature NoseHeight = new FaceFeature { Index = 1 };
            public FaceFeature NoseLength = new FaceFeature { Index = 2 };
            public FaceFeature NoseBridge = new FaceFeature { Index = 3 };
            public FaceFeature NoseTip = new FaceFeature { Index = 4 };
            public FaceFeature NoseBridgeShift = new FaceFeature { Index = 5 };
            public FaceFeature BrowHeight = new FaceFeature { Index = 6 };
            public FaceFeature BrowWidth = new FaceFeature { Index = 7 };
            public FaceFeature CheekboneHeight = new FaceFeature { Index = 8 };
            public FaceFeature CheekboneWidth = new FaceFeature { Index = 9 };
            public FaceFeature CheeksWidth = new FaceFeature { Index = 10 };
            public FaceFeature Eyes = new FaceFeature { Index = 11 };
            public FaceFeature Lips = new FaceFeature { Index = 12 };
            public FaceFeature JawWidth = new FaceFeature { Index = 13 };
            public FaceFeature JawHeight = new FaceFeature { Index = 14 };
            public FaceFeature ChinLength = new FaceFeature { Index = 15 };
            public FaceFeature ChinPosition = new FaceFeature { Min = 0f, Max = 1f, Current = 0.5f, Default = 0.5f, Index = 16 };
            public FaceFeature ChinWidth = new FaceFeature { Index = 17 };
            public FaceFeature ChinShape = new FaceFeature { Index = 18 };
            public FaceFeature NeckWidth = new FaceFeature { Index = 19 };
        }

        public class HeadOverlays
        {
            public HeadOverlay Blemishes = new HeadOverlay
            {
                Index = 0,
                Values = Enumerable.Range(0, 24).Prepend(255)
            };

            public HeadOverlay FacialHair = new HeadOverlay
            {
                Index = 1,
                Values = Enumerable.Range(0, 29).Prepend(255)
            };

            public HeadOverlay Eyebrows = new HeadOverlay
            {
                Index = 2,
                Values = Enumerable.Range(0, 34).Prepend(255)
            };

            public HeadOverlay Ageing = new HeadOverlay
            {
                Index = 3,
                Values = Enumerable.Range(0, 15).Prepend(255)
            };

            public HeadOverlay Makeup = new HeadOverlay
            {
                Index = 4,
                Values = Enumerable.Range(0, 75).Prepend(255)
            };

            public HeadOverlay Blush = new HeadOverlay
            {
                Index = 5,
                Values = Enumerable.Range(0, 7).Prepend(255)
            };

            public HeadOverlay Complexion = new HeadOverlay
            {
                Index = 6,
                Values = Enumerable.Range(0, 12).Prepend(255)
            };

            public HeadOverlay SunDamage = new HeadOverlay
            {
                Index = 7,
                Values = Enumerable.Range(0, 11).Prepend(255)
            };

            public HeadOverlay Lipstick = new HeadOverlay
            {
                Index = 8,
                Values = Enumerable.Range(0, 10).Prepend(255)
            };

            public HeadOverlay MolesFreckles = new HeadOverlay
            {
                Index = 9,
                Values = Enumerable.Range(0, 18).Prepend(255)
            };

            public HeadOverlay ChestHair = new HeadOverlay
            {
                Index = 10,
                Values = Enumerable.Range(0, 17).Prepend(255)
            };

            public HeadOverlay BodyBlemishes = new HeadOverlay
            {
                Index = 11,
                Values = Enumerable.Range(0, 12).Prepend(255)
            };
        }

        public class SendInitialDataToUiPayload
        {
            public FaceFeatures FaceFeatures { get; set; }
            public HeadOverlays HeadOverlays { get; set; }
            public string Sex { get; set; }
            public Hair Hair { get; set; }
        }

        public class CustomizePayload
        {
            public string Type { get; set; }
            public string Key { get; set; }
            public dynamic Value { get; set; }
        }
    }
}
