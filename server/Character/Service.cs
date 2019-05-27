using System.Linq;
using GTANetworkAPI;

namespace Project.Server.Character
{
    public static class Service
    {
        public static int GetCharactersCount(Account.Entity account)
        {
            using (var db = new Database())
            {
                db.Accounts.Attach(account);

                return db.Entry(account)
                    .Collection(v => v.Characters)
                    .Query()
                    .Count();
            }
        }

        public static Entity GetOwnCharacterByFullName(Client player, string firstName, string lastName)
        {
            using (var db = new Database())
            {
                var attachment = Account.Service.GetAttachment(player);
                db.Accounts.Attach(attachment.Entity);

                return db
                    .Entry(attachment.Entity)
                    .Collection(v => v.Characters)
                    .Query()
                    .SingleOrDefault(
                        v => v.FirstName == firstName && v.LastName == lastName
                    );
            }
        }

        public static Attachment GetAttachment(Client player)
        {
            return player.GetData(Resources.ATTACHMENT_KEY);
        }

        public static void SetAttachment(Client player, Attachment attachment)
        {
            player.SetData(Resources.ATTACHMENT_KEY, attachment);
        }
    }
}
