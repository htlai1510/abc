using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Data = System.Collections.Generic.KeyValuePair<string, int>;
using DataT = System.Collections.Generic.KeyValuePair<int, int>;
using DeviceManager.EntityFramework.Models;
using DeviceManager.IRepository;
using DeviceManager.ViewModel.Mapping;
using DeviceManager.ViewModel.ViewModel;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using DeviceManager.IService;


namespace DeviceManager.Service
{

    public class DeviceService : IDeviceService
    {
        private IGenericRepository<Device> _deviceRepository;
        private IWebHostEnvironment _hostEnvironment;


        public DeviceService(IGenericRepository<Device> deviceRepository, IWebHostEnvironment hostEnvironment)
        {
            _deviceRepository = deviceRepository;
            _hostEnvironment = hostEnvironment;
        }



        public DeviceViewModel Get(int id)
        {
            var deviceData = _deviceRepository.Get(id);
            var deviceVMData = Mapping.Mapper.Map<DeviceViewModel>(deviceData);
            return deviceVMData;
        }

        public IEnumerable<DeviceViewModel> GetAll()
        {
            var deviceData = _deviceRepository.GetAll();
            var deviceVMData = Mapping.Mapper.Map<IEnumerable<DeviceViewModel>>(deviceData);
            return deviceVMData;
        }


        public void Insert(DeviceViewModel deviceVM)
        {
            Device device = new Device();
            device.UpdateDevice(deviceVM);

            device.LastUpdatedDay = DateTime.Now.ToString("dd/MM/yyyy");
            device.CreatedDay = DateTime.Now.ToString("dd/MM/yyyy");
            _deviceRepository.Insert(device);
            _deviceRepository.Commit();
        }

        public void Delete(int id)
        {
            _deviceRepository.Delete(id);
            _deviceRepository.Commit();
        }
        public void Update(int id, DeviceViewModel deviceVM)
        {

            Device device = new Device();
            device.UpdateDevice(deviceVM);

            var newDevice = _deviceRepository.Get(id);
            if (!string.IsNullOrEmpty(device.Name))
            {
                newDevice.Name = device.Name;

            }
            if (!string.IsNullOrEmpty(device.Image))
            {
                newDevice.Image = device.Image;

            }
            if (!string.IsNullOrEmpty(device.Seri))
            {
                newDevice.Seri = device.Seri;

            }
            if (device.IdProductType != null)
            {
                newDevice.IdProductType = device.IdProductType;

            }
            if (device.IdBrand != null)
            {
                newDevice.IdBrand = device.IdBrand;

            }
            if (!string.IsNullOrEmpty(device.LastUpdatedBy))
            {
                newDevice.LastUpdatedBy = device.LastUpdatedBy;
            }
            newDevice.LastUpdatedDay = DateTime.Now.ToString("dd/MM/yyyy");
            _deviceRepository.Update(newDevice);
            _deviceRepository.Commit();
        }

        public void UploadImage(IFormFileCollection files)
        {
            string fileName = "";

            if (files.Count > 0)
            {
                var file = files[0];

                fileName = string.Format("{0}", Path.GetFileName(file.FileName));

                var path = Path.Combine(_hostEnvironment.WebRootPath, "images/device/" + fileName);

                using (Stream fileStream = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }

            }
        }


        public Array CountDevice()
        {
            List<Data> countDevice = new List<Data>();
            countDevice.Add(new Data("Avtive", GetDeviceUsing().Count()));
            countDevice.Add(new Data("Inactive", GetDeviceEmpty().Count()));
            return countDevice.ToArray();
        }


        public Array CountDeviceByFloor()
        {
            var ef = _deviceRepository.DbContext;
            var tracking = from t in ef.Tracking select t;
            var trackingdt = (from t in ef.Tracking select t.IdDevice).Distinct();
            List<DataT> trackingArray = new List<DataT>();
            foreach (var t in trackingdt)
            {
                var date = from d in tracking where d.IdDevice == t select d;
                var tr = (from lu in tracking
                          where lu.IdDevice == t && lu.StartTime == date.Max(x => x.StartTime)
                          select lu).FirstOrDefault();
                if (tr != null)
                {
                    trackingArray.Add(new DataT(t, tr.IdStaff));

                }
            }

            var device = ef.Device.ToList();
            var staff = ef.Staff.ToList();
            var location = ef.Location.ToList();
            var result = from d in device
                         join t in trackingArray on d.Id equals t.Key
                         join s in staff on t.Value equals s.Id
                         join l in location on s.IdLocation equals l.Id
                         select new
                         {
                             idDevice = d.Id,
                             idStaff = s.Id,
                             idLocation = l.Belong
                         };
            var chart = from p in result
                        group p by p.idLocation into g
                        select new
                        {
                            floor = g.Key,
                            countDevice = g.Count()
                        };
            return chart.ToArray();
        }



        public IEnumerable<DeviceViewModel> GetDeviceUsing()
        {
            var ef = _deviceRepository.DbContext;
            var deviceData = from d in _deviceRepository.GetAll()
                             join t in ef.Tracking on d.Id equals t.IdDevice
                             join s in ef.Staff on t.IdStaff equals s.Id
                             where t.Status == 1
                             select new DeviceViewModel { 
                                 Id = d.Id,
                                 Seri = d.Seri,
                                 Name = d.Name,
                                 IdProductType = d.IdProductType,
                                 IdBrand = d.IdBrand,
                                 Image = d.Image,
                                 IdStaff = t.IdStaff,
                                 Fullname = s.Fullname,
                                 IdLocation = s.IdLocation,
                                 StartTime = t.StartTime,
                                 lastUpdatedTracking = t.LastUpdatedDay
                             };
            var deviceVMData = Mapping.Mapper.Map<IEnumerable<DeviceViewModel>>(deviceData);
            return deviceVMData;
        }

        public IEnumerable<DeviceViewModel> GetDeviceBorrow()
        {
            var ef = _deviceRepository.DbContext;
            var deviceData = from d in _deviceRepository.GetAll()
                             join t in ef.Tracking on d.Id equals t.IdDevice
                             join s in ef.Staff on t.IdStaff equals s.Id
                             where t.Status == 2
                             select new DeviceViewModel
                             {
                                 Id = d.Id,
                                 Seri = d.Seri,
                                 Name = d.Name,
                                 IdProductType = d.IdProductType,
                                 IdBrand = d.IdBrand,
                                 Image = d.Image,
                                 Fullname = s.Fullname,
                                 IdStaff = t.IdStaff,
                                 IdLocation = s.IdLocation,
                                 StartTime = t.StartTime,
                                 lastUpdatedTracking = t.LastUpdatedDay,
                                 IdTracking = t.Id
                             };
            var deviceVMData = Mapping.Mapper.Map<IEnumerable<DeviceViewModel>>(deviceData);
            return deviceVMData;
        }


        public IEnumerable<DeviceViewModel> GetDeviceEmpty()
        {
            var ef = _deviceRepository.DbContext;
            var query = from d in ef.Device
                        join t in ef.Tracking on d.Id equals t.IdDevice
                        where t.Status == 1
                        select d.Id;
            var deviceData = from d in ef.Device
                         where !query.Contains(d.Id)
                         select d;
            var deviceVMData = Mapping.Mapper.Map<IEnumerable<DeviceViewModel>>(deviceData);
            return deviceVMData;
        }
        public IEnumerable<DeviceViewModel> GetDeviceUsingByUser(int idStaff = 0)
        {

            var ef = _deviceRepository.DbContext;
            var deviceData = from d in ef.Device
                             join t in ef.Tracking on d.Id equals t.IdDevice
                             join s in ef.Staff on t.IdStaff equals s.Id
                             where s.Id == idStaff && t.Status == 1
                             select new DeviceViewModel
                             {
                                 Id = d.Id,
                                 Seri = d.Seri,
                                 Name = d.Name,
                                 IdProductType = d.IdProductType,
                                 IdBrand = d.IdBrand,
                                 Image = d.Image,
                                 StartTime = t.StartTime,
                             };
            var deviceVMData = Mapping.Mapper.Map<IEnumerable<DeviceViewModel>>(deviceData);
            return deviceVMData;
        }

        public IEnumerable<DeviceViewModel> GetDeviceBorrowingByUser(int idStaff)
        {
            var ef = _deviceRepository.DbContext;
            var deviceData = from d in ef.Device
                             join t in ef.Tracking on d.Id equals t.IdDevice
                             join s in ef.Staff on t.IdStaff equals s.Id
                             where s.Id == idStaff && t.Status == 2
                             select new DeviceViewModel
                             {
                                 Id = d.Id,
                                 Seri = d.Seri,
                                 Name = d.Name,
                                 IdProductType = d.IdProductType,
                                 IdBrand = d.IdBrand,
                                 Image = d.Image,
                                 lastUpdatedTracking = t.LastUpdatedDay,
                                 IdTracking = t.Id
                             };
            var deviceVMData = Mapping.Mapper.Map<IEnumerable<DeviceViewModel>>(deviceData);
            return deviceVMData;
        }


        public IEnumerable<DeviceViewModel> GetDeviceEmptyByUser(int idStaff)
        {
            var ef = _deviceRepository.DbContext;
            var query = from d in ef.Device
                        join t in ef.Tracking on d.Id equals t.IdDevice
                        where t.Status == 1
                        select d.Id;
            var query2 = from d in ef.Device
                        join t in ef.Tracking on d.Id equals t.IdDevice
                        where t.Status == 2 && t.IdStaff == idStaff
                        select d.Id;
            var deviceData = from d in ef.Device
                             where !query.Contains(d.Id) && !query2.Contains(d.Id)
                             select d;
            var deviceVMData = Mapping.Mapper.Map<IEnumerable<DeviceViewModel>>(deviceData);
            return deviceVMData;
        }

    }
}
