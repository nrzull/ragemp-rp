using GTANetworkAPI;

namespace Project.Server.Middlewares
{
    public static class Auth
    {
        public static bool Check(Client player)
        {
            Account.Attachment attachment = player.GetData(Account.Resources.ATTACHMENT_KEY);

            if (attachment.Entity is Account.Entity) return true;

            return false;
        }
    }
}
