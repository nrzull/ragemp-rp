namespace Project.Server.Account
{
    public static class Resources
    {
        public const string ATTACHMENT_KEY = "Account";

        public const string USERNAME_REGEX = "^[a-zA-Z0-9]+$";

        public const string ERROR_USERNAME_INVALID = "Логин не по формату 4";

        public const string ERROR_USERNAME_EMPTY = "Заполните поле 'Логин' 3";

        public const string ERROR_PASSWORD_EMPTY = "Заполните поле 'Пароль' 5";

        public const string ERROR_PASSWORD_INVALID = "Пароль не по формату 6";

        public const int PASSWORD_MIN_LENGTH = 8;

        public const int PASSWORD_MAX_LENGTH = 64;
    }
}
