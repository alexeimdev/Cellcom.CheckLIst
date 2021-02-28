using Cellcom.CheckList.Entities.Enums;
using Cellcom.CheckList.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Task = System.Threading.Tasks.Task;

namespace Cellcom.CheckList.Providers.Helpers
{
    public class TaskProviderHelper : ITaskProviderHelper
    {
        public async Task<Models.Task> ConvertToTask(DataRow row, List<Shift> shifts)
        {
            return await Task.Run(() =>
            {
                int id = row["id"] != null ? Convert.ToInt32(row["id"]) : -1;
                string name = row["name"].ToString();
                string details = row["details"].ToString();
                string procedureLink = row["procedure_link"].ToString();
                ETaskTimingType timingType = (ETaskTimingType)Enum.Parse(typeof(ETaskTimingType), row["timing_type"].ToString());
                string timingValues = row["timing_values"].ToString();
                TimeSpan startTime = TimeSpan.TryParse(row["start_time"].ToString(), out TimeSpan fromTimeOutput) ? fromTimeOutput : TimeSpan.Zero;
                bool isDisabled = row["is_disabled"] != null ? Convert.ToBoolean(row["is_disabled"]) : false;
                bool isDeleted = row["is_deleted"] != null ? Convert.ToBoolean(row["is_deleted"]) : false;
                ETaskStatus status = (ETaskStatus)Enum.Parse(typeof(ETaskStatus), row["status"].ToString());
                string comments = row["comments"].ToString();
                DateTime createDateTime = DateTime.TryParse(row["create_date"].ToString(), out DateTime createDateOutput) ? createDateOutput : createDateOutput;

                DateTime? updateDateTime = DateTime.TryParse(row["update_date"].ToString(), out DateTime updateDateOutput) ? updateDateOutput : updateDateOutput;
                updateDateTime = updateDateTime != new DateTime() ? updateDateTime : null;

                DateTime? timingOneTimeDate = DateTime.TryParse(row["timing_one_time_date"].ToString(), out DateTime timingOneTimeOtput) ? timingOneTimeOtput : timingOneTimeOtput;
                timingOneTimeDate = timingOneTimeDate != new DateTime() ? timingOneTimeDate : null;

                int shiftId = row["shift_id"] != null ? Convert.ToInt32(row["shift_id"]) : -1;
                string shiftName = row["shift_name"].ToString();
                Shift shift = shifts.Single(s => s.Id == shiftId && s.Name == shiftName);

                Models.Task task = new Models.Task
                {
                    Id = id,
                    Name = name,
                    Details = details,
                    ProcedureLink = procedureLink,
                    Shift = shift,
                    TimingType = timingType,
                    TimingValues = timingValues,
                    TimingOneTimeDate = timingOneTimeDate,
                    StartTime = startTime,
                    IsDisabled = isDisabled,
                    IsDeleted = isDeleted,
                    Status = status,
                    Comments = comments,
                    CreateDate = createDateTime,
                    UpdateDate = updateDateTime
                };

                return task;
            });
        }

        public async Task<Models.Task> ConvertToUserTask(DataRow row, Shift shift)
        {
            return await Task.Run(() =>
            {
                int id = row["id"] != null ? Convert.ToInt32(row["id"]) : -1;
                string name = row["name"].ToString();
                string details = row["details"].ToString();
                string procedureLink = row["procedure_link"].ToString();
                ETaskTimingType timingType = (ETaskTimingType)Enum.Parse(typeof(ETaskTimingType), row["timing_type"].ToString());
                string timingValues = row["timing_values"].ToString();
                TimeSpan startTime = TimeSpan.TryParse(row["start_time"].ToString(), out TimeSpan fromTimeOutput) ? fromTimeOutput : TimeSpan.Zero;
                bool isDisabled = row["is_disabled"] != null ? Convert.ToBoolean(row["is_disabled"]) : false;
                bool isDeleted = row["is_deleted"] != null ? Convert.ToBoolean(row["is_deleted"]) : false;
                ETaskStatus status = (ETaskStatus)Enum.Parse(typeof(ETaskStatus), row["status"].ToString());
                string comments = row["comments"].ToString();
                DateTime createDateTime = DateTime.TryParse(row["create_date"].ToString(), out DateTime createDateOutput) ? createDateOutput : createDateOutput;

                DateTime? updateDateTime = DateTime.TryParse(row["update_date"].ToString(), out DateTime updateDateOutput) ? updateDateOutput : updateDateOutput;
                updateDateTime = updateDateTime != new DateTime() ? updateDateTime : null;

                DateTime? timingOneTimeDate = DateTime.TryParse(row["timing_one_time_date"].ToString(), out DateTime timingOneTimeOtput) ? timingOneTimeOtput : timingOneTimeOtput;
                timingOneTimeDate = timingOneTimeDate != new DateTime() ? timingOneTimeDate : null;

                Models.Task task = new Models.Task
                {
                    Id = id,
                    Name = name,
                    Details = details,
                    ProcedureLink = procedureLink,
                    Shift = shift,
                    TimingType = timingType,
                    TimingValues = timingValues,
                    TimingOneTimeDate = timingOneTimeDate,
                    StartTime = startTime,
                    IsDisabled = isDisabled,
                    IsDeleted = isDeleted,
                    Status = status,
                    Comments = comments,
                    CreateDate = createDateTime,
                    UpdateDate = updateDateTime
                };

                return task;
            });
        }

    }
}
