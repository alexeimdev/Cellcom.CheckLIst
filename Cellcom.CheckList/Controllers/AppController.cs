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
    public class AppController : ControllerBase
    {
        private readonly ILog _logger = LogManager.GetLogger(typeof(AppController));
        private readonly IAppProvider _appProvider;
        private readonly IShiftProvider _shiftProvider;
        private readonly IConfiguration _config;

        public AppController(IAppProvider appProvider, IShiftProvider shiftProvider, IConfiguration config)
        {
            _appProvider = appProvider;
            _shiftProvider = shiftProvider;
            _config = config;
        }

        [HttpGet]
        public async Task<IActionResult> GetAppData()
        {
            try
            {
                _logger.Debug("GetAppData - request");

                List<Shift> shifts = await _shiftProvider.GetShifts();
                List<ExternalLink> externalLinks = await _appProvider.GetExternalLinks();

                string adminGroup = _config.GetValue<string>("Groups:Admin");
                bool isAdmin = User.IsInRole(adminGroup);

                AppData appData = new AppData
                {
                    ExternalLinks = externalLinks,
                    Shifts = shifts,
                    IsAdmin = isAdmin
                };

                _logger.Debug($"GetAppData - response: {JsonConvert.SerializeObject(appData).ToString()}");

                return Ok(appData);
            }
            catch (Exception ex)
            {
                _logger.Debug("GetAppData - error", ex);
                throw ex;
            }
        }

    }


}
