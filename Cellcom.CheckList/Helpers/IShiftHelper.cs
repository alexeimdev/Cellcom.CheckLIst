
using Cellcom.CheckList.Models;
using System.Threading.Tasks;

namespace Cellcom.CheckList.Helpers
{
    public interface IShiftHelper
    {
        Task<Shift> GetShift(string shiftName);
        Task<Shift> GetShift(int shiftId);
    }
}