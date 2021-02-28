using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Cellcom.CheckList.Models;

namespace Cellcom.CheckList.Providers.Helpers
{
    public interface ITaskProviderHelper
    {
        Task<Models.Task> ConvertToTask(DataRow row, List<Shift> shifts);
        Task<Models.Task> ConvertToUserTask(DataRow row, Shift shift);
    }

}