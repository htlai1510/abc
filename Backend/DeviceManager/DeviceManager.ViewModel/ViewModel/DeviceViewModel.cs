using System;
using System.Collections.Generic;
using System.Text;

namespace DeviceManager.ViewModel.ViewModel
{
    public class DeviceViewModel
    {
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
        public int? IdStaff { get; set; }
        public int? IdLocation { get; set; }
        public string StartTime { get; set; }
        public string lastUpdatedTracking { get; set; }
        public int? IdTracking { get; set; }
        public string Fullname { get; set; }

        public virtual BrandViewModel IdBrandNavigation { get; set; }
        public virtual ProductTypeViewModel IdProductTypeNavigation { get; set; }
        public virtual ICollection<TrackingViewModel> Tracking { get; set; }
    }
}
