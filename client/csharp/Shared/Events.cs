namespace Project.Shared
{
    class Events
    {
        public const string DEBUG_CONSOLE_MESSAGE = "DEBUG_CONSOLE_MESSAGE";
        public const string PLAYER_CONNECTED = "PLAYER_CONNECTED";

        public const string UI_LOADED = "UI_LOADED";
        public const string AUTH_SHOW = "AUTH_SHOW";

        public const string LOGIN_SHOW = "LOGIN_SHOW";
        public const string LOGIN_SUBMIT = "LOGIN_SUBMIT";
        public const string LOGIN_SUBMIT_OK = "LOGIN_SUBMIT_OK";
        public const string LOGIN_SUBMIT_ERROR = "LOGIN_SUBMIT_ERROR";

        public const string REGISTER_SHOW = "REGISTER_SHOW";
        public const string REGISTER_SUBMIT = "REGISTER_SUBMIT";
        public const string REGISTER_SUBMIT_OK = "REGISTER_SUBMIT_OK";
        public const string REGISTER_SUBMIT_ERROR = "REGISTER_SUBMIT_ERROR";

        public const string LOBBY_START = "LOBBY_START";
        public const string LOBBY_CREATOR_SHOW = "LOBBY_CREATOR_SHOW";
        public const string LOBBY_CREATOR_INIT = "LOBBY_CREATOR_INIT";
        public const string LOBBY_CREATOR_INIT_OK = "LOBBY_CREATOR_INIT_OK";
        public const string LOBBY_CREATOR_CUSTOMIZE = "LOBBY_CREATOR_CUSTOMIZE";
        public const string LOBBY_CREATOR_SUBMIT = "LOBBY_CREATOR_SUBMIT";
        public const string LOBBY_CREATOR_SUBMIT_OK = "LOBBY_CREATOR_SUBMIT_OK";
        public const string LOBBY_CREATOR_CANCEL = "LOBBY_CREATOR_CANCEL";

        public const string LOBBY_SELECTOR_SHOW = "LOBBY_SELECTOR_SHOW";
    }
}
