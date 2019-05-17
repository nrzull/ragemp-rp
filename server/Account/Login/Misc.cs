namespace Project.Server.Account.Login
{
    public static class Misc
    {
        public class SubmitPayload
        {
            public string Username { get; set; }
            public string Password { get; set; }
            public bool Remember { get; set; }
        }
    }
}
