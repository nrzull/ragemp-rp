using RAGE;
using Newtonsoft.Json;

namespace Project.Client
{
    public class Bus : Events.Script
    {
        public Bus()
        {
            Events.Add("ui=>server", OnUiToServer);
        }

        // public static void TriggerUi(string ev, object payload)
        // {
        //     Browser.Service.Browser.ExecuteJs($"bus.emit(\"{ev}\", {JsonConvert.SerializeObject(payload)})");
        // }

        public static void TriggerServer(string ev, object payload)
        {
            RAGE.Events.CallRemote(ev, JsonConvert.SerializeObject(payload));
        }

        static void OnUiToServer(object[] args)
        {
            var payload = JsonConvert.DeserializeObject<Payload>((string)args[0]);
            TriggerServer(payload.ev, payload.payload);
        }

        class Payload
        {
            public string ev { get; set; }
            public object payload { get; set; }
        }
    }
}
