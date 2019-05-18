namespace Project.Shared
{
    public class Payload
    {
        public class UiLoginSubmit
        {
            public string Username { get; set; }
            public string Password { get; set; }
            public bool Remember { get; set; }
        }
    }
}
