using DeviceManager.ViewModel.ViewModel;
using DeviceManager.EntityFramework.Models;

namespace DeviceManager.ViewModel.Mapping
{
    public static class UpdateViewModel
    {
        public static void UpdateDevice(this Device device, DeviceViewModel deviceVM)
        {
            device.Id = deviceVM.Id;
            device.Seri = deviceVM.Seri;
            device.Name = deviceVM.Name;
            device.IdProductType = deviceVM.IdProductType;
            device.IdBrand = deviceVM.IdBrand;
            device.CreatedDay = deviceVM.CreatedDay;
            device.CreatedBy = deviceVM.CreatedBy;
            device.LastUpdatedDay = deviceVM.LastUpdatedDay;
            device.LastUpdatedBy = deviceVM.LastUpdatedBy;
            device.Image = deviceVM.Image;
        }


        public static void UpdateLocation(this Location location, LocationViewModel locationVM)
        {
            location.Id = locationVM.Id;
            location.Name = locationVM.Name;
            location.Belong = locationVM.Belong;
            location.Level = locationVM.Level;
            location.CreatedDay = locationVM.CreatedDay;
            location.CreatedBy = locationVM.CreatedBy;
            location.LastUpdatedDay = locationVM.LastUpdatedDay;
            location.LastUpdatedBy = locationVM.LastUpdatedBy;
        }

        public static void UpdateBrand(this Brand brand, BrandViewModel brandVM)
        {
            brand.Id = brandVM.Id;
            brand.Name = brandVM.Name;
            brand.CreatedDay = brandVM.CreatedDay;
            brand.CreatedBy = brandVM.CreatedBy;
            brand.LastUpdatedDay = brandVM.LastUpdatedDay;
            brand.LastUpdatedBy = brandVM.LastUpdatedBy;
        }


        public static void UpdatePosition(this Position position, PositionViewModel positionVM)
        {
            position.Id = positionVM.Id;
            position.Name = positionVM.Name;
            position.CreatedDay = positionVM.CreatedDay;
            position.CreatedBy = positionVM.CreatedBy;
            position.LastUpdatedDay = positionVM.LastUpdatedDay;
            position.LastUpdatedBy = positionVM.LastUpdatedBy;
        }

        public static void UpdateProductType(this ProductType productType, ProductTypeViewModel productTypeVM)
        {
            productType.Id = productTypeVM.Id;
            productType.Name = productTypeVM.Name;
            productType.CreatedDay = productTypeVM.CreatedDay;
            productType.CreatedBy = productTypeVM.CreatedBy;
            productType.LastUpdatedDay = productTypeVM.LastUpdatedDay;
            productType.LastUpdatedBy = productTypeVM.LastUpdatedBy;
        }

        public static void UpdateTracking(this Tracking tracking, TrackingViewModel trackingVM)
        {
            tracking.Id = trackingVM.Id;
            tracking.IdStaff = trackingVM.IdStaff;
            tracking.IdDevice = trackingVM.IdDevice;
            tracking.StartTime = trackingVM.StartTime;
            tracking.EndTime = trackingVM.EndTime;
            tracking.Status = trackingVM.Status;
            tracking.CreatedBy = trackingVM.CreatedBy;
            tracking.LastUpdatedBy = trackingVM.LastUpdatedBy;
        }

        public static void UpdateStaff(this Staff staff, StaffViewModel staffVM)
        {
            staff.Id = staffVM.Id;
            staff.Fullname = staffVM.Fullname;
            staff.Age = staffVM.Age;
            staff.IdLocation = staffVM.IdLocation;
            staff.IdPosition = staffVM.IdPosition;
            staff.Address = staffVM.Address;
            staff.Gender = staffVM.Gender;
            staff.NumberPhone = staffVM.NumberPhone;
            staff.Username = staffVM.Username;
            staff.Password = staffVM.Password;
            staff.Image = staffVM.Image;
            staff.CreatedDay = staffVM.CreatedDay;
            staff.CreatedBy = staffVM.CreatedBy;
            staff.LastUpdatedDay = staffVM.LastUpdatedDay;
            staff.LastUpdatedBy = staffVM.LastUpdatedBy;
        }
    }
}
