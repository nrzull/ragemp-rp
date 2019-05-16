using System;
using System.Collections.Generic;
using System.Text;
using GTANetworkAPI;
using System.Linq;
using System.Text.RegularExpressions;
using System.Net.Mail;

namespace Project.Server.Account.Register
{
    class Service : Script
    {
        public static void RegisterAccount(
            Client player,
            string email,
            string login,
            string password,
            string repeatPassword,
            string promoCode)
        {
            string fieldsErrors = CheckFieldsForErrors(
                                                player,
                                                email,
                                                login,
                                                password,
                                                repeatPassword);
            if (fieldsErrors != null)
            {
                player.TriggerEvent(Shared.Events.REGISTER_ERROR, fieldsErrors);
                return;
            }

            if (!IsEmailValid(email))
            {
                player.TriggerEvent(Shared.Events.REGISTER_ERROR, Resources.ERROR_EMAIL_INVALID);
                return;
            }

            if (!IsLoginValid(login))
            {
                player.TriggerEvent(Shared.Events.REGISTER_ERROR, Resources.ERROR_LOGIN_INVALID);
                return;
            }

            if (!IsPasswordValid(password))
            {
                player.TriggerEvent(Shared.Events.REGISTER_ERROR, Resources.ERROR_PASSWORD_INVALID);
                return;
            }

            if (IsEmailExists(email))
            {
                player.TriggerEvent(Shared.Events.REGISTER_ERROR, Resources.ERROR_EMAIL_EXISTS);
                return;
            }


            if (IsLoginExists(login))
            {
                player.TriggerEvent(Shared.Events.REGISTER_ERROR, Resources.ERROR_LOGIN_EXISTS);
                return;
            }

            // TODO: insert data to database.
            player.SendChatMessage("SUCCESSFULLY REGISTERED!");
        }

        // return a list of errors if at least one of the fields is invalid
        private static string CheckFieldsForErrors(
                                        Client player,
                                        string email,
                                        string login,
                                        string password,
                                        string repeatPassword)
        {
            List<string> errors = new List<string>();

            if (string.IsNullOrEmpty(email))
            {
                errors.Add(Resources.ERROR_EMAIL_EMPTY);
            }

            if (string.IsNullOrEmpty(login))
            {
                errors.Add(Resources.ERROR_LOGIN_EMPTY);
            }

            if (string.IsNullOrEmpty(password))
            {
                errors.Add(Resources.ERROR_PASSWORD_EMPTY);
            }
            else
            {
                if (!password.Equals(repeatPassword))
                {
                    errors.Add(Resources.ERROR_PASSWORD_DONT_MATCH);
                }
            }

            if (errors.Count > 0)
            {
                string result = string.Join("\n", errors.ToArray());
                return result;
            }

            return null;
        }

        // return true if email is valid
        private static bool IsEmailValid(string email)
        {
            // WARNING! Probably need to use regex
            try
            {
                MailAddress m = new MailAddress(email);
                return true;
            }
            catch (FormatException)
            {
                return false;
            }
        }

        // return true if login is valid
        private static bool IsLoginValid(string login)
        {
            Regex regex = new Regex(Resources.LOGIN_REGEX);
            if (regex.IsMatch(login))
            {
                return true;
            }

            return false;
        }

        // return true if password is valid
        private static bool IsPasswordValid(string password)
        {
            int length = password.Length;
            int minLenght = Resources.PASSWORD_MIN_LENGTH;
            int maxLenght = Resources.PASSWORD_MAX_LENGTH;
            if (length >= minLenght && length <= maxLenght)
            {
                return true;
            }

            return false;
        }

        // return true if email exists in database
        private static bool IsEmailExists(string email)
        {
            using (var database = new Database())
            {
                var account = database.Accounts.SingleOrDefault(a => a.Email.Equals(email));
                if (account != null)
                    return true;
            }
            return false;
        }

        // return true if login exists in database
        private static bool IsLoginExists(string login)
        {
            using (var database = new Database())
            {
                var account = database.Accounts.SingleOrDefault(a => a.Login.Equals(login));
                if (account != null)
                    return true;
            }
            return false;
        }
    }
}
