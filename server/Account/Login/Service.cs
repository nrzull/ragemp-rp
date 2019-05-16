using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using GTANetworkAPI;

namespace Project.Server.Account.Login
{
  class Service
  {
    public static void LogIn(Client player, string login, string password)
    {
      // return if the player is already authorized
      if (player.GetData(Account.Resources.ATTACHMENT_KEY)?.Entity != null) return;

      Dictionary<string, string> result = ValidateFields(login, password);

      if (result != null)
      {
        // TODO refactoring
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

      player.SetData(Account.Resources.ATTACHMENT_KEY, new Account.Attachment { Entity = account });

      player.SendChatMessage("SUCCESSFULLY AUTHORIZED!");

      // TODO: Show character menu
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
