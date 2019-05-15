namespace Aquamarine.Server.Account.Register
{
    class Resources
    {
        public const string LOGIN_REGEX = "^[a-zA-Z0-9]+$";
        public const int PASSWORD_MIN_LENGTH = 8;
        public const int PASSWORD_MAX_LENGTH = 64;

        public const string ERROR_EMAIL_EMPTY = "Заполните поле 'Электронная почта' 1";
        public const string ERROR_EMAIL_INVALID = "Адрес электронной почты не по формату 2";
        public const string ERROR_LOGIN_EMPTY = "Заполните поле 'Логин' 3";
        public const string ERROR_LOGIN_INVALID = "Логин не по формату 4";
        public const string ERROR_PASSWORD_EMPTY = "Заполните поле 'Пароль' 5";
        public const string ERROR_PASSWORD_INVALID = "Пароль не по формату 6";
        public const string ERROR_PASSWORD_DONT_MATCH = "Пароли не совпадают 7";
        public const string ERROR_EMAIL_EXISTS = "Введенный адрес электронной почты уже используется 8";
        public const string ERROR_LOGIN_EXISTS = "Введенный логин уже используется 9";
    }
}
