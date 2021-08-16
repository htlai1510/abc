using System.Collections.Generic;
using DeviceManager.ViewModel.ViewModel;
using Microsoft.AspNetCore.Http;
using System;

namespace DeviceManager.IService
{
    public interface IDeviceService
    {
        DeviceViewModel Get(int id);
        IEnumerable<DeviceViewModel> GetAll();
        void Insert(DeviceViewModel deviceVM);
        void Delete(int id);
        void Update(int id, DeviceViewModel deviceVM);
        void UploadImage(IFormFileCollection files);
        IEnumerable<DeviceViewModel> GetDeviceUsingByUser(int idStaff);
        IEnumerable<DeviceViewModel> GetDeviceBorrowingByUser(int idStaff);
        IEnumerable<DeviceViewModel> GetDeviceEmptyByUser(int idStaff);
        IEnumerable<DeviceViewModel> GetDeviceUsing();
        IEnumerable<DeviceViewModel> GetDeviceBorrow();
        IEnumerable<DeviceViewModel> GetDeviceEmpty();
        Array CountDevice();
        Array CountDeviceByFloor();
    }
}
