using System;
using System.Collections.Generic;
using System.Text;

namespace DeviceManager.ViewModel.ViewModel
{
    public class BelongViewModel
    {
        public int Id { get; set; }
        public int? IdRoom { get; set; }
        public int? IdFloor { get; set; }
        public string CreatedDay { get; set; }
        public string CreatedBy { get; set; }
        public string LastUpdatedDay { get; set; }
        public string LastUpdatedBy { get; set; }

        public virtual FloorViewModel IdFloorNavigation { get; set; }
        public virtual RoomViewModel IdRoomNavigation { get; set; }
        public virtual ICollection<StaffViewModel> Staff { get; set; }

    }
}
