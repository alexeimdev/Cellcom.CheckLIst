using System;
using System.Collections.Generic;

namespace Cellcom.CheckList.Models
{
    public class AppData
    {
        public List<ExternalLink> ExternalLinks { get; set; }
        public List<Shift> Shifts { get; set; }
        public bool IsAdmin { get; set; }
    }
}
