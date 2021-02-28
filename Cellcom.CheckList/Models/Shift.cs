using System;

namespace Cellcom.CheckList.Models
{
    public class Shift
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
        public TimeSpan FromTime { get; set; }
        public TimeSpan ToTime { get; set; }
        public bool IsCurrentActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
