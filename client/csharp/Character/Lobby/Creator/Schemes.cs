namespace Project.Client.Character.Creator
{
    public static class Schemes
    {
        public class FaceFeature
        {
            public int Index { get; set; }
            public float Min { get; set; } = -1f;
            public float Max { get; set; } = 1f;
            public float Current { get; set; } = 0f;
            public float Default { get; set; } = 0f;
        }

        public class Sex
        {
            public string Current { get; set; } = "male";
            public string Default { get; set; } = "male";
        }

        public class Name
        {
            public string Current { get; set; } = "";
            public string Default { get; set; } = "";
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

        public class SendInitialDataToUiPayload
        {
            public FaceFeatures FaceFeatures { get; set; }
            public Sex Sex { get; set; }
            public Name FirstName { get; set; }
            public Name LastName { get; set; }
        }

        public class CustomizePayload
        {
            public string Type { get; set; }
            public string Key { get; set; }
            public dynamic Value { get; set; }
        }
    }
}
