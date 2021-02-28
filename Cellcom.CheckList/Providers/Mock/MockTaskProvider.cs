namespace Cellcom.CheckList.Providers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Cellcom.CheckList.Entities.Enums;
    using Cellcom.CheckList.Helpers;

    public class MockTaskProvider : ITaskProvider
    {
        private readonly IShiftHelper _shiftHelper;

        public MockTaskProvider(IShiftHelper shiftHelper)
        {
            _shiftHelper = shiftHelper;
        }

        public async Task<Models.Task> GetTask(int taskId)
        {
            await Task.Delay(0);

            return new Models.Task
            {
                Id = 1,
                Name = "כותרת 1",
                Details = "פירוט סעיף 1",
                ProcedureLink = "https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-3.1",
                Shift = await _shiftHelper.GetShift("בוקר"),
                TimingType = ETaskTimingType.DAILY,
                TimingValues = new List<EWeekDays> { EWeekDays.SUNDAY, EWeekDays.WEDNESDAY },
                StartTime = new TimeSpan(07, 30, 00),
                Comments = "1 הערות",
                CreateDate = DateTime.Now
            };
        }
        
        public async Task<List<Models.Task>> GetTasks(bool isDisabledTasks = false, bool isDeletedTasks = false, bool isOneTimeTasks = false)
        {
            await Task.Delay(0);

            return new List<Models.Task>
            {
                new Models.Task
                {
                    Id = 1,
                    Name = "כותרת 1",
                    Details = "פירוט סעיף 1",
                    ProcedureLink = "https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-3.1",
                    Shift = await _shiftHelper.GetShift("בוקר"),
                    TimingType = ETaskTimingType.DAILY,
                    TimingValues = new List<EWeekDays>{ EWeekDays.SUNDAY, EWeekDays.WEDNESDAY },
                    StartTime = new TimeSpan(07, 30, 00),
                    Comments = "1 הערות",
                    CreateDate = DateTime.Now
                },
                new Models.Task
                {
                    Id = 2,
                    Name = "כותרת 2",
                    Details = "פירוט סעיף 2",
                    ProcedureLink = "https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-2.2",
                    Shift = await _shiftHelper.GetShift("ערב"),
                    TimingType = ETaskTimingType.MOUNTLY,
                    TimingValues = new List<int>{ 18, 28 },
                    StartTime = new TimeSpan(19, 30, 00),
                    Comments = "2 הערות",
                    CreateDate = DateTime.Now
                },
                new Models.Task
                {
                    Id = 3,
                    Name = "כותרת 3",
                    Details = "פירוט סעיף 3",
                    ProcedureLink = "https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-2.0",
                    Shift = await _shiftHelper.GetShift("לילה"),
                    TimingValues = DateTime.Parse("30/12/2019"),
                    StartTime = new TimeSpan(03, 45, 00),
                    Comments = "3 הערות",
                    CreateDate = DateTime.Now
                },
                new Models.Task
                {
                    Id = 4,
                    Name = "כותרת 4",
                    Details = "פירוט סעיף 4",
                    ProcedureLink = "https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-1.6",
                    Shift = await _shiftHelper.GetShift("לילה"),
                    TimingType = ETaskTimingType.ONE_TIME,
                    TimingValues = DateTime.Parse("30/12/2019"),
                    StartTime = new TimeSpan(03, 45, 00),
                    IsDisabled = true,
                    Comments = "3 הערות",
                    CreateDate = DateTime.Now
                }
            };
        }
        
        public async Task<List<Models.Task>> GetUserTasks(int shiftId)
        {
            await Task.Delay(0);

            return new List<Models.Task>
            {
                new Models.Task
                {
                    Id = 1,
                    Details = "פירוט סעיף 1",
                    ProcedureLink = "https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-3.1",
                    Shift = await _shiftHelper.GetShift("בוקר"),
                    TimingType = ETaskTimingType.DAILY,
                    TimingValues = new List<EWeekDays>{ EWeekDays.SUNDAY, EWeekDays.WEDNESDAY },
                    StartTime = new TimeSpan(07, 30, 00),
                    Comments = "1 הערות",
                    Status = ETaskStatus.DONE,
                    CreateDate = DateTime.Now
                },
                new Models.Task
                {
                    Id = 2,
                    Name = "כותרת 2",
                    Details = "פירוט סעיף 2",
                    ProcedureLink = "https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-2.2",
                    Shift = await _shiftHelper.GetShift("ערב"),
                    TimingType = ETaskTimingType.MOUNTLY,
                    TimingValues = new List<int>{ 18, 28 },
                    StartTime = new TimeSpan(19, 30, 00),
                    Comments = "2 הערות",
                    Status = ETaskStatus.PENDING,
                    CreateDate = DateTime.Now
                },
                new Models.Task
                {
                    Id = 3,
                    Name = "כותרת 3",
                    Details = "פירוט סעיף 3",
                    ProcedureLink = "https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-2.0",
                    Shift = await _shiftHelper.GetShift("לילה"),
                    TimingType = ETaskTimingType.ONE_TIME,
                    TimingValues = DateTime.Parse("30/12/2019"),
                    StartTime = new TimeSpan(03, 45, 00),
                    Comments = "3 הערות",
                    Status = ETaskStatus.PENDING,
                    CreateDate = DateTime.Now
                },
                new Models.Task
                {
                    Id = 4,
                    Name = "כותרת 4",
                    Details = "פירוט סעיף 4",
                    ProcedureLink = "https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-1.6",
                    Shift = await _shiftHelper.GetShift("לילה"),
                    TimingType = ETaskTimingType.ONE_TIME,
                    TimingValues = DateTime.Parse("30/12/2019"),
                    StartTime = new TimeSpan(03, 45, 00),
                    IsDisabled = true,
                    Comments = "3 הערות",
                    Status = ETaskStatus.PENDING,
                    CreateDate = DateTime.Now
                }
            };
        }

        public async Task<int> ResetTasks(int shiftId)
        {
            await Task.Delay(0);
            return shiftId;
        }

        public async Task<int> CreateTask(Models.Task task)
        {
            await Task.Delay(0);
            return 10;
        }

        public async Task<int> UpdateTask(Models.Task task)
        {
            await Task.Delay(0);
            return task.Id;
        }

        public async Task<int> DeleteTask(int taskId)
        {
            await Task.Delay(0);
            return taskId;
        }

        public async Task<int> RestoreTask(int taskId)
        {
            await Task.Delay(0);
            return taskId;
        }

        public async Task<int> SetTaskComments(int taskId, string comments)
        {
            await Task.Delay(0);
            return 10;
        }

        public async Task<int> SetTaskStatus(int taskId, ETaskStatus status)
        {
            await Task.Delay(0);
            return 10;
        }

        public async Task<int> CreateOneTimeTask(DateTime startDate, TimeSpan startTime, string taskName, string taskDetails, string comments, ETaskTimingType timing, ETaskStatus status)
        {
            await Task.Delay(0);
            return 10;
        }

        public async Task<int> UpdateOneTimeTask(int taskId, DateTime startDate, TimeSpan startTime, string taskName, string taskDetails, string comments, ETaskTimingType timing, ETaskStatus status)
        {
            await Task.Delay(0);
            return 10;
        }
    }
}