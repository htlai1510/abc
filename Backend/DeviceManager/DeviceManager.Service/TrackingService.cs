using System;
using System.Collections.Generic;
using System.Linq;
using DeviceManager.IRepository;
using DeviceManager.EntityFramework.Models;
using DeviceManager.ViewModel.Mapping;
using DeviceManager.ViewModel.ViewModel;
using DeviceManager.IService;
using System.Dynamic;
using System.Globalization;

namespace DeviceManager.Service
{


    public class TrackingService : ITrackingService
    {
        private IGenericRepository<Tracking> _trackingRepository;

        public TrackingService(IGenericRepository<Tracking> trackingRepository)
        {
            _trackingRepository = trackingRepository;
        }

        public void ActiveDevice(TrackingViewModel trackingVM)
        {
            Tracking tracking = new Tracking();
            tracking.UpdateTracking(trackingVM);

            tracking.Status = 1;
            tracking.CreatedDay = DateTime.Now.ToString("dd/MM/yyyy");
            tracking.LastUpdatedDay = DateTime.Now.ToString("dd/MM/yyyy");
            tracking.StartTime = DateTime.Now.ToString("dd/MM/yyyy");

            _trackingRepository.Insert(tracking);
            _trackingRepository.Commit();

            var ef = _trackingRepository.DbContext;
            var getDevice = from d in ef.Device
                            join t in ef.Tracking on d.Id equals t.IdDevice
                            where t.Status == 2 && t.IdDevice == tracking.IdDevice
                            select t.Id;
            _trackingRepository.DbContext.Tracking.RemoveRange(_trackingRepository.Find(x => getDevice.Contains(x.Id)));

            _trackingRepository.Commit();
        }

        public void BorrowDevice(TrackingViewModel trackingVM)
        {
            Tracking tracking = new Tracking();
            tracking.UpdateTracking(trackingVM);

            tracking.Status = 2;
            tracking.CreatedDay = DateTime.Now.ToString("dd/MM/yyyy");
            tracking.LastUpdatedDay = DateTime.Now.ToString("dd/MM/yyyy");

            _trackingRepository.Insert(tracking);
            _trackingRepository.Commit();
        }

        public void AcceptBorrow(int id, TrackingViewModel trackingVM)
        {
            Tracking tracking = new Tracking();
            tracking.UpdateTracking(trackingVM);

            var newTracking = _trackingRepository.Get(id);

            if (!string.IsNullOrEmpty(tracking.LastUpdatedBy))
            {
                newTracking.LastUpdatedBy = tracking.LastUpdatedBy;
            }
            if (newTracking != null)
            {
                newTracking.Status = tracking.Status;
            }
            if (!string.IsNullOrEmpty(tracking.LastUpdatedBy))
            {
                newTracking.LastUpdatedBy = tracking.LastUpdatedBy;
            }

            newTracking.Status = 1;
            newTracking.LastUpdatedDay = DateTime.Now.ToString("dd/MM/yyyy");
            newTracking.StartTime = DateTime.Now.ToString("dd/MM/yyyy");
            _trackingRepository.Update(newTracking);
            _trackingRepository.Commit();

            var ef = _trackingRepository.DbContext;
            var getDevice = from d in ef.Device
                            join t in ef.Tracking on d.Id equals t.IdDevice
                            where t.Status == 2 && t.IdDevice == tracking.IdDevice
                            select t.Id;
            _trackingRepository.DbContext.Tracking.RemoveRange(_trackingRepository.Find(x => getDevice.Contains(x.Id)));

            _trackingRepository.Commit();
        }

        public IEnumerable<TrackingViewModel> GetByDevice(int id)
        {
            var trackingData = _trackingRepository.Find(x => x.IdDevice == id);
            var trackingVMData = Mapping.Mapper.Map<IEnumerable<TrackingViewModel>>(trackingData);
            return trackingVMData;
        }

        public void RemoveRequest(int id)
        {
            _trackingRepository.Delete(id);
            _trackingRepository.Commit();
        }

        public IEnumerable<TrackingViewModel> GetAll()
        {
            var trackingData = _trackingRepository.GetAll();
            var trackingVMData = Mapping.Mapper.Map<IEnumerable<TrackingViewModel>>(trackingData);
            return trackingVMData;
        }

        public void InactiveDevice(int id)
        {
            var deviceTracking = _trackingRepository.Find(x => x.IdDevice == id && x.Status == 1).FirstOrDefault();

            deviceTracking.Status = 0;
            deviceTracking.LastUpdatedDay = DateTime.Now.ToString("dd/MM/yyyy");
            deviceTracking.EndTime = DateTime.Now.ToString("dd/MM/yyyy");

            _trackingRepository.Commit();
        }

        public void RequestBorrow(TrackingViewModel trackingVM)
        {
            Tracking tracking = new Tracking();
            tracking.UpdateTracking(trackingVM);

            tracking.Status = 2;
            tracking.CreatedDay = DateTime.Now.ToString("dd/MM/yyyy");
            tracking.LastUpdatedDay = DateTime.Now.ToString("dd/MM/yyyy");
            tracking.StartTime = DateTime.Now.ToString("dd/MM/yyyy");

            _trackingRepository.Insert(tracking);
            _trackingRepository.Commit();
        }

    }
}
