using System;
using System.Collections.Generic;
using System.Text;
using GTANetworkAPI;
using System.Linq;
using System.Text.RegularExpressions;
using System.Net.Mail;

namespace Aquamarine.Server.Account.Register
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
            Dictionary<string, string> result = ValidateFields(
                                                email,
                                                login,
                                                password,
                                                repeatPassword);
            if (result != null)
            {
                var errors = string.Join("\n", result.ToArray());
                player.TriggerEvent(Shared.Events.REGISTER_ERROR, errors);
                return;
            }

            if (Account.Service.GetAccountEntityByLogin(login) != null)
            {
                player.TriggerEvent(Shared.Events.REGISTER_ERROR, Resources.ERROR_LOGIN_EXISTS);
                return;
            }

            if (GetAccountEntityByEmail(email) != null)
            {
                player.TriggerEvent(Shared.Events.REGISTER_ERROR, Resources.ERROR_EMAIL_EXISTS);
                return;
            }

            // TODO: continue logic
            player.SendChatMessage("SUCCESSFULLY REGISTERED!");
        }

        // return a list of errors if at least one of the fields is invalid
        static Dictionary<string, string> ValidateFields(
                                        string email,
                                        string login,
                                        string password,
                                        string repeatPassword)
        {
            Dictionary<string, string> errors = new Dictionary<string, string>();

            string result = ValidateEmail(email);
            if (result is string)
            {
                errors.Add("email", result);
            }

            result = Account.Service.ValidateLogin(login);
            if (result is string)
            {
                errors.Add("login", result);
            }

            result = Account.Service.ValidatePassword(password);
            if (result is string)
            {
                errors.Add("password", result);
            }
            else if (password.Equals(repeatPassword))
            {
                errors.Add("password", Resources.ERROR_PASSWORD_DONT_MATCH);
            }

            if (errors.Count > 0)
            {
                return errors;
            }

            return null;
        }

        static string ValidateEmail(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return Resources.ERROR_EMAIL_EMPTY;
            }

            try
            {
                MailAddress m = new MailAddress(email);
                return null;
            }
            catch (FormatException)
            {
                return Resources.ERROR_EMAIL_INVALID;
            }
        }

        static Account.Entity GetAccountEntityByEmail(string email)
        {
            using (var database = new Database())
            {
                return database.Accounts.SingleOrDefault(a => a.Email.Equals(email));
            }
        }
    }
}
