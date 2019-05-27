namespace Project.Server.Account
{
    public static class Resources
    {
        public const string ATTACHMENT_KEY = "ACCOUNT_ATTACHMENT";

        public const string USERNAME_REGEX = "^[a-zA-Z0-9]+$";

        public const string ERROR_USERNAME_INVALID = "Логин не по формату";

        public const string ERROR_USERNAME_EMPTY = "Заполните поле 'Логин'";

        public const string ERROR_PASSWORD_EMPTY = "Заполните поле 'Пароль'";

        public const string ERROR_PASSWORD_INVALID = "Пароль не по формату";

        public const int PASSWORD_MIN_LENGTH = 8;

        public const int PASSWORD_MAX_LENGTH = 64;
    }
}
