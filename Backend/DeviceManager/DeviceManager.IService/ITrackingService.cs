using System.Collections.Generic;
using System.Dynamic;
using DeviceManager.EntityFramework.Models;
using DeviceManager.ViewModel.ViewModel;

namespace DeviceManager.IService
{
    public interface ITrackingService
    {
        IEnumerable<TrackingViewModel> GetAll();
        void ActiveDevice(TrackingViewModel trackingVM);
        void InactiveDevice(int id);
        void BorrowDevice(TrackingViewModel trackingVM);
        void AcceptBorrow(int id, TrackingViewModel trackingVM);
        void RemoveRequest(int id);
        IEnumerable<TrackingViewModel> GetByDevice(int id);
    }
}
