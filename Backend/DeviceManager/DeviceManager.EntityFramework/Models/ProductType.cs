using System;
using System.Collections.Generic;

namespace DeviceManager.EntityFramework.Models
{
    public partial class ProductType
    {
        public ProductType()
        {
            Device = new HashSet<Device>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string CreatedDay { get; set; }
        public string CreatedBy { get; set; }
        public string LastUpdatedDay { get; set; }
        public string LastUpdatedBy { get; set; }

        public virtual ICollection<Device> Device { get; set; }
    }
}
