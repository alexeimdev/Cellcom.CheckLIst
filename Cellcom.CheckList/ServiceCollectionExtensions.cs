using Cellcom.CheckList.DAL;
using Cellcom.CheckList.Helpers;
using Cellcom.CheckList.Providers;
using Cellcom.CheckList.Providers.Helpers;
using Microsoft.Extensions.DependencyInjection;

namespace Cellcom.CheckList
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddProviderServices(this IServiceCollection services)
        {
            services.AddSingleton<IAppProvider, AppProvider>();
            services.AddSingleton<IShiftProvider, ShiftProvider>();
            services.AddSingleton<ITaskProvider, TaskProvider>();
            services.AddSingleton<ITaskLogProvider, TaskLogProvider>();

            return services;
        }

        public static IServiceCollection AddDataAccessServices(this IServiceCollection services)
        {
            services.AddSingleton<IDataAccess, PostgresDataAccess>();
            return services;
        }

        public static IServiceCollection AddHelperServices(this IServiceCollection services)
        {
            services.AddSingleton<IShiftHelper, ShiftHelper>();
            services.AddSingleton<ITaskProviderHelper, TaskProviderHelper>();
            services.AddSingleton<ITaskLogProviderHelper, TaskLogProviderHelper>();
            services.AddSingleton<ITaskHelper, TaskHelper>();
            services.AddSingleton<ITaskLogHelper, TaskLogHelper>();
            return services;
        }
    }
}
