namespace Cellcom.CheckList.Providers
{
    using Cellcom.CheckList.Entities.Enums;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ITaskProvider
    {
        // Admin
        Task<Models.Task> GetTask(int taskId);
        Task<List<Models.Task>> GetTasks(bool isDisabledTasks = false, bool isDeletedTasks = false, bool isOneTimeTasks = false);
        Task<int> CreateTask(Models.Task task);
        Task<int> UpdateTask(Models.Task task);
        Task<int> DeleteTask(int taskId);
        Task<int> RestoreTask(int taskId);



        // User
        Task<List<Models.Task>> GetUserTasks(int shiftId);
        Task<int> ResetTasks(int shiftId);

        Task<int> CreateOneTimeTask(DateTime startDate, TimeSpan startTime, string taskName, string taskDetails, string comments, ETaskTimingType timingType, ETaskStatus status);
        Task<int> UpdateOneTimeTask(int taskId, DateTime startDate, TimeSpan startTime, string taskName, string taskDetails, string comments, ETaskTimingType timingType, ETaskStatus status);
        Task<int> SetTaskStatus(int taskId, ETaskStatus status);
        Task<int> SetTaskComments(int taskId, string comments);

    }
}