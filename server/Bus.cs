using GTANetworkAPI;
using Newtonsoft.Json;

namespace Project.Server
{
    public static class Bus
    {
        public static void TriggerUi(Client player, string ev, object payload = null)
        {
            player.TriggerEvent("server=>ui", JsonConvert.SerializeObject(new
            {
                ev = ev,
                payload = payload
            }));
        }
    }
}
