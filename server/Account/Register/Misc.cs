using System;
using System.Collections.Generic;
using System.Text;

namespace Project.Server.Account.Register
{
    public static class Misc
    {
        public class SubmitPayload
        {
            public string Email { get; set; }
            public string Username { get; set; }
            public string Password { get; set; }
            public string RepeatPassword { get; set; }
            public string PromoCode { get; set; }
            public bool Agreement { get; set; }
        }
    }
}
