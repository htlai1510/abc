using System;
using System.Collections.Generic;
using System.Text;

namespace DeviceManager.ViewModel.ViewModel
{
    public class StaffViewModel
    {
        public int Id { get; set; }
        public string Fullname { get; set; }
        public int? Age { get; set; }
        public string NumberPhone { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public int? IdLocation { get; set; }
        public int? IdPosition { get; set; }
        public string CreatedDay { get; set; }
        public string CreatedBy { get; set; }
        public string LastUpdatedDay { get; set; }
        public string LastUpdatedBy { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Image { get; set; }
        public int? Permission { get; set; }

        public virtual BelongViewModel IdLocationNavigation { get; set; }
        public virtual PositionViewModel IdPositionNavigation { get; set; }
        public virtual ICollection<TrackingViewModel> Tracking { get; set; }
    }
}
