using RAGE;

namespace Project.Client.Browser
{
    public static class Service
    {
        public static RAGE.Ui.HtmlWindow Browser { get; set; }

        public static void CreateBrowser()
        {
            if (Browser is RAGE.Ui.HtmlWindow)
            {
                return;
            }

            Browser = new RAGE.Ui.HtmlWindow("package://ui/index.html");
        }
    }
}
