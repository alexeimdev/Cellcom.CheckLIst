namespace Cellcom.CheckList.Providers
{
    using Cellcom.CheckList.Entities.Enums;
    using Cellcom.CheckList.Models;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ITaskLogProvider
    {
        Task<List<TaskLog>> GetTasksLog(DateTime date, int shiftId);
        Task<int> SetTaskLog(TaskLog taskLog);
    }
}