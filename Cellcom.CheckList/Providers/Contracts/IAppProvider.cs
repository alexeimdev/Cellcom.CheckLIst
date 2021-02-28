namespace Cellcom.CheckList.Providers
{
    using Cellcom.CheckList.Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IAppProvider
    {
        Task<List<ExternalLink>> GetExternalLinks(bool isRefresh = false);
    }
}