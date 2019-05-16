namespace Project.Server.Account
{
    public class Entity
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string PromoCode { get; set; }

        public Entity(string email, string login, string password, string promoCode)
        {
            Email = email;
            Login = login;
            Password = password;
            PromoCode = promoCode;
        }
    }
}
