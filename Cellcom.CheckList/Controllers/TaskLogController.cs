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

namespace Cellcom.CheckList.Controllers
{
    [Authorize(Roles = "CheckList-Admins")]
    [Route("api/[controller]/[action]")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    [ApiController]
    public class TaskLogController : ControllerBase
    {
        private readonly ILog _logger = LogManager.GetLogger(typeof(TaskLogController));
        private readonly IConfiguration _config;
        private readonly IShiftProvider _shiftProvider;
        private readonly ITaskLogProvider _taskLogProvider;
        private readonly ITaskLogHelper _taskLogHelper;

        public TaskLogController(IConfiguration configuration, IShiftProvider shiftProvider, ITaskLogProvider taskLogProvider, ITaskLogHelper taskLogHelper)
        {
            _config = configuration;
            _shiftProvider = shiftProvider;
            _taskLogProvider = taskLogProvider;
            _taskLogHelper = taskLogHelper;
        }

        [HttpPost]
        public async Task<IActionResult> GetTasksLog(GetTasksLogParams requestParam)
        {
            _logger.Debug("GetTasksLog - request");
            _logger.Debug($"GetTasksLog - date: {requestParam.Date.ToString()}, shiftId: {requestParam.ShiftId}");

            try
            {
                List<TaskLog> tasksLog = await _taskLogProvider.GetTasksLog(requestParam.Date, requestParam.ShiftId);

                List<Shift> shifts = await _shiftProvider.GetShifts();
                Shift shift = shifts.FirstOrDefault(x => x.Id == requestParam.ShiftId);
                TimeSpan shiftStartTime = shift.FromTime;

                tasksLog = await _taskLogHelper.SortTasks(tasksLog, shiftStartTime);

                _logger.Debug($"GetTasksLog - tasks: {JsonConvert.SerializeObject(tasksLog).ToString()}");

                return Ok(tasksLog);
            }
            catch (Exception ex)
            {
                _logger.Error("GetTasksLog - Error", ex);
                throw ex;
            }
        }

        public class GetTasksLogParams
        {
            public DateTime Date { get; set; }
            public int ShiftId { get; set; }
        }

    }

}
