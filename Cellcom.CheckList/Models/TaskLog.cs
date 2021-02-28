using Cellcom.CheckList.Entities.Enums;
using System;

namespace Cellcom.CheckList.Models
{
    public class TaskLog
    {
        public int Id { get; set; }
        public int TaskId { get; set; }
        public string Name { get; set; }
        public string Details { get; set; }
        public string ProcedureLink { get; set; }
        public int ShiftId { get; set; }
        public string ShiftName { get; set; }
        public TimeSpan ShiftTimeFrom { get; set; }
        public TimeSpan ShiftTimeTo { get; set; }
        public ETaskTimingType TimingType { get; set; }
        public string TimingValues { get; set; }
        public DateTime? TimingOneTimeDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public string Comments { get; set; }
        public ETaskStatus Status { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
