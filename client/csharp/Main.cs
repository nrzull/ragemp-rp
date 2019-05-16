using RAGE;

namespace Project.Client
{
    public class Main : Events.Script
    {
        public Main()
        {
            RAGE.Events.Add(Shared.Events.PLAYER_CONNECT, OnConnect);
        }

        public static void OnConnect(object[] args)
        {
            Browser.Service.CreateBrowser();
        }
    }
}
