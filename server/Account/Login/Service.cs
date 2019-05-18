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

            Dictionary<string, string> errors = ValidateFields(payload);

            if (errors.Count > 0)
            {
                Bus.TriggerUi(player, Shared.Events.UI_LOGIN_SUBMIT_ERROR, errors);
                return;
            }

            Account.Entity account = Account.Service.GetAccountEntityByUsername(payload.Username);
            if (account == null || !BCrypt.Net.BCrypt.Verify(payload.Password, account.Password))
            {
                errors.Add("username", Resources.ERROR_INCORRECT_USERNAME_OR_PASSWORD);
                Bus.TriggerUi(player, Shared.Events.UI_LOGIN_SUBMIT_ERROR, errors);
                return;
            }

            Account.Attachment attachment = player.GetData(Account.Resources.ATTACHMENT_KEY);

            attachment.Entity = account;

            Bus.TriggerUi(player, Shared.Events.UI_LOGIN_SUBMIT_OK);

            // TODO: Show character menu
        }

        static Dictionary<string, string> ValidateFields(Misc.SubmitPayload payload)
        {
            var errors = new Dictionary<string, string>();

            string result = Account.Service.ValidateUsername(payload.Username);
            if (result is string)
            {
                errors.Add(nameof(payload.Username), result);
            }

            result = Account.Service.ValidatePassword(payload.Password);
            if (result is string)
            {
                errors.Add(nameof(payload.Password), result);
            }

            return errors;
        }
    }
}
