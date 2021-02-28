using System.Collections.Generic;
using System.Threading.Tasks;
using Cellcom.CheckList.Providers;
using Cellcom.CheckList.Models;
using log4net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Cellcom.CheckList.Entities.Enums;
using System;
using System.Linq;
using Cellcom.CheckList.Helpers;
using Cellcom.CheckList.Providers.Helpers;

namespace Cellcom.CheckList.Controllers
{
    [Authorize(Roles = "CheckList-Admins, CheckList-Users")]
    [Route("api/[controller]/[action]")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ILog _logger = LogManager.GetLogger(typeof(TaskController));
        private readonly IConfiguration _config;
        private readonly ITaskProvider _taskProvider;
        private readonly ITaskLogProvider _taskLogProvider;
        private readonly IShiftProvider _shiftProvider;
        private readonly ITaskLogProviderHelper _taskLogProviderHelper;
        private readonly IShiftHelper _shiftHelper;
        private readonly ITaskHelper _taskHelper;

        public TaskController(IConfiguration configuration, ITaskProvider taskProvider, ITaskLogProvider taskLogProvider, IShiftProvider shiftProvider, ITaskLogProviderHelper taskLogProviderHelper, IShiftHelper shiftHelper, ITaskHelper taskHelper)
        {
            _config = configuration;
            _taskProvider = taskProvider;
            _taskLogProvider = taskLogProvider;
            _shiftProvider = shiftProvider;
            _taskLogProviderHelper = taskLogProviderHelper;
            _shiftHelper = shiftHelper;
            _taskHelper = taskHelper;
        }


        [Authorize(Roles = "CheckList-Admins")]
        [HttpGet]
        public async Task<IActionResult> GetTask(int taskId)
        {
            _logger.Debug($"GetTask - request");
            _logger.Debug($"GetTask - taskId: {taskId}");

            try
            {
                Models.Task task = await _taskProvider.GetTask(taskId);

                _logger.Debug($"GetTask - task: {JsonConvert.SerializeObject(task).ToString()}");
                return Ok(task);
            }
            catch (Exception ex)
            {
                _logger.Error("GetTask - Error", ex);
                throw ex;
            }

        }


        [Authorize(Roles = "CheckList-Admins")]
        [HttpGet]
        public async Task<IActionResult> GetTasks(bool isDisabledTasks = false, bool isDeletedTasks = false, bool isOneTimeTasks = false)
        {
            _logger.Debug("GetTasks - request");
            _logger.Debug($"GetTasks - isDisabledTasks: {isDisabledTasks}, isDeletedTasks: {isDeletedTasks}, isOneTimeTasks: {isOneTimeTasks}");

            try
            {
                List<Models.Task> tasks = await _taskProvider.GetTasks(isDisabledTasks, isDeletedTasks, isOneTimeTasks);

                _logger.Debug($"GetTasks - tasks: {JsonConvert.SerializeObject(tasks).ToString()}");

                return Ok(tasks);
            }
            catch (Exception ex)
            {
                _logger.Error("GetTasks - Error", ex);
                throw ex;
            }
        }


        [HttpGet]
        public async Task<IActionResult> GetUserTasks(int shiftId)
        {
            _logger.Debug("GetUserTasks - request");
            _logger.Debug($"GetUserTasks - shiftId: {shiftId}");

            try
            {
                List<Models.Task> tasks = await _taskProvider.GetUserTasks(shiftId);

                List<Shift> shifts = await _shiftProvider.GetShifts();
                Shift shift = shifts.FirstOrDefault(x => x.Id == shiftId);
                TimeSpan shiftStartTime = shift.FromTime;

                tasks = await _taskHelper.SortTasks(tasks, shiftStartTime);

                _logger.Debug($"GetUserTasks - tasks: {JsonConvert.SerializeObject(tasks).ToString()}");

                return Ok(tasks);
            }
            catch (Exception ex)
            {
                _logger.Error("GetUserTasks - Error", ex);
                throw ex;
            }
        }


        [HttpPost]
        public async Task<IActionResult> ResetTasks(ResetTasksRequest request)
        {
            _logger.Debug($"ResetTasks - requset: {JsonConvert.SerializeObject(request).ToString()}");

            try
            {
                int shiftId = await _taskProvider.ResetTasks(request.ShiftId);

                _logger.Debug($"ResetTasks - shiftId: {shiftId}");

                return Ok(shiftId);
            }
            catch (Exception ex)
            {
                _logger.Error("ResetTasks - Error", ex);
                throw ex;
            }
        }


        [Authorize(Roles = "CheckList-Admins")]
        [HttpPost]
        public async Task<IActionResult> UpdateTask(UpdateTaskRequest request)
        {
            _logger.Debug($"UpdateTask - requset: {JsonConvert.SerializeObject(request).ToString()}");

            try
            {
                Models.Task task = new Models.Task
                {
                    Id = request.TaskId,
                    Name = request.Name,
                    Details = request.Details,
                    ProcedureLink = request.ProcedureLink,
                    Shift = await _shiftHelper.GetShift(request.ShiftId),
                    TimingType = request.TimingType,
                    TimingValues = request.TimingValues,
                    StartTime = request.StartTime,
                    IsDisabled = request.IsDisabled,
                    TimingOneTimeDate = request.TimingOneTimeDate
                };

                int modifiedTaskId = await _taskProvider.UpdateTask(task);

                _logger.Debug($"UpdateTask - modifiedTaskId: {modifiedTaskId}");

                return Ok(modifiedTaskId);
            }
            catch (Exception ex)
            {
                _logger.Error("UpdateTask - Error", ex);
                throw ex;
            }
        }


        [Authorize(Roles = "CheckList-Admins")]
        [HttpPost]
        public async Task<IActionResult> CreateTask(CreateTaskRequest request)
        {
            _logger.Debug($"CreateTask - requset: {JsonConvert.SerializeObject(request).ToString()}");

            try
            {
                Models.Task newTask = new Models.Task
                {
                    Name = request.Name,
                    Details = request.Details,
                    ProcedureLink = request.ProcedureLink,
                    Shift = await _shiftHelper.GetShift(request.ShiftId),
                    TimingType = request.TimingType,
                    TimingValues = request.TimingValues,
                    TimingOneTimeDate = request.TimingOneTimeDate,
                    StartTime = request.StartTime,
                    IsDisabled = request.IsDisabled
                };

                int newTaskId = await _taskProvider.CreateTask(newTask);

                _logger.Debug($"CreateTask - newTaskId: {newTaskId}");

                return Ok(newTaskId);
            }
            catch (Exception ex)
            {
                _logger.Error("CreateTask - Error", ex);
                throw ex;
            }
        }


        [Authorize(Roles = "CheckList-Admins")]
        [HttpPost]
        public async Task<IActionResult> DeleteTask(DeleteTaskRequest request)
        {
            _logger.Debug($"DeleteTask - requset: {JsonConvert.SerializeObject(request).ToString()}");

            try
            {
                int deletedTaskId = await _taskProvider.DeleteTask(request.Id);

                _logger.Debug($"DeleteTask - deletedTaskId: {deletedTaskId}");

                return Ok(deletedTaskId);
            }
            catch (Exception ex)
            {
                _logger.Error("DeleteTask - Error", ex);
                throw ex;
            }
        }


        [Authorize(Roles = "CheckList-Admins")]
        [HttpPost]
        public async Task<IActionResult> RestoreTask(RestoreTaskRequest request)
        {
            _logger.Debug($"RestoreTask - requset: {JsonConvert.SerializeObject(request).ToString()}");

            try
            {
                int restoredTaskId = await _taskProvider.RestoreTask(request.Id);

                _logger.Debug($"RestoreTask - restoredTaskId: {restoredTaskId}");

                return Ok(restoredTaskId);
            }
            catch (Exception ex)
            {
                _logger.Error("RestoreTask - Error", ex);
                throw ex;
            }
        }


        [HttpPost]
        public async Task<IActionResult> SetTaskStatus(SetTaskStatusRequest request)
        {

            _logger.Debug($"SetTaskStatus - requset: {JsonConvert.SerializeObject(request).ToString()}");

            try
            {
                int modifiedTaskId = await _taskProvider.SetTaskStatus(request.Id, request.Status);
                _logger.Debug($"SetTaskStatus - modifiedTaskId: {modifiedTaskId}");

                try
                {
                    await System.Threading.Tasks.Task.Run(async () => 
                    {
                        Models.Task task = await _taskProvider.GetTask(modifiedTaskId);
                        TaskLog taskLog = await _taskLogProviderHelper.ConvertToTaskLog(task);
                        await _taskLogProvider.SetTaskLog(taskLog);
                    });
                }
                catch (Exception ex)
                {
                    _logger.Error($"SetTaskStatus - Logging failed: modifiedTaskId{modifiedTaskId}", ex);
                }

                return Ok(modifiedTaskId);
            }
            catch (Exception ex)
            {
                _logger.Error("SetTaskStatus - Error", ex);
                throw ex;
            }
        }


        [HttpPost]
        public async Task<IActionResult> SetTaskComments(SetTaskCommentsRequest request)
        {
            _logger.Debug($"SetTaskComments - requset: {JsonConvert.SerializeObject(request).ToString()}");

            try
            {
                int modifiedTaskId = await _taskProvider.SetTaskComments(request.Id, request.Comments);

                _logger.Debug($"SetTaskComments - modifiedTaskId: {modifiedTaskId}");

                return Ok(modifiedTaskId);
            }
            catch (Exception ex)
            {
                _logger.Error("SetTaskComments - Error", ex);
                throw ex;
            }
        }


        [HttpPost]
        public async Task<IActionResult> CreateOneTimeTask(CreateOneTimeTaskRequest request)
        {
            _logger.Debug($"CreateOneTimeTask - requset: {JsonConvert.SerializeObject(request).ToString()}");

            try
            {
                int taskId = await _taskProvider.CreateOneTimeTask(request.StartDate, request.StartTime, request.Name, request.Details, request.Comments, ETaskTimingType.ONE_TIME, ETaskStatus.PENDING);

                _logger.Debug($"CreateOneTimeTask - taskId: {taskId}");

                return Ok(taskId);
            }
            catch (Exception ex)
            {
                _logger.Error("CreateOneTimeTask - Error", ex);
                throw ex;
            }
        }


        [HttpPost]
        public async Task<IActionResult> UpdateOneTimeTask(UpdateOneTimeTaskRequest request)
        {
            _logger.Debug($"UpdateOneTimeTask - requset: {JsonConvert.SerializeObject(request).ToString()}");

            try
            {
                int modifiedTaskId = await _taskProvider.UpdateOneTimeTask(request.TaskId, request.StartDate, request.StartTime, request.Name, request.Details, request.Comments, ETaskTimingType.ONE_TIME, ETaskStatus.PENDING);

                _logger.Debug($"UpdateOneTimeTask - modifiedTaskId: {modifiedTaskId}");

                return Ok(modifiedTaskId);
            }
            catch (Exception ex)
            {
                _logger.Error("UpdateOneTimeTask - Error", ex);
                throw ex;
            }
        }


        public class CreateTaskRequest
        {
            public string Name { get; set; }
            public string Details { get; set; }
            public string ProcedureLink { get; set; }
            public int ShiftId { get; set; }
            public ETaskTimingType TimingType { get; set; }
            public object TimingValues { get; set; }
            public DateTime? TimingOneTimeDate { get; set; }
            public TimeSpan StartTime { get; set; }
            public bool IsDisabled { get; set; }
        }

        public class UpdateTaskRequest
        {
            public int TaskId { get; set; }
            public string Name { get; set; }
            public string Details { get; set; }
            public string ProcedureLink { get; set; }
            public int ShiftId { get; set; }
            public ETaskTimingType TimingType { get; set; }
            public object TimingValues { get; set; }
            public TimeSpan StartTime { get; set; }
            public bool IsDisabled { get; set; }
            public DateTime? TimingOneTimeDate { get; set; }
        }

        public class ResetTasksRequest
        {
            public int ShiftId { get; set; }
        }

        public class DeleteTaskRequest
        {
            public int Id { get; set; }
        }

        public class RestoreTaskRequest
        {
            public int Id { get; set; }
        }

        public class SetTaskStatusRequest
        {
            public int Id { get; set; }
            public ETaskStatus Status { get; set; }
        }

        public class SetTaskCommentsRequest
        {
            public int Id { get; set; }
            public string Comments { get; set; }
        }

        public class CreateOneTimeTaskRequest
        {
            public string Name { get; set; }
            public string Details { get; set; }
            public string Comments { get; set; }
            public DateTime StartDate { get; set; }
            public TimeSpan StartTime { get; set; }
        }

        public class UpdateOneTimeTaskRequest
        {
            public int TaskId { get; set; }
            public string Name { get; set; }
            public string Details { get; set; }
            public string Comments { get; set; }
            public DateTime StartDate { get; set; }
            public TimeSpan StartTime { get; set; }
        }

    }

}
