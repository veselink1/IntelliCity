using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartCity.Models
{
    public partial class Problem
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Category { get; set; }
        public byte[] Image { get; set; }
        public DateTime Date { get; set; }
    }
}
