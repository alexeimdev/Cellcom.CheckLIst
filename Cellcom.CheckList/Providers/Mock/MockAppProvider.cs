namespace Cellcom.CheckList.Providers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Cellcom.CheckList.Models;
    
    public class MockAppProvider : IAppProvider
    {
        public async Task<List<Shift>> GetShifts(bool isRefresh)
        {
            await System.Threading.Tasks.Task.Delay(0);

            return new List<Shift>
            {
                new Shift
                {
                    Id = 1,
                    Name = "בוקר",
                    FromTime = new TimeSpan(6, 30, 0),
                    ToTime = new TimeSpan(14, 30, 0)
                },
                new Shift
                {
                    Id = 2,
                    Name = "ערב",
                    FromTime = new TimeSpan(14, 31, 0),
                    ToTime = new TimeSpan(22, 30, 0)
                },
                new Shift
                {
                    Id = 3,
                    Name = "לילה",
                    FromTime = new TimeSpan(22, 31, 0),
                    ToTime = new TimeSpan(06, 29, 0)
                },
            };
        }

        public async Task<List<ExternalLink>> GetExternalLinks(bool isRefresh)
        {
            await System.Threading.Tasks.Task.Delay(0);

            return new List<ExternalLink>
            {
                new ExternalLink
                {
                    Id = 1,
                    Name = "קישור 1",
                    Url = "https://docs.microsoft.com/en-us/aspnet/core/performance/caching/memory?view=aspnetcore-3.1"
                },
                new ExternalLink
                {
                    Id = 2,
                    Name = "קישור 2",
                    Url = "https://docs.microsoft.com/en-us/aspnet/core/performance/caching/distributed?view=aspnetcore-3.1"
                },
                new ExternalLink
                {
                    Id = 3,
                    Name = "קישור 3",
                    Url = "https://docs.microsoft.com/en-us/aspnet/core/performance/caching/middleware?view=aspnetcore-3.1"
                },
                new ExternalLink
                {
                    Id = 4,
                    Name = "קישור 4",
                    Url = "https://docs.microsoft.com/en-us/aspnet/core/performance/caching/middleware?view=aspnetcore-3.1"
                }
            };
        }


    }

}