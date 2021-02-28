using Cellcom.CheckList.Entities.Enums;
using System;

namespace Cellcom.CheckList.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Details { get; set; }
        public string ProcedureLink { get; set; }
        public Shift Shift { get; set; }
        public ETaskTimingType TimingType { get; set; }
        public object TimingValues { get; set; }
        public DateTime? TimingOneTimeDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public bool IsDisabled { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public ETaskStatus Status { get; set; }
        public string Comments { get; set; }
    }
}
