
using Cellcom.CheckList.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cellcom.CheckList.Helpers
{
    public interface ITaskHelper
    {
        Task<List<Models.Task>> SortTasks(List<Models.Task> tasks, TimeSpan startTime);
    }
}