namespace Cellcom.CheckList.Providers
{
    using Cellcom.CheckList.Models;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IShiftProvider
    {
        Task<List<Shift>> GetShifts(bool isRefresh = false);
        Task<int> CreateShift(string name, TimeSpan fromTime, TimeSpan toTime);
        Task<int> UpdateShift(int id, string name, TimeSpan fromTime, TimeSpan toTime);
        Task<int> DeleteShift(int id);
        Task<int> SetActiveShift(int id);
    }
}