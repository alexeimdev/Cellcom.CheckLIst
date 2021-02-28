using Cellcom.CheckList.Entities.Enums;
using Cellcom.CheckList.Models;
using System;
using System.Data;
using System.Threading.Tasks;
using Task = System.Threading.Tasks.Task;

namespace Cellcom.CheckList.Providers.Helpers
{
    public class TaskLogProviderHelper : ITaskLogProviderHelper
    {
        public async Task<TaskLog> ConvertToTaskLog(DataRow row)
        {
            return await Task.Run(() =>
            {
                int id = row["id"] != null ? Convert.ToInt32(row["id"]) : -1;
                int taskId = row["task_id"] != null ? Convert.ToInt32(row["task_id"]) : -1;
                string name = row["name"].ToString();
                string details = row["details"].ToString();
                string procedureLink = row["procedure_link"].ToString();
                int shiftId = row["shift_id"] != null ? Convert.ToInt32(row["shift_id"]) : -1;
                string shiftName = row["shift_name"].ToString();
                TimeSpan shiftTimeFrom = TimeSpan.TryParse(row["shift_time_from"].ToString(), out TimeSpan shiftTimeFromOutput) ? shiftTimeFromOutput : TimeSpan.Zero;
                TimeSpan shiftTimeTo = TimeSpan.TryParse(row["shift_time_to"].ToString(), out TimeSpan shiftTimeToOutput) ? shiftTimeToOutput : TimeSpan.Zero;
                TimeSpan startTime = TimeSpan.TryParse(row["start_time"].ToString(), out TimeSpan fromTimeOutput) ? fromTimeOutput : TimeSpan.Zero;
                string comments = row["comments"].ToString();
                ETaskStatus status = (ETaskStatus)Enum.Parse(typeof(ETaskStatus), row["status"].ToString());
                ETaskTimingType timingType = (ETaskTimingType)Enum.Parse(typeof(ETaskTimingType), row["timing_type"].ToString());
                string timingValues = row["timing_values"].ToString();
                DateTime createDateTime = DateTime.TryParse(row["create_date"].ToString(), out DateTime createDateOutput) ? createDateOutput : createDateOutput;

                DateTime? timingOneTimeDate = DateTime.TryParse(row["timing_one_time_date"].ToString(), out DateTime timingOneTimeOtput) ? timingOneTimeOtput : timingOneTimeOtput;
                timingOneTimeDate = timingOneTimeDate != new DateTime() ? timingOneTimeDate : null;


                TaskLog taskLog = new TaskLog
                {
                    Id  = id,
                    TaskId = taskId,
                    Name = name,
                    Details = details,
                    ProcedureLink = procedureLink,
                    ShiftId = shiftId,
                    ShiftName = shiftName,
                    ShiftTimeFrom = shiftTimeFromOutput,
                    ShiftTimeTo = shiftTimeToOutput,
                    TimingType = timingType,
                    TimingValues = timingValues,
                    TimingOneTimeDate = timingOneTimeDate,
                    StartTime = startTime,
                    Comments = comments,
                    Status = status,
                    CreateDate = createDateOutput
                };

                return taskLog;
            });
        }

          public async Task<TaskLog> ConvertToTaskLog(Models.Task task)
        {
            return await Task.Run(() =>
            {
                TaskLog taskLog = new TaskLog
                {
                    TaskId = task.Id,
                    Name = task.Name,
                    Details = task.Details,
                    ProcedureLink = task.ProcedureLink,
                    ShiftId = task.Shift.Id,
                    ShiftName = task.Shift.Name,
                    ShiftTimeFrom = task.Shift.FromTime,
                    ShiftTimeTo = task.Shift.ToTime,
                    TimingType = task.TimingType,
                    TimingValues = task.TimingValues.ToString(),
                    TimingOneTimeDate = task.TimingOneTimeDate,
                    StartTime = task.StartTime,
                    Comments = task.Comments,
                    Status = task.Status,
                };

                return taskLog;
            });
        }

    }
}
