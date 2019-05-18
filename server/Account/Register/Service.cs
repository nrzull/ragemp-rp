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
        public static void RegisterAccount(Client player, Misc.SubmitPayload payload)
        {
            // return if the player is already authorized
            if (player.GetData(Account.Resources.ATTACHMENT_KEY)?.Entity != null) return;

            Dictionary<string, string>  errors = ValidateFields(
                                                                payload.Email,
                                                                payload.Username,
                                                                payload.Password,
                                                                payload.RepeatPassword);
            if (errors.Count > 0)
            {
                Bus.TriggerUi(player, Shared.Events.UI_REGISTER_ERROR, errors);
                return;
            }

            if (Account.Service.GetAccountEntityByUsername(payload.Username) != null)
            {
                errors.Add("username", Resources.ERROR_USERNAME_EXISTS);
                Bus.TriggerUi(player, Shared.Events.UI_REGISTER_ERROR, errors);
                return;
            }

            if (GetAccountEntityByEmail(payload.Email) != null)
            {
                errors.Add("email", Resources.ERROR_EMAIL_EXISTS);
                Bus.TriggerUi(player, Shared.Events.UI_REGISTER_ERROR, errors);
                return;
            }

            using (var database = new Database())
            {
                Account.Entity account = new Account.Entity(
                    email: payload.Email,
                    username: payload.Username,
                    password: BCrypt.Net.BCrypt.HashPassword(payload.Password),
                    promoCode: payload.PromoCode,
                    registerDate: Utils.DateTimeNow
                );

                database.Accounts.Add(account);
                database.SaveChanges();

                player.SetData(Account.Resources.ATTACHMENT_KEY, new Account.Attachment { Entity = account });

                player.SendChatMessage("SUCCESSFULLY REGISTERED!");

                // TODO: Show character menu
            }
        }

        // return a list of errors if at least one of the fields is invalid
        static Dictionary<string, string> ValidateFields(
                                        string email,
                                        string username,
                                        string password,
                                        string repeatPassword)
        {
            var errors = new Dictionary<string, string>();

            string result = ValidateEmail(email);
            if (result is string)
            {
                errors.Add("email", result);
            }

            result = Account.Service.ValidateUsername(username);
            if (result is string)
            {
                errors.Add("username", result);
            }

            result = Account.Service.ValidatePassword(password);
            if (result is string)
            {
                errors.Add("password", result);
            }
            else if (password != repeatPassword)
            {
                errors.Add("repeatPassword", Resources.ERROR_PASSWORD_DONT_MATCH);
            }

            return errors;
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
                return database.Accounts.SingleOrDefault(a => a.Email == email);
            }
        }
    }
}
