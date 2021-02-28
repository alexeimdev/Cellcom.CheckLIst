
using Cellcom.CheckList.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cellcom.CheckList.Helpers
{
    public interface ITaskLogHelper
    {
        Task<List<TaskLog>> SortTasks(List<TaskLog> tasks, TimeSpan startTime);
    }
}