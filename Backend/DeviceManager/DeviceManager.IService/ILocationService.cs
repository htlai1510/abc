using System.Collections.Generic;
using DeviceManager.ViewModel.ViewModel;
using Data = System.Collections.Generic.KeyValuePair<int, string>;


namespace DeviceManager.IService
{
    public interface ILocationService
    {
        IEnumerable<LocationViewModel> GetAll();
        List<Data> GetLocation();
        /*
        IEnumerable<LocationViewModel> GetRoom();
        IEnumerable<LocationViewModel> GetFloor();
        */
        string Get(int id);
        void Insert(LocationViewModel locationVM);
        void Update(int id, LocationViewModel locationVM);
        void Delete(int id);
    }
}
