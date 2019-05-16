using System.Linq;
using System.Text.RegularExpressions;

namespace Project.Server.Account
{
    public static class Service
    {
        public static Account.Entity GetAccountEntityByLogin(string login)
        {
            using (var database = new Database())
            {
                return database.Accounts.SingleOrDefault(a => a.Login == login);
            }
        }

        public static string ValidateLogin(string login)
        {
            if (string.IsNullOrEmpty(login))
            {
                return Resources.ERROR_LOGIN_EMPTY;
            }

            Regex regex = new Regex(Resources.LOGIN_REGEX);
            if (regex.IsMatch(login) == false)
            {
                return Resources.ERROR_LOGIN_INVALID;
            }

            return null;
        }

        public static string ValidatePassword(string password)
        {
            if (string.IsNullOrEmpty(password))
            {
                return Resources.ERROR_PASSWORD_EMPTY;
            }

            int length = password.Length;
            int minLenght = Resources.PASSWORD_MIN_LENGTH;
            int maxLenght = Resources.PASSWORD_MAX_LENGTH;

            if (length < minLenght || length > maxLenght)
            {
                return Resources.ERROR_PASSWORD_INVALID;
            }

            return null;
        }
    }
}
