using System.Collections.Generic;
using System.Threading.Tasks;
using Cellcom.CheckList.Providers;
using Cellcom.CheckList.Entities.AppSettings;
using Cellcom.CheckList.Models;
using log4net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;

namespace Cellcom.CheckList.Controllers
{        
    [Authorize(Roles = "CheckList-Admins, CheckList-Users")]
    [Route("api/[controller]/[action]")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    [ApiController]
    public class ShiftController : ControllerBase
    {
        private readonly ILog _logger = LogManager.GetLogger(typeof(ShiftController));
        private readonly IShiftProvider _shiftProvider;

        public ShiftController(IShiftProvider shiftProvider)
        {
            _shiftProvider = shiftProvider;
        }

        [HttpPost]
        public async Task<IActionResult> SetActiveShift(SetActiveShiftRequest request)
        {
            _logger.Debug($"SetActiveShift - requset: {JsonConvert.SerializeObject(request).ToString()}");

            try
            {
                int modifiedShiftId = await _shiftProvider.SetActiveShift(request.Id);

                _logger.Debug($"SetActiveShift - modifiedShiftId: {modifiedShiftId}");

                return Ok(modifiedShiftId);
            }
            catch (Exception ex)
            {
                _logger.Error("SetActiveShift - Error", ex);
                throw ex;
            }
        }

    }

    public class SetActiveShiftRequest
    {
        public int Id { get; set; }
    }

}
