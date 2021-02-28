using System;

namespace Cellcom.CheckList.Utils
{
    public class DateTimeUtil
    {
        public static bool IsTimeInRange (TimeSpan start, TimeSpan end, TimeSpan time)
        {
            if (start <= end) 
            {
                return time >= start && time <= end;
            }
            else
            {
                return time >= start || time <= end;
            }
        }
    }
}
