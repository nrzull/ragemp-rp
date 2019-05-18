using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using GTANetworkAPI;

namespace Project.Server.Account.Login
{
    class Service
    {
        public static void LogIn(Client player, Misc.SubmitPayload payload)
        {
            // return if the player is already authorized
            if (player.GetData(Account.Resources.ATTACHMENT_KEY)?.Entity != null) return;

            Dictionary<string, string> errors = ValidateFields(payload.Username, payload.Password);

            if (errors.Count > 0)
            {
                Bus.TriggerUi(player, Shared.Events.UI_LOGIN_ERROR, errors);
                return;
            }

            Account.Entity account = Account.Service.GetAccountEntityByUsername(payload.Username);
            if (account == null || !BCrypt.Net.BCrypt.Verify(payload.Password, account.Password))
            {
                errors.Add("username", Resources.ERROR_INCORRECT_USERNAME_OR_PASSWORD);
                Bus.TriggerUi(player, Shared.Events.UI_LOGIN_ERROR, errors);
                return;
            }

            player.SetData(Account.Resources.ATTACHMENT_KEY, new Account.Attachment { Entity = account });

            player.SendChatMessage("SUCCESSFULLY AUTHORIZED!");

            // TODO: Show character menu
        }

        static Dictionary<string, string> ValidateFields(string username, string password)
        {
            var errors = new Dictionary<string, string>();

            string result = Account.Service.ValidateUsername(username);
            if (result is string)
            {
                errors.Add("username", result);
            }

            result = Account.Service.ValidatePassword(password);
            if (result is string)
            {
                errors.Add("password", result);
            }

            return errors;
        }
    }
}
