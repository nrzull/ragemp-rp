using System;
using System.Collections.Generic;
using System.Text;

namespace Project.Server.Account.Login
{
    class Misc
    {
        public class SubmitPayload
        {
            public string Username { get; set; }
            public string Password { get; set; }
            public string Remember { get; set; }
        }
    }
}
