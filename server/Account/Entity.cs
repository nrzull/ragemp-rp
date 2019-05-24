using System;
using System.Collections.Generic;

namespace Project.Server.Account
{
    public class Entity
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string PromoCode { get; set; }
        public DateTime RegisterDate { get; set; }
        public IList<Character.Entity> Characters { get; set; }

        public Entity(string email, string username, string password, string promoCode, DateTime registerDate)
        {
            Email = email;
            Username = username;
            Password = password;
            PromoCode = promoCode;
            RegisterDate = registerDate;
            Characters = new List<Character.Entity>();
        }
    }
}
