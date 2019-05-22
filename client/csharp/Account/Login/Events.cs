using RAGE;
using Newtonsoft.Json;

namespace Project.Client.Account.Login
{
    public class Events : RAGE.Events.Script
    {
        public Events()
        {
            RAGE.Events.Add(Shared.Events.UI_LOGIN_SUBMIT_OK, OnUiLoginSubmitOk);
        }

        public static void OnUiLoginSubmitOk(object[] args)
        {
            var payload = JsonConvert.DeserializeObject<Shared.Schemes.UiLoginSubmitPayload>((string)args[0]);

            if (payload.Remember)
            {
                RAGE.Events.CallLocal("JS_ACCOUNT_STORE_CREDENTIALS", payload);
            }
            else
            {
                RAGE.Events.CallLocal("JS_ACCOUNT_REMOVE_CREDENTIALS");
            }

            Bus.TriggerUi(Shared.Events.UI_LOGIN_SUBMIT_OK);
        }
    }
}
