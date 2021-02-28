using Cellcom.CheckList.Models;
using Cellcom.CheckList.Providers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace Cellcom.CheckList.Helpers
{
    public class TaskLogHelper : ITaskLogHelper
    {
        public TaskLogHelper()
        {
        }

        public async Task<List<TaskLog>> SortTasks(List<TaskLog> tasks, TimeSpan startTime)
        {
            return await System.Threading.Tasks.Task.Run(() => 
            {
                List<TaskLog> tasksPart1 = tasks.Where(x => startTime >= x.StartTime).ToList();
                List<TaskLog> tasksPart2 = tasks.Where(x => startTime < x.StartTime).ToList();

                tasksPart1.OrderBy(x => x.StartTime);
                tasksPart2.OrderBy(x => x.StartTime);

                tasksPart1.AddRange(tasksPart2);

                return tasksPart1;
            });
        }
    }
}
