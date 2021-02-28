using Cellcom.CheckList.Entities.Enums;
using Cellcom.CheckList.Models;
using System;
using System.Data;
using System.Threading.Tasks;

namespace Cellcom.CheckList.DAL
{
    public interface IDataAccess
    {
        Task<DataTable> GetShifts();
        Task<DataTable> GetTask(int taskId);
        Task<int> CreateShift(string name, TimeSpan fromTime, TimeSpan toTime);
        Task<int> UpdateShift(int id, string name, TimeSpan fromTime, TimeSpan toTime);
        Task<int> DeleteShift(int id);
        Task<int> SetActiveShift(int id);
        Task<DataTable> GetExternalLinks();
        Task<int> CreateTask(Models.Task task);
        Task<int> UpdateTask(Models.Task task);
        Task<DataTable> GetTasks(bool isDisabled, bool isDeleted, bool isOneTimeTasks = false);
        Task<DataTable> GetUserTasks(int shiftId);
        Task<int> ResetTasks(int shiftId);

        Task<int> DeleteTask(int id);
        Task<int> RestoreTask(int id);
        Task<int> SetTaskStatus(int id, ETaskStatus status);
        Task<int> SetTaskComments(int id, string comments);
        Task<int> CreateOneTimeTask(DateTime startDate, TimeSpan startTime, Shift shift, string taskName, string taskDetails, string comments , ETaskTimingType timingType, ETaskStatus status);
        Task<int> UpdateOneTimeTask(int taskId, DateTime startDate, TimeSpan startTime, Shift shift, string taskName, string taskDetails, string comments, ETaskTimingType timingType, ETaskStatus status);
    
        Task<DataTable> GetTasksLog(DateTime date, int shiftId);
        Task<int> SetTaskLog(TaskLog taskLog);
    }
}
