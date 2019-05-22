using System;
using System.Collections.Generic;
using System.Text;
using RAGE;

namespace Project.Client
{
    class Utils
    {
        public static void ToggleInterface(bool state)
        {
            RAGE.Game.Ui.DisplayRadar(state);
            RAGE.Game.Ui.DisplayHud(state);
            Chat.Activate(state);
            Chat.Show(state);
        }
    }
}
