﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DeviceManager.ViewModel.ViewModel
{
    public class BrandViewModel
    {
        public BrandViewModel()
        {
            Device = new HashSet<DeviceViewModel>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string CreatedDay { get; set; }
        public string CreatedBy { get; set; }
        public string LastUpdatedDay { get; set; }
        public string LastUpdatedBy { get; set; }

        public virtual ICollection<DeviceViewModel> Device { get; set; }
    }
}
