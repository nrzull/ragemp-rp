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
        public static void RegisterAccount(Client player, Schemes.SubmitPayload payload)
        {
            // return if the player is already authorized
            if (player.GetData(Account.Resources.ATTACHMENT_KEY)?.Entity != null) return;

            Dictionary<string, string> errors = ValidateFields(payload);

            if (errors.Count > 0)
            {
                Bus.TriggerUi(player, Shared.Events.UI_REGISTER_SUBMIT_ERROR, errors);
                return;
            }

            if (Account.Service.GetAccountEntityByUsername(payload.Username) != null)
            {
                errors.Add("username", Resources.ERROR_USERNAME_EXISTS);
                Bus.TriggerUi(player, Shared.Events.UI_REGISTER_SUBMIT_ERROR, errors);
                return;
            }

            if (GetAccountEntityByEmail(payload.Email) != null)
            {
                errors.Add("email", Resources.ERROR_EMAIL_EXISTS);
                Bus.TriggerUi(player, Shared.Events.UI_REGISTER_SUBMIT_ERROR, errors);
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

                Bus.TriggerUi(player, Shared.Events.UI_REGISTER_SUBMIT_OK);
            }
        }

        // return a list of errors if at least one of the fields is invalid
        static Dictionary<string, string> ValidateFields(Schemes.SubmitPayload payload)
        {
            var errors = new Dictionary<string, string>();

            string result = ValidateEmail(payload.Email);
            if (result is string)
            {
                errors.Add(nameof(payload.Email), result);
            }

            result = Account.Service.ValidateUsername(payload.Username);
            if (result is string)
            {
                errors.Add(nameof(payload.Username), result);
            }

            result = Account.Service.ValidatePassword(payload.Password);
            if (result is string)
            {
                errors.Add(nameof(payload.Password), result);
            }
            else if (payload.Password != payload.RepeatPassword)
            {
                errors.Add(nameof(payload.RepeatPassword), Resources.ERROR_PASSWORD_DONT_MATCH);
            }

            if (!string.IsNullOrEmpty(payload.PromoCode))
            {
                Regex regex = new Regex(Account.Resources.USERNAME_REGEX);
                if (regex.IsMatch(payload.PromoCode) == false)
                {
                    errors.Add(nameof(payload.PromoCode), Resources.ERROR_PROMO_CODE_INVALID);
                }
            }

            if (!payload.Agreement)
            {
                errors.Add(nameof(payload.Agreement), Resources.ERROR_AGREEMENT_NOT_SATISFIED);
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
