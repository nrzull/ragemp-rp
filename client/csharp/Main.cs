using RAGE;

namespace Project.Client
{
    public class Main : Events.Script
    {
        public Main()
        {
            Events.Add(Shared.Events.PLAYER_CONNECT, OnConnect);
            Events.Add(Shared.Events.UI_LOADED, OnUiLoaded);
        }

        public static void OnConnect(object[] args)
        {
            Browser.Service.CreateBrowser();
        }

        public static void OnUiLoaded(object[] args)
        {
            Events.CallLocal("JS_ACCOUNT_SEND_CREDENTIALS");
            Bus.TriggerServer(Shared.Events.UI_LOADED);
        }
    }
}
