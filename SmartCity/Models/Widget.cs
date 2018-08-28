using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartCity.Models
{
    public partial class Widget
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public string WidgetData { get; set; }
    }
}
