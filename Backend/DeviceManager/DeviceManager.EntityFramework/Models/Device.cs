using System;
using System.Collections.Generic;

namespace DeviceManager.EntityFramework.Models
{
    public partial class Device
    {
        public Device()
        {
            Tracking = new HashSet<Tracking>();
        }

        public int Id { get; set; }
        public string Seri { get; set; }
        public string Name { get; set; }
        public int? IdProductType { get; set; }
        public int? IdBrand { get; set; }
        public string CreatedDay { get; set; }
        public string CreatedBy { get; set; }
        public string LastUpdatedDay { get; set; }
        public string LastUpdatedBy { get; set; }
        public string Image { get; set; }

        public virtual Brand IdBrandNavigation { get; set; }
        public virtual ProductType IdProductTypeNavigation { get; set; }
        public virtual ICollection<Tracking> Tracking { get; set; }
    }
}
