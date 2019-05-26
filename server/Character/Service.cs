using System.Collections.Generic;
using System.Linq;
using GTANetworkAPI;

namespace Project.Server.Character.Lobby
{
    public static class Service
    {
        public static void Start(Client player)
        {
            var attachment = Account.Service.GetAttachment(player);
            var characters = GetLobbyCharacters(attachment);
            Bus.TriggerClient(player, Shared.Events.LOBBY_START, characters);
        }

        public static object GetLobbyCharacters(Account.Attachment attachment)
        {
            using (var db = new Database())
            {
                db.Accounts.Attach(attachment.Entity);

                return db.Entry(attachment.Entity)
                    .Collection(v => v.Characters)
                    .Query()
                    .Select(v => new
                    {
                        FirstName = v.FirstName,
                        LastName = v.LastName,
                        Customization = v.Customization,
                        Sex = v.Sex
                    })
                    .ToList();
            }
        }
    }
}
