using Cellcom.CheckList.Models;
using Cellcom.CheckList.Providers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace Cellcom.CheckList.Helpers
{
    public class TaskHelper : ITaskHelper
    {
        public TaskHelper()
        {
        }

        public async Task<List<Models.Task>> SortTasks(List<Models.Task> tasks, TimeSpan startTime)
        {
            return await System.Threading.Tasks.Task.Run(() => 
            {
                List<Models.Task> tasksPart1 = tasks.Where(x => startTime <= x.StartTime).ToList();
                List<Models.Task> tasksPart2 = tasks.Where(x => startTime > x.StartTime).ToList();

                tasksPart1.OrderBy(x => x.StartTime);
                tasksPart2.OrderBy(x => x.StartTime);

                tasksPart1.AddRange(tasksPart2);

                return tasksPart1;
            });
        }
    }
}
