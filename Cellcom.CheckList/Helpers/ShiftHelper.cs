using Cellcom.CheckList.Models;
using Cellcom.CheckList.Providers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace Cellcom.CheckList.Helpers
{
    public class ShiftHelper : IShiftHelper
    {
        private readonly IShiftProvider _shiftProvider;

        public ShiftHelper(IShiftProvider shiftProvider)
        {
            _shiftProvider = shiftProvider;
        }

        public async Task<Shift> GetShift(string shiftName)
        {
            List<Shift> shifts = await _shiftProvider.GetShifts();
            Shift shift = shifts.SingleOrDefault(x => x.Name == shiftName);
            return shift;
        }

        public async Task<Shift> GetShift(int shiftId)
        {
            List<Shift> shifts = await _shiftProvider.GetShifts();
            Shift shift = shifts.SingleOrDefault(x => x.Id == shiftId);
            return shift;
        }
    }
}
