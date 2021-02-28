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

    public class TaskProvider : ITaskProvider
    {
        private readonly ILog _logger = LogManager.GetLogger(typeof(MockAppProvider));
        private readonly IConfiguration _config;
        private readonly ConnectionString _connectionStringConfigs;
        private readonly IShiftProvider _shiftProvider;
        private readonly ITaskProviderHelper _taskProviderHelper;
        private readonly IDataAccess _dataAccess;

        public TaskProvider(IConfiguration configuration, IDataAccess dataAccess, IShiftProvider shiftProvider, ITaskProviderHelper taskProviderHelper)
        {
            _config = configuration;
            _connectionStringConfigs = _config.GetSection("ConnectionString").Get<ConnectionString>();
            _shiftProvider = shiftProvider;
            _taskProviderHelper = taskProviderHelper;
            _dataAccess = dataAccess;
        }

        public async Task<Models.Task> GetTask(int taskId)
        {
            Models.Task task;

            using (var conn = new NpgsqlConnection(_connectionStringConfigs.PostreSQL))
            {
                List<Shift> shifts = await _shiftProvider.GetShifts();
                
                try
                {
                    DataTable dataTable = await _dataAccess.GetTask(taskId);

                    DataRow row = dataTable.Rows[0];
                    task = await _taskProviderHelper.ConvertToTask(row, shifts);
                }
                catch (Exception ex)
                {
                    _logger.Error(ex.Message);
                    throw ex;
                }

                return task;
            }
        }

        public async Task<List<Models.Task>> GetTasks(bool isDisabledTasks = false, bool isDeletedTasks = false, bool isOneTimeTasks = false)
        {
            using (var conn = new NpgsqlConnection(_connectionStringConfigs.PostreSQL))
            {
                List<Models.Task> tasks = null;
                List<Shift> shifts = await _shiftProvider.GetShifts();

                try
                {
                    tasks = new List<Models.Task>();

                    DataTable dataTable = await _dataAccess.GetTasks(isDisabledTasks, isDeletedTasks, isOneTimeTasks);

                    foreach (DataRow row in dataTable.Rows)
                    {
                        Models.Task task = await _taskProviderHelper.ConvertToTask(row, shifts);
                        tasks.Add(task);
                    }

                }
                catch (Exception ex)
                {
                    _logger.Error(ex.Message);
                    throw ex;
                }

                return tasks;
            }
        }

        public async Task<List<Models.Task>> GetUserTasks(int shiftId)
        {
            using (var conn = new NpgsqlConnection(_connectionStringConfigs.PostreSQL))
            {
                List<Models.Task> tasks = null;
                List<Shift> shifts = await _shiftProvider.GetShifts();
                Shift shift = shifts.Single(s => s.Id == shiftId);

                try
                {
                    tasks = new List<Models.Task>();

                    DataTable dataTable = await _dataAccess.GetUserTasks(shiftId);

                    foreach (DataRow row in dataTable.Rows)
                    {
                        Models.Task task = await _taskProviderHelper.ConvertToUserTask(row, shift);
                        tasks.Add(task);
                    }

                }
                catch (Exception ex)
                {
                    _logger.Error(ex.Message);
                    throw ex;
                }

                tasks = tasks.OrderBy(x => x.StartTime).ToList();
                return tasks;
            }
        }

        public async Task<int> ResetTasks(int shiftId)
        {
            int modifiedTasksShiftId = await _dataAccess.ResetTasks(shiftId);
            return modifiedTasksShiftId;
        }

        public async Task<int> CreateTask(Models.Task task)
        {
            int newTaskId = await _dataAccess.CreateTask(task);
            return newTaskId;
        }

        public async Task<int> UpdateTask(Models.Task task)
        {
            int modifiedId = await _dataAccess.UpdateTask(task);
            return modifiedId;
        }
        
        public async Task<int> DeleteTask(int taskId)
        {
            int deletedTaskId = await _dataAccess.DeleteTask(taskId);
            return deletedTaskId;
        }

        public async Task<int> RestoreTask(int taskId)
        {
            int restoredTaskId = await _dataAccess.RestoreTask(taskId);
            return restoredTaskId;
        }

        public async Task<int> CreateOneTimeTask(DateTime startDate, TimeSpan startTime, string taskName, string taskDetails, string comments, ETaskTimingType timing, ETaskStatus status)
        {
            List<Shift> shifts = await _shiftProvider.GetShifts();

            Shift shift = shifts.First(s => Utils.DateTimeUtil.IsTimeInRange(s.FromTime, s.ToTime, startTime));

            int taskId = await _dataAccess.CreateOneTimeTask(startDate, startTime, shift, taskName, taskDetails, comments, timing, status);
            return taskId;
        }

        public async Task<int> UpdateOneTimeTask(int taskId, DateTime startDate, TimeSpan startTime, string taskName, string taskDetails, string comments, ETaskTimingType timing, ETaskStatus status)
        {
            List<Shift> shifts = await _shiftProvider.GetShifts();

            Shift shift = shifts.First(s => Utils.DateTimeUtil.IsTimeInRange(s.FromTime, s.ToTime, startTime));

            int modifiedTaskId = await _dataAccess.UpdateOneTimeTask(taskId, startDate, startTime, shift, taskName, taskDetails, comments, timing, status);
            return modifiedTaskId;
        }

        public async Task<int> SetTaskStatus(int taskId, ETaskStatus status)
        {
            int changedtaskId = await _dataAccess.SetTaskStatus(taskId, status);
            return changedtaskId;
        }

        public async Task<int> SetTaskComments(int taskId, string comments)
        {
            int changedtaskId = await _dataAccess.SetTaskComments(taskId, comments);
            return changedtaskId;
        }

    }
}