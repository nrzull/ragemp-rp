using System.Collections.Generic;
using System.Linq;

namespace Project.Client.Character.Lobby.Creator
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

        public static List<Parent> Fathers = new List<Parent>
        {
            new Parent(0, "Benjamin"),
            new Parent(1, "Daniel"),
            new Parent(2, "Joshua"),
            new Parent(3, "Noah"),
            new Parent(4, "Andrew"),
            new Parent(5, "Juan"),
            new Parent(6, "Alex"),
            new Parent(7, "Isaac"),
            new Parent(8, "Evan"),
            new Parent(9, "Ethan"),
            new Parent(10, "Vincent"),
            new Parent(11, "Angel"),
            new Parent(12, "Diego"),
            new Parent(13, "Adrian"),
            new Parent(14, "Gabriel"),
            new Parent(15, "Michael"),
            new Parent(16, "Santiago"),
            new Parent(17, "Kevin"),
            new Parent(18, "Louis"),
            new Parent(19, "Samuel"),
            new Parent(20, "Anthony"),
            new Parent(42, "Claude"),
            new Parent(43, "Niko"),
            new Parent(44, "John")
        };

        public static List<Parent> Mothers = new List<Parent>
        {
            new Parent(21, "Hannah"),
            new Parent(22, "Audrey"),
            new Parent(23, "Jasmine"),
            new Parent(24, "Giselle"),
            new Parent(25, "Amelia"),
            new Parent(26, "Isabella"),
            new Parent(27, "Zoe"),
            new Parent(28, "Ava"),
            new Parent(29, "Camila"),
            new Parent(30, "Violet"),
            new Parent(31, "Sophia"),
            new Parent(32, "Evelyn"),
            new Parent(33, "Nicole"),
            new Parent(34, "Ashley"),
            new Parent(35, "Grace"),
            new Parent(36, "Brianna"),
            new Parent(37, "Natalie"),
            new Parent(38, "Olivia"),
            new Parent(39, "Elizabeth"),
            new Parent(40, "Charlotte"),
            new Parent(41, "Emma"),
            new Parent(45, "Misty")
        };

        public class EyeColor
        {
            public List<int> Values { get; set; } = new List<int> { 0, 1, 2, 3, 4, 5, 6, 7 };
            public int Current { get; set; } = 0;
        }

        public class BlendData
        {
            public (int, int, int, int, int, int, float, float, float, bool) Current { get; set; }

            public (int, int, int, int, int, int, float, float, float, bool) Default { get; set; } = (Mothers[0].Id, Fathers[0].Id, 0, Mothers[0].Id, Fathers[0].Id, 0, 0.5f, 0.5f, 0, true);

            public float MixMin { get; set; } = 0f;
            public float MixMax { get; set; } = 1f;
            public float MixDefault { get; set; } = 0.5f;

            public BlendData()
            {
                Current = Default;
            }

            public void SetFather(int value)
            {
                Current = (
                    Current.Item1, Fathers[value].Id, Current.Item3, Current.Item4, Fathers[value].Id, Current.Item6, Current.Item7, Current.Item8, Current.Item9, Current.Item10
                );
            }

            public void SetMother(int value)
            {
                Current = (
                    Mothers[value].Id, Current.Item2, Current.Item3, Mothers[value].Id, Current.Item5, Current.Item6, Current.Item7, Current.Item8, Current.Item9, Current.Item10
                );
            }

            public void SetShapeMix(float value)
            {
                Current = (
                    Current.Item1, Current.Item2, Current.Item3, Current.Item4, Current.Item5, Current.Item6, value, Current.Item8, Current.Item9, Current.Item10
                );
            }

            public void SetSkinMix(float value)
            {
                Current = (
                    Current.Item1, Current.Item2, Current.Item3, Current.Item4, Current.Item5, Current.Item6, Current.Item7, value, Current.Item9, Current.Item10
                );
            }
        }

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

        public class Color
        {
            public List<int> Values { get; set; } = new List<int> { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 26, 27, 28, 29 };
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
            public Color Color { get; set; }
            public EyeColor EyeColor { get; set; }
            public ParentPayload Fathers { get; set; }
            public ParentPayload Mothers { get; set; }
            public Mix ShapeMix { get; set; }
            public Mix SkinMix { get; set; }
            public int? CharactersCount { get; set; }
        }

        public class Parent
        {
            public string Name { get; set; }
            public int Id { get; set; }

            public Parent(int id, string name)
            {
                Id = id;
                Name = name;
            }
        }

        public class ParentPayload
        {
            public List<Parent> Values { get; set; }
            public int Current { get; set; }

            public ParentPayload(string key)
            {
                if (key == "father") Values = Fathers;
                else Values = Mothers;

                Current = 0;
            }
        }

        public class Mix
        {
            public float Min { get; set; }
            public float Max { get; set; }
            public float Current { get; set; }
        }

        public class CustomizePayload
        {
            public string Type { get; set; }
            public string Key { get; set; }
            public dynamic Value { get; set; }
        }

        public class SubmitPayload
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
        }
    }
}
