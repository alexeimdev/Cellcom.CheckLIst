namespace Cellcom.CheckList.Providers
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Threading.Tasks;
    using Cellcom.CheckList.DAL;
    using Cellcom.CheckList.Entities.AppSettings;
    using Cellcom.CheckList.Entities.Enums;
    using Cellcom.CheckList.Models;
    using log4net;
    using Microsoft.Extensions.Caching.Memory;
    using Microsoft.Extensions.Configuration;
    using Npgsql;
    using NpgsqlTypes;

    public class AppProvider : IAppProvider
    {
        private readonly ILog _logger = LogManager.GetLogger(typeof(AppProvider));
        private readonly IMemoryCache _cache;
        private readonly IDataAccess _dataAccess;

        public AppProvider(IMemoryCache memoryCache, IDataAccess dataAccess)
        {
            _cache = memoryCache;
            _dataAccess = dataAccess;
        }

        public async Task<List<ExternalLink>> GetExternalLinks(bool isRefresh = false)
        {
            const string EXTERNAL_LINKS_KEY = "external_links";

            List<ExternalLink> externalLinks;

            bool isCached = _cache.TryGetValue(EXTERNAL_LINKS_KEY, out externalLinks);
            bool isCacheEmpty = isCached && !externalLinks.Any();

            if (isRefresh || !isCached || (isCached && isCacheEmpty))
            {
                try
                {
                    externalLinks = new List<ExternalLink>();

                    DataTable dataTable = await _dataAccess.GetExternalLinks();

                    foreach (DataRow row in dataTable.Rows)
                    {
                        externalLinks.Add(new ExternalLink
                        {
                            Id = row["id"] !=null ? Convert.ToInt32(row["id"]) : -1,
                            Name = row["name"].ToString(),
                            Url = row["url"].ToString()
                        });
                    }
                    if (externalLinks.Any())
                    {
                        _cache.Set(EXTERNAL_LINKS_KEY, externalLinks);
                    }

                    return externalLinks;
                }
                catch (Exception ex)
                {
                    _logger.Error(ex.Message);
                }
            }

            return externalLinks;
        }

    }
}