using System;
using System.Collections.Generic;
using DeviceManager.EntityFramework.Models;
using DeviceManager.ViewModel.ViewModel;
using DeviceManager.IRepository;
using DeviceManager.ViewModel.Mapping;
using DeviceManager.IService;
using System.Linq;
using Data = System.Collections.Generic.KeyValuePair<int, string>;

namespace DeviceManager.Service
{
    public class LocationService : ILocationService
    {
        private IGenericRepository<Location> _locationRepository;
        public LocationService(IGenericRepository<Location> locationRepository)
        {
            _locationRepository = locationRepository;
        }

        public IEnumerable<LocationViewModel> GetAll()
        {
            var locationData =  _locationRepository.GetAll();
            var locationVMData = Mapping.Mapper.Map<IEnumerable<LocationViewModel>>(locationData);
            return locationVMData;
        }

        /*
        public IEnumerable<LocationViewModel> GetFloor()
        {
            IEnumerable<Location> data = _locationRepository.GetAll();
            IEnumerable<Location> locationData = from l in data
                                                 where l.Level == data.Min(x => x.Level)
                                                 select l;
            var locationVMData = Mapping.Mapper.Map<IEnumerable<LocationViewModel>>(locationData);
            return locationVMData;
        }

        public IEnumerable<LocationViewModel> GetRoom()
        {
            IEnumerable<Location> data = _locationRepository.GetAll();
            IEnumerable<Location> locationData = from l in data
                                                 where l.Level == data.Max(x => x.Level)
                                                 select l;
            var locationVMData = Mapping.Mapper.Map<IEnumerable<LocationViewModel>>(locationData);
            return locationVMData;
        }
        */

        public void Insert(LocationViewModel locationVM)
        {
            Location location = new Location();
            location.UpdateLocation(locationVM);

            if(location.Belong == null)
            {
                location.Level = 1;
            }
            else
            {
                location.Level = 2;
            }

            location.LastUpdatedDay = DateTime.Now.ToString("dd/MM/yyyy");
            location.CreatedDay = DateTime.Now.ToString("dd/MM/yyyy");

            _locationRepository.Insert(location);
            _locationRepository.Commit();
        }

        public void Update(int id, LocationViewModel locationVM)
        {
            Location location = new Location();
            location.UpdateLocation(locationVM);

            var newLocation = _locationRepository.Get(id);
            if (!string.IsNullOrEmpty(location.Name))
            {
                newLocation.Name = location.Name;
            }
            if (location.Belong != null)
            {
                newLocation.Belong = location.Belong;
            }
            if (!string.IsNullOrEmpty(location.LastUpdatedBy))
            {
                newLocation.LastUpdatedBy = location.LastUpdatedBy;
            }
            newLocation.LastUpdatedDay = DateTime.Now.ToString("dd/MM/yyyy");
            _locationRepository.Update(newLocation);
            _locationRepository.Commit();
        }

        public string Get(int id)
        {
            Location locationData = _locationRepository.Get(id);
            string location = locationData.Name;
            int? belong = locationData.Belong;
            for(int i = 1; i < locationData.Level; i++)
            {
                Location result = _locationRepository.Find(x => x.Id == belong).FirstOrDefault();
                location = location +", " + result.Name;
                belong = result.Belong;
            }
            location = location + ".";
            return location;
        }

        public List<Data>  GetLocation()
        {
            IEnumerable<Location> data = _locationRepository.GetAll();
            IEnumerable<Location>  locationData = from l in data
                                       where l.Level == data.Max(x => x.Level)
                                       select l;
            List<Data> locationArray = new List<Data>();
            foreach (var location in locationData)
            {
                string locationName = location.Name;
                int? belong = location.Belong;
                int id = location.Id;
                for (int i = 1; i < location.Level; i++)
                {
                    Location result = _locationRepository.Find(x => x.Id == belong).FirstOrDefault();
                    locationName = locationName + ", " + result.Name;
                    belong = result.Belong;
                }
                locationName = locationName + ".";
                locationArray.Add(new Data(id, locationName));
            }
            return locationArray;
        }

        public void Delete(int id)
        {
            _locationRepository.Delete(id);
            _locationRepository.Commit();
        }
    }
}
