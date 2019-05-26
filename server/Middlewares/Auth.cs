using GTANetworkAPI;

namespace Project.Server.Middlewares
{
    public static class Auth
    {
        public static bool Check(Client player)
        {
            var attachment = Account.Service.GetAttachment(player);
            if (attachment.Entity is Account.Entity) return true;
            return false;
        }
    }
}
