using System;
using System.Collections.Generic;
using System.Text;

namespace Project.Server
{
    class Utils
    {
        public static DateTime DateTimeNow
        {
            get
            {
                return TimeZoneInfo.ConvertTimeBySystemTimeZoneId(
                    DateTime.Now,
                    TimeZoneInfo.Local.Id,
                    "Russian Standard Time");
            }
        }
    }
}
