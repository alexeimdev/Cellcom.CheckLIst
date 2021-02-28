using System.Data;
using System.Threading.Tasks;
using Cellcom.CheckList.Models;

namespace Cellcom.CheckList.Providers.Helpers
{
    public interface ITaskLogProviderHelper
    {
        Task<TaskLog> ConvertToTaskLog(DataRow row);
        Task<TaskLog> ConvertToTaskLog(Models.Task task);
    }

}