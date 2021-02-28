namespace Cellcom.CheckList.Providers
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Threading.Tasks;
    using Cellcom.CheckList.DAL;
    using Cellcom.CheckList.Models;
    using log4net;
    using Microsoft.Extensions.Caching.Memory;

    public class ShiftProvider : IShiftProvider
    {
        private readonly ILog _logger = LogManager.GetLogger(typeof(AppProvider));
        private readonly IMemoryCache _cache;
        private readonly IDataAccess _dataAccess;

        public ShiftProvider(IMemoryCache memoryCache, IDataAccess dataAccess)
        {
            _cache = memoryCache;
            _dataAccess = dataAccess;
        }

        public async Task<List<Shift>> GetShifts(bool isRefresh = false)
        {
            const string SHIFTS_KEY = "shifts";

            List<Shift> shitfs;

            bool isCached = _cache.TryGetValue(SHIFTS_KEY, out shitfs);
            bool isCacheEmpty = isCached && !shitfs.Any();

            if (isRefresh || !isCached || (isCached && isCacheEmpty))
            {
                try
                {
                    shitfs = new List<Shift>();

                    DataTable dataTable = await _dataAccess.GetShifts();

                    foreach (DataRow row in dataTable.Rows)
                    {
                        shitfs.Add(new Shift
                        {
                            Id = row["id"] != null ? Convert.ToInt32(row["id"]) : -1,
                            Name = row["name"].ToString(),
                            Order = row["order_number"] != null ? Convert.ToInt32(row["order_number"]) : -1,
                            FromTime = TimeSpan.TryParse(row["from_time"].ToString(), out TimeSpan fromTimeOutput) ? fromTimeOutput : TimeSpan.Zero,
                            ToTime = TimeSpan.TryParse(row["to_time"].ToString(), out TimeSpan toTimeOutput) ? toTimeOutput : TimeSpan.Zero,
                            IsCurrentActive = row["is_current_active"] != null ? Convert.ToBoolean(row["is_current_active"]) : false,
                        });
                    }
                    if (shitfs.Any())
                    {
                        _cache.Set(SHIFTS_KEY, shitfs);
                    }
                }
                catch (Exception ex)
                {
                    _logger.Error(ex.Message);
                }
            }

            shitfs = shitfs.OrderBy(x =>x.Order).ToList();
            return shitfs;
        }

        public async Task<int> CreateShift(string name, TimeSpan fromTime, TimeSpan toTime)
        {
            int newShiftId = await _dataAccess.CreateShift(name, fromTime, toTime);
            return newShiftId;
        }

        public async Task<int> DeleteShift(int id)
        {
            int deletedShiftId = await _dataAccess.DeleteShift(id);
            return deletedShiftId;
        }

        public async Task<int> SetActiveShift(int id)
        {
            int modifiedShiftId = await _dataAccess.SetActiveShift(id);
            return modifiedShiftId;
        }

        public async Task<int> UpdateShift(int id, string name, TimeSpan fromTime, TimeSpan toTime)
        {
            int modifiedShiftId = await _dataAccess.UpdateShift(id, name, fromTime, toTime);
            return modifiedShiftId;
        }
    }
}