namespace Cellcom.CheckList.Providers
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Threading.Tasks;
    using Cellcom.CheckList.DAL;
    using Cellcom.CheckList.Entities.AppSettings;
    using Cellcom.CheckList.Entities.Enums;
    using Cellcom.CheckList.Models;
    using Cellcom.CheckList.Providers.Helpers;
    using log4net;
    using Microsoft.Extensions.Configuration;
    using Npgsql;

    public class TaskLogProvider : ITaskLogProvider
    {
        private readonly ILog _logger = LogManager.GetLogger(typeof(MockAppProvider));
        private readonly IConfiguration _config;
        private readonly ConnectionString _connectionStringConfigs;
        private readonly ITaskLogProviderHelper _taskLogProviderHelper;
        private readonly IDataAccess _dataAccess;

        public TaskLogProvider(IConfiguration configuration, ITaskLogProviderHelper taskLogProviderHelper, IDataAccess dataAccess)
        {
            _config = configuration;
            _connectionStringConfigs = _config.GetSection("ConnectionString").Get<ConnectionString>();
            _taskLogProviderHelper = taskLogProviderHelper;
            _dataAccess = dataAccess;
        }


        public async Task<List<TaskLog>> GetTasksLog(DateTime date, int shiftId)
        {
            using (var conn = new NpgsqlConnection(_connectionStringConfigs.PostreSQL))
            {
                List<TaskLog> tasksLog = null;

                try
                {
                    tasksLog = new List<TaskLog>();

                    DataTable dataTable = await _dataAccess.GetTasksLog(date, shiftId);

                    foreach (DataRow row in dataTable.Rows)
                    {
                        TaskLog taskLog = await _taskLogProviderHelper.ConvertToTaskLog(row);
                        tasksLog.Add(taskLog);
                    }

                }
                catch (Exception ex)
                {
                    _logger.Error(ex.Message);
                    throw ex;
                }

                return tasksLog;
            }
        }

        public async Task<int> SetTaskLog(TaskLog taskLog)
        {
            int taskId = await _dataAccess.SetTaskLog(taskLog);
            return taskId;        
        }
        
    }

}