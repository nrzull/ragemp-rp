using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using GTANetworkAPI;

namespace Aquamarine.Server.Account.Login
{
    class Service
    {
        public static void LogIn(Client player, string login, string password)
        {
            Dictionary<string, string> result = ValidateFields(login, password);

            if (result != null)
            {
                var errors = string.Join("\n", result.ToArray());
                player.TriggerEvent(Shared.Events.LOGIN_ERROR, errors);
                return;
            }

            Account.Entity account = Account.Service.GetAccountEntityByLogin(login);
            if (account == null)
            {
                player.TriggerEvent(Shared.Events.LOGIN_ERROR, Resources.ERROR_INCORRECT_LOGIN_OR_PASSWORD);
                return;
            }

            if (!BCrypt.Net.BCrypt.Verify(password, account.Password))
            {
                player.TriggerEvent(Shared.Events.LOGIN_ERROR, Resources.ERROR_INCORRECT_LOGIN_OR_PASSWORD);
                return;
            }

            // TODO continue logic
        }

        static Dictionary<string, string> ValidateFields(string login, string password)
        {
            var errors = new Dictionary<string, string>();

            var error = Account.Service.ValidateLogin(login);
            if (error is string)
            {
                errors.Add("login", error);
            }

            error = Account.Service.ValidatePassword(password);
            if (error is string)
            {
                errors.Add("password", error);
            }

            if (errors.Count > 0) return errors;
            return null;
        }
    }
}
