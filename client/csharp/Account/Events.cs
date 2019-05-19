using RAGE;
using Newtonsoft.Json;

namespace Project.Client.Account
{
    public class Events : RAGE.Events.Script
    {
        public Events()
        {
            RAGE.Events.Add(Shared.Events.UI_AUTH_SHOW, OnUiAuthShow);
        }

        public void OnUiAuthShow(object[] args)
        {
            var payload = JsonConvert.DeserializeObject<bool>((string)args[0]);

            Chat.Show(false);
            Bus.TriggerUi(Shared.Events.UI_AUTH_SHOW, payload);
            RAGE.Ui.Cursor.Visible = true;
        }
    }
}
