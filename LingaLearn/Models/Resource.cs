using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LingaLearn.Models
{
    public class Resource
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int LanguageId { get; set; }

        public int ResourceTypeId { get; set; }

        public string Source { get; set; }
    }
}
