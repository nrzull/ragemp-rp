using System.Linq;
using System.Text.RegularExpressions;
using GTANetworkAPI;

namespace Project.Server.Account
{
    public static class Service
    {
        public static Account.Entity GetAccountEntityByUsername(string username)
        {
            using (var database = new Database())
            {
                return database.Accounts.SingleOrDefault(a => a.Username == username);
            }
        }

        public static string ValidateUsername(string username)
        {
            if (string.IsNullOrEmpty(username))
            {
                return Resources.ERROR_USERNAME_EMPTY;
            }

            Regex regex = new Regex(Resources.USERNAME_REGEX);
            if (regex.IsMatch(username) == false)
            {
                return Resources.ERROR_USERNAME_INVALID;
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

        public static Attachment GetAttachment(Client player)
        {
            return player.GetData(Resources.ATTACHMENT_KEY);
        }
    }
}
