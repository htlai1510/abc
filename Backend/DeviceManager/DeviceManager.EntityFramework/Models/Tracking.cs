using System;
using System.Collections.Generic;

namespace DeviceManager.EntityFramework.Models
{
    public partial class Tracking
    {
        public int Id { get; set; }
        public int IdStaff { get; set; }
        public int IdDevice { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public int? Status { get; set; }
        public string CreatedDay { get; set; }
        public string CreatedBy { get; set; }
        public string LastUpdatedDay { get; set; }
        public string LastUpdatedBy { get; set; }

        public virtual Device IdDeviceNavigation { get; set; }
        public virtual Staff IdStaffNavigation { get; set; }
    }
}
