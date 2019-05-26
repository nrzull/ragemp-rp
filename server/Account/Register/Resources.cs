namespace Project.Server.Account.Register
{
    // TODO use computed values
    class Resources
    {
        public const string ERROR_EMAIL_EMPTY = "Заполните поле 'Электронная почта'";

        public const string ERROR_EMAIL_INVALID = "Адрес электронной почты не по формату";

        public const string ERROR_PASSWORD_DONT_MATCH = "Пароли не совпадают";

        public const string ERROR_EMAIL_EXISTS = "Введенный адрес электронной почты уже используется";

        public const string ERROR_USERNAME_EXISTS = "Введенный логин уже используется";

        public const string ERROR_PROMO_CODE_INVALID = "Промокод не по формату";

        public const string ERROR_AGREEMENT_NOT_SATISFIED = "Согласитесь с правилами сервера";
    }
}
