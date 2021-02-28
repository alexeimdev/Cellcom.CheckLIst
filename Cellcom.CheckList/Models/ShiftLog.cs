using System;

namespace Cellcom.CheckList.Models
{
    public class ShiftLog
    {
        public int Id { get; set; }
        public int ShiftId { get; set; }
        public string ShiftName { get; set; }
        public TimeSpan FromTime { get; set; }
        public TimeSpan ToTime { get; set; }
        public string Comments { get; set; }
    }
}
