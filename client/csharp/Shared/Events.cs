namespace Project.Shared
{
    class Events
    {
        public const string REGISTER_ACCOUNT = "RegisterAccount";
        public const string REGISTER_ERROR = "RegisterError";

        public const string PLAYER_CONNECT = "PlayerConnect";

        // TODO maybe use the same name of variable for value?
        public const string UI_LOADED = "UI_LOADED";
        public const string UI_LOGIN_SHOW = "UI_LOGIN_SHOW";
        public const string UI_LOGIN_SUBMIT = "UI_LOGIN_SUBMIT";
        public const string UI_LOGIN_SUBMIT_OK = "UI_LOGIN_SUBMIT_OK";
        public const string UI_LOGIN_SUBMIT_ERROR = "UI_LOGIN_SUBMIT_ERROR";
    }
}
